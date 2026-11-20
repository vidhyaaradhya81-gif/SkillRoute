import React, { useMemo, useState } from 'react';
import { CSDomain, Internship, CourseProgress, KnowledgeLevel, RoadmapProgress, UserProfile } from '../types';
import {
  PickedResource, STAGE_LABEL, INTERNSHIP_READY_PERCENT, buildPersonalRoadmap, pickResources, suggestLevel,
  rankInternships, portalSearchLinks, userSkillVariants, hasSkill,
} from '../lib/personalize';
import {
  BookOpen,
  MapPin,
  Award,
  Briefcase,
  Star,
  ExternalLink,
  CheckCircle2,
  Circle,
  Layers,
  DollarSign,
  Clock,
  ArrowLeft,
  Sparkles,
  BookmarkCheck,
  Check,
  Globe,
  FileText,
  X,
  Lock,
  Target,
  TrendingUp
} from 'lucide-react';

interface DomainDetailPageProps {
  domain: CSDomain;
  profile: UserProfile;
  progress: RoadmapProgress | undefined;
  courses: Record<string, CourseProgress>;
  onBackToOverview: () => void;
  onSetLevel: (level: KnowledgeLevel) => void;
  onToggleTopic: (topicId: string) => void;
  onStartResource: (resource: PickedResource, domainId: string) => void;
  onUpdateCourse: (id: string, patch: Partial<CourseProgress>) => void;
  onApplyInternship: (internship: Internship) => void;
  onTrackInternship?: (internship: Internship, status?: 'Applied on Official Portal' | 'Saved to Apply Later') => void;
  onUntrackInternship?: (internshipId: string) => void;
  appliedInternshipIds: string[];
}

const LEVEL_OPTIONS: { id: KnowledgeLevel; title: string; text: string }[] = [
  { id: 'none', title: 'Complete beginner', text: 'I am new to this domain. Start from the very basics.' },
  { id: 'some', title: 'I know the basics', text: 'I have learnt some fundamentals. Skip the beginner stage.' },
  { id: 'good', title: 'Comfortable & hands-on', text: 'I have built projects. Take me to the advanced stage.' },
];

const STAGE_STYLE: Record<string, string> = {
  beginner: 'from-emerald-500 to-teal-600',
  intermediate: 'from-cyan-500 to-blue-600',
  advanced: 'from-indigo-500 to-purple-600',
};

