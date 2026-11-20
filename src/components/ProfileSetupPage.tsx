import React, { useMemo, useState } from 'react';
import { UserProfile } from '../types';
import { COURSES, SPECIALISATIONS, YEAR_SEM, SKILLS, ROLE_SUGGESTIONS } from '../data/profileOptions';
import {
  User as UserIcon,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Wrench,
  Target,
  ChevronDown,
  Search,
  X,
  Check,
  AlertCircle,
  ArrowRight,
  Loader2,
  Compass
} from 'lucide-react';

interface ProfileSetupPageProps {
  initial: UserProfile | null;
  mode: 'setup' | 'edit';
  onSave: (profile: UserProfile) => Promise<void>;
  onCancel?: () => void;
}

const selectClass =
  'w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all appearance-none';
const inputClass =
  'w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all';

export const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({ initial, mode, onSave, onCancel }) => {
  const [fullName, setFullName] = useState(initial?.fullName || '');
  const [course, setCourse] = useState(initial?.course || '');
  const [specialisation, setSpecialisation] = useState(initial?.specialisation || '');
  const [yearSem, setYearSem] = useState(initial?.yearSem || '');
  const [skills, setSkills] = useState<string[]>(initial?.skills || []);
  const [role, setRole] = useState(initial?.role || '');

  const [skillsOpen, setSkillsOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const specs = course ? SPECIALISATIONS[course] || [] : [];
  const yearSems = course ? YEAR_SEM[course] || [] : [];

  const filteredSkills = useMemo(() => {
    const q = skillQuery.trim().toLowerCase();
    return SKILLS.filter((s) => !q || s.toLowerCase().includes(q));
  }, [skillQuery]);

  // group A-Z by first letter
  const grouped = useMemo(() => {
    const map: Record<string, string[]> = {};
    filteredSkills.forEach((s) => {
      const k = /[A-Za-z]/.test(s[0]) ? s[0].toUpperCase() : '#';
      (map[k] = map[k] || []).push(s);
    });
    return Object.keys(map).sort().map((k) => ({ letter: k, items: map[k] }));
  }, [filteredSkills]);

  const toggleSkill = (s: string) => {
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) return setError('Please enter your full name.');
    if (!course) return setError('Please select your course.');
    if (!specialisation) return setError('Please select your specialisation.');
    if (!yearSem) return setError('Please select your current year / semester.');
    if (skills.length === 0) return setError('Please select at least one skill you have learnt.');
    if (role.trim().length < 2) return setError('Please enter the role you are preparing for.');
    setError('');
    setBusy(true);
    try {
      await onSave({ fullName: fullName.trim(), course, specialisation, yearSem, skills, role: role.trim() });
    } catch (err: any) {
      setError(err?.message || 'Could not save your profile. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">

        <div className="p-8 sm:p-10 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800/80">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-4">
            <Compass className="w-4 h-4 text-cyan-400" />
            {mode === 'setup' ? 'One-time profile setup' : 'Edit your profile'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {mode === 'setup' ? 'Tell us a little about you' : 'Your SkillRoute Profile'}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed mt-2 max-w-xl">
            {mode === 'setup'
              ? 'We use these details to personalise your domains, roadmap, courses, certifications and internships. You only need to fill this once. It is saved to your account.'
              : 'Update your details any time. Your roadmap, course recommendations and resume analysis will adapt to the changes.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-8 sm:p-10 space-y-5">

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Full name: direct entry */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name <span className="text-rose-400">*</span></label>
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Type your full name" maxLength={80} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Course */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Course <span className="text-rose-400">*</span></label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <ChevronDown className="w-4 h-4 absolute right-3.5 top-3 text-slate-500 pointer-events-none" />
                <select
                  value={course}
                  onChange={(e) => { setCourse(e.target.value); setSpecialisation(''); setYearSem(''); }}
                  className={selectClass}
                >
                  <option value="">Select your course</option>
                  {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Specialisation */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Specialisation <span className="text-rose-400">*</span></label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <ChevronDown className="w-4 h-4 absolute right-3.5 top-3 text-slate-500 pointer-events-none" />
                <select value={specialisation} onChange={(e) => setSpecialisation(e.target.value)} disabled={!course} className={selectClass + ' disabled:opacity-50'}>
                  <option value="">{course ? 'Select your specialisation' : 'Select a course first'}</option>
                  {specs.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Year / Semester */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Current Year / Semester <span className="text-rose-400">*</span></label>
            <div className="relative">
              <CalendarDays className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <ChevronDown className="w-4 h-4 absolute right-3.5 top-3 text-slate-500 pointer-events-none" />
              <select value={yearSem} onChange={(e) => setYearSem(e.target.value)} disabled={!course} className={selectClass + ' disabled:opacity-50'}>
                <option value="">{course ? 'Select your current year / semester' : 'Select a course first'}</option>
                {yearSems.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Skills learnt: A-Z dropdown with checkboxes */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Skills Learnt <span className="text-rose-400">*</span> <span className="text-slate-500 font-normal">(select all that apply, listed A to Z)</span></label>
            <button
              type="button"
              onClick={() => setSkillsOpen((o) => !o)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left text-slate-200 focus:outline-none focus:border-cyan-500 flex items-center justify-between relative"
            >
              <Wrench className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <span className={skills.length ? 'text-slate-200' : 'text-slate-500'}>
                {skills.length ? `${skills.length} skill${skills.length > 1 ? 's' : ''} selected` : 'Select your skills'}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${skillsOpen ? 'rotate-180' : ''}`} />
            </button>

            {skillsOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setSkillsOpen(false)} />
                <div className="absolute left-0 right-0 mt-2 z-40 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-2.5 border-b border-slate-800 relative">
                    <Search className="w-4 h-4 absolute left-5 top-5 text-slate-500" />
                    <input
                      autoFocus
                      type="text"
                      value={skillQuery}
                      onChange={(e) => setSkillQuery(e.target.value)}
                      placeholder="Search skills..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {grouped.length === 0 && <div className="px-4 py-6 text-center text-xs text-slate-500">No skill matches your search.</div>}
                    {grouped.map((g) => (
                      <div key={g.letter}>
                        <div className="px-4 py-1 text-[10px] font-bold tracking-wider text-cyan-400 bg-slate-950/60 sticky top-0">{g.letter}</div>
                        {g.items.map((s) => {
                          const on = skills.includes(s);
                          return (
                            <button
                              type="button"
                              key={s}
                              onClick={() => toggleSkill(s)}
                              className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${on ? 'text-cyan-300 bg-cyan-950/30 font-semibold' : 'text-slate-300'}`}
                            >
                              <span>{s}</span>
                              {on && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{skills.length} selected</span>
                    <button type="button" onClick={() => setSkillsOpen(false)} className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors">Done</button>
                  </div>
                </div>
              </>
            )}

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[...skills].sort((a, b) => a.localeCompare(b)).map((s) => (
                  <span key={s} className="text-[10px] pl-2.5 pr-1.5 py-1 rounded-md bg-slate-950 text-cyan-300 border border-slate-800 font-mono flex items-center gap-1">
                    {s}
                    <button type="button" onClick={() => toggleSkill(s)} className="text-slate-500 hover:text-rose-400" title="Remove">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Role preparing for: direct entry with suggestions */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Role You Are Preparing For <span className="text-rose-400">*</span></label>
            <div className="relative">
              <Target className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                list="role-suggestions"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Type your role, e.g. Data Analyst"
                maxLength={80}
                className={inputClass}
              />
              <datalist id="role-suggestions">
                {ROLE_SUGGESTIONS.map((r) => <option key={r} value={r} />)}
              </datalist>
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={busy}
              className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>{mode === 'setup' ? 'Save & Go to My Dashboard' : 'Save Changes'}</span>
              {!busy && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
            {mode === 'edit' && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
