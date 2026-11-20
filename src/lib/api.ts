import { ApplicationRecord, ResumeReport, User, UserProfile, UserState, CourseProgress, RoadmapProgress } from '../types';

export interface Bootstrap {
  user: User;
  profile: UserProfile | null;
  state: UserState;
  time: Record<string, number>;
}

export class ApiError extends Error {
  status: number;
  code?: string;
  data: any;
  constructor(status: number, data: any) {
    super((data && data.error) || 'Something went wrong. Please try again.');
    this.status = status;
    this.code = data?.code;
    this.data = data;
  }
}

const call = async <T = any>(method: string, url: string, body?: unknown, keepalive = false): Promise<T> => {
  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: 'same-origin',
      keepalive,
    });
  } catch {
    throw new ApiError(0, { error: 'Cannot reach the SkillRoute server. Make sure it is running (npm run dev).', code: 'network' });
  }
  let data: any = null;
  try { data = await res.json(); } catch { /* empty body */ }
  if (!res.ok) throw new ApiError(res.status, data);
  return data as T;
};

export const api = {
  me: () => call<Bootstrap>('GET', '/api/me'),
  checkEmail: (email: string) => call<{ ok: boolean; message?: string; suggestion?: string; exists: boolean }>('POST', '/api/auth/check-email', { email }),
  signup: (email: string, password: string) => call<Bootstrap>('POST', '/api/auth/signup', { email, password }),
  login: (email: string, password: string, remember: boolean) => call<Bootstrap>('POST', '/api/auth/login', { email, password, remember }),
  logout: () => call('POST', '/api/auth/logout', {}),
  forgot: (email: string) => call<{ ok: boolean; emailed: boolean }>('POST', '/api/auth/forgot', { email }),
  reset: (email: string, code: string, password: string) => call('POST', '/api/auth/reset', { email, code, password }),
  saveProfile: (profile: UserProfile) => call<Bootstrap>('PUT', '/api/profile', profile),
  saveState: (state: UserState) => call('PUT', '/api/state', { state }),
  addTime: (day: string, seconds: number, keepalive = false) => call('POST', '/api/time', { day, seconds }, keepalive),
  extractResume: (fileName: string, data: string) => call<{ text: string }>('POST', '/api/resume/extract', { fileName, data }),
};

export type { ApplicationRecord, ResumeReport, CourseProgress, RoadmapProgress };
