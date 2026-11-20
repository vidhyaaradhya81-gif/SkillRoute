import { Course, Certification, CSDomain } from '../types';

// -----------------------------------------------------------------------------------------------
// Learning-resource catalogue. SkillRoute recommends ONLY from these six sources:
//   Coursera, Google, IBM, Infosys Springboard, Udemy, YouTube
// Every domain gets (a) hand-picked flagship courses / certificates and (b) resources generated from
// the topics of its roadmap, so the recommendations always follow what the learner still has to learn.
// Flagship items use direct links; the generated ones link to the source's own live search page
// (so they never go out of date).
// -----------------------------------------------------------------------------------------------

export type Source = 'Coursera' | 'Google' | 'IBM' | 'Infosys Springboard' | 'Udemy' | 'YouTube';
export const ALLOWED_SOURCES: Source[] = ['Coursera', 'Google', 'IBM', 'Infosys Springboard', 'Udemy', 'YouTube'];
export const isAllowedSource = (s: string) => ALLOWED_SOURCES.some((a) => s === a || s.startsWith(a));

const q = encodeURIComponent;
const U = {
  yt: (s: string) => `https://www.youtube.com/results?search_query=${q(s)}`,
  cs: (s: string) => `https://www.coursera.org/search?query=${q(s)}`,
  ud: (s: string) => `https://www.udemy.com/courses/search/?q=${q(s)}&sort=highest-rated`,
  gcs: (s: string) => `https://www.cloudskillsboost.google/catalog?keywords=${q(s)}`,
  ibm: 'https://skillsbuild.org/students/course-catalog',
  inf: 'https://infyspringboard.onwingspan.com/',
  cp: (slug: string) => `https://www.coursera.org/professional-certificates/${slug}`,
  cspec: (slug: string) => `https://www.coursera.org/specializations/${slug}`,
  cl: (slug: string) => `https://www.coursera.org/learn/${slug}`,
  ucourse: (slug: string) => `https://www.udemy.com/course/${slug}/`,
  gcert: (slug: string) => `https://cloud.google.com/learn/certification/${slug}`,
};

type Lvl = Course['skillLevel'];
interface CO { free?: boolean; note?: string; desc: string; hl?: string[]; learns?: string[]; gen?: boolean; topicId?: string }

const course = (id: string, title: string, platform: Source, level: Lvl, duration: string, url: string, o: CO): Course => ({
  id, title, platform, skillLevel: level, duration, url,
  isFree: o.free ?? false, priceNote: o.note, description: o.desc, keyHighlights: o.hl, learns: o.learns,
  generated: o.gen, topicId: o.topicId,
});

const cert = (id: string, title: string, provider: Source, difficulty: Certification['difficulty'], value: string, fee: string, topics: string[], url: string, free = false): Certification => ({
  id, title, provider, difficulty, industryValue: value, avgExamFee: fee, keyTopics: topics, url, isFree: free,
});

const COURSERA_NOTE = 'Free to audit; certificate needs a Coursera plan (financial aid available)';
const UDEMY_NOTE = 'Paid, usually discounted to a few hundred rupees during Udemy sales';

// ---------- flagship items per domain ----------
interface Flag { courses: Course[]; certs: Certification[] }

