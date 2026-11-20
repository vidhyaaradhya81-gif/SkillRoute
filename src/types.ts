export interface User {
  id: string;
  name: string;
  email: string;
}

// One-time profile that every user fills in right after the first login.
export interface UserProfile {
  fullName: string;
  course: string;
  specialisation: string;
  yearSem: string;
  skills: string[];
  role: string; // role the user is preparing for
}

export type KnowledgeLevel = 'none' | 'some' | 'good';
export type StageId = 'beginner' | 'intermediate' | 'advanced';

export interface RoadmapProgress {
  level: KnowledgeLevel; // how much the learner already knows about the domain
  done: Record<string, boolean>; // topic id -> finished
  updatedAt?: string;
}

export interface CourseProgress {
  id: string;
  kind: 'course' | 'cert';
  domainId: string;
  title: string;
  provider: string;
  url: string;
  isFree: boolean;
  status: 'in_progress' | 'completed';
  progress: number; // 0-100
  startedAt: string;
  lastOpenedAt: string;
  completedAt?: string;
}

export interface UserState {
  courses: Record<string, CourseProgress>;
  roadmaps: Record<string, RoadmapProgress>;
  applications: ApplicationRecord[];
  resume: ResumeReport | null;
}

export interface ResumeCheck {
  label: string;
  score: number;
  max: number;
  note: string;
}

export interface ResumeIssue {
  severity: 'high' | 'medium' | 'low';
  title: string;
  detail: string;
}

export interface ResumeReport {
  analysedAt: string;
  fileName: string;
  domainId: string;
  domainTitle: string;
  score: number;
  checks: ResumeCheck[];
  strengths: string[];
  issues: ResumeIssue[];
  matchedKeywords: string[];
  missingKeywords: string[];
  wordCount: number;
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | 'Beginner to Intermediate' | 'Intermediate to Advanced' | 'Beginner to Advanced';
  duration: string;
  rating?: number;
  studentsEnrolled?: string;
  url: string;
  isFree?: boolean;
  generated?: boolean; // built from a roadmap topic (not hand-picked)
  topicId?: string;
  description?: string;
  keyHighlights?: string[];
  learns?: string[];
  priceNote?: string;
}

export interface RoadmapTopic {
  id: string;
  name: string;
  description: string;
  keyTools: string[];
}

export interface RoadmapStage {
  id: StageId;
  title: string;
  subtitle: string;
  duration: string;
  topics: RoadmapTopic[];
  capstones: { name: string; description: string }[];
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  topics: RoadmapTopic[];
  capstoneProject: {
    name: string;
    description: string;
  };
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  industryValue: string;
  avgExamFee: string;
  keyTopics: string[];
  examCode?: string;
  url: string;
  isFree?: boolean;
}

export interface Internship {
  id: string;
  domainId: string;
  roleTitle: string;
  companyName: string;
  companyLogoBg: string;
  locationType: 'Virtual / Remote' | 'On-site' | 'Hybrid';
  location: string;
  duration: string;
  stipend: string;
  requiredSkills: string[];
  postedDate: string;
  deadline: string;
  description: string;
  responsibilities: string[];
  applyUrl: string;
  portalName: string;
  jobReqId: string;
  batchSeason: string;
}

export interface ApplicationRecord {
  id: string;
  internshipId: string;
  roleTitle: string;
  companyName: string;
  domainTitle: string;
  appliedAt: string;
  status: 'Applied on Official Portal' | 'Saved to Apply Later' | 'Under Review' | 'Interview Scheduled' | 'Offer Received';
  applicantName: string;
  applicantEmail: string;
  coverNote?: string;
  applyUrl?: string;
  portalName?: string;
}

export interface CSDomain {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  categoryTag: 'Web & App' | 'AI & Data' | 'Cloud & Sec' | 'Systems & Hardware';
  avgSalary: string;
  hiringDemand: 'Extremely High' | 'High' | 'Rapidly Growing';
  topTools: string[];
  recommendedCourses: Course[];
  learningPath: RoadmapPhase[];
  stages?: RoadmapStage[];
  openSources?: { label: string; url: string }[];
  internshipKeywords?: string[];
  industryCertifications: Certification[];
  internships: Internship[];
}
