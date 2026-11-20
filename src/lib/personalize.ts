import {
  CSDomain, Course, Certification, Internship, KnowledgeLevel, RoadmapProgress,
  RoadmapStage, RoadmapTopic, StageId, UserProfile,
} from '../types';
import { DOMAIN_META } from '../data/domainMeta';
import { isAllowedSource } from '../data/catalog';

export const STAGE_ORDER: StageId[] = ['beginner', 'intermediate', 'advanced'];
export const STAGE_LABEL: Record<StageId, string> = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };

// Internships become "ready" recommendations once this much of the roadmap is complete.
export const INTERNSHIP_READY_PERCENT = 70;
// Total number of courses + certifications shown per domain (kept between 3 and 5).
export const MIN_RESOURCES = 3;
export const MAX_RESOURCES = 5;

// ---------- skill matching ----------
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#]/g, '');

// "Verilog / VHDL" -> ["verilogvhdl", "verilog", "vhdl"]; "Git & GitHub" -> ["gitgithub","git","github"];
// "Large Language Models (LLMs)" -> ["largelanguagemodelsllms", "largelanguagemodels", "llms"]
export const skillVariants = (label: string): string[] => {
  const out = new Set<string>();
  const full = norm(label);
  if (full) out.add(full);
  const noParen = label.replace(/\([^)]*\)/g, ' ');
  const paren = (label.match(/\(([^)]*)\)/) || [])[1];
  [noParen, paren || ''].forEach((chunk) => {
    const n = norm(chunk);
    if (n) out.add(n);
    chunk.split(/[\/&,]/).forEach((part) => {
      const p = norm(part);
      if (p) out.add(p);
    });
  });
  // a few aliases
  if (full.includes('nodejs')) out.add('node');
  if (full.includes('reactjs')) out.add('react');
  if (full.includes('largelanguagemodels')) { out.add('llm'); out.add('llms'); }
  if (full.includes('machinelearning')) out.add('ml');
  if (full.includes('internetofthings')) out.add('iot');
  return [...out].filter((v) => v.length >= 1);
};

const variantsMatch = (a: string, b: string): boolean => {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  // "java" must not match "javascript"
  if ((a === 'java' && b.startsWith('javascript')) || (b === 'java' && a.startsWith('javascript'))) return false;
  return a.includes(b) || b.includes(a);
};

export const userSkillVariants = (skills: string[]): string[] => {
  const all = new Set<string>();
  skills.forEach((s) => skillVariants(s).forEach((v) => all.add(v)));
  return [...all];
};

export const hasSkill = (userVars: string[], label: string): boolean => {
  const tv = skillVariants(label);
  return tv.some((t) => userVars.some((u) => variantsMatch(u, t)));
};

