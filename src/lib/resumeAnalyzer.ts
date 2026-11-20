import { CSDomain, ResumeReport, ResumeCheck, ResumeIssue, UserProfile } from '../types';
import { DOMAIN_META } from '../data/domainMeta';
import { skillVariants, userSkillVariants, hasSkill } from './personalize';

// ---------------------------------------------------------------------------------------------
// Resume analyser. Works like the checkers recruiters use (ATS style):
//  contact details, section structure, domain keyword match, impact (action verbs + numbers),
//  language quality (common spelling mistakes only) and length / formatting.
// Spelling: ONLY globally common English words are checked, using a list of frequent misspellings.
// Names, institute names, places, companies and technical terms are never flagged.
// ---------------------------------------------------------------------------------------------

const COMMON_MISSPELLINGS: Record<string, string> = {
  abillity: 'ability', abilty: 'ability', ablity: 'ability', acadamic: 'academic', academcis: 'academics', accomodate: 'accommodate',
  accomodation: 'accommodation', accuarcy: 'accuracy', accurcy: 'accuracy', acedemic: 'academic', acheive: 'achieve', acheived: 'achieved',
  acheivement: 'achievement', acheivements: 'achievements', achievments: 'achievements', achivement: 'achievement', additonal: 'additional',
  addtional: 'additional', administraion: 'administration', adminstration: 'administration', adn: 'and', adress: 'address', algorithem: 'algorithm',
  algorithim: 'algorithm', algoritm: 'algorithm', analize: 'analyze', analyitcal: 'analytical', analysys: 'analysis', analytcal: 'analytical',
  anaylsis: 'analysis', aplication: 'application', applicaton: 'application', applicatons: 'applications', appliction: 'application',
  apprentise: 'apprentice', appropiate: 'appropriate', apropriate: 'appropriate', architechture: 'architecture', architecure: 'architecture',
  asistant: 'assistant', assigment: 'assignment', assignement: 'assignment', assisstant: 'assistant', assitant: 'assistant',
  authenication: 'authentication', authentification: 'authentication', availble: 'available', avaliable: 'available', begining: 'beginning',
  beleive: 'believe', buisness: 'business', busines: 'business', bussiness: 'business', calender: 'calendar', carreer: 'career', carrer: 'career',
  catagory: 'category', cateogry: 'category', certfication: 'certification', certifcation: 'certification', certificaton: 'certification',
  chalenge: 'challenge', challange: 'challenge', challanges: 'challenges', clasification: 'classification', classifcation: 'classification',
  colaborate: 'collaborate', colaboration: 'collaboration', collabaration: 'collaboration', collaberated: 'collaborated', collabrate: 'collaborate',
  colleage: 'colleague', collegue: 'colleague', comitted: 'committed', comittee: 'committee', commited: 'committed', commitee: 'committee',
  communcation: 'communication', comparision: 'comparison', compatability: 'compatibility', completly: 'completely', comunicate: 'communicate',
  comunication: 'communication', concious: 'conscious', conferance: 'conference', confidance: 'confidence', consistant: 'consistent',
  consistantly: 'consistently', convinient: 'convenient', coordinater: 'coordinator', cooridnator: 'coordinator', creativeity: 'creativity',
  creativty: 'creativity', curicullum: 'curriculum', curriculam: 'curriculum', dashbaord: 'dashboard', dashbord: 'dashboard', databse: 'database',
  datbase: 'database', dedcated: 'dedicated', dedicaed: 'dedicated', definately: 'definitely', definetly: 'definitely', delieverd: 'delivered',
  delievered: 'delivered', delivary: 'delivery', demonstarted: 'demonstrated', demostrated: 'demonstrated', dependancy: 'dependency',
  dependant: 'dependent', deploment: 'deployment', deploymnet: 'deployment', descision: 'decision', desgined: 'designed', desicion: 'decision',
  desinged: 'designed', developement: 'development', developmnet: 'development', developped: 'developed', developper: 'developer',
  developpers: 'developers', develped: 'developed', devloped: 'developed', dicsussion: 'discussion', differnt: 'different',
  difficulity: 'difficulty', diffrent: 'different', dificult: 'difficult', discription: 'description', documantation: 'documentation',
  documenation: 'documentation', documention: 'documentation', effeciency: 'efficiency', efficeincy: 'efficiency', efficeint: 'efficient',
  efficent: 'efficient', eligable: 'eligible', embarass: 'embarrass', engeneering: 'engineering', engineeing: 'engineering', enginer: 'engineer',
  enginering: 'engineering', enginner: 'engineer', enthusiam: 'enthusiasm', enthusistic: 'enthusiastic', enviornment: 'environment',
  enviroment: 'environment', equiped: 'equipped', equipement: 'equipment', excelent: 'excellent', excellant: 'excellent', excercise: 'exercise',
  excersize: 'exercise', existance: 'existence', experence: 'experience', experiance: 'experience', experiances: 'experiences',
  expirience: 'experience', exprience: 'experience', facilitiy: 'facility', familar: 'familiar', febuary: 'February', feedbak: 'feedback',
  fourty: 'forty', frameowrk: 'framework', framwork: 'framework', freind: 'friend', fucntion: 'function', fulfilment: 'fulfillment',
  fullfil: 'fulfil', functionalty: 'functionality', fundamentel: 'fundamental', fundementals: 'fundamentals', funtion: 'function',
  funtionality: 'functionality', garantee: 'guarantee', gaurd: 'guard', generaly: 'generally', goverment: 'government', graduaton: 'graduation',
  gradute: 'graduate', gradution: 'graduation', grammer: 'grammar', guage: 'gauge', happend: 'happened', hardwere: 'hardware',
  hardwroking: 'hardworking', harrass: 'harass', heirarchy: 'hierarchy', hieght: 'height', hobbie: 'hobby', humerous: 'humorous',
  immediatly: 'immediately', implemention: 'implementation', implemet: 'implement', impleted: 'implemented', implimentation: 'implementation',
  implimented: 'implemented', implment: 'implement', implmented: 'implemented', improvment: 'improvement', incase: 'in case',
  independant: 'independent', innovaton: 'innovation', inovation: 'innovation', inovative: 'innovative', insitute: 'institute',
  instution: 'institution', integartion: 'integration', inteligence: 'intelligence', intellegence: 'intelligence', interenship: 'internship',
  intergrate: 'integrate', intergration: 'integration', internshp: 'internship', interpretor: 'interpreter', interseted: 'interested',
  intrest: 'interest', intrested: 'interested', intrnship: 'internship', knowldege: 'knowledge', knowlege: 'knowledge',
  knowlegeable: 'knowledgeable', knowlwdge: 'knowledge', langauge: 'language', langauges: 'languages', lanuage: 'language', lanugage: 'language',
  leadersip: 'leadership', leadrship: 'leadership', liason: 'liaison', libary: 'library', lisence: 'license', maintainance: 'maintenance',
  maintaned: 'maintained', maintenence: 'maintenance', managment: 'management', maneger: 'manager', mangaed: 'managed', mangement: 'management',
  manger: 'manager', mantain: 'maintain', mathematic: 'mathematics', mathmatics: 'mathematics', mecahnical: 'mechanical', meterial: 'material',
  miniscule: 'minuscule', mispell: 'misspell', motivaton: 'motivation', motivted: 'motivated', neccesary: 'necessary', neccessary: 'necessary',
  necesary: 'necessary', netwok: 'network', netwrok: 'network', noticable: 'noticeable', obejctive: 'objective', objecive: 'objective',
  objectiv: 'objective', occassion: 'occasion', occassionally: 'occasionally', occured: 'occurred', occurence: 'occurrence',
  oportunity: 'opportunity', oppertunity: 'opportunity', opportunties: 'opportunities', oppurtunity: 'opportunity', optimisation: 'optimization',
  optmization: 'optimization', organistion: 'organisation', organiztion: 'organization', orginal: 'original', orginization: 'organization',
  paralel: 'parallel', partcipated: 'participated', participeted: 'participated', particpate: 'participate', percieve: 'perceive',
  perfomance: 'performance', perfomed: 'performed', performence: 'performance', permanant: 'permanent', perseverence: 'perseverance',
  personel: 'personnel', porject: 'project', posession: 'possession', potentail: 'potential', practicle: 'practical', pratical: 'practical',
  predicition: 'prediction', prediciton: 'prediction', prefered: 'preferred', preformed: 'performed', presance: 'presence',
  presentaion: 'presentation', presention: 'presentation', priviledge: 'privilege', prject: 'project', probaly: 'probably', problme: 'problem',
  proccess: 'process', proces: 'process', profesional: 'professional', profesionals: 'professionals', professinal: 'professional',
  proffesional: 'professional', proffessional: 'professional', proficency: 'proficiency', proficent: 'proficient', progam: 'program',
  progamming: 'programming', programing: 'programming', programmin: 'programming', projet: 'project', promiss: 'promise',
  pronounciation: 'pronunciation', publically: 'publicly', qualifaction: 'qualification', qualifcation: 'qualification', quater: 'quarter',
  questionaire: 'questionnaire', qulification: 'qualification', realy: 'really', reasearch: 'research', reccomend: 'recommend', reciept: 'receipt',
  recieve: 'receive', recieved: 'received', recomend: 'recommend', recomendation: 'recommendation', refered: 'referred', relevent: 'relevant',
  releventt: 'relevant', reliabel: 'reliable', religous: 'religious', remeber: 'remember', repitition: 'repetition', reponsible: 'responsible',
  requirment: 'requirement', requirments: 'requirements', resarch: 'research', reseach: 'research', reserch: 'research', resolvd: 'resolved',
  resouce: 'resource', resourse: 'resource', responsability: 'responsibility', responsibile: 'responsible', responsibilites: 'responsibilities',
  responsibilty: 'responsibility', responsiblities: 'responsibilities', resposible: 'responsible', restaraunt: 'restaurant', rythm: 'rhythm',
  scalabilty: 'scalability', scedule: 'schedule', sceince: 'science', schedual: 'schedule', scince: 'science', secratary: 'secretary',
  secuirty: 'security', securty: 'security', sentance: 'sentence', sepcific: 'specific', seperate: 'separate', seperately: 'separately',
  sercurity: 'security', sicence: 'science', similiar: 'similar', sincerly: 'sincerely', skilful: 'skillful', softwere: 'software',
  sofware: 'software', soure: 'source', specalization: 'specialization', speciallization: 'specialization', specifc: 'specific',
  strenght: 'strength', strenghts: 'strengths', succes: 'success', succesful: 'successful', succesfully: 'successfully', succesion: 'succession',
  successfull: 'successful', sucess: 'success', sucessful: 'successful', sucessfully: 'successfully', sumary: 'summary', summry: 'summary',
  supervisior: 'supervisor', suprise: 'surprise', taht: 'that', teamwok: 'teamwork', teamwrok: 'teamwork', techincal: 'technical',
  technlogy: 'technology', technolgy: 'technology', techonology: 'technology', tecnical: 'technical', tecnology: 'technology', teh: 'the',
  tehnical: 'technical', temperture: 'temperature', tempratue: 'temperature', thier: 'their', threshhold: 'threshold', tommorow: 'tomorrow',
  tomorow: 'tomorrow', tounge: 'tongue', trainning: 'training', traning: 'training', truely: 'truly', tutorail: 'tutorial', tutoral: 'tutorial',
  tyrany: 'tyranny', undertand: 'understand', unforseen: 'unforeseen', univeristy: 'university', universty: 'university', untill: 'until',
  unversity: 'university', usefull: 'useful', vaccum: 'vacuum', vaild: 'valid', vehical: 'vehicle', visable: 'visible',
  visualisation: 'visualization', vizualization: 'visualization', volunteeer: 'volunteer', volunter: 'volunteer', vulnerabilty: 'vulnerability',
  wether: 'whether', whereever: 'wherever', wich: 'which', wierd: 'weird', wilfull: 'wilful', withing: 'within', wokring: 'working',
  workign: 'working', writen: 'written', writting: 'writing', yeild: 'yield',
};

