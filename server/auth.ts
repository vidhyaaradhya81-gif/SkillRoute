import crypto from 'crypto';
import dns from 'dns';
import { getDb, saveSoon, emptyUserData, StoredUser } from './db';

const MAX_FAILED = 5;
const LOCK_MS = 15 * 60 * 1000;
const SESSION_MS = 7 * 24 * 3600 * 1000;
const SESSION_REMEMBER_MS = 30 * 24 * 3600 * 1000;

// One account per email: Gmail ignores dots and "+tags" (j.doe+x@gmail.com is the same inbox as jdoe@gmail.com),
// so those variants are folded into one canonical address.
export const normEmail = (e: string) => {
  const v = String(e || '').trim().toLowerCase();
  const at = v.lastIndexOf('@');
  if (at < 1) return v;
  let local = v.slice(0, at);
  let domain = v.slice(at + 1);
  if (domain === 'googlemail.com') domain = 'gmail.com';
  if (domain === 'gmail.com') local = local.split('+')[0].replace(/\./g, '');
  return `${local}@${domain}`;
};

// ---------- email validation ----------
const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
const TYPO_DOMAINS: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.con': 'gmail.com', 'gmail.co': 'gmail.com', 'gnail.com': 'gmail.com',
  'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'outlok.com': 'outlook.com', 'outlook.con': 'outlook.com',
};
const DISPOSABLE = new Set(['mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com', 'yopmail.com', 'trashmail.com', 'throwaway.email']);
const KNOWN_OK = new Set(['gmail.com', 'yahoo.com', 'yahoo.in', 'outlook.com', 'hotmail.com', 'live.com', 'icloud.com', 'proton.me', 'protonmail.com', 'rediffmail.com']);
const mxCache = new Map<string, boolean>();

export interface EmailCheck { ok: boolean; message?: string; suggestion?: string; }

export const checkEmail = async (raw: string): Promise<EmailCheck> => {
  const email = normEmail(raw);
  if (!email) return { ok: false, message: 'Email address is required.' };
  if (email.length > 254 || !EMAIL_RE.test(email) || email.includes('..')) {
    return { ok: false, message: 'Please enter a valid email address, for example name@gmail.com.' };
  }
  const domain = email.split('@')[1];
  if (TYPO_DOMAINS[domain]) {
    return { ok: false, message: `This email looks mistyped. Did you mean ${email.split('@')[0]}@${TYPO_DOMAINS[domain]}?`, suggestion: `${email.split('@')[0]}@${TYPO_DOMAINS[domain]}` };
  }
  if (DISPOSABLE.has(domain)) return { ok: false, message: 'Temporary email addresses are not allowed. Please use your real email id.' };

  if (KNOWN_OK.has(domain)) return { ok: true };
  if (mxCache.has(domain)) {
    return mxCache.get(domain) ? { ok: true } : { ok: false, message: `We could not find a mail server for "${domain}". Please enter a valid email id.` };
  }
  // Real DNS check: does the domain accept mail? If DNS itself is unreachable (offline), we do not block the user.
  try {
    const mx = await dns.promises.resolveMx(domain);
    const ok = mx.length > 0;
    mxCache.set(domain, ok);
    return ok ? { ok: true } : { ok: false, message: `We could not find a mail server for "${domain}". Please enter a valid email id.` };
  } catch (err: any) {
    if (err && (err.code === 'ENOTFOUND' || err.code === 'ENODATA')) {
      try {
        const a = await dns.promises.resolve4(domain);
        if (a.length) { mxCache.set(domain, true); return { ok: true }; }
      } catch {}
      mxCache.set(domain, false);
      return { ok: false, message: `We could not find a mail server for "${domain}". Please enter a valid email id.` };
    }
    return { ok: true }; // timeout / offline / refused: do not block
  }
};

// ---------- password rules ----------
export const checkPasswordRules = (pw: string): string | null => {
  if (typeof pw !== 'string' || pw.length < 8) return 'Password must be at least 8 characters long.';
  if (pw.length > 128) return 'Password is too long (maximum 128 characters).';
  if (!/[a-zA-Z]/.test(pw) || !/[0-9]/.test(pw)) return 'Password must contain both letters and numbers.';
  if (/^(password|12345678|qwerty123|abcd1234)/i.test(pw)) return 'This password is too common. Please choose a stronger one.';
  return null;
};

// ---------- hashing ----------
const hashPassword = (password: string, salt: string) => crypto.scryptSync(password, salt, 64).toString('hex');
const safeEqual = (a: string, b: string) => {
  const ba = Buffer.from(a, 'hex');
  const bb = Buffer.from(b, 'hex');
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
};
const sha = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

export const createUser = (email: string, password: string): StoredUser => {
  const db = getDb();
  const salt = crypto.randomBytes(16).toString('hex');
  const user: StoredUser = {
    id: 'usr_' + crypto.randomBytes(8).toString('hex'),
    email: normEmail(email),
    salt,
    hash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
    failedAttempts: 0,
    lockUntil: 0,
  };
  db.users[user.email] = user;
  db.data[user.id] = emptyUserData();
  saveSoon();
  return user;
};