const FLAGSHIP: Record<string, Flag> = {
  fullstack: {
    courses: [
      course('fs-ud-webdev', 'The Complete Web Development Bootcamp', 'Udemy', 'Beginner to Advanced', '60+ hours', U.ucourse('the-complete-web-development-bootcamp'), { note: UDEMY_NOTE, desc: 'Project based path from HTML/CSS to JavaScript, Node.js, Express, databases and deployment.', hl: ['HTML & CSS', 'Node.js', 'Projects'], learns: ['html', 'css', 'javascript', 'node.js', 'express', 'mongodb', 'git'] }),
      course('fs-ud-react', 'React - The Complete Guide', 'Udemy', 'Intermediate', '60+ hours', U.ucourse('react-the-complete-guide-incl-redux'), { note: UDEMY_NOTE, desc: 'Hooks, state management, routing and real-world React apps.', hl: ['React Hooks', 'Routing', 'Redux'], learns: ['react', 'redux', 'hooks', 'frontend'] }),
      course('fs-ud-node', 'NodeJS - The Complete Guide', 'Udemy', 'Intermediate', '40+ hours', U.ucourse('nodejs-the-complete-guide'), { note: UDEMY_NOTE, desc: 'REST APIs, authentication, MongoDB and SQL with Node.js and Express.', hl: ['REST APIs', 'Auth', 'Databases'], learns: ['node.js', 'express', 'rest', 'api', 'authentication', 'mongodb', 'sql'] }),
      course('fs-cs-jhu', 'HTML, CSS, and JavaScript for Web Developers', 'Coursera', 'Beginner', '5 weeks', U.cl('html-css-javascript-for-web-developers'), { free: true, note: 'Free to audit', desc: 'Johns Hopkins University course covering the front-end fundamentals with weekly assignments.', hl: ['Free to audit', 'Assignments'], learns: ['html', 'css', 'javascript', 'bootstrap', 'dom'] }),
      course('fs-yt', 'Full Stack Web Development Full Course - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('freeCodeCamp full stack web development full course'), { free: true, desc: 'Free multi-hour full-course videos (freeCodeCamp and similar creators) from HTML to full-stack projects.', hl: ['100% Free', 'Project videos'], learns: ['html', 'css', 'javascript', 'react', 'node.js', 'mongodb'] }),
    ],
    certs: [
      cert('fs-c-ibm', 'IBM Full Stack Software Developer Professional Certificate', 'IBM', 'Intermediate', 'IBM-branded certificate covering cloud native full-stack development.', 'Coursera plan (free to audit)', ['HTML/CSS', 'JavaScript', 'Node.js', 'React', 'Docker', 'Kubernetes'], U.cp('ibm-full-stack-cloud-developer')),
      cert('fs-c-meta-fe', 'Meta Front-End Developer Professional Certificate', 'Coursera', 'Beginner', 'Job-ready front-end certificate with React projects, offered on Coursera.', 'Coursera plan (free to audit)', ['HTML', 'CSS', 'JavaScript', 'React', 'UX basics'], U.cp('meta-front-end-developer')),
    ],
  },
  datascience: {
    courses: [
      course('ds-cs-ml', 'Machine Learning Specialization', 'Coursera', 'Beginner to Intermediate', '3 months', U.cspec('machine-learning-introduction'), { free: true, note: COURSERA_NOTE, desc: "Andrew Ng's updated introduction to supervised, unsupervised learning and recommender systems.", hl: ['Free to audit', 'Python & scikit-learn'], learns: ['machine learning', 'regression', 'classification', 'neural networks', 'scikit-learn', 'python'] }),
      course('ds-g-mlcc', 'Machine Learning Crash Course', 'Google', 'Beginner to Intermediate', '15 hours', 'https://developers.google.com/machine-learning/crash-course', { free: true, desc: "Google's free, practical ML course with videos, visualisations and exercises.", hl: ['100% Free', 'Hands-on exercises'], learns: ['machine learning', 'tensorflow', 'classification', 'regression', 'neural networks'] }),
      course('ds-ud-ml', 'Machine Learning A-Z: AI, Python & R', 'Udemy', 'Beginner to Intermediate', '40+ hours', U.ucourse('machinelearning'), { note: UDEMY_NOTE, desc: 'Hands-on ML models in Python and R with practical projects.', hl: ['Python', 'R', 'Projects'], learns: ['machine learning', 'python', 'pandas', 'scikit-learn', 'regression', 'clustering'] }),
      course('ds-cs-py', 'Python for Everybody', 'Coursera', 'Beginner', '8 months (self-paced)', U.cspec('python'), { free: true, note: 'Free to audit', desc: 'University of Michigan foundation in Python, data structures, web data and databases.', hl: ['Free to audit', 'Beginner friendly'], learns: ['python', 'data structures', 'sql', 'web data'] }),
    ],
    certs: [
      cert('ds-c-ibm', 'IBM Data Science Professional Certificate', 'IBM', 'Beginner', 'Popular entry-level data science certificate with capstone projects.', 'Coursera plan (free to audit)', ['Python', 'SQL', 'Data visualisation', 'Machine learning'], U.cp('ibm-data-science')),
      cert('ds-c-gada', 'Google Advanced Data Analytics Professional Certificate', 'Google', 'Intermediate', 'Google certificate covering regression, ML and statistics for analysts.', 'Coursera plan (free to audit)', ['Statistics', 'Regression', 'Machine learning', 'Python'], U.cp('google-advanced-data-analytics')),
      cert('ds-c-gmle', 'Google Cloud Professional Machine Learning Engineer', 'Google', 'Advanced', 'Industry recognised cloud ML engineering certification.', 'USD 200', ['ML pipelines', 'Vertex AI', 'MLOps'], U.gcert('machine-learning-engineer')),
    ],
  },
  cloud: {
    courses: [
      course('cl-cs-gcp', 'Google Cloud Fundamentals: Core Infrastructure', 'Google', 'Beginner', '1 week', U.cl('gcp-fundamentals'), { free: true, note: 'Free to audit', desc: 'Intro to Google Cloud compute, storage, networking and resource management.', hl: ['Free to audit', 'Labs'], learns: ['google cloud', 'compute', 'storage', 'networking', 'iam', 'cloud'] }),
      course('cl-g-gcs', 'Google Cloud Skills Boost - hands-on labs', 'Google', 'All Levels', 'Self paced', 'https://www.cloudskillsboost.google/', { free: true, note: 'Free labs and some free credits; premium plan optional', desc: 'Official Google Cloud labs, quests and learning paths.', hl: ['Real cloud labs', 'Badges'], learns: ['google cloud', 'kubernetes', 'compute', 'bigquery', 'devops', 'cloud'] }),
      course('cl-cs-ibm', 'Introduction to Cloud Computing', 'IBM', 'Beginner', '3 weeks', U.cl('introduction-to-cloud'), { free: true, note: 'Free to audit', desc: 'IBM course on cloud concepts, service models, deployment and cloud-native ideas.', hl: ['Free to audit'], learns: ['cloud computing', 'iaas', 'paas', 'saas', 'virtualization'] }),
      course('cl-ud-docker', 'Docker & Kubernetes: The Practical Guide', 'Udemy', 'Intermediate', '23 hours', U.ucourse('docker-kubernetes-the-complete-guide'), { note: UDEMY_NOTE, desc: 'Containers, Docker Compose and Kubernetes deployments explained with demos.', hl: ['Docker', 'Kubernetes'], learns: ['docker', 'kubernetes', 'containers', 'devops', 'ci/cd'] }),
    ],
    certs: [
      cert('cl-c-cdl', 'Google Cloud Digital Leader', 'Google', 'Beginner', 'Entry-level Google Cloud certification for cloud fundamentals.', 'USD 99', ['Cloud basics', 'Digital transformation', 'Google Cloud products'], U.gcert('cloud-digital-leader')),
      cert('cl-c-ace', 'Google Cloud Associate Cloud Engineer', 'Google', 'Intermediate', 'Hands-on associate-level certification valued for cloud engineer roles.', 'USD 125', ['Compute', 'Networking', 'IAM', 'Monitoring'], U.gcert('cloud-engineer')),
      cert('cl-c-ibm', 'IBM DevOps and Software Engineering Professional Certificate', 'IBM', 'Intermediate', 'DevOps, CI/CD, containers and agile in one IBM certificate.', 'Coursera plan (free to audit)', ['DevOps', 'CI/CD', 'Docker', 'Kubernetes'], U.cp('ibm-devops-and-software-engineering')),
    ],
  },
  cybersecurity: {
    courses: [
      course('cy-cs-found', 'Foundations of Cybersecurity', 'Google', 'Beginner', '3 weeks', U.cl('foundations-of-cybersecurity'), { free: true, note: 'Free to audit', desc: 'First course of the Google Cybersecurity Certificate: security domains, threats and tools.', hl: ['Free to audit'], learns: ['cybersecurity', 'security', 'threats', 'risk', 'linux'] }),
      course('cy-ud-eh', 'Learn Ethical Hacking From Scratch', 'Udemy', 'Beginner to Intermediate', '15 hours', U.ucourse('learn-ethical-hacking-from-scratch'), { note: UDEMY_NOTE, desc: 'Penetration testing basics: networks, web attacks, Kali Linux and defence.', hl: ['Kali Linux', 'Pen testing'], learns: ['ethical hacking', 'penetration testing', 'kali', 'networking', 'web security', 'metasploit'] }),
      course('cy-yt', 'Cyber Security Full Course - YouTube', 'YouTube', 'Beginner to Intermediate', 'Self paced', U.yt('cyber security full course for beginners'), { free: true, desc: 'Free full-length beginner to intermediate security courses and lab walkthroughs.', hl: ['100% Free'], learns: ['cybersecurity', 'networking', 'linux', 'encryption', 'web security'] }),
    ],
    certs: [
      cert('cy-c-g', 'Google Cybersecurity Professional Certificate', 'Google', 'Beginner', 'Entry-level cybersecurity certificate with SIEM, Linux, SQL and Python practice.', 'Coursera plan (free to audit)', ['SIEM', 'Linux', 'SQL', 'Python', 'Incident response'], U.cp('google-cybersecurity')),
      cert('cy-c-ibm', 'IBM Cybersecurity Analyst Professional Certificate', 'IBM', 'Intermediate', 'Security analyst skills: threat intelligence, forensics and compliance.', 'Coursera plan (free to audit)', ['SOC', 'Threat intelligence', 'Forensics', 'Compliance'], U.cp('ibm-cybersecurity-analyst')),
    ],
  },
  ai_nlp: {
    courses: [
      course('ai-cs-dl', 'Deep Learning Specialization', 'Coursera', 'Intermediate', '3 months', U.cspec('deep-learning'), { free: true, note: COURSERA_NOTE, desc: 'DeepLearning.AI specialisation on neural networks, CNNs, sequence models and transformers.', hl: ['Free to audit', 'Python & TensorFlow'], learns: ['deep learning', 'neural networks', 'cnn', 'rnn', 'transformers', 'tensorflow'] }),
      course('ai-cs-nlp', 'Natural Language Processing Specialization', 'Coursera', 'Intermediate to Advanced', '4 months', U.cspec('natural-language-processing'), { free: true, note: COURSERA_NOTE, desc: 'Classification, embeddings, attention models and transformers for NLP.', hl: ['Free to audit', 'Transformers'], learns: ['nlp', 'natural language processing', 'embeddings', 'attention', 'transformers', 'bert'] }),
      course('ai-g-mlcc', 'Machine Learning Crash Course', 'Google', 'Beginner to Intermediate', '15 hours', 'https://developers.google.com/machine-learning/crash-course', { free: true, desc: "Google's free practical ML fundamentals course.", hl: ['100% Free'], learns: ['machine learning', 'tensorflow', 'neural networks', 'python'] }),
      course('ai-yt', 'NLP & Deep Learning Lectures - YouTube', 'YouTube', 'Intermediate to Advanced', 'Self paced', U.yt('Stanford CS224N NLP with deep learning lectures'), { free: true, desc: 'Free university lecture series (Stanford CS224N and similar) on modern NLP.', hl: ['100% Free', 'University lectures'], learns: ['nlp', 'transformers', 'deep learning', 'embeddings'] }),
    ],
    certs: [
      cert('ai-c-ibm', 'IBM AI Engineering Professional Certificate', 'IBM', 'Intermediate', 'ML and deep learning engineering with Keras, PyTorch and scikit-learn.', 'Coursera plan (free to audit)', ['Machine learning', 'Deep learning', 'Keras', 'PyTorch'], U.cp('ai-engineer')),
      cert('ai-c-tf', 'DeepLearning.AI TensorFlow Developer Professional Certificate', 'Coursera', 'Intermediate', 'Practical TensorFlow certificate: CNNs, NLP, time series.', 'Coursera plan (free to audit)', ['TensorFlow', 'CNN', 'NLP', 'Time series'], U.cp('tensorflow-in-practice')),
    ],
  },
  mobile: {
    courses: [
      course('mo-g-android', 'Android Basics with Compose', 'Google', 'Beginner', '~6 weeks', 'https://developer.android.com/courses/android-basics-compose/course', { free: true, desc: "Google's official free course to build Android apps with Kotlin and Jetpack Compose.", hl: ['100% Free', 'Kotlin', 'Compose'], learns: ['android', 'kotlin', 'jetpack compose', 'mobile'] }),
      course('mo-g-flutter', 'Write Your First Flutter App', 'Google', 'Beginner', '2-3 hours', 'https://docs.flutter.dev/get-started/codelab', { free: true, desc: 'Official Flutter codelab: your first cross-platform app.', hl: ['100% Free', 'Flutter', 'Dart'], learns: ['flutter', 'dart', 'cross-platform', 'mobile'] }),
      course('mo-ud-flutter', 'Flutter & Dart - The Complete Guide', 'Udemy', 'Beginner to Advanced', '40+ hours', U.ucourse('learn-flutter-dart-to-build-ios-android-apps'), { note: UDEMY_NOTE, desc: 'Build native iOS and Android apps with one Flutter codebase.', hl: ['Flutter', 'State management'], learns: ['flutter', 'dart', 'state management', 'firebase', 'api'] }),
      course('mo-yt', 'Mobile App Development Full Course - YouTube', 'YouTube', 'Beginner to Intermediate', 'Self paced', U.yt('freeCodeCamp Flutter React Native Android full course'), { free: true, desc: 'Free full-length Android, Flutter and React Native courses.', hl: ['100% Free'], learns: ['flutter', 'react native', 'android', 'kotlin'] }),
    ],
    certs: [
      cert('mo-c-meta-a', 'Meta Android Developer Professional Certificate', 'Coursera', 'Beginner', 'Beginner-to-job-ready Android certificate with Kotlin projects.', 'Coursera plan (free to audit)', ['Kotlin', 'Android Studio', 'APIs', 'Testing'], U.cp('meta-android-developer')),
      cert('mo-c-meta-i', 'Meta iOS Developer Professional Certificate', 'Coursera', 'Beginner', 'Swift and SwiftUI certificate for iOS app development.', 'Coursera plan (free to audit)', ['Swift', 'SwiftUI', 'Xcode', 'APIs'], U.cp('meta-ios-developer')),
    ],
  },
  gamedev: {
    courses: [
      course('gd-ud-unity', 'Complete C# Unity Game Developer 2D', 'Udemy', 'Beginner to Intermediate', '30+ hours', U.ucourse('unitycourse'), { note: UDEMY_NOTE, desc: 'Learn Unity and C# by building several 2D games.', hl: ['Unity', 'C#'], learns: ['unity', 'c#', '2d', 'game'] }),
      course('gd-ud-unreal', 'Unreal Engine 5 C++ Developer', 'Udemy', 'Intermediate to Advanced', '30+ hours', U.ucourse('unrealcourse'), { note: UDEMY_NOTE, desc: 'Create 3D games in Unreal Engine with C++.', hl: ['Unreal', 'C++'], learns: ['unreal', 'c++', '3d', 'game'] }),
      course('gd-yt', 'Game Development Full Courses - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('Unity Unreal Godot game development full course for beginners'), { free: true, desc: 'Free full game development courses for Unity, Unreal and Godot.', hl: ['100% Free'], learns: ['unity', 'unreal', 'godot', 'game'] }),
    ],
    certs: [
      cert('gd-c-msu', 'Game Design and Development Specialization', 'Coursera', 'Beginner', 'Michigan State University specialisation covering design, Unity and a capstone game.', 'Coursera plan (free to audit)', ['Game design', 'Unity', 'C#', 'Capstone'], U.cspec('game-development')),
    ],
  },
  embedded: {
    courses: [
      course('em-cs-cu', 'Introduction to Embedded Systems Software and Development Environments', 'Coursera', 'Beginner', '4 weeks', U.cl('introduction-embedded-systems'), { free: true, note: 'Free to audit', desc: 'University of Colorado course on embedded C, toolchains, memory and build systems.', hl: ['Free to audit', 'Embedded C'], learns: ['embedded', 'c programming', 'microcontroller', 'toolchain', 'memory'] }),
      course('em-yt', 'Embedded Systems & Microcontroller Courses - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('embedded systems full course STM32 Arduino microcontroller'), { free: true, desc: 'Free full-length courses on Arduino, STM32, RTOS and embedded C.', hl: ['100% Free'], learns: ['embedded', 'stm32', 'arduino', 'rtos', 'uart', 'spi', 'i2c'] }),
    ],
    certs: [],
  },
  genai: {
    courses: [
      course('ga-cs-llm', 'Generative AI with Large Language Models', 'Coursera', 'Intermediate', '3 weeks', U.cl('generative-ai-with-llms'), { free: true, note: 'Free to audit', desc: 'DeepLearning.AI and AWS course on LLM lifecycle, fine-tuning and RLHF.', hl: ['Free to audit', 'LLM fine-tuning'], learns: ['llm', 'generative ai', 'fine-tuning', 'transformers', 'prompt engineering', 'rlhf'] }),
      course('ga-g-learn', 'Google Cloud Generative AI Learning Path', 'Google', 'Beginner to Intermediate', 'Self paced', 'https://cloud.google.com/learn/training/machinelearning-ai', { free: true, note: 'Free to learn; labs may use credits', desc: 'Official Google courses on generative AI, LLMs and responsible AI.', hl: ['Free', 'Official Google'], learns: ['generative ai', 'llm', 'prompt', 'vertex ai', 'responsible ai'] }),
      course('ga-yt', 'Neural Networks: Zero to Hero (Andrej Karpathy) - YouTube', 'YouTube', 'Intermediate to Advanced', '15+ hours', U.yt('Andrej Karpathy Neural Networks Zero to Hero'), { free: true, desc: 'Free video series that builds neural networks and GPT from scratch.', hl: ['100% Free', 'Build GPT'], learns: ['neural networks', 'gpt', 'transformers', 'llm', 'backpropagation'] }),
    ],
    certs: [
      cert('ga-c-ibm', 'IBM Generative AI Engineering Professional Certificate', 'IBM', 'Intermediate', 'Build LLM apps with LangChain, RAG and Hugging Face tools.', 'Coursera plan (free to audit)', ['LLMs', 'LangChain', 'RAG', 'Hugging Face'], U.cp('ibm-generative-ai-engineering')),
      cert('ga-c-aie', 'Google AI Essentials', 'Google', 'Beginner', 'Short Google certificate on practical use of generative AI at work.', 'Coursera plan (free to audit)', ['Prompting', 'AI tools', 'Responsible AI'], U.cl('google-ai-essentials')),
    ],
  },
  dataengg: {
    courses: [
      course('de-cs-gcp', 'Data Engineering, Big Data, and Machine Learning on GCP', 'Google', 'Intermediate', '2 months', U.cspec('gcp-data-machine-learning'), { free: true, note: COURSERA_NOTE, desc: 'Pipelines, BigQuery, Dataflow and ML on Google Cloud.', hl: ['Free to audit', 'BigQuery'], learns: ['data engineering', 'bigquery', 'dataflow', 'pipelines', 'etl', 'big data'] }),
      course('de-ud-sql', 'The Complete SQL Bootcamp', 'Udemy', 'Beginner', '9 hours', U.ucourse('the-complete-sql-bootcamp'), { note: UDEMY_NOTE, desc: 'SQL from basics to advanced joins, window functions and analytics queries.', hl: ['PostgreSQL', 'Window functions'], learns: ['sql', 'postgresql', 'joins', 'window functions', 'database'] }),
      course('de-yt', 'Data Engineering Full Courses - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('data engineering full course Spark Airflow Kafka'), { free: true, desc: 'Free full-length courses on Spark, Airflow, Kafka and warehouse design.', hl: ['100% Free'], learns: ['spark', 'airflow', 'kafka', 'etl', 'data warehouse'] }),
    ],
    certs: [
      cert('de-c-ibm', 'IBM Data Engineering Professional Certificate', 'IBM', 'Intermediate', 'Relational databases, ETL, Spark and data warehousing.', 'Coursera plan (free to audit)', ['SQL', 'ETL', 'Spark', 'Airflow'], U.cp('ibm-data-engineer')),
      cert('de-c-gde', 'Google Cloud Professional Data Engineer', 'Google', 'Advanced', 'Highly valued data engineering certification on Google Cloud.', 'USD 200', ['BigQuery', 'Dataflow', 'Pub/Sub', 'Pipelines'], U.gcert('data-engineer')),
    ],
  },
  analytics: {
    courses: [
      course('an-ud-pbi', 'Microsoft Power BI Desktop for Business Intelligence', 'Udemy', 'Beginner to Intermediate', '25 hours', U.ucourse('microsoft-power-bi-up-running-with-power-bi-desktop'), { note: UDEMY_NOTE, desc: 'Build Power BI dashboards, DAX measures and reports.', hl: ['Power BI', 'DAX'], learns: ['power bi', 'dax', 'dashboard', 'data visualization', 'business intelligence'] }),
      course('an-ud-tab', 'Tableau 2024 A-Z: Hands-On Tableau Training', 'Udemy', 'Beginner to Intermediate', '10 hours', U.ucourse('tableau10'), { note: UDEMY_NOTE, desc: 'Tableau from basics to dashboards with real data sets.', hl: ['Tableau', 'Dashboards'], learns: ['tableau', 'dashboard', 'data visualization'] }),
      course('an-cs-sql', 'SQL for Data Science', 'Coursera', 'Beginner', '4 weeks', U.cl('sql-for-data-science'), { free: true, note: 'Free to audit', desc: 'UC Davis course on SQL queries, filtering, joins and aggregation.', hl: ['Free to audit', 'SQL'], learns: ['sql', 'joins', 'aggregation', 'database', 'mysql'] }),
      course('an-yt', 'Data Analytics, Excel & Power BI Full Courses - YouTube', 'YouTube', 'Beginner to Intermediate', 'Self paced', U.yt('data analytics full course Excel SQL Power BI Python'), { free: true, desc: 'Free full-length data analytics courses with projects.', hl: ['100% Free'], learns: ['excel', 'sql', 'power bi', 'python', 'pandas', 'statistics'] }),
    ],
    certs: [
      cert('an-c-g', 'Google Data Analytics Professional Certificate', 'Google', 'Beginner', 'The most recognised entry-level data analyst certificate.', 'Coursera plan (free to audit)', ['Spreadsheets', 'SQL', 'Tableau', 'R', 'Data cleaning'], U.cp('google-data-analytics')),
      cert('an-c-ibm', 'IBM Data Analyst Professional Certificate', 'IBM', 'Beginner', 'Excel, SQL, Python, Cognos and visualisation with capstone.', 'Coursera plan (free to audit)', ['Excel', 'SQL', 'Python', 'Visualisation'], U.cp('ibm-data-analyst')),
      cert('an-c-gbi', 'Google Business Intelligence Professional Certificate', 'Google', 'Intermediate', 'BI dashboards, data models and pipelines.', 'Coursera plan (free to audit)', ['BI', 'Dashboards', 'Data modelling'], U.cp('google-business-intelligence')),
    ],
  },
  uiux: {
    courses: [
      course('ux-ud-figma', 'Figma UI UX Design Essentials', 'Udemy', 'Beginner', '12 hours', U.ucourse('figma-ux-ui-design-user-interface-essentials'), { note: UDEMY_NOTE, desc: 'Learn Figma with hands-on UI projects.', hl: ['Figma', 'UI projects'], learns: ['figma', 'ui design', 'prototyping', 'wireframe'] }),
      course('ux-yt', 'UI/UX Design Full Courses - YouTube', 'YouTube', 'Beginner to Intermediate', 'Self paced', U.yt('UI UX design full course Figma beginners'), { free: true, desc: 'Free full-length UI/UX and Figma courses.', hl: ['100% Free'], learns: ['figma', 'ux research', 'wireframe', 'prototyping', 'design system'] }),
    ],
    certs: [
      cert('ux-c-g', 'Google UX Design Professional Certificate', 'Google', 'Beginner', 'Industry recognised UX certificate with three portfolio projects.', 'Coursera plan (free to audit)', ['User research', 'Wireframes', 'Figma', 'Prototyping'], U.cp('google-ux-design')),
    ],
  },
  backend: {
    courses: [
      course('be-ud-node', 'NodeJS - The Complete Guide', 'Udemy', 'Intermediate', '40+ hours', U.ucourse('nodejs-the-complete-guide'), { note: UDEMY_NOTE, desc: 'REST APIs, authentication, SQL and MongoDB with Node.js.', hl: ['REST APIs', 'Auth'], learns: ['node.js', 'express', 'rest', 'api', 'authentication', 'sql', 'mongodb'] }),
      course('be-ud-sql', 'The Complete SQL Bootcamp', 'Udemy', 'Beginner', '9 hours', U.ucourse('the-complete-sql-bootcamp'), { note: UDEMY_NOTE, desc: 'SQL and PostgreSQL for backend developers.', hl: ['PostgreSQL'], learns: ['sql', 'postgresql', 'database', 'joins'] }),
      course('be-yt', 'Backend Development Full Courses - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('backend development full course REST API database authentication'), { free: true, desc: 'Free full-length backend courses covering APIs, databases and deployment.', hl: ['100% Free'], learns: ['api', 'rest', 'database', 'authentication', 'docker'] }),
    ],
    certs: [
      cert('be-c-ibm', 'IBM Back-End Development Professional Certificate', 'IBM', 'Intermediate', 'Node.js, Python/Django, databases, microservices and Docker.', 'Coursera plan (free to audit)', ['Node.js', 'Django', 'Databases', 'Docker'], U.cp('ibm-backend-development')),
      cert('be-c-meta', 'Meta Back-End Developer Professional Certificate', 'Coursera', 'Beginner', 'Python, Django, MySQL and APIs for backend roles.', 'Coursera plan (free to audit)', ['Python', 'Django', 'MySQL', 'APIs'], U.cp('meta-back-end-developer')),
    ],
  },
  qa: {
    courses: [
      course('qa-cs-umn', 'Software Testing and Automation Specialization', 'Coursera', 'Beginner to Intermediate', '4 months', U.cspec('software-testing-automation'), { free: true, note: COURSERA_NOTE, desc: 'University of Minnesota specialisation on test design, automation and coverage.', hl: ['Free to audit', 'Test automation'], learns: ['software testing', 'test automation', 'unit testing', 'test design', 'selenium'] }),
      course('qa-yt', 'Software Testing & Automation Full Courses - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('software testing automation full course Selenium Playwright'), { free: true, desc: 'Free full-length manual and automation testing courses.', hl: ['100% Free'], learns: ['manual testing', 'selenium', 'playwright', 'api testing', 'postman'] }),
    ],
    certs: [],
  },
  computervision: {
    courses: [
      course('cv-cs-cnn', 'Convolutional Neural Networks', 'Coursera', 'Intermediate', '4 weeks', U.cl('convolutional-neural-networks'), { free: true, note: 'Free to audit', desc: 'DeepLearning.AI course on CNNs, object detection and face recognition.', hl: ['Free to audit', 'Object detection'], learns: ['cnn', 'convolutional', 'object detection', 'computer vision', 'image', 'deep learning'] }),
      course('cv-yt', 'OpenCV & Computer Vision Full Courses - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('OpenCV computer vision full course freeCodeCamp'), { free: true, desc: 'Free OpenCV, YOLO and image processing courses.', hl: ['100% Free'], learns: ['opencv', 'yolo', 'image processing', 'object detection', 'python'] }),
    ],
    certs: [
      cert('cv-c-ibm', 'IBM AI Engineering Professional Certificate', 'IBM', 'Intermediate', 'Deep learning with Keras and PyTorch including computer vision.', 'Coursera plan (free to audit)', ['Deep learning', 'CNN', 'PyTorch'], U.cp('ai-engineer')),
      cert('cv-c-tf', 'DeepLearning.AI TensorFlow Developer Professional Certificate', 'Coursera', 'Intermediate', 'TensorFlow practice including image classification with CNNs.', 'Coursera plan (free to audit)', ['TensorFlow', 'CNN'], U.cp('tensorflow-in-practice')),
    ],
  },
  vlsi: {
    courses: [
      course('vl-cs-cad', 'VLSI CAD Part I: Logic', 'Coursera', 'Intermediate', '8 weeks', U.cl('vlsi-cad-logic'), { free: true, note: 'Free to audit', desc: 'University of Illinois course on Boolean logic, synthesis and verification algorithms.', hl: ['Free to audit'], learns: ['vlsi', 'digital logic', 'synthesis', 'verification', 'boolean'] }),
      course('vl-yt', 'VLSI Design & Verilog Full Courses - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('VLSI design Verilog SystemVerilog full course'), { free: true, desc: 'Free full-length VLSI, Verilog and RTL design courses.', hl: ['100% Free'], learns: ['verilog', 'systemverilog', 'rtl', 'fpga', 'vlsi', 'cmos'] }),
    ],
    certs: [],
  },
  robotics: {
    courses: [
      course('rb-cs-modern', 'Modern Robotics Specialization', 'Coursera', 'Intermediate to Advanced', '6 months', U.cspec('modernrobotics'), { free: true, note: COURSERA_NOTE, desc: 'Northwestern University specialisation on kinematics, dynamics, planning and control.', hl: ['Free to audit', 'Kinematics'], learns: ['robotics', 'kinematics', 'dynamics', 'control', 'motion planning'] }),
      course('rb-cs-upenn', 'Robotics Specialization', 'Coursera', 'Intermediate', '6 months', U.cspec('robotics'), { free: true, note: COURSERA_NOTE, desc: 'University of Pennsylvania specialisation on aerial robotics, mobility, perception and estimation.', hl: ['Free to audit'], learns: ['robotics', 'perception', 'estimation', 'mobile robots'] }),
      course('rb-yt', 'ROS 2 & Robotics Full Courses - YouTube', 'YouTube', 'Beginner to Advanced', 'Self paced', U.yt('ROS 2 robotics full course tutorial'), { free: true, desc: 'Free ROS 2, simulation and robot programming courses.', hl: ['100% Free'], learns: ['ros', 'ros2', 'gazebo', 'robot', 'slam', 'navigation'] }),
    ],
    certs: [
      cert('rb-c-modern', 'Modern Robotics Specialization (certificate)', 'Coursera', 'Advanced', 'Rigorous robotics fundamentals certificate from Northwestern University.', 'Coursera plan (free to audit)', ['Kinematics', 'Dynamics', 'Control'], U.cspec('modernrobotics')),
    ],
  },
  ev: {
    courses: [
      course('ev-yt', 'Electric Vehicle Technology Courses - YouTube', 'YouTube', 'Beginner to Intermediate', 'Self paced', U.yt('electric vehicle technology full course battery BMS motor controller'), { free: true, desc: 'Free full-length courses on EV architecture, batteries, BMS and motor control.', hl: ['100% Free'], learns: ['electric vehicle', 'battery', 'bms', 'motor control', 'charging', 'can bus'] }),
    ],
    certs: [],
  },
};

// ---------- generated, roadmap-driven items ----------
const generated = (d: CSDomain): Course[] => {
  const out: Course[] = [];
  (d.stages || []).forEach((st) => {
    const level: Lvl = st.id === 'beginner' ? 'Beginner' : st.id === 'intermediate' ? 'Intermediate' : 'Advanced';
    st.topics.forEach((t, i) => {
      const learns = [t.name.toLowerCase(), ...t.keyTools.map((k) => k.toLowerCase().replace(/\s*\(.*\)/, ''))];
      const query = `${t.name} ${d.title}`;
      out.push(course(`${d.id}-yt-${t.id}`, `${t.name}: free video tutorials`, 'YouTube', level, 'Self paced', U.yt(`${t.name} tutorial full course`), {
        free: true, gen: true, topicId: t.id, learns, desc: `Free YouTube tutorials that cover "${t.name}" for the ${st.id} stage of the ${d.title} roadmap.`, hl: ['100% Free', t.keyTools[0] || t.name],
      }));
      if (i % 2 === 0) {
        out.push(course(`${d.id}-cs-${t.id}`, `${t.name}: courses on Coursera`, 'Coursera', level, 'Self paced', U.cs(query), {
          free: true, note: 'Free to audit most courses; certificate is paid', gen: true, topicId: t.id, learns, desc: `University and industry courses on "${t.name}" from Coursera, filtered to ${d.title}.`, hl: ['Free to audit', 'University & industry partners'],
        }));
      } else {
        out.push(course(`${d.id}-ud-${t.id}`, `${t.name}: top-rated Udemy courses`, 'Udemy', level, 'Self paced', U.ud(query), {
          note: UDEMY_NOTE, gen: true, topicId: t.id, learns, desc: `Highest-rated Udemy courses on "${t.name}", sorted by rating.`, hl: ['Sorted by rating', 'Project based'],
        }));
      }
    });
  });
  return out;
};

const generic = (d: CSDomain): Course[] => [
  course(`${d.id}-inf`, `Infosys Springboard: ${d.title} learning paths`, 'Infosys Springboard', 'All Levels', 'Self paced', U.inf, {
    free: true, desc: `Free courses with certificates on Infosys Springboard. Sign in and search for "${d.title}" or the tools in your roadmap.`, hl: ['100% Free', 'Certificates', 'Industry content'],
    learns: [d.title.toLowerCase(), ...d.topTools.map((t) => t.toLowerCase())], gen: true,
  }),
  course(`${d.id}-ibm`, `IBM SkillsBuild: free learning plans for ${d.title}`, 'IBM', 'All Levels', 'Self paced', U.ibm, {
    free: true, desc: 'IBM SkillsBuild offers free courses and digital credentials. Search the catalogue for your domain.', hl: ['100% Free', 'IBM credentials'],
    learns: [d.title.toLowerCase(), ...d.topTools.map((t) => t.toLowerCase())], gen: true,
  }),
];

export const withCatalog = (d: CSDomain): CSDomain => {
  const f = FLAGSHIP[d.id] || { courses: [], certs: [] };
  return {
    ...d,
    recommendedCourses: [...f.courses, ...generic(d), ...generated(d)],
    industryCertifications: f.certs,
  };
};