const ACTION_VERBS = new Set(`achieved analysed analyzed architected assembled assisted automated built calculated collaborated completed configured conducted
contributed coordinated created curated customized debugged decreased delivered deployed designed developed devised diagnosed documented drove enabled engineered
enhanced established evaluated executed expanded extracted facilitated fine-tuned fixed formulated generated guided identified implemented improved increased
initiated integrated introduced investigated launched led learned maintained managed mentored migrated modelled modeled monitored optimised optimized organised
organized orchestrated oversaw participated performed pioneered planned prepared presented prioritized produced programmed prototyped published reduced refactored
researched resolved restructured reviewed scaled secured set shipped simulated solved spearheaded streamlined supported tested trained transformed tuned
upgraded validated visualised visualized won wrote applied explored secured trained cleaned processed predicted classified deployed hosted`.split(/\s+/));

const WEAK_PHRASES = [
  /\bresponsible for\b/i, /\bworked on\b/i, /\bhelped with\b/i, /\bduties included\b/i, /\btried to\b/i, /\bhard[- ]working\b/i, /\bteam player\b/i, /\bgo-getter\b/i,
  /\bpassionate about\b/i, /\bdetail[- ]oriented\b/i, /\bquick learner\b/i,
];

const SECTION_PATTERNS: Record<string, RegExp> = {
  summary: /^(professional\s+|career\s+)?(summary|objective|profile|about me|career objective)\b/i,
  education: /^(education|academic|academics|qualification|educational)\b/i,
  skills: /^(technical\s+|key\s+|core\s+)?(skills|technologies|tools|tech stack|competencies)\b/i,
  projects: /^(academic\s+|personal\s+|major\s+|key\s+)?projects?\b/i,
  experience: /^(work\s+|professional\s+)?(experience|internships?|employment|training)\b/i,
  certifications: /^(certifications?|certificates?|courses|licen[cs]es|online courses)\b/i,
  achievements: /^(achievements|awards|honou?rs|accomplishments|extra[- ]?curricular|positions of responsibility|activities)\b/i,
};