export type LoginResult =
  | { ok: true; user: StoredUser }
  | { ok: false; reason: 'no_account' | 'wrong_password' | 'locked'; attemptsLeft?: number; minutes?: number };

export const verifyLogin = (email: string, password: string): LoginResult => {
  const db = getDb();
  const user = db.users[normEmail(email)];
  if (!user) return { ok: false, reason: 'no_account' };
  const now = Date.now();
  if (user.lockUntil > now) return { ok: false, reason: 'locked', minutes: Math.ceil((user.lockUntil - now) / 60000) };
  if (safeEqual(user.hash, hashPassword(password, user.salt))) {
    user.failedAttempts = 0;
    user.lockUntil = 0;
    saveSoon();
    return { ok: true, user };
  }
  user.failedAttempts += 1;
  if (user.failedAttempts >= MAX_FAILED) {
    user.lockUntil = now + LOCK_MS;
    user.failedAttempts = 0;
    saveSoon();
    return { ok: false, reason: 'locked', minutes: Math.ceil(LOCK_MS / 60000) };
  }
  saveSoon();
  return { ok: false, reason: 'wrong_password', attemptsLeft: MAX_FAILED - user.failedAttempts };
};

// ---------- sessions ----------
export const createSession = (userId: string, remember: boolean): string => {
  const db = getDb();
  const token = crypto.randomBytes(32).toString('hex');
  db.sessions[sha(token)] = { userId, expires: Date.now() + (remember ? SESSION_REMEMBER_MS : SESSION_MS) };
  // prune expired
  const now = Date.now();
  Object.keys(db.sessions).forEach((k) => { if (db.sessions[k].expires < now) delete db.sessions[k]; });
  saveSoon();
  return token;
};

export const sessionUser = (token: string | undefined): StoredUser | null => {
  if (!token) return null;
  const db = getDb();
  const s = db.sessions[sha(token)];
  if (!s || s.expires < Date.now()) return null;
  const user = Object.values(db.users).find((u) => u.id === s.userId);
  return user || null;
};

export const destroySession = (token: string | undefined) => {
  if (!token) return;
  delete getDb().sessions[sha(token)];
  saveSoon();
};

export const destroyAllSessionsFor = (userId: string) => {
  const db = getDb();
  Object.keys(db.sessions).forEach((k) => { if (db.sessions[k].userId === userId) delete db.sessions[k]; });
};

// ---------- password reset (6 digit code) ----------
export const createResetCode = (email: string): string | null => {
  const db = getDb();
  const e = normEmail(email);
  if (!db.users[e]) return null;
  const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  db.resets[e] = { codeHash: sha(e + ':' + code), expires: Date.now() + 10 * 60 * 1000, attempts: 0 };
  saveSoon();
  return code;
};

export const resetPassword = (email: string, code: string, newPassword: string): { ok: true } | { ok: false; message: string } => {
  const db = getDb();
  const e = normEmail(email);
  const entry = db.resets[e];
  const user = db.users[e];
  if (!entry || !user || entry.expires < Date.now()) return { ok: false, message: 'This code is invalid or has expired. Please request a new one.' };
  if (entry.attempts >= 5) { delete db.resets[e]; saveSoon(); return { ok: false, message: 'Too many wrong attempts. Please request a new code.' }; }
  if (sha(e + ':' + String(code).trim()) !== entry.codeHash) {
    entry.attempts += 1;
    saveSoon();
    return { ok: false, message: 'Incorrect code. Please check the 6-digit code and try again.' };
  }
  const salt = crypto.randomBytes(16).toString('hex');
  user.salt = salt;
  user.hash = hashPassword(newPassword, salt);
  user.failedAttempts = 0;
  user.lockUntil = 0;
  delete db.resets[e];
  destroyAllSessionsFor(user.id);
  saveSoon();
  return { ok: true };
};

// Sends the reset code by e-mail when SMTP_* variables are set in .env.
// Otherwise (local development) the code is printed in the server terminal.
export const deliverResetCode = async (email: string, code: string): Promise<{ emailed: boolean }> => {
  const host = process.env.SMTP_HOST;
  if (host && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer: any = await import('nodemailer');
      const transporter = (nodemailer.default || nodemailer).createTransport({
        host,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'SkillRoute password reset code',
        text: `Your SkillRoute password reset code is ${code}. It expires in 10 minutes. If you did not request this, you can ignore this email.`,
      });
      return { emailed: true };
    } catch (e) {
      console.error('Could not send reset email, falling back to console:', e);
    }
  }
  console.log('\n==============================================');
  console.log(` Password reset code for ${email}: ${code}`);
  console.log(' (valid for 10 minutes. Configure SMTP_* in .env to e-mail it instead)');
  console.log('==============================================\n');
  return { emailed: false };
};
