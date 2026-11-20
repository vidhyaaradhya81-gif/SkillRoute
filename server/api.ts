import type { Express, Request, Response, NextFunction } from 'express';
import {
  checkEmail, checkPasswordRules, createUser, verifyLogin, createSession, sessionUser, destroySession,
  createResetCode, resetPassword, deliverResetCode, normEmail,
} from './auth';
import { getDb, saveSoon, emptyUserData, StoredUser } from './db';
import { extractResumeText } from './extract';
import { COURSES, SPECIALISATIONS, YEAR_SEM, SKILLS } from '../src/data/profileOptions';

const COOKIE = 'sr_session';

const parseCookies = (req: Request): Record<string, string> => {
  const out: Record<string, string> = {};
  (req.headers.cookie || '').split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
};

const setSessionCookie = (req: Request, res: Response, token: string, remember: boolean) => {
  const maxAge = (remember ? 30 : 7) * 24 * 3600;
  const secure = req.secure || req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`);
};

// Simple per-IP rate limit for the login-related endpoints (protects against password guessing and email flooding).
const hits = new Map<string, { n: number; reset: number }>();
const rateLimit = (max: number) => (req: Request, res: Response, next: NextFunction) => {
  const key = `${req.path}|${req.ip}`;
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.reset < now) { hits.set(key, { n: 1, reset: now + 15 * 60 * 1000 }); return next(); }
  h.n += 1;
  if (h.n > max) return res.status(429).json({ code: 'rate_limited', error: 'Too many requests from this device. Please wait a few minutes and try again.' });
  next();
};
setInterval(() => { const now = Date.now(); hits.forEach((v, k) => { if (v.reset < now) hits.delete(k); }); }, 10 * 60 * 1000).unref();
const clearSessionCookie = (res: Response) => res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);

const displayName = (user: StoredUser, profile: any) => (profile && profile.fullName) || user.email.split('@')[0];

const bootstrap = (user: StoredUser) => {
  const db = getDb();
  if (!db.data[user.id]) db.data[user.id] = emptyUserData();
  const d = db.data[user.id];
  return {
    user: { id: user.id, email: user.email, name: displayName(user, d.profile) },
    profile: d.profile,
    state: d.state,
    time: d.time,
  };
};

type AuthedReq = Request & { authUser?: StoredUser };
const requireAuth = (req: AuthedReq, res: Response, next: NextFunction) => {
  const user = sessionUser(parseCookies(req)[COOKIE]);
  if (!user) return res.status(401).json({ error: 'Please log in to continue.', code: 'unauthenticated' });
  req.authUser = user;
  next();
};

const str = (v: any, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const registerApi = (app: Express) => {
  // ---------- auth ----------
  app.use('/api/auth/login', rateLimit(30));
  app.use('/api/auth/signup', rateLimit(15));
  app.use('/api/auth/forgot', rateLimit(10));
  app.use('/api/auth/reset', rateLimit(15));
  app.use('/api/auth/check-email', rateLimit(120));

  app.post('/api/auth/check-email', async (req, res) => {
    const check = await checkEmail(req.body?.email);
    const exists = check.ok ? !!getDb().users[normEmail(req.body.email)] : false;
    res.json({ ...check, exists });
  });

  app.post('/api/auth/signup', async (req, res) => {
    const email = normEmail(req.body?.email);
    const password = String(req.body?.password ?? '');
    const check = await checkEmail(email);
    if (!check.ok) return res.status(400).json({ code: 'invalid_email', error: check.message, suggestion: check.suggestion });
    const pwError = checkPasswordRules(password);
    if (pwError) return res.status(400).json({ code: 'weak_password', error: pwError });
    if (getDb().users[email]) {
      return res.status(409).json({ code: 'exists', error: 'An account with this email already exists. Please log in instead.' });
    }
    const user = createUser(email, password);
    setSessionCookie(req, res, createSession(user.id, true), true);
    res.json(bootstrap(user));
  });

  app.post('/api/auth/login', async (req, res) => {
    const email = normEmail(req.body?.email);
    const password = String(req.body?.password ?? '');
    const remember = !!req.body?.remember;
    const check = await checkEmail(email);
    if (!check.ok) return res.status(400).json({ code: 'invalid_email', error: check.message, suggestion: check.suggestion });
    if (!password) return res.status(400).json({ code: 'empty_password', error: 'Password is required.' });
    const result = verifyLogin(email, password);
    if (result.ok) {
      setSessionCookie(req, res, createSession(result.user.id, remember), remember);
      return res.json(bootstrap(result.user));
    }
    if (result.reason === 'no_account') {
      return res.status(404).json({ code: 'no_account', error: 'We could not find an account with this email. Please create an account first.' });
    }
    if (result.reason === 'locked') {
      return res.status(429).json({ code: 'locked', error: `Too many incorrect attempts. This account is locked for ${result.minutes} minute(s). You can reset your password to unlock it.` });
    }
    return res.status(401).json({
      code: 'wrong_password',
      error: `Incorrect password. ${result.attemptsLeft} attempt(s) left. You can update your password using "Forgot password?".`,
      attemptsLeft: result.attemptsLeft,
    });
  });

  app.post('/api/auth/logout', (req, res) => {
    destroySession(parseCookies(req)[COOKIE]);
    clearSessionCookie(res);
    res.json({ ok: true });
  });

  app.post('/api/auth/forgot', async (req, res) => {
    const email = normEmail(req.body?.email);
    const check = await checkEmail(email);
    if (!check.ok) return res.status(400).json({ code: 'invalid_email', error: check.message, suggestion: check.suggestion });
    const code = createResetCode(email);
    if (!code) return res.status(404).json({ code: 'no_account', error: 'We could not find an account with this email. Please check the email id or create a new account.' });
    const { emailed } = await deliverResetCode(email, code);
    res.json({ ok: true, emailed });
  });

  app.post('/api/auth/reset', (req, res) => {
    const email = normEmail(req.body?.email);
    const pwError = checkPasswordRules(String(req.body?.password ?? ''));
    if (pwError) return res.status(400).json({ code: 'weak_password', error: pwError });
    const r = resetPassword(email, String(req.body?.code ?? ''), String(req.body.password));
    if (!r.ok) return res.status(400).json({ code: 'bad_code', error: r.message });
    res.json({ ok: true });
  });

  app.get('/api/me', requireAuth, (req: AuthedReq, res) => res.json(bootstrap(req.authUser!)));

  // ---------- profile (asked only once) ----------
  app.put('/api/profile', requireAuth, (req: AuthedReq, res) => {
    const b = req.body || {};
    const fullName = str(b.fullName, 80);
    const course = str(b.course, 80);
    const specialisation = str(b.specialisation, 120);
    const yearSem = str(b.yearSem, 80);
    const role = str(b.role, 80);
    const skills: string[] = Array.isArray(b.skills) ? [...new Set<string>(b.skills.map((s: any) => str(s, 60)).filter(Boolean))] : [];
    if (fullName.length < 2) return res.status(400).json({ error: 'Please enter your full name.' });
    if (!COURSES.includes(course)) return res.status(400).json({ error: 'Please select your course.' });
    if (!(SPECIALISATIONS[course] || []).includes(specialisation)) return res.status(400).json({ error: 'Please select your specialisation.' });
    if (!(YEAR_SEM[course] || []).includes(yearSem)) return res.status(400).json({ error: 'Please select your current year / semester.' });
    if (role.length < 2) return res.status(400).json({ error: 'Please enter the role you are preparing for.' });
    if (skills.length === 0) return res.status(400).json({ error: 'Please select at least one skill you have learnt.' });
    if (skills.some((s) => !SKILLS.includes(s))) return res.status(400).json({ error: 'One of the selected skills is not valid.' });
    const d = getDb().data[req.authUser!.id] || (getDb().data[req.authUser!.id] = emptyUserData());
    d.profile = { fullName, course, specialisation, yearSem, skills, role };
    saveSoon();
    res.json(bootstrap(req.authUser!));
  });

  // ---------- progress state (courses, roadmaps, applications, resume) ----------
  app.put('/api/state', requireAuth, (req: AuthedReq, res) => {
    const s = req.body?.state;
    if (!s || typeof s !== 'object') return res.status(400).json({ error: 'Invalid state.' });
    if (JSON.stringify(s).length > 900_000) return res.status(413).json({ error: 'State is too large.' });
    const d = getDb().data[req.authUser!.id] || (getDb().data[req.authUser!.id] = emptyUserData());
    d.state = {
      courses: s.courses && typeof s.courses === 'object' ? s.courses : {},
      roadmaps: s.roadmaps && typeof s.roadmaps === 'object' ? s.roadmaps : {},
      applications: Array.isArray(s.applications) ? s.applications.slice(0, 500) : [],
      resume: s.resume && typeof s.resume === 'object' ? s.resume : null,
    };
    saveSoon();
    res.json({ ok: true });
  });

  // ---------- time spent ----------
  app.post('/api/time', requireAuth, (req: AuthedReq, res) => {
    const day = String(req.body?.day || '');
    const seconds = Math.round(Number(req.body?.seconds));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !(seconds > 0)) return res.status(400).json({ error: 'Invalid time entry.' });
    const d = getDb().data[req.authUser!.id] || (getDb().data[req.authUser!.id] = emptyUserData());
    d.time[day] = (d.time[day] || 0) + Math.min(seconds, 120);
    // keep only the last 60 days
    const keys = Object.keys(d.time).sort();
    while (keys.length > 60) delete d.time[keys.shift()!];
    saveSoon();
    res.json({ ok: true });
  });

  // ---------- resume text extraction ----------
  app.post('/api/resume/extract', requireAuth, async (req: AuthedReq, res) => {
    try {
      const fileName = str(req.body?.fileName, 200) || 'resume.txt';
      const data = String(req.body?.data || '');
      if (!data) return res.status(400).json({ error: 'No file received.' });
      const buf = Buffer.from(data, 'base64');
      if (buf.length > 6 * 1024 * 1024) return res.status(413).json({ error: 'File is too large. Please upload a file under 6 MB.' });
      const text = await extractResumeText(fileName, buf);
      if (text.length < 40) {
        return res.status(422).json({ error: 'We could not read any text from this file. If it is a scanned image, please upload a text-based PDF or DOCX.' });
      }
      res.json({ text });
    } catch (e: any) {
      res.status(422).json({ error: e?.message || 'Could not read this file.' });
    }
  });
};