const STOP_SPELL_LINE = /\b(university|institute|college|school|academy|polytechnic|vidya|technology|iit|nit|vtu|cgpa|gpa|percentage|board)\b/i;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#.]/g, '');

export interface AnalyseInput {
  text: string;
  fileName: string;
  domain: CSDomain;
  profile: UserProfile | null;
}

const splitSections = (lines: string[]) => {
  const sections: Record<string, string[]> = {};
  let current = 'header';
  sections[current] = [];
  for (const raw of lines) {
    const line = raw.trim();
    const headingText = line.replace(/[:\-–—|•*#_]+$/g, '').replace(/^[•*#_\-–—\s]+/, '').trim();
    let matched: string | null = null;
    if (headingText.length > 0 && headingText.length <= 42) {
      for (const [key, re] of Object.entries(SECTION_PATTERNS)) {
        if (re.test(headingText) && headingText.split(/\s+/).length <= 5) { matched = key; break; }
      }
    }
    if (matched) { current = matched; sections[current] = sections[current] || []; continue; }
    sections[current].push(raw);
  }
  return sections;
};

export const analyseResume = ({ text, fileName, domain, profile }: AnalyseInput): ResumeReport => {
  const lines = text.split('\n').map((l) => l.replace(/\s+$/g, ''));
  const nonEmpty = lines.filter((l) => l.trim());
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = text.toLowerCase();
  const sections = splitSections(lines);
  const has = (k: string) => !!sections[k] && sections[k].some((l) => l.trim());

  const issues: ResumeIssue[] = [];
  const strengths: string[] = [];
  const checks: ResumeCheck[] = [];
  const issue = (severity: ResumeIssue['severity'], title: string, detail: string) => issues.push({ severity, title, detail });

  // ---------- 1. contact & links (10) ----------
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text);
  const hasPhone = /(\+?\d[\d\s().-]{8,}\d)/.test(text);
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(text);
  const hasGithub = /github\.com|github|gitlab|portfolio|behance|kaggle/i.test(text);
  let contact = 0;
  if (hasEmail) contact += 3; else issue('high', 'No email address found', 'Add a professional email id at the top of your resume so recruiters can contact you.');
  if (hasPhone) contact += 3; else issue('high', 'No phone number found', 'Add a reachable phone number in the header.');
  if (hasLinkedIn) contact += 2; else issue('medium', 'LinkedIn profile missing', 'Add your LinkedIn URL. Most recruiters check it before shortlisting.');
  if (hasGithub) contact += 2; else issue('medium', 'No GitHub / portfolio link', 'Add your GitHub, Kaggle or portfolio link so that your projects can be verified.');
  if (hasEmail && hasPhone) strengths.push('Contact details (email and phone) are clearly present.');
  if (hasGithub) strengths.push('Includes a GitHub / portfolio link for proof of work.');
  checks.push({ label: 'Contact & links', score: contact, max: 10, note: contact >= 8 ? 'Complete' : 'Add the missing contact links' });

  // ---------- 2. sections / structure (15) ----------
  const secWeights: [string, string, number, boolean][] = [
    ['education', 'Education', 3, true], ['skills', 'Skills', 3, true], ['projects', 'Projects', 3, true],
    ['experience', 'Experience / Internships', 2, false], ['certifications', 'Certifications', 2, false], ['summary', 'Summary / Objective', 1, false], ['achievements', 'Achievements', 1, false],
  ];
  let structure = 0;
  const missingSections: string[] = [];
  secWeights.forEach(([key, label, pts, required]) => {
    if (has(key)) structure += pts;
    else {
      missingSections.push(label);
      if (required) issue('high', `${label} section not found`, `Add a clearly labelled "${label}" section. Applicant tracking systems look for this heading.`);
    }
  });
  if (!has('experience') && !has('projects')) issue('high', 'No experience or projects', 'Freshers should show 2-3 strong projects or internships. Add them with the tools used and the result.');
  if (!has('certifications')) issue('low', 'Certifications section missing', 'List completed courses and certifications from your roadmap to show continuous learning.');
  if (structure >= 11) strengths.push('Resume has a clear, ATS-friendly section structure.');
  checks.push({ label: 'Sections & structure', score: Math.min(15, structure), max: 15, note: missingSections.length ? `Missing: ${missingSections.slice(0, 3).join(', ')}` : 'All key sections present' });

  // ---------- 3. domain keyword match (25) ----------
  const meta = DOMAIN_META[domain.id];
  const keywordPool = [...new Set([...(meta?.resumeKeywords || []), ...domain.topTools.map((t) => t.toLowerCase())])];
  const lowerNorm = norm(text);
  const matched: string[] = [];
  const missing: string[] = [];
  keywordPool.forEach((kw) => {
    const k = kw.toLowerCase();
    const found = lower.includes(k) || lowerNorm.includes(norm(k));
    (found ? matched : missing).push(kw);
  });
  const kwRatio = keywordPool.length ? matched.length / keywordPool.length : 0;
  const kwScore = Math.round(25 * Math.min(1, kwRatio / 0.6));
  if (kwRatio >= 0.5) strengths.push(`Strong keyword match for ${domain.title}: ${matched.length} of ${keywordPool.length} expected keywords found.`);
  else issue('high', `Low keyword match for ${domain.title}`, `Only ${matched.length} of ${keywordPool.length} expected keywords were found. Add the ones you genuinely know, for example: ${missing.slice(0, 6).join(', ')}.`);
  // skills in profile that the resume does not mention
  const profileSkills = profile?.skills || [];
  const notOnResume = profileSkills.filter((s) => !skillVariants(s).some((v) => v.length >= 2 && lowerNorm.includes(v)));
  if (notOnResume.length >= 3) issue('medium', 'Skills in your profile are missing on the resume', `You selected ${notOnResume.slice(0, 5).join(', ')} in your profile, but they are not on this resume. Add them under Skills with a project that uses them.`);
  checks.push({ label: `Keywords for ${domain.title}`, score: kwScore, max: 25, note: `${matched.length}/${keywordPool.length} keywords matched` });

  // ---------- 4. impact: action verbs and numbers (20) ----------
  const bulletRe = /^\s*([•●▪■◦\-–—*·>]|\d+[.)])\s+/;
  let bullets = nonEmpty.filter((l) => bulletRe.test(l));
  if (bullets.length < 3) {
    const body = [...(sections.projects || []), ...(sections.experience || [])].filter((l) => l.trim().length > 30);
    bullets = body;
  }
  const firstWord = (l: string) => l.replace(bulletRe, '').trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z-]/g, '') || '';
  const verbBullets = bullets.filter((l) => ACTION_VERBS.has(firstWord(l)));
  const verbRatio = bullets.length ? verbBullets.length / bullets.length : 0;
  const metricRe = /(\d+(\.\d+)?\s?(%|x|k\b|\+)|\b\d{2,}\b|₹|\$|rs\.?\s?\d)/i;
  const metricBullets = bullets.filter((l) => metricRe.test(l.replace(/\b(19|20)\d{2}\b/g, '')));
  const metricRatio = bullets.length ? metricBullets.length / bullets.length : 0;
  const weakHits = bullets.filter((l) => WEAK_PHRASES.some((re) => re.test(l)));
  let impact = Math.round(10 * Math.min(1, verbRatio / 0.7)) + Math.round(10 * Math.min(1, metricRatio / 0.35));
  if (bullets.length < 4) impact = Math.min(impact, 8);
  if (verbRatio >= 0.6 && bullets.length >= 4) strengths.push('Bullet points start with strong action verbs.');
  else issue('medium', 'Start bullet points with action verbs', `Only ${verbBullets.length} of ${bullets.length} points begin with a strong verb such as Built, Designed, Implemented, Optimised or Deployed.`);
  if (metricRatio >= 0.3) strengths.push('Achievements are quantified with numbers and percentages.');
  else issue('medium', 'Quantify your results', 'Add numbers: dataset size, accuracy %, users, time saved, performance gain. Example: "Reduced report time by 40% using Power BI automation".');
  if (weakHits.length) issue('low', 'Replace weak phrases', `Phrases like "responsible for" or "worked on" appear ${weakHits.length} time(s). Describe what you built and the result instead.`);
  if (bullets.length < 4) issue('medium', 'Too few bullet points', 'Describe each project or internship in 2-4 short bullet points covering what you built, the tools used and the outcome.');
  checks.push({ label: 'Impact (action verbs & numbers)', score: impact, max: 20, note: `${verbBullets.length}/${bullets.length || 0} strong verbs, ${metricBullets.length} measurable results` });

  // ---------- 5. language quality (15) ----------
  const spellLines = nonEmpty.filter((l, i) => i > 2 && !STOP_SPELL_LINE.test(l)); // skip header lines and institute lines
  const eduSet = new Set(sections.education || []);
  const mistakes: { wrong: string; right: string }[] = [];
  spellLines.forEach((l) => {
    if (eduSet.has(l)) return;
    for (const m of l.matchAll(/[A-Za-z]+/g)) {
      const w = m[0];
      const idx = m.index || 0;
      const lw = w.toLowerCase();
      if (!COMMON_MISSPELLINGS[lw] || COMMON_MISSPELLINGS[lw] === lw) continue;
      // A capitalised word in the middle of a sentence may be a name, so it is skipped.
      // Lower-case words, ALL-CAPS words and words that start a line or sentence are checked.
      const before = l.slice(0, idx).replace(bulletRe, '').trim();
      const startsSentence = before === '' || /[.!?:]$/.test(before);
      const isCapitalised = w[0] === w[0].toUpperCase() && w !== w.toUpperCase();
      if (!isCapitalised || startsSentence) {
        if (!mistakes.some((x) => x.wrong === lw)) mistakes.push({ wrong: lw, right: COMMON_MISSPELLINGS[lw] });
      }
    }
  });
  const repeated = [...text.matchAll(/\b([A-Za-z]{3,})\s+\1\b/gi)].map((m) => m[0]).filter((m) => !/^(had had|that that)$/i.test(m));
  const pronounBullets = bullets.filter((l) => /\b(I|my|me)\b/.test(l.replace(bulletRe, '')) ).length;
  let language = 15;
  if (mistakes.length) {
    language -= Math.min(9, mistakes.length * 3);
    issue('high', 'Spelling mistakes found', mistakes.slice(0, 6).map((m) => `"${m.wrong}" should be "${m.right}"`).join('; ') + '. (Names and institute names are not checked.)');
  } else strengths.push('No common spelling mistakes found.');
  if (repeated.length) { language -= Math.min(3, repeated.length); issue('medium', 'Repeated words', `Found repeated words: "${[...new Set(repeated)].slice(0, 3).join('", "')}".`); }
  if (pronounBullets >= 2) { language -= 2; issue('low', 'Avoid first-person pronouns', 'Resume bullets should not use "I" or "my". Start directly with the action verb.'); }
  if (/\b(he|she)\s+(is|was)\b/i.test(text)) language -= 1;
  checks.push({ label: 'Language quality', score: Math.max(0, language), max: 15, note: mistakes.length ? `${mistakes.length} spelling issue(s)` : 'Clean' });

  // ---------- 6. length & formatting (15) ----------
  let format = 15;
  if (wordCount < 180) { format -= 8; issue('high', 'Resume is too short', `Only ${wordCount} words found. A fresher resume works best with roughly 300 to 650 words.`); }
  else if (wordCount < 280) { format -= 3; issue('low', 'Resume could have more detail', `Around ${wordCount} words. Add one more project or more detail on tools and results.`); }
  else if (wordCount > 900) { format -= 6; issue('medium', 'Resume is too long', `${wordCount} words is more than a recruiter will read. Keep it to one page for freshers (two pages at most).`); }
  else if (wordCount > 750) { format -= 2; issue('low', 'Resume is slightly long', 'Trim older or less relevant content to keep it to one page.'); }
  else strengths.push(`Good length (${wordCount} words).`);
  const longLines = nonEmpty.filter((l) => l.length > 260).length;
  if (longLines >= 2) { format -= 3; issue('medium', 'Long paragraphs', 'Break long paragraphs into short bullet points (1-2 lines each).'); }
  const hasDates = /\b(19|20)\d{2}\b|present|ongoing/i.test(text);
  if (!hasDates) { format -= 2; issue('medium', 'No dates found', 'Add years or months for education, projects and internships.'); }
  if (!/(cgpa|gpa|percentage|%|grade)/i.test(sections.education?.join(' ') || text)) { format -= 1; issue('low', 'Add your CGPA / percentage', 'Mention your CGPA or percentage in the Education section.'); }
  checks.push({ label: 'Length & formatting', score: Math.max(0, format), max: 15, note: `${wordCount} words` });

  const score = Math.max(0, Math.min(100, checks.reduce((a, c) => a + c.score, 0)));
  const sev = { high: 0, medium: 1, low: 2 };
  issues.sort((a, b) => sev[a.severity] - sev[b.severity]);

  return {
    analysedAt: new Date().toISOString(),
    fileName,
    domainId: domain.id,
    domainTitle: domain.title,
    score,
    checks,
    strengths: strengths.slice(0, 6),
    issues,
    matchedKeywords: matched,
    missingKeywords: missing,
    wordCount,
  };
};

export const scoreLabel = (score: number) =>
  score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : score >= 50 ? 'Needs improvement' : 'Needs major work';