const wordsOf = (s: string) => s.toLowerCase().split(/[^a-z0-9+#]+/).filter(Boolean);

export const topicIsKnownFromSkills = (topic: RoadmapTopic, userVars: string[]): boolean => {
  if (userVars.length === 0) return false;
  if (topic.keyTools.some((t) => hasSkill(userVars, t))) return true;
  const words = wordsOf(topic.name);
  return words.some((w) => w.length >= 2 && userVars.includes(w) && w !== 'for' && w !== 'and');
};

// ---------- domain matching ----------
export const domainMatchScore = (profile: UserProfile | null, domain: CSDomain): number => {
  const meta = DOMAIN_META[domain.id];
  if (!profile || !meta) return 0;
  const userVars = userSkillVariants(profile.skills);
  const skillHits = meta.skills.filter((s) => hasSkill(userVars, s)).length;
  const role = ` ${profile.role.toLowerCase()} `;
  const roleHits = meta.roleWords.filter((w) => role.includes(w)).length;
  const spec = `${profile.course} ${profile.specialisation}`.toLowerCase();
  const branchHit = meta.branches.some((b) => b !== 'any' && spec.includes(b)) ? 1 : 0;
  return skillHits * 3 + Math.min(roleHits, 2) * 8 + branchHit * 2;
};

export const domainMatchPercent = (profile: UserProfile | null, domain: CSDomain): number => {
  const raw = domainMatchScore(profile, domain);
  if (raw <= 0) return 0;
  return Math.min(98, 20 + raw * 5);
};

export const rankDomains = (profile: UserProfile | null, domains: CSDomain[]): CSDomain[] =>
  [...domains].sort((a, b) => domainMatchScore(profile, b) - domainMatchScore(profile, a));

// ---------- roadmap ----------
export const LEVEL_TO_START_INDEX: Record<KnowledgeLevel, number> = { none: 0, some: 1, good: 2 };

export const knownTopicCoverage = (domain: CSDomain, profile: UserProfile | null): number => {
  const stages = domain.stages || [];
  const topics = stages.flatMap((s) => s.topics);
  if (!topics.length || !profile) return 0;
  const vars = userSkillVariants(profile.skills);
  return topics.filter((t) => topicIsKnownFromSkills(t, vars)).length / topics.length;
};

export const suggestLevel = (domain: CSDomain, profile: UserProfile | null): KnowledgeLevel => {
  const c = knownTopicCoverage(domain, profile);
  if (c >= 0.5) return 'good';
  if (c >= 0.2) return 'some';
  return 'none';
};

export type TopicStatus = 'done' | 'known' | 'skipped' | 'todo';

export interface PersonalTopic extends RoadmapTopic { status: TopicStatus; }
export interface PersonalStage extends Omit<RoadmapStage, 'topics'> {
  topics: PersonalTopic[];
  state: 'skipped' | 'current' | 'upcoming';
}

export interface PersonalRoadmap {
  stages: PersonalStage[];
  totalTopics: number;
  completeTopics: number;
  percent: number;
  startIndex: number;
}

export const buildPersonalRoadmap = (domain: CSDomain, profile: UserProfile | null, progress: RoadmapProgress): PersonalRoadmap => {
  const vars = userSkillVariants(profile?.skills || []);
  const startIndex = LEVEL_TO_START_INDEX[progress.level];
  let firstOpenSeen = false;
  const stages: PersonalStage[] = (domain.stages || []).map((stage, idx) => {
    const skippedStage = idx < startIndex;
    const topics: PersonalTopic[] = stage.topics.map((t) => {
      let status: TopicStatus = 'todo';
      if (progress.done[t.id]) status = 'done';
      else if (topicIsKnownFromSkills(t, vars)) status = 'known';
      else if (skippedStage) status = 'skipped';
      return { ...t, status };
    });
    let state: PersonalStage['state'] = 'upcoming';
    if (skippedStage) state = 'skipped';
    else if (!firstOpenSeen) { state = 'current'; firstOpenSeen = true; }
    return { ...stage, topics, state };
  });
  const all = stages.flatMap((s) => s.topics);
  const completeTopics = all.filter((t) => t.status !== 'todo').length;
  return {
    stages,
    totalTopics: all.length,
    completeTopics,
    percent: all.length ? Math.round((completeTopics / all.length) * 100) : 0,
    startIndex,
  };
};

// ---------- courses & certifications (3 to 5 per domain, personalised) ----------
export interface PickedResource {
  kind: 'course' | 'cert';
  id: string;
  stage: StageId;
  title: string;
  provider: string;
  isFree: boolean;
  url: string;
  course?: Course;
  cert?: Certification;
  reason: string;
}

const courseStages = (level: Course['skillLevel']): StageId[] => {
  switch (level) {
    case 'Beginner': case 'All Levels': return ['beginner'];
    case 'Beginner to Intermediate': return ['beginner', 'intermediate'];
    case 'Beginner to Advanced': return ['beginner', 'intermediate', 'advanced'];
    case 'Intermediate': return ['intermediate'];
    case 'Intermediate to Advanced': return ['intermediate', 'advanced'];
    case 'Advanced': return ['advanced'];
    default: return ['beginner'];
  }
};

const certStage = (d: Certification['difficulty']): StageId => (d === 'Beginner' ? 'beginner' : d === 'Intermediate' ? 'intermediate' : 'advanced');

const certIsFree = (c: Certification) => !!c.isFree || /^free/i.test(c.avgExamFee.trim());

const providerKey = (s: string) => s.toLowerCase().replace(/\(.*$/, '').replace(/[^a-z]/g, '').slice(0, 12);

export const pickResources = (
  domain: CSDomain,
  profile: UserProfile | null,
  level: KnowledgeLevel,
  done: Record<string, boolean> = {}
): PickedResource[] => {
  const startIndex = LEVEL_TO_START_INDEX[level];
  const vars = userSkillVariants(profile?.skills || []);
  const stages = domain.stages || [];

  // tools the user still has to learn (topics in stages they have not skipped)
  const gapTools: string[] = [];
  const coveredTopics = new Set<string>(); // topics the learner has finished or already knows
  stages.forEach((st, idx) => {
    st.topics.forEach((t) => { if (done[t.id] || topicIsKnownFromSkills(t, vars)) coveredTopics.add(t.id); });
    if (idx < startIndex) return;
    st.topics.forEach((t) => {
      if (done[t.id] || topicIsKnownFromSkills(t, vars)) return;
      t.keyTools.forEach((k) => gapTools.push(k.toLowerCase().replace(/\s*\(.*\)/, '')));
    });
  });
  const role = (profile?.role || '').toLowerCase();

  type Cand = PickedResource & { score: number; text: string; below?: boolean };
  const cands: Cand[] = [];

  domain.recommendedCourses.forEach((c) => {
    if (!isAllowedSource(c.platform)) return;
    if (c.topicId && coveredTopics.has(c.topicId)) return; // already learnt this topic
    const fits = courseStages(c.skillLevel).map((s) => STAGE_ORDER.indexOf(s));
    let idx = fits.find((i) => i >= startIndex);
    let below = false;
    if (idx === undefined) { idx = fits[fits.length - 1]; below = true; } // aimed below the learner's level: only used as a refresher
    const text = `${c.title} ${c.description || ''} ${(c.learns || []).join(' ')} ${(c.keyHighlights || []).join(' ')}`.toLowerCase();
    cands.push({
      kind: 'course', id: c.id, stage: STAGE_ORDER[idx], title: c.title, provider: c.platform, isFree: c.isFree !== false,
      url: c.url, course: c, reason: '', score: (c.rating ?? (c.generated ? (c.topicId ? 3.7 : 3.3) : 4.6)) - (below ? 3 : 0), text, below,
    });
  });
  domain.industryCertifications.forEach((c) => {
    if (!isAllowedSource(c.provider)) return;
    const idx = STAGE_ORDER.indexOf(certStage(c.difficulty));
    const below = idx < startIndex;
    const text = `${c.title} ${c.keyTopics.join(' ')} ${c.industryValue}`.toLowerCase();
    cands.push({
      kind: 'cert', id: c.id, stage: STAGE_ORDER[idx], title: c.title, provider: c.provider, isFree: certIsFree(c),
      url: c.url, cert: c, reason: '', score: 4.8 - (below ? 3 : 0), text, below,
    });
  });

  // personalised score
  cands.forEach((c) => {
    const gapHits = new Set(gapTools.filter((g) => g.length >= 2 && c.text.includes(g)));
    const hitCap = c.course?.generated ? (c.course.topicId ? 2 : 1) : 4; // filler items must not outrank hand-picked ones
    c.score += Math.min(gapHits.size, hitCap) * 1.4;
    if (gapHits.size) c.reason = `Covers skills you still need: ${[...gapHits].slice(0, 3).join(', ')}`;
    const roleWords = role.split(/[^a-z0-9+#]+/).filter((w) => w.length >= 4);
    if (roleWords.some((w) => c.text.includes(w))) c.score += 0.8;
    if (c.stage === STAGE_ORDER[startIndex]) c.score += 0.8;
    if (c.isFree) c.score += 0.3;
    if (c.below) c.reason = 'Quick refresher of the fundamentals';
    else if (!c.reason) c.reason = c.stage === STAGE_ORDER[startIndex] ? 'Best fit for your starting level' : `Builds toward the ${STAGE_LABEL[c.stage]} stage`;
  });

  const target = Math.max(MIN_RESOURCES, Math.min(MAX_RESOURCES, level === 'none' ? 5 : level === 'some' ? 4 : 3));
  const chosen: Cand[] = [];
  const usedProviders: Record<string, number> = {};
  const take = (c: Cand) => { chosen.push(c); const k = providerKey(c.provider); usedProviders[k] = (usedProviders[k] || 0) + 1; };

  // 1. best item for every stage the learner will actually work on
  for (let i = startIndex; i < STAGE_ORDER.length; i++) {
    const best = cands.filter((c) => !c.below && c.stage === STAGE_ORDER[i] && !chosen.includes(c)).sort((a, b) => b.score - a.score)[0];
    if (best) take(best);
  }
  // 2. always include one certificate when the domain has a suitable one
  if (!chosen.some((c) => c.kind === 'cert')) {
    const bestCert = cands.filter((c) => c.kind === 'cert' && !c.below && !chosen.includes(c)).sort((a, b) => b.score - a.score)[0];
    if (bestCert) take(bestCert);
  }
  // 3. fill with the highest scoring remaining items, preferring different sources
  while (chosen.length < Math.min(target, cands.length)) {
    // items below the learner's level are used only when nothing else is left to reach the minimum
    const pool = cands.filter((c) => !chosen.includes(c));
    const rest = (chosen.length >= MIN_RESOURCES ? pool.filter((c) => !c.below) : pool)
      .filter((c) => !(c.course?.topicId && chosen.some((x) => x.course?.topicId === c.course?.topicId)))
      .map((c) => ({ c, s: c.score - (usedProviders[providerKey(c.provider)] || 0) * 1.3 }))
      .sort((a, b) => b.s - a.s);
    if (!rest.length) break;
    take(rest[0].c);
  }
  return chosen
    .sort((a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage) || b.score - a.score)
    .map(({ score, text, below, ...r }) => r);
};

// ---------- internships ----------
export interface RankedInternship { internship: Internship; matchPercent: number; matched: string[]; }

export const rankInternships = (internships: Internship[], profile: UserProfile | null, extraSkills: string[] = []): RankedInternship[] => {
  const vars = userSkillVariants([...(profile?.skills || []), ...extraSkills]);
  return internships
    .map((internship) => {
      const matched = internship.requiredSkills.filter((s) => hasSkill(vars, s));
      const ratio = internship.requiredSkills.length ? matched.length / internship.requiredSkills.length : 0;
      return { internship, matched, matchPercent: Math.round(25 + 70 * ratio) };
    })
    .sort((a, b) => b.matchPercent - a.matchPercent);
};

// Live-search deep links on official portals (these show the portals' own, currently active listings).
export const portalSearchLinks = (domain: CSDomain) => {
  const kws = domain.internshipKeywords && domain.internshipKeywords.length ? domain.internshipKeywords : [domain.title];
  const kw = kws[0];
  const q = encodeURIComponent(`${kw} intern`);
  const slug = kw.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return [
    { name: 'Internshala', url: `https://internshala.com/internships/keywords-${slug}`, note: 'Student internships across India' },
    { name: 'LinkedIn Jobs', url: `https://www.linkedin.com/jobs/search/?keywords=${q}&location=India&f_JT=I`, note: 'Internships posted by employers' },
    { name: 'Indeed India', url: `https://in.indeed.com/jobs?q=${q}`, note: 'Aggregated employer listings' },
    { name: 'Unstop', url: `https://unstop.com/internships?searchTerm=${encodeURIComponent(kw)}`, note: 'Internships & hiring challenges' },
    { name: 'Naukri', url: `https://www.naukri.com/${slug}-intern-jobs`, note: 'India\u2019s largest job portal' },
  ];
};
