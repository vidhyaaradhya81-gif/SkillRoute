import { CSDomain, RoadmapStage, RoadmapPhase } from '../types';
import { CS_DOMAINS as BASE_DOMAINS } from './domainsData';
import { NEW_DOMAINS } from './newDomains';
import { DOMAIN_META } from './domainMeta';
import { withCatalog } from './catalog';

// The original 8 domains describe their roadmap in 4 phases. The product now uses 3 stages
// (Beginner / Intermediate / Advanced), so we fold the 4 phases into 3 stages:
//   Phase 1 -> Beginner, Phases 2 + 3 -> Intermediate, Phase 4 -> Advanced.
const phasesToStages = (phases: RoadmapPhase[]): RoadmapStage[] => {
  const [p1, p2, p3, p4] = phases;
  const cap = (p?: RoadmapPhase) => (p ? [{ name: p.capstoneProject.name, description: p.capstoneProject.description }] : []);
  const clean = (t: string) => t.replace(/^Phase \d+:\s*/, '');
  return [
    {
      id: 'beginner',
      title: 'Stage 1: Beginner',
      subtitle: p1 ? p1.subtitle : 'Foundations',
      duration: p1 ? p1.duration : '4 weeks',
      topics: p1 ? p1.topics : [],
      capstones: cap(p1),
    },
    {
      id: 'intermediate',
      title: 'Stage 2: Intermediate',
      subtitle: [p2, p3].filter(Boolean).map((p) => clean(p!.title)).join(' + '),
      duration: [p2, p3].filter(Boolean).length === 2 ? `${p2!.duration.replace(/ - .*/, '')} - ${p3!.duration.replace(/.* - /, '')}` : (p2 ? p2.duration : '8 weeks'),
      topics: [...(p2 ? p2.topics : []), ...(p3 ? p3.topics : [])],
      capstones: [...cap(p2), ...cap(p3)],
    },
    {
      id: 'advanced',
      title: 'Stage 3: Advanced',
      subtitle: p4 ? p4.subtitle : 'Advanced practice',
      duration: p4 ? p4.duration : '4 weeks',
      topics: p4 ? p4.topics : [],
      capstones: cap(p4),
    },
  ];
};

const base: CSDomain[] = BASE_DOMAINS.map((d) => {
  const meta = DOMAIN_META[d.id];
  return {
    ...d,
    stages: d.stages && d.stages.length ? d.stages : phasesToStages(d.learningPath),
    openSources: d.openSources || meta?.openSources,
    internshipKeywords: d.internshipKeywords || meta?.internshipKeywords || [d.title.toLowerCase()],
  };
});

const added: CSDomain[] = NEW_DOMAINS.map((d) => ({
  ...d,
  openSources: d.openSources || DOMAIN_META[d.id]?.openSources,
  internshipKeywords: d.internshipKeywords || DOMAIN_META[d.id]?.internshipKeywords,
}));

// Courses and certifications come only from Coursera, Google, IBM, Infosys Springboard, Udemy and YouTube.
export const CS_DOMAINS: CSDomain[] = [...base, ...added].map(withCatalog);

export const getDomainById = (id: string) => CS_DOMAINS.find((d) => d.id === id);
