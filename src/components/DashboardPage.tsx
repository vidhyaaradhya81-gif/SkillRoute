import React, { useMemo, useState } from 'react';
import { CSDomain, CourseProgress, ApplicationRecord, ResumeReport, UserProfile, User, RoadmapProgress } from '../types';
import { domainMatchPercent, rankDomains, buildPersonalRoadmap, pickResources, suggestLevel, PickedResource, STAGE_LABEL, INTERNSHIP_READY_PERCENT } from '../lib/personalize';
import { formatDuration, lastNDays } from '../lib/time';
import { scoreLabel } from '../lib/resumeAnalyzer';
import {
  Clock,
  PlayCircle,
  CheckCircle2,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Award,
  BookOpen,
  FileText,
  Target,
  Sparkles,
  TrendingUp,
  Layers
} from 'lucide-react';

interface DashboardPageProps {
  user: User;
  profile: UserProfile;
  domains: CSDomain[];
  courses: Record<string, CourseProgress>;
  roadmaps: Record<string, RoadmapProgress>;
  applications: ApplicationRecord[];
  resume: ResumeReport | null;
  time: Record<string, number>;
  liveSeconds: number;
  onOpenDomain: (domain: CSDomain) => void;
  onExploreDomains: () => void;
  onOpenResume: () => void;
  onOpenTracker: () => void;
  onOpenProfile: () => void;
  onUpdateCourse: (id: string, patch: Partial<CourseProgress>) => void;
  onStartResource: (resource: PickedResource, domainId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user, profile, domains, courses, roadmaps, applications, resume, time, liveSeconds,
  onOpenDomain, onExploreDomains, onOpenResume, onOpenTracker, onOpenProfile, onUpdateCourse, onStartResource,
}) => {
  const [range, setRange] = useState<'today' | 'week'>('today');
  const [picked, setPicked] = useState<string | null>(null);

  const week = useMemo(() => lastNDays(time, 7, liveSeconds), [time, liveSeconds]);
  const today = week[week.length - 1];
  const weekTotal = week.reduce((a, d) => a + d.seconds, 0);
  const weekAvg = weekTotal / 7;
  const maxSec = Math.max(60, ...week.map((d) => d.seconds));
  const pickedDay = week.find((d) => d.key === picked) || today;

  const all: CourseProgress[] = Object.values(courses) as CourseProgress[];
  const inProgress = all.filter((c) => c.status === 'in_progress').sort((a, b) => b.lastOpenedAt.localeCompare(a.lastOpenedAt));
  const completed = all.filter((c) => c.status === 'completed').sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''));

  const ranked = useMemo(() => rankDomains(profile, domains).slice(0, 3), [profile, domains]);

  // The learner's current focus: the domain they worked on last, otherwise the best match for their profile.
  const focus = useMemo(() => {
    const touched = Object.entries(roadmaps).filter(([, r]) => r.updatedAt).sort((a, b) => (b[1].updatedAt || '').localeCompare(a[1].updatedAt || ''))[0];
    const domain = (touched && domains.find((d) => d.id === touched[0])) || ranked[0];
    const prog = roadmaps[domain.id];
    const level = prog?.level ?? suggestLevel(domain, profile);
    const done = prog?.done || {};
    const rm = buildPersonalRoadmap(domain, profile, { level, done });
    const nextTopics = rm.stages.flatMap((st) => st.topics.filter((t) => t.status === 'todo').map((t) => ({ ...t, stage: st.id }))).slice(0, 3);
    const picks = pickResources(domain, profile, level, done).slice(0, 3);
    return { domain, rm, nextTopics, picks };
  }, [roadmaps, domains, ranked, profile]);
  const firstName = (profile.fullName || user.name).split(' ')[0];
  const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '');

  const statCard = (value: string, label: string, color: string) => (
    <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">

      {/* Welcome header */}
      <div className="rounded-3xl p-8 bg-gradient-to-r from-slate-900 via-blue-950/60 to-indigo-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[250px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/20 to-purple-600/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              My Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">{firstName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Preparing for <strong className="text-white">{profile.role}</strong> &middot; {profile.specialisation} &middot; {profile.yearSem}
            </p>
          </div>
          <button
            onClick={onOpenProfile}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors w-fit"
          >
            Edit Profile
          </button>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCard(String(completed.length), 'Courses & Certs Completed', 'text-emerald-400')}
          {statCard(String(inProgress.length), 'In Progress (Resume)', 'text-cyan-400')}
          {statCard(String(applications.length), 'Internships Applied', 'text-blue-400')}
          {statCard(formatDuration(today.seconds), 'Time Spent Today', 'text-indigo-400')}
        </div>
      </div>

      {/* Centralised personal plan: next topics + best resources for the learner's current focus */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Target className="w-5 h-5 text-cyan-400" /> Your Personal Learning Plan</h2>
            <p className="text-xs text-slate-400 mt-1">
              Focus domain: <strong className="text-cyan-300">{focus.domain.title}</strong> &middot; {focus.rm.percent}% of the roadmap covered
              {focus.rm.percent >= INTERNSHIP_READY_PERCENT ? ' · internships unlocked' : ` · internships unlock at ${INTERNSHIP_READY_PERCENT}%`}
            </p>
          </div>
          <button onClick={() => onOpenDomain(focus.domain)} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors w-fit">
            Open My Roadmap <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${focus.rm.percent}%` }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Learn next</div>
            {focus.nextTopics.length === 0 ? (
              <p className="text-xs text-emerald-300 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4">You have covered every topic in this roadmap. Time to apply for internships!</p>
            ) : focus.nextTopics.map((t) => (
              <div key={t.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="text-[10px] font-bold text-cyan-400 mb-0.5">{STAGE_LABEL[t.stage]}</div>
                <div className="text-xs font-semibold text-white">{t.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{t.description}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Best courses & certifications for you</div>
            {focus.picks.map((r) => (
              <div key={r.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] mb-1">
                    <span className="px-2 py-0.5 rounded font-bold border bg-blue-950 text-blue-300 border-blue-800">{r.provider}</span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${r.isFree ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'}`}>{r.isFree ? 'Free' : 'Paid'}</span>
                  </div>
                  <div className="text-xs font-semibold text-white leading-snug">{r.title}</div>
                  <div className="text-[11px] text-cyan-300 mt-0.5">{r.reason}</div>
                </div>
                <a href={r.url} target="_blank" rel="noopener noreferrer" onClick={() => onStartResource(r, focus.domain.id)} className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all shrink-0">
                  Start <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Time spent (Instagram style) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> Time Spent
            </h2>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['today', 'week'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => { setRange(r); setPicked(null); }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${range === r ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}
                >
                  {r === 'today' ? 'Today' : 'Last 7 days'}
                </button>
              ))}
            </div>
          </div>

          {range === 'today' ? (
            <div className="py-4 text-center">
              <div className="text-5xl font-extrabold text-cyan-400 tracking-tight">{formatDuration(today.seconds)}</div>
              <div className="text-xs text-slate-400 mt-2">on SkillRoute today</div>
              <div className="mt-5 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (today.seconds / 3600) * 100)}%` }} />
              </div>
              <div className="text-[10px] text-slate-500 mt-1.5">Progress towards a 1 hour daily learning habit</div>
            </div>
          ) : (
            <div>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-cyan-400 tracking-tight">{formatDuration(pickedDay.isToday && !picked ? weekAvg : pickedDay.seconds)}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {picked ? pickedDay.label : 'daily average this week'}
                </div>
                {!picked && <div className="text-[11px] text-slate-500 mt-0.5">Total: {formatDuration(weekTotal)}</div>}
              </div>
              <div className="mt-5 flex items-end justify-between gap-2 h-36">
                {week.map((d) => {
                  const h = Math.max(4, Math.round((d.seconds / maxSec) * 100));
                  const active = picked === d.key;
                  return (
                    <button key={d.key} onClick={() => setPicked(active ? null : d.key)} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5 group" title={`${d.label}: ${formatDuration(d.seconds)}`}>
                      <div
                        className={`w-full rounded-t-lg transition-all ${active ? 'bg-gradient-to-t from-cyan-500 to-blue-400' : d.isToday ? 'bg-gradient-to-t from-blue-600 to-cyan-500' : 'bg-slate-700 group-hover:bg-slate-600'}`}
                        style={{ height: `${h}%` }}
                      />
                      <span className={`text-[10px] ${d.isToday ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>{d.short}</span>
                    </button>
                  );
                })}
              </div>
              <div className="text-[10px] text-slate-500 text-center mt-2">Tap a bar to see that day</div>
            </div>
          )}
        </div>

        {/* Continue learning */}
        <div className="lg:col-span-3 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-cyan-400" /> Continue Learning
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">{inProgress.length}</span>
            </h2>
          </div>

          {inProgress.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              No course in progress yet. Open a domain roadmap and start one of the recommended courses.
              <div className="mt-3">
                <button onClick={onExploreDomains} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors">Explore Domains</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {inProgress.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] mb-1">
                        <span className={`px-2 py-0.5 rounded font-bold border ${c.kind === 'cert' ? 'bg-indigo-950 text-indigo-300 border-indigo-800' : 'bg-blue-950 text-blue-300 border-blue-800'}`}>
                          {c.kind === 'cert' ? 'Certification' : 'Course'}
                        </span>
                        <span className={`px-2 py-0.5 rounded font-bold border ${c.isFree ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'}`}>
                          {c.isFree ? 'Free' : 'Paid'}
                        </span>
                        <span className="text-slate-500">Last opened {fmtDate(c.lastOpenedAt)}</span>
                      </div>
                      <div className="text-xs font-bold text-white leading-snug">{c.title}</div>
                      <div className="text-[11px] text-slate-400">{c.provider}</div>
                    </div>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onUpdateCourse(c.id, { lastOpenedAt: new Date().toISOString() })}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20 shrink-0"
                    >
                      Resume <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-[11px] text-cyan-300 font-semibold w-9 text-right">{c.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="range" min={0} max={100} step={5} value={c.progress}
                      onChange={(e) => onUpdateCourse(c.id, { progress: Number(e.target.value) })}
                      className="flex-1 accent-cyan-500"
                      title="Update your progress"
                    />
                    <button
                      onClick={() => onUpdateCourse(c.id, { status: 'completed', progress: 100, completedAt: new Date().toISOString() })}
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60 font-semibold transition-colors shrink-0"
                    >
                      Mark completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Completed */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Finished
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">{completed.length}</span>
          </h2>
          {completed.length === 0 ? (
            <p className="text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4">Courses and certifications you finish will appear here.</p>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {completed.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                  {c.kind === 'cert' ? <Award className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" /> : <BookOpen className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />}
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white leading-snug">{c.title}</div>
                    <div className="text-[10px] text-slate-400">{c.provider} &middot; {c.isFree ? 'Free' : 'Paid'} &middot; Finished {fmtDate(c.completedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Internships applied */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" /> Internships Applied
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">{applications.length}</span>
            </h2>
            {applications.length > 0 && (
              <button onClick={onOpenTracker} className="text-[11px] text-cyan-400 hover:underline font-semibold">View tracker</button>
            )}
          </div>
          {applications.length === 0 ? (
            <p className="text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4">
              Internships you mark as applied will be listed here. They unlock as you progress through your roadmap.
            </p>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {applications.slice(0, 6).map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-xs font-semibold text-white leading-snug">{a.roleTitle}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{a.companyName} &middot; {a.appliedAt}</div>
                  <div className="text-[10px] text-emerald-300 mt-1">{a.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resume */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" /> Resume Score
          </h2>
          {resume ? (
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-cyan-400">{resume.score}</span>
                <span className="text-xs text-slate-400 pb-1.5">/ 100 &middot; {scoreLabel(resume.score)}</span>
              </div>
              <div className="text-[11px] text-slate-400">Checked for {resume.domainTitle} on {fmtDate(resume.analysedAt)}</div>
              <button onClick={onOpenResume} className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors">View full report</button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4">Check how recruiters and ATS software will see your resume for {profile.role}.</p>
              <button onClick={onOpenResume} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold transition-all">Analyse My Resume</button>
            </div>
          )}
        </div>
      </div>

      {/* Recommended domains */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Target className="w-5 h-5 text-cyan-400" /> Domains Picked For You</h2>
            <p className="text-xs text-slate-400 mt-1">Based on your skills, specialisation and the role you are preparing for.</p>
          </div>
          <button onClick={onExploreDomains} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-colors">
            <span>All {domains.length} Domains</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ranked.map((d) => {
            const pct = domainMatchPercent(profile, d);
            return (
              <div
                key={d.id}
                onClick={() => onOpenDomain(d)}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all hover:-translate-y-1 group shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/50 text-blue-300">{d.categoryTag}</span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {pct > 0 ? `${pct}% match` : d.hiringDemand}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">{d.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{d.shortDescription}</p>
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> Personal roadmap</span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
