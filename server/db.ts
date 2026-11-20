import fs from 'fs';
import path from 'path';

// Very small JSON-file database. Data lives in ./data/db.json (created automatically),
// so accounts, profiles and progress survive restarts. No external database needed.

export interface StoredUser {
  id: string;
  email: string;
  salt: string;
  hash: string;
  createdAt: string;
  failedAttempts: number;
  lockUntil: number;
}

export interface UserData {
  profile: any | null;
  state: { courses: Record<string, any>; roadmaps: Record<string, any>; applications: any[]; resume: any | null };
  time: Record<string, number>; // YYYY-MM-DD -> seconds
}

export interface Session { userId: string; expires: number; }
export interface ResetEntry { codeHash: string; expires: number; attempts: number; }

interface DB {
  users: Record<string, StoredUser>; // key = lower-case email
  data: Record<string, UserData>; // key = user id
  sessions: Record<string, Session>; // key = token hash
  resets: Record<string, ResetEntry>; // key = lower-case email
}

// Set DATA_DIR to a persistent disk / volume when you deploy (see DEPLOYMENT.md).
const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'db.json');

let db: DB = { users: {}, data: {}, sessions: {}, resets: {} };

export const loadDb = () => {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (fs.existsSync(FILE)) {
      const raw = JSON.parse(fs.readFileSync(FILE, 'utf8'));
      db = { users: raw.users || {}, data: raw.data || {}, sessions: raw.sessions || {}, resets: raw.resets || {} };
    }
  } catch (e) {
    console.error('Could not read data/db.json, starting with an empty database.', e);
  }
};

let timer: NodeJS.Timeout | null = null;
export const saveSoon = () => {
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    try {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      const tmp = FILE + '.tmp';
      fs.writeFileSync(tmp, JSON.stringify(db));
      fs.renameSync(tmp, FILE); // atomic replace
    } catch (e) {
      console.error('Failed to save database', e);
    }
  }, 300);
};

export const flushNow = () => {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(db));
  } catch {}
};

export const getDb = () => db;

export const emptyUserData = (): UserData => ({
  profile: null,
  state: { courses: {}, roadmaps: {}, applications: [], resume: null },
  time: {},
});
