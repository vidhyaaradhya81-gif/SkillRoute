import React, { useState } from 'react';
import {
  Compass,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  KeyRound,
  Loader2
} from 'lucide-react';
import { api, ApiError, Bootstrap } from '../lib/api';

interface AuthPageProps {
  onAuthenticated: (data: Bootstrap) => void;
}

type Mode = 'login' | 'signup' | 'forgot';

// Email format check (same rule as most official sites): name@domain.tld
const isEmailValid = (val: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(val.trim());

const checkPassword = (val: string) => {
  const hasLength = val.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=;:'/\\[\]~`]/.test(val);
  const isValid = hasLength && hasLetter && hasNumber;
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (isValid && val.length >= 10 && hasSpecial) strength = 'strong';
  else if (isValid && (val.length >= 9 || hasSpecial)) strength = 'medium';
  return { isValid, hasLength, hasLetter, hasNumber, hasSpecial, strength };
};

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [capsOn, setCapsOn] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  // result of the server-side email check (real domain / typo / existing account)
  const [emailInfo, setEmailInfo] = useState<{ ok: boolean; message?: string; suggestion?: string; exists: boolean } | null>(null);

  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  // forgot-password steps
  const [forgotStep, setForgotStep] = useState<'email' | 'code'>('email');
  const [code, setCode] = useState('');
  const [codeHint, setCodeHint] = useState('');

  const emailFormatOk = isEmailValid(email);
  const passStatus = checkPassword(password);
  const emailBad = emailTouched && (!emailFormatOk || (emailInfo !== null && !emailInfo.ok));
  const emailGood = emailTouched && emailFormatOk && emailInfo?.ok === true;

  const resetMessages = () => { setError(''); setErrorCode(''); setSuccess(''); };

  const switchMode = (m: Mode) => {
    setMode(m);
    resetMessages();
    setPassword('');
    setPasswordTouched(false);
    setForgotStep('email');
    setCode('');
    setCodeHint('');
    if (emailInfo) setEmailInfo({ ...emailInfo });
  };

  const verifyEmailOnServer = async (value: string) => {
    if (!isEmailValid(value)) { setEmailInfo(null); return; }
    try {
      const info = await api.checkEmail(value);
      setEmailInfo(info);
    } catch { setEmailInfo(null); }
  };

  const fail = (e: unknown) => {
    const err = e as ApiError;
    setError(err?.message || 'Something went wrong. Please try again.');
    setErrorCode(err?.code || '');
    if (err?.code === 'invalid_email' && err.data?.suggestion) setEmailInfo({ ok: false, message: err.message, suggestion: err.data.suggestion, exists: false });
    else if (err?.code === 'invalid_email') setEmailInfo({ ok: false, message: err.message, exists: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email.trim()) { setError('Email address is required.'); setErrorCode('invalid_email'); return; }
    if (!emailFormatOk) { setError('Please enter a valid email id (for example name@gmail.com).'); setErrorCode('invalid_email'); return; }

    try {
      setBusy(true);

      if (mode === 'forgot') {
        if (forgotStep === 'email') {
          const r = await api.forgot(email.trim());
          setForgotStep('code');
          setCodeHint(r.emailed
            ? 'We have emailed a 6-digit code to your email id. It is valid for 10 minutes.'
            : 'Email sending is not configured on this computer, so the 6-digit code was printed in the terminal where you ran "npm run dev". It is valid for 10 minutes.');
          return;
        }
        if (!/^\d{6}$/.test(code.trim())) { setError('Please enter the 6-digit code.'); setErrorCode('bad_code'); return; }
        if (!passStatus.isValid) { setError('New password must be at least 8 characters and contain both letters and numbers.'); setErrorCode('weak_password'); return; }
        await api.reset(email.trim(), code.trim(), password);
        setMode('login');
        setForgotStep('email');
        setCode('');
        setPassword('');
        setPasswordTouched(false);
        setSuccess('Password updated successfully. Please log in with your new password.');
        return;
      }

      if (!password) { setError('Password is required.'); setErrorCode('empty_password'); return; }

      if (mode === 'signup') {
        if (!passStatus.isValid) {
          setError('Password must be at least 8 characters and contain both letters and numbers.');
          setErrorCode('weak_password');
          return;
        }
        const data = await api.signup(email.trim(), password);
        onAuthenticated(data);
      } else {
        const data = await api.login(email.trim(), password, remember);
        onAuthenticated(data);
      }
    } catch (err) {
      fail(err);
    } finally {
      setBusy(false);
    }
  };

  const heading =
    mode === 'signup' ? 'Create Your Account' : mode === 'forgot' ? 'Update Your Password' : 'Log In to Continue';
  const subheading =
    mode === 'signup'
      ? 'New here? Sign up with a valid email id and a secure password.'
      : mode === 'forgot'
      ? forgotStep === 'email'
        ? 'Enter the email id you used while creating your account and we will send a 6-digit code.'
        : 'Enter the 6-digit code and choose a new password.'
      : 'Already have an account? Log in with the same email id you used while signing up.';

  const submitLabel =
    mode === 'signup'
      ? 'Create Account & Continue'
      : mode === 'forgot'
      ? forgotStep === 'email' ? 'Send Verification Code' : 'Update Password'
      : 'Log In & Continue to SkillRoute';

  const fieldClass = (bad: boolean, good: boolean) =>
    `w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
      bad
        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
        : good
        ? 'border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/30'
        : 'border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30'
    }`;

  const showPasswordRules = mode === 'signup' || (mode === 'forgot' && forgotStep === 'code');

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">

        {/* Left Branding Column */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
              <Compass className="w-4 h-4 text-cyan-400" />
              Smart Courses Recommender
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight mb-4">
              Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">SkillRoute</span>
            </h1>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Log in to unlock personalised learning roadmaps, the best courses and certifications for your level, and direct internship applications on official portals.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300">Roadmaps built around what you already know</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300">Free & paid courses and certifications from top sources</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-300">Active internships you can apply to on the official site</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Your progress stays saved</span>
            </div>
            <div className="px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Your profile, courses, roadmap progress and time spent are saved to your account, so you can continue anytime.</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">

          {/* Tab Selector: Log In vs Sign Up */}
          {mode !== 'forgot' && (
            <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'login'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'signup'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">{heading}</h2>
            <p className="text-xs text-slate-400 mt-1">{subheading}</p>
          </div>

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-800/70 text-emerald-200 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Code delivery hint (forgot password) */}
          {mode === 'forgot' && forgotStep === 'code' && codeHint && (
            <div className="mb-5 p-3.5 rounded-xl bg-blue-950/70 border border-blue-600/40 text-blue-200 text-xs flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{codeHint}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs animate-shake">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
              {(errorCode === 'no_account' || errorCode === 'exists' || errorCode === 'wrong_password' || errorCode === 'locked') && (
                <div className="flex flex-wrap gap-2 mt-3 pl-6">
                  {errorCode === 'no_account' && mode === 'login' && (
                    <button type="button" onClick={() => switchMode('signup')} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-colors">
                      Create a new account
                    </button>
                  )}
                  {errorCode === 'exists' && (
                    <button type="button" onClick={() => switchMode('login')} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-colors">
                      Log in instead
                    </button>
                  )}
                  {(errorCode === 'wrong_password' || errorCode === 'locked') && (
                    <button type="button" onClick={() => switchMode('forgot')} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-colors">
                      Update password
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Email Address Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                {emailGood && (
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3" /> Valid Email
                  </span>
                )}
              </div>

              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  disabled={mode === 'forgot' && forgotStep === 'code'}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailInfo(null);
                    if (!emailTouched) setEmailTouched(true);
                  }}
                  onBlur={() => { setEmailTouched(true); verifyEmailOnServer(email); }}
                  placeholder="e.g. yourname@gmail.com"
                  autoComplete="email"
                  className={fieldClass(emailBad, emailGood)}
                />
              </div>

              {emailTouched && !emailFormatOk && email.length > 0 && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Please enter a valid email id (for example name@gmail.com).
                </p>
              )}
              {emailTouched && emailFormatOk && emailInfo && !emailInfo.ok && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 flex-wrap">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {emailInfo.message}
                  {emailInfo.suggestion && (
                    <button
                      type="button"
                      onClick={() => { setEmail(emailInfo.suggestion!); setEmailInfo(null); verifyEmailOnServer(emailInfo.suggestion!); }}
                      className="text-cyan-400 hover:underline font-semibold"
                    >
                      Use {emailInfo.suggestion}
                    </button>
                  )}
                </p>
              )}
              {emailGood && mode === 'signup' && emailInfo?.exists && (
                <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1 flex-wrap">
                  <AlertCircle className="w-3 h-3" /> An account already exists for this email.
                  <button type="button" onClick={() => switchMode('login')} className="text-cyan-400 hover:underline font-semibold">Log in instead</button>
                </p>
              )}
              {emailGood && mode === 'login' && emailInfo && !emailInfo.exists && (
                <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1 flex-wrap">
                  <AlertCircle className="w-3 h-3" /> No account found for this email.
                  <button type="button" onClick={() => switchMode('signup')} className="text-cyan-400 hover:underline font-semibold">Create one</button>
                </p>
              )}
            </div>

            {/* Verification code (forgot password, step 2) */}
            {mode === 'forgot' && forgotStep === 'code' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  6-digit Code <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    autoComplete="one-time-code"
                    className={fieldClass(false, false) + ' tracking-[0.4em]'}
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            {(mode !== 'forgot' || forgotStep === 'code') && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    {mode === 'forgot' ? 'New Password' : 'Password'} <span className="text-rose-400">*</span>
                  </label>
                  {showPasswordRules && passwordTouched && passStatus.isValid && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="w-3 h-3" /> Valid Password
                    </span>
                  )}
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (!passwordTouched) setPasswordTouched(true);
                    }}
                    onBlur={() => { setPasswordTouched(true); setCapsOn(false); }}
                    onKeyUp={(e) => setCapsOn(e.getModifierState('CapsLock'))}
                    placeholder="••••••••••••"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className={fieldClass(showPasswordRules && passwordTouched && !passStatus.isValid, showPasswordRules && passwordTouched && passStatus.isValid) + ' pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {capsOn && (
                  <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Caps Lock is on.
                  </p>
                )}

                {/* Password Requirement Cues (sign up / update password only) */}
                {showPasswordRules && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className={`flex items-center gap-1 ${passStatus.hasLength ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                        <Check className="w-3 h-3" /> Min 8 chars
                      </span>
                      <span className={`flex items-center gap-1 ${passStatus.hasLetter ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                        <Check className="w-3 h-3" /> Contains letters
                      </span>
                      <span className={`flex items-center gap-1 ${passStatus.hasNumber ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                        <Check className="w-3 h-3" /> Contains numbers
                      </span>
                    </div>

                    {password && (
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800 mt-1">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passStatus.strength === 'strong'
                              ? 'w-full bg-emerald-500'
                              : passStatus.strength === 'medium'
                              ? 'w-2/3 bg-blue-500'
                              : 'w-1/3 bg-rose-500'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )}

                {showPasswordRules && passwordTouched && !passStatus.isValid && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Password must have at least 8 characters and contain both letters & numbers.
                  </p>
                )}
              </div>
            )}

            {/* Remember me (login only) */}
            {mode === 'login' && (
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-700 accent-cyan-500"
                />
                Keep me logged in on this device
              </label>
            )}

            {/* Submit CTA Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={busy}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>{submitLabel}</span>
                {!busy && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>

            {/* Switch between the modes */}
            <div className="text-center pt-2 text-xs text-slate-400">
              {mode === 'login' && (
                <>New to SkillRoute?{' '}
                  <button type="button" onClick={() => switchMode('signup')} className="text-cyan-400 hover:text-cyan-300 font-semibold">Create an account</button>
                </>
              )}
              {mode === 'signup' && (
                <>Already have an account?{' '}
                  <button type="button" onClick={() => switchMode('login')} className="text-cyan-400 hover:text-cyan-300 font-semibold">Log in</button>
                </>
              )}
              {mode === 'forgot' && (
                <button type="button" onClick={() => switchMode('login')} className="text-slate-400 hover:text-white transition-colors">
                  ← Back to Log In
                </button>
              )}
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