export const DomainDetailPage: React.FC<DomainDetailPageProps> = ({
  domain, profile, progress, courses,
  onBackToOverview, onSetLevel, onToggleTopic, onStartResource, onUpdateCourse,
  onApplyInternship, onTrackInternship, onUntrackInternship, appliedInternshipIds,
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'internships'>('roadmap');
  const [internshipFilter, setInternshipFilter] = useState<'All' | 'Karnataka' | 'Virtual / Remote'>('All');
  const [portalNotice, setPortalNotice] = useState<{ company: string; portal: string } | null>(null);
  const [previewInternships, setPreviewInternships] = useState(false);

  const suggested = useMemo(() => suggestLevel(domain, profile), [domain, profile]);
  const level: KnowledgeLevel = progress?.level ?? suggested;
  const levelChosen = !!progress?.level;
  const done = progress?.done || {};

  const roadmap = useMemo(() => buildPersonalRoadmap(domain, profile, { level, done }), [domain, profile, level, done]);
  const resources = useMemo(() => pickResources(domain, profile, level, done), [domain, profile, level, done]);

  const knownCount = roadmap.stages.flatMap((s) => s.topics).filter((t) => t.status === 'known').length;
  const ready = roadmap.percent >= INTERNSHIP_READY_PERCENT;
  const showInternships = ready || previewInternships;

  // skills gained from topics the learner has finished or already knew
  const gainedSkills = useMemo(
    () => roadmap.stages.flatMap((s) => s.topics).filter((t) => t.status === 'done' || t.status === 'known').flatMap((t) => t.keyTools),
    [roadmap]
  );
  const ranked = useMemo(() => rankInternships(domain.internships, profile, gainedSkills), [domain, profile, gainedSkills]);
  const portalLinks = useMemo(() => portalSearchLinks(domain), [domain]);

  const filteredInternships = ranked.filter(({ internship: intern }) => {
    if (internshipFilter === 'All') return true;
    if (internshipFilter === 'Karnataka') {
      const loc = intern.location.toLowerCase();
      return loc.includes('karnataka') || loc.includes('bengaluru') || loc.includes('mysuru') || loc.includes('hubballi') || loc.includes('mangaluru') || intern.locationType === 'On-site' || intern.locationType === 'Hybrid';
    }
    return intern.locationType === 'Virtual / Remote';
  });

  const resourceState = (r: PickedResource) => courses[r.id];

  return (
    <div className="space-y-8 pb-16">

      {/* Top Navigation & Domain Dynamic Header */}
      <div className="space-y-4">
        <button
          onClick={onBackToOverview}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to All Domains</span>
        </button>

        {/* Dynamic Domain Hero Banner */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-slate-900 via-blue-950/60 to-indigo-950 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {domain.categoryTag}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">
                  Demand: {domain.hiringDemand}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                  Avg Salary: {domain.avgSalary}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {domain.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {domain.fullDescription}
              </p>

              {/* Tech Stack Pills */}
              <div className="pt-2 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-slate-400 font-medium mr-1">Primary Stack:</span>
                {domain.topTools.map((tool) => (
                  <span key={tool} className="text-xs px-2.5 py-1 rounded-lg bg-slate-950/80 text-cyan-300 border border-slate-800 font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Overall Progress Widget */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center min-w-[200px] shadow-xl">
              <div className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Roadmap Readiness</div>
              <div className="text-3xl font-extrabold text-cyan-400 mb-2">{roadmap.percent}%</div>

              <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${roadmap.percent}%` }}
                />
              </div>

              <div className="text-[10px] text-slate-400">
                {roadmap.completeTopics} of {roadmap.totalTopics} skills covered
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'roadmap'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-300" />
          <span>🗺️ My Roadmap, Courses & Certifications</span>
        </button>

        <button
          onClick={() => setActiveTab('internships')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'internships'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          {ready ? <Briefcase className="w-4 h-4 text-emerald-300" /> : <Lock className="w-4 h-4 text-slate-400" />}
          <span>💼 Internships {ready ? `(${domain.internships.length}+ Available)` : '(unlocks as you progress)'}</span>
        </button>
      </div>

      {/* ================= ROADMAP TAB ================= */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8">

          {/* Level selector: personalises the roadmap */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>How much do you already know about {domain.title}?</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Your roadmap and recommendations adapt to your answer.
                  {knownCount > 0 && <> We already found <strong className="text-cyan-300">{knownCount} topic{knownCount > 1 ? 's' : ''}</strong> covered by the skills in your profile.</>}
                </p>
              </div>
              {!levelChosen && (
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 w-fit shrink-0">
                  Suggested from your skills
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LEVEL_OPTIONS.map((opt) => {
                const active = level === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onSetLevel(opt.id)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      active
                        ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                        : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {active ? <CheckCircle2 className="w-4 h-4 text-cyan-400" /> : <Circle className="w-4 h-4 text-slate-600" />}
                      <span className={`text-xs font-bold ${active ? 'text-cyan-300' : 'text-white'}`}>{opt.title}</span>
                      {suggested === opt.id && !levelChosen && <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Suggested</span>}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{opt.text}</p>
                  </button>
                );
              })}
            </div>

            {domain.openSources && domain.openSources.length > 0 && (
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-slate-400 font-medium">Roadmap based on open-source guides:</span>
                {domain.openSources.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-slate-800 hover:border-cyan-500/50 flex items-center gap-1 transition-colors">
                    {s.label} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Stages */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🗺️ Your Step-by-Step Roadmap</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                  Beginner &rarr; Intermediate &rarr; Advanced
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Tick topics as you master them. Topics you already know are marked automatically.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {roadmap.stages.map((stage, idx) => (
              <div
                key={stage.id}
                className={`p-6 sm:p-8 rounded-3xl bg-slate-900/90 border shadow-xl space-y-6 ${stage.state === 'skipped' ? 'border-slate-800/60 opacity-75' : 'border-slate-800'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${STAGE_STYLE[stage.id]} flex items-center justify-center font-extrabold text-white text-sm shadow-md`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{STAGE_LABEL[stage.id]}</h3>
                      <p className="text-xs text-slate-400">{stage.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {stage.state === 'current' && <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">Start here</span>}
                    {stage.state === 'skipped' && <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">Skipped: you already know this</span>}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60 w-fit">
                      <Clock className="w-3.5 h-3.5" />
                      Est. Duration: {stage.duration}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stage.topics.map((topic) => {
                    const isDone = topic.status === 'done';
                    const isKnown = topic.status === 'known';
                    const isSkipped = topic.status === 'skipped';
                    return (
                      <div
                        key={topic.id}
                        onClick={() => onToggleTopic(topic.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isDone || isKnown
                            ? 'bg-cyan-950/40 border-cyan-500/50 text-slate-200'
                            : isSkipped
                            ? 'bg-slate-950/50 border-slate-800/60 text-slate-400'
                            : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0">
                            {isDone || isKnown ? (
                              <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-950" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                            )}
                          </span>

                          <div className="space-y-1">
                            <h4 className={`text-xs font-bold ${isDone ? 'text-cyan-300 line-through' : 'text-white'}`}>
                              {topic.name}
                            </h4>
                            {isKnown && <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">You already know this</span>}
                            {isSkipped && <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Skipped for your level</span>}
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              {topic.description}
                            </p>
                            <div className="pt-2 flex flex-wrap gap-1">
                              {topic.keyTools.map((tool) => (
                                <span key={tool} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {stage.capstones.length > 0 && stage.state !== 'skipped' && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950/40 to-slate-950 border border-blue-900/40 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        {STAGE_LABEL[stage.id]} Project
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">{stage.capstones[0].name}</div>
                      <div className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {stage.capstones[0].description}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Courses & certifications chosen for this roadmap (3 to 5) */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🎓 Courses & Certifications For Your Roadmap</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">{resources.length} picked for you</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                The best-rated open and industry resources that match your level ({LEVEL_OPTIONS.find((l) => l.id === level)?.title.toLowerCase()}) and the skills you still need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((r) => {
                const st = resourceState(r);
                const c = r.course;
                const k = r.cert;
                return (
                  <div
                    key={r.id}
                    className={`p-6 rounded-3xl bg-slate-900/90 border transition-all flex flex-col justify-between space-y-4 shadow-xl ${r.kind === 'cert' ? 'border-slate-800 hover:border-indigo-500/50' : 'border-slate-800 hover:border-cyan-500/50'}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${r.kind === 'cert' ? 'bg-indigo-950 border-indigo-800 text-indigo-300' : 'bg-blue-950 border-blue-800 text-blue-300'}`}>
                          {r.provider}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                            {r.kind === 'cert' ? '📜 Certification' : '📚 Course'} &middot; {STAGE_LABEL[r.stage]}
                          </span>
                          {r.isFree ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">100% Free</span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Paid</span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white leading-snug">{r.title}</h3>

                      <div className="text-[11px] text-cyan-300 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> {r.reason}
                      </div>

                      {c && c.description && (
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">{c.description}</p>
                      )}
                      {k && (
                        <p className="text-xs text-slate-400 leading-relaxed italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">"{k.industryValue}"</p>
                      )}

                      {c && c.keyHighlights && c.keyHighlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {c.keyHighlights.map((hl) => (
                            <span key={hl} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-cyan-300 border border-slate-800/80 font-medium">✓ {hl}</span>
                          ))}
                        </div>
                      )}
                      {k && (
                        <div className="flex flex-wrap gap-1">
                          {k.keyTopics.map((t) => (
                            <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono">{t}</span>
                          ))}
                        </div>
                      )}

                      {c && (
                        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 flex-wrap">
                          {c.rating ? <span className="flex items-center gap-1 text-amber-400 font-semibold"><Star className="w-3.5 h-3.5 fill-amber-400" />{c.rating}</span> : null}
                          <span>Level: <strong className="text-slate-200">{c.skillLevel}</strong></span>
                          <span>Duration: <strong className="text-slate-200">{c.duration}</strong></span>
                        </div>
                      )}
                      {k && (
                        <div className="text-xs text-slate-300 space-y-1">
                          <div>Difficulty: <span className="font-semibold text-cyan-300">{k.difficulty}</span>{k.examCode && <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">{k.examCode}</span>}</div>
                          <div>Exam fee: <span className="font-semibold text-emerald-400">{k.avgExamFee}</span></div>
                        </div>
                      )}
                      {c && c.studentsEnrolled ? <p className="text-[11px] text-slate-400">Enrolled: <strong className="text-slate-300">{c.studentsEnrolled} learners</strong></p> : null}
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-3">
                      {st && st.status === 'in_progress' && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full" style={{ width: `${st.progress}%` }} />
                          </div>
                          <span className="text-[11px] text-cyan-300 font-semibold">{st.progress}%</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs text-slate-400">
                          {c ? (c.isFree === false ? (c.priceNote || 'Paid (certificate available)') : '100% Free Open Access') : (r.isFree ? 'Free' : `Exam fee: ${k?.avgExamFee}`)}
                        </span>
                        <div className="flex items-center gap-2">
                          {st && st.status === 'completed' ? (
                            <span className="px-3 py-2 rounded-xl bg-emerald-950/90 border border-emerald-700/60 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5" /> Completed
                            </span>
                          ) : (
                            <>
                              {st && st.status === 'in_progress' && (
                                <button
                                  onClick={() => onUpdateCourse(r.id, { status: 'completed', progress: 100, completedAt: new Date().toISOString() })}
                                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
                                >
                                  Mark completed
                                </button>
                              )}
                              <a
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => onStartResource(r, domain.id)}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20"
                              >
                                <span>{st ? 'Resume' : r.kind === 'cert' ? 'View Certificate' : 'Start Learning'}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next step */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${ready ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-slate-900/90 border-slate-800'}`}>
            <div className="text-slate-300">
              {ready ? (
                <><span className="font-bold text-emerald-300">Roadmap ready! </span>You have covered {roadmap.percent}% of this roadmap. Matching internships are now unlocked.</>
              ) : (
                <><span className="font-bold text-white">Next step: </span>cover {INTERNSHIP_READY_PERCENT}% of the roadmap to unlock internships picked for your skills. You are at {roadmap.percent}%.</>
              )}
            </div>
            <button onClick={() => setActiveTab('internships')} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-colors">
              {ready ? 'View Internships' : 'See Internships'}
            </button>
          </div>
        </div>
      )}

      {/* ================= INTERNSHIPS TAB ================= */}
      {activeTab === 'internships' && !showInternships && (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl text-center space-y-5 max-w-3xl mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
            <Lock className="w-6 h-6 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Internships unlock once your skills are ready</h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl mx-auto">
            We recommend internships after you have gained the skills in your roadmap, so that you apply with confidence. You have covered <strong className="text-cyan-300">{roadmap.percent}%</strong> of the {domain.title} roadmap. Reach {INTERNSHIP_READY_PERCENT}% to unlock.
          </p>
          <div className="max-w-md mx-auto">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden relative">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${roadmap.percent}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>0%</span><span>Unlocks at {INTERNSHIP_READY_PERCENT}%</span></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => setActiveTab('roadmap')} className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors">Continue My Roadmap</button>
            <button onClick={() => setPreviewInternships(true)} className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors">Preview internships anyway</button>
          </div>
        </div>
      )}

      {activeTab === 'internships' && showInternships && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>💼 Internships Matched To Your Skills</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {domain.internships.length} Positions Listed
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ranked by how well they fit the skills you have and have gained in {domain.title}.
              </p>
            </div>

            {/* Location Type Filter Tags */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 flex-wrap">
              {(['All', 'Karnataka', 'Virtual / Remote'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setInternshipFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    internshipFilter === f ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f === 'All' ? `All Positions (${domain.internships.length})` : f === 'Karnataka' ? '📍 Karnataka Hubs' : '🌐 Pan-India Virtual'}
                </button>
              ))}
            </div>
          </div>

          {/* Live listings from open portals */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5 text-xs">
              <div className="w-8 h-8 rounded-xl bg-blue-900/40 border border-blue-600/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="text-slate-300">
                <span className="font-bold text-white">Active openings right now: </span>
                these links open the official portals with live, currently open {domain.title} internships. Apply there directly.
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {portalLinks.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors group">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 flex items-center gap-1">{p.name} <ExternalLink className="w-3 h-3" /></div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{p.note}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Notification Toast for Opening Official Portal */}
          {portalNotice && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-blue-500/50 flex items-center justify-between gap-3 animate-fade-in shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-900/60 border border-blue-500/50 flex items-center justify-center text-cyan-300 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white">Opening External Portal: </span>
                  <span className="text-cyan-300 font-semibold">{portalNotice.company}</span>
                  <span className="text-slate-300"> ({portalNotice.portal}) in a new tab. After submitting your application there, click </span>
                  <span className="text-emerald-300 font-bold">"Mark as Applied"</span>
                  <span className="text-slate-300"> to track it in your dashboard.</span>
                </div>
              </div>

              <button onClick={() => setPortalNotice(null)} className="text-xs text-slate-400 hover:text-white px-2 py-1">
                Dismiss
              </button>
            </div>
          )}

          <div className="space-y-4">
            {filteredInternships.map(({ internship, matchPercent, matched }) => {
              const hasApplied = appliedInternshipIds.includes(internship.id);
              const loc = internship.location.toLowerCase();
              const isKarnataka = loc.includes('karnataka') || loc.includes('bengaluru') || loc.includes('mysuru');

              return (
                <div
                  key={internship.id}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                    {/* Role & Company Header */}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md shrink-0 ${internship.companyLogoBg}`}>
                        {internship.companyName.charAt(0)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-white">{internship.roleTitle}</h3>
                          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                            {internship.companyName}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {matchPercent}% match for you
                          </span>

                          {isKarnataka ? (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/80 flex items-center gap-1">
                              📍 Karnataka Hub
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/80 flex items-center gap-1">
                              🌐 Pan-India Virtual
                            </span>
                          )}

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-cyan-300 border border-blue-800/60">
                            {internship.batchSeason}
                          </span>
                          {hasApplied && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-400" />
                              Tracked in My Tracker
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            {internship.location} ({internship.locationType})
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-indigo-400" />
                            Duration: {internship.duration}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                            {internship.stipend}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            Req: {internship.jobReqId}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <button
                        onClick={() => onApplyInternship(internship)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                        title="View ATS Checklist and Requirements"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>ATS Prep</span>
                      </button>

                      <a
                        href={internship.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setPortalNotice({ company: internship.companyName, portal: internship.portalName })}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5 whitespace-nowrap group"
                        title={`Open official ${internship.companyName} portal in new tab`}
                      >
                        <span>Apply on Official Portal</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      {hasApplied ? (
                        <button
                          onClick={() => { if (onUntrackInternship) onUntrackInternship(internship.id); }}
                          className="px-3 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-600/60 text-emerald-300 hover:bg-rose-950/60 hover:border-rose-700/60 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all group"
                          title="Click to remove from application tracker"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400 group-hover:hidden" />
                          <X className="w-3.5 h-3.5 text-rose-400 hidden group-hover:inline" />
                          <span className="group-hover:hidden">✓ Tracked</span>
                          <span className="hidden group-hover:inline">Untrack</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => { if (onTrackInternship) onTrackInternship(internship, 'Applied on Official Portal'); }}
                          className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all hover:border-cyan-500/50"
                          title="Record that you submitted your application on the official portal"
                        >
                          <BookmarkCheck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Mark as Applied</span>
                        </button>
                      )}
                    </div>

                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {internship.description}
                  </p>

                  {/* Required Skills & Portal Metadata */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 font-semibold">Required Skills:</span>
                    {internship.requiredSkills.map((skill) => {
                      const have = matched.includes(skill);
                      return (
                        <span key={skill} className={`text-[10px] px-2.5 py-0.5 rounded-md border font-mono ${have ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/70' : 'bg-slate-950 text-cyan-300 border-slate-800'}`}>
                          {have ? '✓ ' : ''}{skill}
                        </span>
                      );
                    })}
                    <div className="ml-auto flex items-center gap-3 text-[10px] text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1 text-cyan-300">
                        <Globe className="w-3 h-3 text-cyan-400" />
                        Portal: {internship.portalName}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span>Deadline: {internship.deadline}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
