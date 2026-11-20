import { CSDomain, Course, Certification, RoadmapStage, RoadmapTopic, Internship, StageId } from '../types';

// ---------- tiny builders so each domain stays readable ----------
const C = (
  id: string, title: string, platform: string, skillLevel: Course['skillLevel'], duration: string,
  rating: number, studentsEnrolled: string, url: string, isFree: boolean, description: string,
  keyHighlights: string[], learns: string[], priceNote?: string
): Course => ({ id, title, platform, skillLevel, duration, rating, studentsEnrolled, url, isFree, description, keyHighlights, learns, priceNote });

const K = (
  id: string, title: string, provider: string, difficulty: Certification['difficulty'], avgExamFee: string,
  industryValue: string, keyTopics: string[], url: string, examCode?: string, isFree = false
): Certification => ({ id, title, provider, difficulty, avgExamFee, industryValue, keyTopics, url, examCode, isFree });

const T = (id: string, name: string, description: string, keyTools: string[]): RoadmapTopic => ({ id, name, description, keyTools });

const S = (
  id: StageId, title: string, subtitle: string, duration: string, topics: RoadmapTopic[], capName: string, capDesc: string
): RoadmapStage => ({ id, title, subtitle, duration, topics, capstones: [{ name: capName, description: capDesc }] });

const I = (
  id: string, domainId: string, roleTitle: string, companyName: string, companyLogoBg: string,
  locationType: Internship['locationType'], location: string, duration: string, stipend: string,
  requiredSkills: string[], description: string, responsibilities: string[], applyUrl: string, portalName: string
): Internship => ({
  id, domainId, roleTitle, companyName, companyLogoBg, locationType, location, duration, stipend, requiredSkills,
  postedDate: 'Check official portal for live status', deadline: 'Rolling – see portal', description, responsibilities,
  applyUrl, portalName, jobReqId: 'See official portal', batchSeason: '2026–27 Hiring Cycle'
});

export const NEW_DOMAINS: CSDomain[] = [
  // ================= GENERATIVE AI =================
  {
    id: 'genai', title: 'Generative AI & LLM Engineering', iconName: 'Sparkles', categoryTag: 'AI & Data',
    shortDescription: 'Build products on top of large language models: prompting, RAG pipelines, fine-tuning, agents and evaluation.',
    fullDescription: 'Generative AI engineers design applications powered by LLMs: prompt engineering, retrieval-augmented generation (RAG) with vector databases, fine-tuning with LoRA, tool-using agents, evaluation and safe deployment on cloud platforms.',
    avgSalary: '$110,000 - $170,000 / yr', hiringDemand: 'Rapidly Growing',
    topTools: ['Python', 'LangChain', 'Hugging Face', 'PyTorch', 'Vector DBs', 'OpenAI / Gemini APIs', 'FastAPI'],
    recommendedCourses: [
      C('gai-1', 'Hugging Face LLM Course', 'Hugging Face (Open Course)', 'Beginner to Intermediate', 'Self-paced (~30 hours)', 4.8, '300,000+', 'https://huggingface.co/learn/llm-course', true,
        'Hands-on open course covering transformers, tokenizers, fine-tuning and sharing models with the Hugging Face ecosystem.', ['100% Free', 'Notebook-based', 'Open-source tooling'], ['Hugging Face', 'PyTorch', 'Large Language Models', 'Python']),
      C('gai-2', 'Neural Networks: Zero to Hero', 'Andrej Karpathy (Free Video Series)', 'Intermediate', '~20 hours', 4.9, '1,000,000+', 'https://karpathy.ai/zero-to-hero.html', true,
        'Builds backpropagation, a GPT and a tokenizer from scratch in code. The best way to truly understand how LLMs work.', ['Builds GPT from scratch', 'Free', 'Deep intuition'], ['PyTorch', 'Deep Learning', 'Transformers', 'Python']),
      C('gai-3', 'Generative AI with Large Language Models', 'Coursera (DeepLearning.AI + AWS)', 'Intermediate', '~16 hours', 4.8, '200,000+', 'https://www.coursera.org/learn/generative-ai-with-llms', false,
        'Covers the LLM lifecycle: pre-training, instruction fine-tuning, RLHF, evaluation and deployment trade-offs.', ['Industry-backed', 'Fine-tuning & RLHF', 'Shareable certificate'], ['Fine-tuning', 'LLMs', 'AWS', 'Python'], 'Free to audit • Certificate is paid'),
      C('gai-4', 'LangChain Academy & DeepLearning.AI Short Courses', 'LangChain / DeepLearning.AI (Free)', 'Intermediate', '1–2 hours each', 4.7, '500,000+', 'https://www.deeplearning.ai/short-courses/', true,
        'Short project-based lessons on RAG, agents, function calling, vector databases and evaluation.', ['Free short courses', 'RAG & Agents', 'Project-based'], ['LangChain', 'RAG', 'Vector DBs', 'Agents', 'Prompt Engineering']),
      C('gai-5', 'Hugging Face AI Agents Course', 'Hugging Face (Open Course)', 'Advanced', 'Self-paced (~25 hours)', 4.7, '100,000+', 'https://huggingface.co/learn/agents-course/unit0/introduction', true,
        'Learn to design, build and evaluate tool-using AI agents with popular open-source frameworks.', ['Agent frameworks', 'Free', 'Certificate of completion'], ['Agents', 'LangChain', 'Python', 'Hugging Face']),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Python, ML basics and how LLMs work', '4 - 6 weeks', [
        T('gai-t1', 'Python for AI', 'Functions, OOP, virtual environments, notebooks and API calls with requests', ['Python', 'Jupyter', 'pip']),
        T('gai-t2', 'Machine Learning Foundations', 'Supervised learning, evaluation metrics and the training loop', ['Scikit-learn', 'NumPy', 'Pandas']),
        T('gai-t3', 'LLM Basics & Prompt Engineering', 'Tokens, context windows, system prompts, few-shot and chain-of-thought prompting', ['Prompt Engineering', 'OpenAI / Gemini APIs']),
      ], 'Prompt-Powered Study Assistant', 'Build a CLI/web assistant that summarises notes with well-engineered prompts and structured JSON output.'),
      S('intermediate', 'Stage 2: Intermediate', 'RAG, embeddings and model APIs', '6 - 8 weeks', [
        T('gai-t4', 'Embeddings & Vector Databases', 'Chunking strategies, embeddings, similarity search, metadata filters', ['Vector DBs', 'FAISS', 'Chroma']),
        T('gai-t5', 'Retrieval-Augmented Generation', 'Build RAG pipelines, re-ranking, citations and grounding', ['LangChain', 'RAG', 'Hugging Face']),
        T('gai-t6', 'Serving LLM Apps', 'REST APIs, streaming responses, caching and rate-limit handling', ['FastAPI', 'Docker', 'Python']),
      ], 'Chat With Your Documents (RAG)', 'Create a RAG app with PDF ingestion, citations and an evaluation set to measure answer quality.'),
      S('advanced', 'Stage 3: Advanced', 'Fine-tuning, agents and production LLMOps', '6 - 8 weeks', [
        T('gai-t7', 'Fine-tuning (LoRA / PEFT)', 'Instruction tuning, dataset curation, parameter-efficient fine-tuning', ['PyTorch', 'Hugging Face', 'LoRA']),
        T('gai-t8', 'Agents & Tool Use', 'Function calling, planning loops, multi-agent patterns, guardrails', ['LangChain', 'Agents']),
        T('gai-t9', 'Evaluation, Safety & Deployment', 'LLM evals, hallucination checks, prompt-injection defence, cloud deployment', ['Evals', 'AWS', 'Docker']),
      ], 'Domain-Specific AI Agent', 'Ship a tool-using agent with evaluation dashboard, guardrails and cloud deployment.'),
    ],
    industryCertifications: [
      K('gai-c1', 'NVIDIA-Certified Associate: Generative AI LLMs', 'NVIDIA', 'Intermediate', '$135', 'Vendor-recognised proof of LLM fundamentals, prompt engineering and deployment concepts.', ['LLM Fundamentals', 'Prompting', 'Fine-tuning', 'Safety'], 'https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-associate/', 'NCA-GENL'),
      K('gai-c2', 'Microsoft Azure AI Fundamentals', 'Microsoft', 'Beginner', '$99 (price varies by country)', 'Entry-level credential covering AI workloads, responsible AI and Azure OpenAI basics.', ['AI Workloads', 'Responsible AI', 'Azure OpenAI'], 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/', 'AI-900'),
    ],
    openSources: [{ label: 'roadmap.sh – AI Engineer', url: 'https://roadmap.sh/ai-engineer' }, { label: 'roadmap.sh – Prompt Engineering', url: 'https://roadmap.sh/prompt-engineering' }],
    internshipKeywords: ['generative ai', 'machine learning', 'llm'],
    internships: [
      I('int-gai-1', 'genai', 'Generative AI Engineering Intern', 'Microsoft', 'bg-blue-600 text-white', 'Hybrid', 'Bengaluru / Hyderabad, India', '6 months', 'As per company norms', ['Python', 'LLMs', 'Prompt Engineering'], 'Work with Microsoft engineering teams on applied AI features that use large language models.', ['Prototype LLM-powered features', 'Evaluate output quality', 'Document experiments'], 'https://careers.microsoft.com/', 'Microsoft Careers'),
      I('int-gai-2', 'genai', 'AI / ML Research Intern', 'Google', 'bg-white text-slate-900', 'On-site', 'Bengaluru, Karnataka', '3-6 months', 'As per company norms', ['Python', 'Machine Learning', 'PyTorch'], 'Contribute to ML and generative AI projects across Google product and research teams.', ['Run ML experiments', 'Analyse model behaviour', 'Share results with the team'], 'https://www.google.com/about/careers/applications/', 'Google Careers'),
      I('int-gai-3', 'genai', 'Applied AI Intern', 'Infosys', 'bg-sky-700 text-white', 'Hybrid', 'Bengaluru, Karnataka', '3-6 months', 'As per company norms', ['Python', 'NLP', 'APIs'], 'Join the applied AI practice building enterprise generative AI solutions.', ['Build proofs of concept', 'Integrate LLM APIs', 'Test with business data'], 'https://www.infosys.com/careers/', 'Infosys Careers'),
    ],
  },

  // ================= DATA ENGINEERING =================
  {
    id: 'dataengg', title: 'Data Engineering & Big Data', iconName: 'Database', categoryTag: 'AI & Data',
    shortDescription: 'Design pipelines and warehouses that move, clean and serve data at scale using Spark, Kafka, Airflow and cloud platforms.',
    fullDescription: 'Data engineers build reliable batch and streaming pipelines: SQL and data modelling, ETL/ELT with Airflow and dbt, distributed processing with Apache Spark, streaming with Kafka and lakehouse storage on AWS, Azure or GCP.',
    avgSalary: '$105,000 - $160,000 / yr', hiringDemand: 'Extremely High',
    topTools: ['SQL', 'Python', 'Apache Spark', 'Apache Kafka', 'Airflow', 'dbt', 'Snowflake / BigQuery'],
    recommendedCourses: [
      C('de-1', 'Data Engineering Zoomcamp', 'DataTalks.Club (Open Source Course)', 'Intermediate', '9 weeks (cohort or self-paced)', 4.8, '60,000+', 'https://github.com/DataTalksClub/data-engineering-zoomcamp', true,
        'Free, project-based course covering Docker, Terraform, Airflow, dbt, Spark, Kafka and a cloud data warehouse.', ['100% Free', 'End-to-end project', 'Active community'], ['Docker', 'Terraform', 'Airflow', 'dbt', 'Apache Spark', 'Kafka']),
      C('de-2', 'Mode SQL Tutorial', 'Mode Analytics (Free)', 'Beginner', '~15 hours', 4.7, '1,000,000+', 'https://mode.com/sql-tutorial/', true,
        'Interactive SQL tutorial from basics to window functions and performance tuning.', ['Interactive', 'Free', 'Real datasets'], ['SQL', 'Database Design']),
      C('de-3', 'Apache Kafka 101', 'Confluent Developer (Free)', 'Intermediate', '~3 hours', 4.7, '150,000+', 'https://developer.confluent.io/courses/apache-kafka/events/', true,
        'Short, clear course on events, topics, partitions, producers and consumers.', ['Official vendor course', 'Free', 'Hands-on'], ['Kafka', 'Streaming']),
      C('de-4', 'IBM Data Engineering Professional Certificate', 'Coursera (IBM)', 'Beginner to Intermediate', '~5 months', 4.6, '150,000+', 'https://www.coursera.org/professional-certificates/ibm-data-engineer', false,
        'Structured programme covering Python, SQL, relational/NoSQL databases, ETL, Spark and Airflow.', ['Industry certificate', 'Hands-on labs', 'Capstone project'], ['Python', 'SQL', 'ETL', 'Apache Spark', 'Airflow'], 'Free to audit • Certificate is paid'),
      C('de-5', 'Databricks Free Training (Lakehouse & Spark)', 'Databricks Academy', 'Intermediate to Advanced', 'Self-paced', 4.6, '200,000+', 'https://www.databricks.com/learn/training/home', true,
        'Official free self-paced courses on Spark, Delta Lake and the lakehouse architecture.', ['Official vendor training', 'Free', 'Delta Lake'], ['Apache Spark', 'Delta Lake', 'Python', 'SQL']),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'SQL, Python and data fundamentals', '4 - 6 weeks', [
        T('de-t1', 'SQL Mastery', 'Joins, aggregations, window functions, indexes and query plans', ['SQL', 'PostgreSQL', 'MySQL']),
        T('de-t2', 'Python for Data', 'Pandas, file formats (CSV/JSON/Parquet), APIs and scripting', ['Python', 'Pandas']),
        T('de-t3', 'Linux, Git & Data Modelling', 'Shell basics, version control, star schema and normalisation', ['Linux', 'Git', 'Database Design']),
      ], 'Sales Data Warehouse', 'Model a star schema in PostgreSQL and load a public sales dataset using Python scripts.'),
      S('intermediate', 'Stage 2: Intermediate', 'ETL, orchestration and distributed processing', '6 - 8 weeks', [
        T('de-t4', 'ETL / ELT & Orchestration', 'Batch pipelines, scheduling, retries, data quality checks', ['Airflow', 'dbt', 'Python']),
        T('de-t5', 'Distributed Processing with Spark', 'DataFrames, partitioning, joins and performance tuning', ['Apache Spark', 'PySpark', 'Hadoop']),
        T('de-t6', 'Cloud Data Warehouses & Containers', 'BigQuery/Snowflake basics, Docker, infrastructure as code', ['BigQuery', 'Docker', 'Terraform']),
      ], 'Automated Batch Pipeline', 'Schedule an Airflow DAG that ingests data, transforms it with Spark/dbt and loads it into a cloud warehouse.'),
      S('advanced', 'Stage 3: Advanced', 'Streaming, lakehouse and production reliability', '6 - 8 weeks', [
        T('de-t7', 'Streaming with Kafka', 'Event-driven design, exactly-once semantics, stream processing', ['Kafka', 'Spark Streaming']),
        T('de-t8', 'Lakehouse & Data Governance', 'Delta Lake / Iceberg, cataloguing, lineage and access control', ['Delta Lake', 'Data Governance']),
        T('de-t9', 'Monitoring, Testing & CI/CD for Data', 'Great Expectations, alerting, cost control and CI for pipelines', ['CI/CD', 'Great Expectations', 'Cloud']),
      ], 'Real-Time Analytics Platform', 'Stream clickstream events through Kafka into a lakehouse and serve live dashboards with monitoring.'),
    ],
    industryCertifications: [
      K('de-c1', 'Databricks Certified Data Engineer Associate', 'Databricks', 'Intermediate', '$200', 'Widely requested credential for Spark and lakehouse engineering roles.', ['Spark SQL', 'Delta Lake', 'ELT Pipelines'], 'https://www.databricks.com/learn/certification/data-engineer-associate'),
      K('de-c2', 'AWS Certified Data Engineer – Associate', 'Amazon Web Services', 'Intermediate', '$150', 'Validates ability to build and operate data pipelines on AWS.', ['Ingestion', 'Transformation', 'Security', 'Operations'], 'https://aws.amazon.com/certification/certified-data-engineer-associate/', 'DEA-C01'),
      K('de-c3', 'Google Cloud Professional Data Engineer', 'Google Cloud', 'Advanced', '$200', 'High-signal certification for designing data processing systems on GCP.', ['BigQuery', 'Dataflow', 'Pub/Sub'], 'https://cloud.google.com/learn/certification/data-engineer'),
    ],
    openSources: [{ label: 'DataTalks.Club Data Engineering Zoomcamp (open source)', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp' }, { label: 'roadmap.sh – Data Analyst foundations', url: 'https://roadmap.sh/data-analyst' }],
    internshipKeywords: ['data engineer', 'big data', 'etl'],
    internships: [
      I('int-de-1', 'dataengg', 'Data Engineering Intern', 'Amazon', 'bg-amber-500 text-slate-950', 'Hybrid', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['SQL', 'Python', 'ETL'], 'Build and operate data pipelines that power analytics at scale.', ['Develop ETL jobs', 'Write SQL transformations', 'Monitor data quality'], 'https://www.amazon.jobs/', 'Amazon Jobs'),
      I('int-de-2', 'dataengg', 'Big Data Intern', 'Flipkart', 'bg-blue-500 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Apache Spark', 'SQL', 'Python'], 'Work on large-scale data platforms supporting e-commerce analytics.', ['Process data with Spark', 'Optimise queries', 'Document pipelines'], 'https://www.flipkartcareers.com/', 'Flipkart Careers'),
      I('int-de-3', 'dataengg', 'Data Platform Intern', 'Tata Consultancy Services', 'bg-slate-700 text-white', 'Hybrid', 'Bengaluru, Karnataka', '3-6 months', 'As per company norms', ['SQL', 'Cloud', 'Python'], 'Join data engineering practice delivering cloud data platforms to global clients.', ['Build data models', 'Support migrations', 'Write tests'], 'https://www.tcs.com/careers', 'TCS Careers'),
    ],
  },

  // ================= DATA ANALYTICS =================
  {
    id: 'analytics', title: 'Data Analytics & Business Intelligence', iconName: 'Database', categoryTag: 'AI & Data',
    shortDescription: 'Turn raw data into decisions with SQL, Excel, Python, Power BI / Tableau dashboards and clear data storytelling.',
    fullDescription: 'Data analysts clean and explore data, write SQL, run statistical analysis, build interactive Power BI or Tableau dashboards and present insights that guide business decisions. One of the most accessible entry points into the data field.',
    avgSalary: '$65,000 - $110,000 / yr', hiringDemand: 'Extremely High',
    topTools: ['SQL', 'Excel', 'Python', 'Power BI', 'Tableau', 'Pandas', 'Statistics'],
    recommendedCourses: [
      C('da-1', 'Kaggle Learn: Python, Pandas, SQL & Data Visualization', 'Kaggle (Free)', 'Beginner', '~25 hours', 4.8, '3,000,000+', 'https://www.kaggle.com/learn', true,
        'Bite-sized interactive micro-courses with notebooks and free completion certificates.', ['100% Free', 'Browser-based', 'Certificates'], ['Python', 'Pandas', 'SQL', 'Data Visualization']),
      C('da-2', 'Google Data Analytics Professional Certificate', 'Coursera (Google)', 'Beginner', '~6 months', 4.8, '1,000,000+', 'https://www.coursera.org/professional-certificates/google-data-analytics', false,
        'Job-focused programme on spreadsheets, SQL, R and Tableau with a case-study capstone.', ['Entry-level friendly', 'Capstone portfolio', 'Employer recognised'], ['Excel (Advanced)', 'SQL', 'Tableau', 'Data Analysis', 'R'], 'Free to audit • Certificate is paid'),
      C('da-3', 'Data Analysis with Python', 'freeCodeCamp (Free)', 'Beginner to Intermediate', '~300 hours', 4.8, '500,000+', 'https://www.freecodecamp.org/learn/data-analysis-with-python/', true,
        'Learn NumPy, Pandas, Matplotlib and Seaborn with projects and a free verified certificate.', ['Free certificate', 'Project-based'], ['Python', 'Pandas', 'NumPy', 'Data Visualization']),
      C('da-4', 'Tableau Free Training Videos', 'Tableau (Salesforce)', 'Beginner to Intermediate', 'Self-paced', 4.6, '500,000+', 'https://www.tableau.com/learn/training', true,
        'Official free video library for building charts, dashboards and calculated fields in Tableau.', ['Official vendor training', 'Free'], ['Tableau', 'Data Visualization']),
      C('da-5', 'IBM Data Analyst Professional Certificate', 'Coursera (IBM)', 'Intermediate', '~4 months', 4.6, '400,000+', 'https://www.coursera.org/professional-certificates/ibm-data-analyst', false,
        'Covers Excel, SQL, Python, Cognos and dashboards through hands-on labs and a capstone.', ['Hands-on labs', 'Portfolio capstone'], ['Excel (Advanced)', 'SQL', 'Python', 'Data Analysis'], 'Free to audit • Certificate is paid'),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Excel, SQL and statistics basics', '4 - 5 weeks', [
        T('da-t1', 'Excel for Analysis', 'Formulas, lookups, pivot tables and data cleaning', ['Excel', 'Google Sheets']),
        T('da-t2', 'SQL for Analysts', 'SELECT, joins, group by, subqueries and CTEs', ['SQL', 'MySQL', 'PostgreSQL']),
        T('da-t3', 'Statistics Essentials', 'Descriptive statistics, distributions, correlation and hypothesis tests', ['Statistics']),
      ], 'Sales Performance Analysis', 'Clean a retail dataset in Excel, answer business questions in SQL and summarise findings.'),
      S('intermediate', 'Stage 2: Intermediate', 'Python and dashboards', '5 - 6 weeks', [
        T('da-t4', 'Python for Data Analysis', 'Pandas, NumPy, EDA and plotting with Matplotlib / Seaborn', ['Python', 'Pandas', 'NumPy']),
        T('da-t5', 'Power BI Dashboards', 'Data modelling, DAX measures and interactive reports', ['Power BI', 'DAX']),
        T('da-t6', 'Tableau & Visual Design', 'Charts, dashboards, storytelling principles', ['Tableau', 'Data Visualization']),
      ], 'Interactive Executive Dashboard', 'Build a Power BI or Tableau dashboard with KPIs, filters and drill-through for a business case.'),
      S('advanced', 'Stage 3: Advanced', 'Experimentation, automation and storytelling', '4 - 6 weeks', [
        T('da-t7', 'A/B Testing & Advanced Statistics', 'Experiment design, confidence intervals, regression basics', ['Statistics', 'Scikit-learn']),
        T('da-t8', 'Automation & Reporting Pipelines', 'Scheduled reports, APIs and SQL optimisation', ['Python', 'SQL', 'Git']),
        T('da-t9', 'Data Storytelling & Portfolio', 'Presenting insights, case-study write-ups, GitHub/portfolio', ['Data Storytelling', 'GitHub']),
      ], 'End-to-End Analytics Case Study', 'Publish a portfolio case study: question, data, analysis, dashboard and recommendations.'),
    ],
    industryCertifications: [
      K('da-c1', 'Microsoft Power BI Data Analyst Associate', 'Microsoft', 'Intermediate', '$165 (varies by country)', 'The standard credential for Power BI analyst roles.', ['Data Prep', 'Modelling', 'Visualisation', 'DAX'], 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/', 'PL-300'),
      K('da-c2', 'Tableau Desktop Specialist', 'Tableau (Salesforce)', 'Beginner', '$100', 'Entry-level proof of Tableau skills.', ['Connecting Data', 'Charts', 'Dashboards'], 'https://www.tableau.com/learn/certification/desktop-specialist'),
    ],
    openSources: [{ label: 'roadmap.sh – Data Analyst', url: 'https://roadmap.sh/data-analyst' }],
    internshipKeywords: ['data analyst', 'business analyst', 'power bi'],
    internships: [
      I('int-da-1', 'analytics', 'Data Analyst Intern', 'Accenture', 'bg-purple-600 text-white', 'Hybrid', 'Bengaluru, Karnataka', '3-6 months', 'As per company norms', ['SQL', 'Excel', 'Power BI'], 'Support analytics teams delivering dashboards and insights for enterprise clients.', ['Clean and analyse data', 'Build dashboards', 'Present insights'], 'https://www.accenture.com/in-en/careers', 'Accenture Careers'),
      I('int-da-2', 'analytics', 'Business Intelligence Intern', 'Deloitte', 'bg-emerald-600 text-white', 'Hybrid', 'Bengaluru, Karnataka', '3-6 months', 'As per company norms', ['SQL', 'Tableau', 'Statistics'], 'Work on BI reporting and analytics projects for consulting engagements.', ['Create reports', 'Validate data', 'Support client workshops'], 'https://www2.deloitte.com/in/en/careers.html', 'Deloitte Careers'),
      I('int-da-3', 'analytics', 'Analytics Intern', 'Wipro', 'bg-teal-600 text-white', 'Hybrid', 'Bengaluru, Karnataka', '3-6 months', 'As per company norms', ['Excel', 'SQL', 'Python'], 'Contribute to analytics delivery across industries.', ['Prepare datasets', 'Run analyses', 'Document findings'], 'https://careers.wipro.com/', 'Wipro Careers'),
    ],
  },

  // ================= UI / UX =================
  {
    id: 'uiux', title: 'UI/UX & Product Design', iconName: 'Layers', categoryTag: 'Web & App',
    shortDescription: 'Design intuitive, accessible digital products: user research, wireframes, prototypes in Figma and design systems.',
    fullDescription: 'UI/UX designers research user needs, craft wireframes and high-fidelity prototypes in Figma, test usability, follow accessibility standards and collaborate with engineers through design systems.',
    avgSalary: '$70,000 - $125,000 / yr', hiringDemand: 'High',
    topTools: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility', 'HTML / CSS'],
    recommendedCourses: [
      C('ux-1', 'Google UX Design Professional Certificate', 'Coursera (Google)', 'Beginner', '~6 months', 4.8, '1,000,000+', 'https://www.coursera.org/professional-certificates/google-ux-design', false,
        'Complete beginner-friendly programme with three portfolio projects covering research, Figma and usability testing.', ['3 portfolio projects', 'No experience needed'], ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'], 'Free to audit • Certificate is paid'),
      C('ux-2', 'Figma Learn Design', 'Figma (Free)', 'Beginner', 'Self-paced', 4.7, '1,000,000+', 'https://www.figma.com/learn-design/', true,
        'Official free lessons on design fundamentals, auto-layout, components and prototyping.', ['Official', 'Free'], ['Figma', 'UI/UX Design', 'Design Systems']),
      C('ux-3', 'Laws of UX', 'Jon Yablonski (Free Reference)', 'All Levels', 'Self-paced (~2 hours)', 4.8, '500,000+', 'https://lawsofux.com/', true,
        'Collection of design principles and psychology that shape better interfaces.', ['Free', 'Quick reference'], ['UI/UX Design', 'User Research']),
      C('ux-4', 'UI / UX Design Specialization', 'Coursera (CalArts)', 'Beginner to Intermediate', '~4 months', 4.7, '150,000+', 'https://www.coursera.org/specializations/ui-ux-design', false,
        'Visual design, web design and interaction design taught by CalArts faculty.', ['Visual design focus', 'Portfolio project'], ['UI/UX Design', 'Prototyping', 'HTML', 'CSS'], 'Free to audit • Certificate is paid'),
      C('ux-5', 'Interaction Design Foundation Courses', 'Interaction Design Foundation', 'Intermediate to Advanced', 'Self-paced', 4.6, '500,000+', 'https://www.interaction-design.org/courses', false,
        'In-depth courses on UX research, design systems, accessibility and information architecture.', ['In-depth theory', 'Industry-recognised'], ['User Research', 'Accessibility', 'Design Systems'], 'Membership required'),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Design thinking and visual basics', '3 - 4 weeks', [
        T('ux-t1', 'Design Thinking & UX Basics', 'Empathise, define, ideate, prototype and test', ['UX Research', 'Design Thinking']),
        T('ux-t2', 'Visual Design Fundamentals', 'Typography, colour, layout, spacing and hierarchy', ['Typography', 'Colour Theory']),
        T('ux-t3', 'Figma Essentials', 'Frames, auto-layout, components and variants', ['Figma']),
      ], 'Redesign a Familiar App Screen', 'Redesign one screen of an existing app in Figma and explain your decisions.'),
      S('intermediate', 'Stage 2: Intermediate', 'Research, prototyping and testing', '4 - 6 weeks', [
        T('ux-t4', 'User Research & Personas', 'Interviews, surveys, journey maps and personas', ['User Research', 'Personas']),
        T('ux-t5', 'Wireframes & Interactive Prototypes', 'Low to high-fidelity flows, interactions and micro-animations', ['Figma', 'Prototyping']),
        T('ux-t6', 'Usability Testing', 'Test plans, moderated tests, heuristic evaluation', ['Usability Testing']),
      ], 'End-to-End Mobile App Design', 'Research, design and test a mobile app flow, with a clickable Figma prototype.'),
      S('advanced', 'Stage 3: Advanced', 'Design systems, accessibility and handoff', '4 - 6 weeks', [
        T('ux-t7', 'Design Systems', 'Tokens, component libraries, documentation and governance', ['Design Systems', 'Figma']),
        T('ux-t8', 'Accessibility (WCAG)', 'Contrast, keyboard navigation, screen-reader friendly design', ['Accessibility', 'WCAG']),
        T('ux-t9', 'Dev Handoff & Portfolio', 'HTML/CSS basics for designers, specs, case studies', ['HTML', 'CSS', 'Portfolio']),
      ], 'Portfolio With 3 Case Studies', 'Publish a portfolio site with three detailed case studies including problem, process and outcomes.'),
    ],
    industryCertifications: [
      K('ux-c1', 'Google UX Design Certificate', 'Google / Coursera', 'Beginner', 'Coursera subscription', 'Widely recognised entry credential for UX roles.', ['Research', 'Wireframes', 'Prototypes'], 'https://www.coursera.org/professional-certificates/google-ux-design'),
      K('ux-c2', 'NN/g UX Certification', 'Nielsen Norman Group', 'Advanced', 'Paid (per course exam)', 'Highly respected credential in the UX industry.', ['Usability', 'Research', 'Interaction Design'], 'https://www.nngroup.com/ux-certification/'),
    ],
    openSources: [{ label: 'roadmap.sh – UX Design', url: 'https://roadmap.sh/ux-design' }],
    internshipKeywords: ['ui ux design', 'product design', 'figma'],
    internships: [
      I('int-ux-1', 'uiux', 'UX Design Intern', 'Adobe', 'bg-red-600 text-white', 'Hybrid', 'Bengaluru / Noida, India', '6 months', 'As per company norms', ['Figma', 'User Research', 'Prototyping'], 'Design features for creative products alongside senior designers.', ['Create wireframes', 'Run usability tests', 'Present design rationale'], 'https://careers.adobe.com/', 'Adobe Careers'),
      I('int-ux-2', 'uiux', 'Product Design Intern', 'Zoho', 'bg-rose-600 text-white', 'On-site', 'Chennai, Tamil Nadu', '3-6 months', 'As per company norms', ['Figma', 'UI Design', 'Prototyping'], 'Design interfaces for enterprise and consumer products.', ['Design UI flows', 'Build prototypes', 'Work with engineers'], 'https://www.zoho.com/careers/', 'Zoho Careers'),
      I('int-ux-3', 'uiux', 'UI/UX Intern', 'Freshworks', 'bg-emerald-600 text-white', 'Hybrid', 'Chennai / Bengaluru, India', '3-6 months', 'As per company norms', ['Figma', 'Design Systems'], 'Contribute to product design for a global SaaS company.', ['Design components', 'Test with users', 'Maintain design system'], 'https://www.freshworks.com/company/careers/', 'Freshworks Careers'),
    ],
  },

  // ================= BACKEND JAVA =================
  {
    id: 'backend', title: 'Backend Engineering (Java & Spring)', iconName: 'Code2', categoryTag: 'Web & App',
    shortDescription: 'Build secure, scalable server-side systems with Java, Spring Boot, databases, microservices and system design.',
    fullDescription: 'Backend engineers design REST APIs and microservices using Java and Spring Boot, model data in SQL/NoSQL databases, secure applications, add caching and messaging, and apply system-design principles for scale. Java backend roles dominate enterprise and product hiring in India.',
    avgSalary: '$90,000 - $150,000 / yr', hiringDemand: 'Extremely High',
    topTools: ['Java', 'Spring Boot', 'SQL', 'Hibernate / JPA', 'Redis', 'Kafka', 'Docker'],
    recommendedCourses: [
      C('be-1', 'Java Programming MOOC', 'University of Helsinki (Free)', 'Beginner', '~14 weeks', 4.8, '300,000+', 'https://java-programming.mooc.fi/', true,
        'Excellent free university course teaching Java and object-oriented programming from scratch with auto-graded exercises.', ['100% Free', 'University course', 'Auto-graded exercises'], ['Java', 'Object-Oriented Programming', 'Data Structures & Algorithms']),
      C('be-2', 'Spring Academy Courses', 'Spring (Official, Free)', 'Intermediate', 'Self-paced', 4.7, '200,000+', 'https://spring.academy/', true,
        'Official courses on Spring Boot, Spring Data and building REST APIs by the Spring team.', ['Official', 'Hands-on labs'], ['Spring Boot', 'REST APIs', 'Hibernate / JPA', 'Java']),
      C('be-3', 'PostgreSQL Tutorial', 'postgresqltutorial.com (Free)', 'Beginner to Intermediate', 'Self-paced', 4.6, '500,000+', 'https://www.postgresqltutorial.com/', true,
        'Clear SQL and PostgreSQL tutorials covering queries, indexes, transactions and performance.', ['Free', 'Practical examples'], ['SQL', 'PostgreSQL', 'Database Design']),
      C('be-4', 'System Design Primer', 'GitHub (Open Source)', 'Intermediate to Advanced', 'Self-paced', 4.9, '300,000+ stars', 'https://github.com/donnemartin/system-design-primer', true,
        'Popular open-source guide to scalability, load balancing, caching, databases and interview-style designs.', ['Open source', 'Interview-ready'], ['System Design', 'Microservices', 'Redis']),
      C('be-5', 'Docker & Containers for Developers', 'Docker (Official Docs)', 'Intermediate', 'Self-paced', 4.6, '1,000,000+', 'https://docs.docker.com/get-started/', true,
        'Official guide to containerising applications and using Docker Compose.', ['Official', 'Free'], ['Docker', 'CI/CD']),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Java, OOP and SQL', '5 - 6 weeks', [
        T('be-t1', 'Core Java & OOP', 'Classes, interfaces, collections, exceptions and streams', ['Java', 'Object-Oriented Programming']),
        T('be-t2', 'Data Structures & Algorithms', 'Arrays, lists, maps, trees, sorting and complexity', ['Data Structures & Algorithms']),
        T('be-t3', 'SQL & Git', 'Relational modelling, joins, indexes and version control', ['SQL', 'MySQL', 'Git']),
      ], 'Library Management Console App', 'Build a Java application with OOP design, collections and a relational database.'),
      S('intermediate', 'Stage 2: Intermediate', 'Spring Boot and REST APIs', '6 - 8 weeks', [
        T('be-t4', 'Spring Boot & REST APIs', 'Controllers, services, validation, exception handling and DTOs', ['Spring Boot', 'REST APIs', 'Postman']),
        T('be-t5', 'JPA / Hibernate & Transactions', 'Entity mapping, repositories, transactions and N+1 problems', ['Hibernate / JPA', 'PostgreSQL']),
        T('be-t6', 'Security & Testing', 'Spring Security, JWT, JUnit and Mockito', ['Spring Security', 'JWT', 'JUnit']),
      ], 'Secure REST API for an E-Commerce Store', 'Create a Spring Boot API with JWT auth, JPA persistence, validation and unit tests.'),
      S('advanced', 'Stage 3: Advanced', 'Microservices, messaging and scale', '6 - 8 weeks', [
        T('be-t7', 'Microservices & Messaging', 'Service boundaries, API gateway, Kafka/RabbitMQ event flows', ['Microservices', 'Kafka', 'Spring Cloud']),
        T('be-t8', 'Caching, Performance & Observability', 'Redis, profiling, logs, metrics and tracing', ['Redis', 'Prometheus', 'Grafana']),
        T('be-t9', 'System Design & Cloud Deployment', 'Scalability patterns, Docker, Kubernetes basics, CI/CD', ['System Design', 'Docker', 'Kubernetes', 'CI/CD']),
      ], 'Microservices Order Platform', 'Deploy a multi-service system with messaging, caching, monitoring and CI/CD pipeline.'),
    ],
    industryCertifications: [
      K('be-c1', 'Oracle Certified Professional: Java SE 17 Developer', 'Oracle', 'Intermediate', '$245', 'Globally recognised validation of core Java skills.', ['Java Syntax', 'Collections', 'Concurrency', 'Streams'], 'https://education.oracle.com/oracle-certified-professional-java-se-17-developer/pexam_1Z0-829', '1Z0-829'),
      K('be-c2', 'AWS Certified Cloud Practitioner', 'Amazon Web Services', 'Beginner', '$100', 'Useful foundation for deploying backend services on the cloud.', ['Cloud Concepts', 'Security', 'Pricing'], 'https://aws.amazon.com/certification/certified-cloud-practitioner/', 'CLF-C02'),
    ],
    openSources: [{ label: 'roadmap.sh – Backend', url: 'https://roadmap.sh/backend' }, { label: 'roadmap.sh – Java', url: 'https://roadmap.sh/java' }],
    internshipKeywords: ['java developer', 'backend developer', 'spring boot'],
    internships: [
      I('int-be-1', 'backend', 'Software Engineering Intern (Backend)', 'Amazon', 'bg-amber-500 text-slate-950', 'Hybrid', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Java', 'Data Structures & Algorithms', 'SQL'], 'Build backend services used by millions of customers.', ['Design and code services', 'Write tests', 'Review code'], 'https://www.amazon.jobs/', 'Amazon Jobs'),
      I('int-be-2', 'backend', 'Backend Developer Intern', 'Razorpay', 'bg-blue-700 text-white', 'Hybrid', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Java', 'Spring Boot', 'REST APIs'], 'Work on payment APIs and platform services.', ['Develop APIs', 'Debug production issues', 'Write documentation'], 'https://razorpay.com/jobs/', 'Razorpay Careers'),
      I('int-be-3', 'backend', 'Java Developer Intern', 'Infosys', 'bg-sky-700 text-white', 'Hybrid', 'Bengaluru / Mysuru, Karnataka', '3-6 months', 'As per company norms', ['Java', 'Spring Boot', 'SQL'], 'Join enterprise delivery teams building Java applications.', ['Develop modules', 'Fix defects', 'Unit test'], 'https://www.infosys.com/careers/', 'Infosys Careers'),
    ],
  },

  // ================= QA =================
  {
    id: 'qa', title: 'Software Testing & QA Automation', iconName: 'Code2', categoryTag: 'Web & App',
    shortDescription: 'Ensure software quality through manual testing, test automation, API testing and CI-integrated quality pipelines.',
    fullDescription: 'QA engineers design test cases, find defects early, automate UI and API tests with Selenium, Playwright, Cypress and Postman, and integrate tests into CI/CD. Strong entry point with consistent hiring across IT services and product companies.',
    avgSalary: '$60,000 - $115,000 / yr', hiringDemand: 'High',
    topTools: ['Selenium', 'Playwright', 'Postman', 'JUnit / pytest', 'Jira', 'Jenkins', 'SQL'],
    recommendedCourses: [
      C('qa-1', 'Test Automation University', 'Applitools (Free)', 'Beginner to Advanced', 'Self-paced', 4.8, '1,000,000+', 'https://testautomationu.applitools.com/', true,
        'Free courses from industry experts on Selenium, Playwright, Cypress, API testing and testing fundamentals.', ['100% Free', 'Expert instructors', 'Certificates'], ['Selenium', 'QA / Manual Testing', 'Playwright', 'Java', 'Python']),
      C('qa-2', 'Postman Learning Center', 'Postman (Free)', 'Beginner', 'Self-paced', 4.7, '500,000+', 'https://learning.postman.com/', true,
        'Official guides for API testing, collections, environments and automated tests.', ['Official', 'Free'], ['Postman', 'REST APIs']),
      C('qa-3', 'Playwright Documentation & Getting Started', 'Playwright (Microsoft, Open Source)', 'Intermediate', 'Self-paced', 4.8, '300,000+', 'https://playwright.dev/docs/intro', true,
        'Modern end-to-end testing for web apps with auto-wait, tracing and cross-browser support.', ['Open source', 'Modern framework'], ['Playwright', 'JavaScript', 'TypeScript']),
      C('qa-4', 'Software Testing and Automation Specialization', 'Coursera (University of Minnesota)', 'Intermediate', '~4 months', 4.6, '60,000+', 'https://www.coursera.org/specializations/software-testing-automation', false,
        'Covers test design, black/white-box testing, mutation testing and automation.', ['University programme', 'Testing theory'], ['QA / Manual Testing', 'Java', 'JUnit'], 'Free to audit • Certificate is paid'),
      C('qa-5', 'Cypress Real World Testing', 'Cypress (Official, Free)', 'Intermediate', 'Self-paced', 4.6, '150,000+', 'https://learn.cypress.io/', true,
        'Official course on end-to-end and component testing with Cypress.', ['Official', 'Free'], ['Cypress', 'JavaScript']),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Testing fundamentals and manual testing', '3 - 4 weeks', [
        T('qa-t1', 'Testing Fundamentals', 'SDLC/STLC, test levels and types, bug lifecycle', ['QA / Manual Testing', 'Jira']),
        T('qa-t2', 'Test Case Design', 'Equivalence partitioning, boundary values, exploratory testing', ['Test Design']),
        T('qa-t3', 'SQL & API Basics', 'Validate data with SQL; explore REST APIs with Postman', ['SQL', 'Postman']),
      ], 'Test Suite for a Real Web App', 'Write test cases, log defects and prepare a test report for a public web application.'),
      S('intermediate', 'Stage 2: Intermediate', 'Automation with Selenium / Playwright', '5 - 6 weeks', [
        T('qa-t4', 'Programming for Testers', 'Java or Python fundamentals and OOP', ['Java', 'Python']),
        T('qa-t5', 'UI Automation', 'Locators, waits, page object model and reporting', ['Selenium', 'Playwright', 'pytest']),
        T('qa-t6', 'API Test Automation', 'Postman collections, REST Assured / requests, schema validation', ['Postman', 'REST APIs']),
      ], 'Automation Framework from Scratch', 'Build a page-object framework with reporting that runs UI and API tests.'),
      S('advanced', 'Stage 3: Advanced', 'CI/CD, performance and quality strategy', '4 - 6 weeks', [
        T('qa-t7', 'CI/CD Integration', 'Run tests in Jenkins/GitHub Actions with parallel execution', ['Jenkins', 'GitHub Actions', 'Docker']),
        T('qa-t8', 'Performance & Security Testing', 'Load tests with JMeter/k6 and OWASP basics', ['JMeter', 'k6']),
        T('qa-t9', 'Test Strategy & Leadership', 'Risk-based testing, metrics, shift-left practices', ['Agile / Scrum']),
      ], 'Automated Quality Pipeline', 'Set up a CI pipeline running UI, API and performance tests with dashboards.'),
    ],
    industryCertifications: [
      K('qa-c1', 'ISTQB Certified Tester – Foundation Level (CTFL)', 'ISTQB', 'Beginner', 'Approx. $150–250 (varies by board)', 'The most widely recognised software-testing certification.', ['Test Techniques', 'Test Management', 'Tools'], 'https://www.istqb.org/certifications/certified-tester-foundation-level', 'CTFL'),
      K('qa-c2', 'Postman API Fundamentals Student Expert', 'Postman', 'Beginner', 'Free', 'Free badge demonstrating API testing fundamentals.', ['Requests', 'Collections', 'Tests'], 'https://www.postman.com/student-program/', undefined, true),
    ],
    openSources: [{ label: 'roadmap.sh – QA Engineer', url: 'https://roadmap.sh/qa' }],
    internshipKeywords: ['software testing', 'qa engineer', 'automation testing'],
    internships: [
      I('int-qa-1', 'qa', 'QA Automation Intern', 'Cisco', 'bg-sky-600 text-white', 'Hybrid', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Selenium', 'Python', 'Testing'], 'Join Cisco engineering teams validating networking software.', ['Write automated tests', 'Analyse failures', 'Report defects'], 'https://jobs.cisco.com/', 'Cisco Careers'),
      I('int-qa-2', 'qa', 'Software Test Engineer Intern', 'Wipro', 'bg-teal-600 text-white', 'Hybrid', 'Bengaluru, Karnataka', '3-6 months', 'As per company norms', ['Manual Testing', 'SQL', 'Selenium'], 'Support testing practices for enterprise clients.', ['Execute test cases', 'Log defects', 'Maintain scripts'], 'https://careers.wipro.com/', 'Wipro Careers'),
      I('int-qa-3', 'qa', 'Quality Engineering Intern', 'Tata Consultancy Services', 'bg-slate-700 text-white', 'Hybrid', 'Bengaluru, Karnataka', '3-6 months', 'As per company norms', ['Testing', 'Postman', 'Jira'], 'Assist quality engineering teams on client delivery.', ['Prepare test data', 'Run regression suites', 'Document results'], 'https://www.tcs.com/careers', 'TCS Careers'),
    ],
  },

  // ================= COMPUTER VISION =================
  {
    id: 'computervision', title: 'Computer Vision & Deep Learning', iconName: 'Sparkles', categoryTag: 'AI & Data',
    shortDescription: 'Teach machines to see: image classification, object detection, segmentation and real-time vision applications.',
    fullDescription: 'Computer vision engineers build systems for image classification, object detection (YOLO), segmentation, tracking and OCR using OpenCV, PyTorch and modern vision transformers, deployed on cloud and edge devices for automotive, healthcare, retail and security.',
    avgSalary: '$105,000 - $165,000 / yr', hiringDemand: 'Rapidly Growing',
    topTools: ['Python', 'OpenCV', 'PyTorch', 'YOLO', 'NumPy', 'CUDA', 'ONNX / TensorRT'],
    recommendedCourses: [
      C('cv-1', 'OpenCV University – Free Courses', 'OpenCV.org (Free)', 'Beginner', 'Self-paced', 4.6, '200,000+', 'https://opencv.org/university/', true,
        'Official free courses covering image processing, OpenCV in Python and deep learning basics.', ['Official', 'Free', 'Hands-on'], ['OpenCV', 'Python', 'Computer Vision']),
      C('cv-2', 'Practical Deep Learning for Coders', 'fast.ai (Free)', 'Intermediate', '~7 weeks', 4.9, '500,000+', 'https://course.fast.ai/', true,
        'Top-down, code-first course that quickly gets you training strong vision models.', ['Free', 'Code-first', 'Highly rated'], ['PyTorch', 'Deep Learning', 'Computer Vision']),
      C('cv-3', 'Stanford CS231n: Deep Learning for Computer Vision', 'Stanford University (Free Lectures)', 'Intermediate to Advanced', '~10 weeks', 4.9, '1,000,000+', 'http://cs231n.stanford.edu/', true,
        'Legendary university course on CNNs, detection, segmentation and transformers.', ['University course', 'Free notes and videos'], ['Deep Learning', 'Computer Vision', 'PyTorch']),
      C('cv-4', 'Deep Learning Specialization', 'Coursera (DeepLearning.AI)', 'Intermediate', '~3 months', 4.9, '1,000,000+', 'https://www.coursera.org/specializations/deep-learning', false,
        'Andrew Ng\'s foundational programme including a dedicated course on convolutional neural networks.', ['Industry standard', 'CNN course included'], ['Deep Learning', 'Python', 'TensorFlow'], 'Free to audit • Certificate is paid'),
      C('cv-5', 'Ultralytics YOLO Documentation & Tutorials', 'Ultralytics (Open Source)', 'Intermediate', 'Self-paced', 4.7, '500,000+', 'https://docs.ultralytics.com/', true,
        'Practical guides to training, validating and deploying YOLO models for detection and segmentation.', ['Open source', 'Real-time detection'], ['YOLO (Object Detection)', 'PyTorch', 'Computer Vision']),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Python, image processing and ML basics', '4 - 5 weeks', [
        T('cv-t1', 'Python, NumPy & Linear Algebra', 'Arrays, matrices and vectorised computation', ['Python', 'NumPy']),
        T('cv-t2', 'Image Processing with OpenCV', 'Filters, edges, contours, colour spaces and transformations', ['OpenCV']),
        T('cv-t3', 'Machine Learning Basics', 'Classification, evaluation metrics and overfitting', ['Scikit-learn', 'Machine Learning']),
      ], 'Document Scanner App', 'Detect a document, correct perspective and output a clean scan with OpenCV.'),
      S('intermediate', 'Stage 2: Intermediate', 'Deep learning for images', '6 - 8 weeks', [
        T('cv-t4', 'Neural Networks & CNNs', 'Backpropagation, convolutional networks and data augmentation', ['PyTorch', 'Deep Learning']),
        T('cv-t5', 'Transfer Learning', 'Fine-tune pretrained models on custom image datasets', ['PyTorch', 'Transfer Learning']),
        T('cv-t6', 'Object Detection', 'YOLO, anchors, NMS, mAP and annotation workflows', ['YOLO (Object Detection)', 'Ultralytics']),
      ], 'Custom Object Detector', 'Train a YOLO model on a self-collected dataset and report precision/recall.'),
      S('advanced', 'Stage 3: Advanced', 'Segmentation, transformers and edge deployment', '6 - 8 weeks', [
        T('cv-t7', 'Segmentation & Tracking', 'U-Net, Mask R-CNN, DeepSORT and video analytics', ['PyTorch', 'OpenCV']),
        T('cv-t8', 'Vision Transformers & Multimodal Models', 'ViT, CLIP and vision-language models', ['Transformers', 'Hugging Face']),
        T('cv-t9', 'Model Optimisation & Edge Deployment', 'Quantisation, ONNX, TensorRT and Jetson / Raspberry Pi', ['ONNX', 'TensorRT', 'Docker']),
      ], 'Real-Time Vision on Edge Device', 'Deploy an optimised detector on a Raspberry Pi / Jetson with live camera inference.'),
    ],
    industryCertifications: [
      K('cv-c1', 'Google Cloud Professional Machine Learning Engineer', 'Google Cloud', 'Advanced', '$200', 'Recognised certification for designing and productionising ML systems.', ['ML Pipelines', 'Vertex AI', 'Monitoring'], 'https://cloud.google.com/learn/certification/machine-learning-engineer'),
      K('cv-c2', 'Microsoft Azure AI Engineer Associate', 'Microsoft', 'Intermediate', '$165 (varies by country)', 'Validates ability to build AI solutions including vision on Azure.', ['Azure AI Vision', 'Cognitive Services'], 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/', 'AI-102'),
    ],
    openSources: [{ label: 'roadmap.sh – AI & Data Scientist', url: 'https://roadmap.sh/ai-data-scientist' }],
    internshipKeywords: ['computer vision', 'deep learning', 'machine learning'],
    internships: [
      I('int-cv-1', 'computervision', 'Computer Vision Intern', 'Bosch', 'bg-red-700 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Python', 'OpenCV', 'Deep Learning'], 'Work on perception and vision solutions for mobility and industrial products.', ['Prepare datasets', 'Train models', 'Validate on hardware'], 'https://www.bosch.in/careers/', 'Bosch Careers'),
      I('int-cv-2', 'computervision', 'AI Research Intern', 'NVIDIA', 'bg-green-600 text-white', 'Hybrid', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['PyTorch', 'CUDA', 'Computer Vision'], 'Contribute to deep learning and GPU-accelerated vision projects.', ['Run experiments', 'Optimise models', 'Write reports'], 'https://www.nvidia.com/en-in/about-nvidia/careers/', 'NVIDIA Careers'),
      I('int-cv-3', 'computervision', 'ML Engineer Intern (Vision)', 'Samsung R&D Institute', 'bg-blue-800 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Python', 'OpenCV', 'PyTorch'], 'Develop on-device AI features for consumer devices.', ['Develop vision models', 'Benchmark performance', 'Collaborate with product teams'], 'https://research.samsung.com/', 'Samsung Research'),
    ],
  },

  // ================= VLSI =================
  {
    id: 'vlsi', title: 'VLSI & Semiconductor Design', iconName: 'Cpu', categoryTag: 'Systems & Hardware',
    shortDescription: 'Design the chips inside every device: digital logic, Verilog / SystemVerilog, verification and physical design.',
    fullDescription: 'VLSI engineers design and verify integrated circuits: digital design with Verilog/SystemVerilog, FPGA prototyping, UVM-based verification, static timing analysis and RTL-to-GDSII physical design. India\'s semiconductor push is creating strong demand for ECE and EEE graduates.',
    avgSalary: '$85,000 - $150,000 / yr', hiringDemand: 'Rapidly Growing',
    topTools: ['Verilog / VHDL', 'SystemVerilog', 'FPGA', 'UVM', 'Cadence / Synopsys', 'Linux', 'Python / TCL'],
    recommendedCourses: [
      C('vl-1', 'HDLBits – Verilog Practice', 'HDLBits (Free)', 'Beginner', 'Self-paced', 4.8, '500,000+', 'https://hdlbits.01xz.net/wiki/Main_Page', true,
        'Interactive problem set to learn Verilog with instant simulation feedback.', ['100% Free', 'Instant feedback'], ['Verilog / VHDL', 'VLSI Design']),
      C('vl-2', 'ChipVerify – Verilog & SystemVerilog Tutorials', 'ChipVerify (Free)', 'Beginner to Intermediate', 'Self-paced', 4.6, '300,000+', 'https://www.chipverify.com/', true,
        'Clear tutorials covering Verilog, SystemVerilog, UVM and verification concepts.', ['Free', 'Verification focus'], ['Verilog / VHDL', 'SystemVerilog', 'UVM']),
      C('vl-3', 'Zero to ASIC Course', 'Matt Venn (Free, Open Source)', 'Intermediate', 'Self-paced', 4.7, '30,000+', 'https://www.zerotoasiccourse.com/', true,
        'Learn to design and tape out your own chip using open-source EDA tools.', ['Open-source toolchain', 'Real tape-out'], ['Verilog / VHDL', 'VLSI Design', 'Linux']),
      C('vl-4', 'Nandland FPGA Tutorials', 'Nandland (Free)', 'Beginner to Intermediate', 'Self-paced', 4.6, '200,000+', 'https://nandland.com/', true,
        'Beginner-friendly FPGA tutorials with real hardware examples in Verilog and VHDL.', ['Free', 'FPGA hands-on'], ['FPGA', 'Verilog / VHDL']),
      C('vl-5', 'Introduction to RISC-V (LFD110x)', 'Linux Foundation / edX', 'Intermediate', '~4 weeks', 4.6, '60,000+', 'https://training.linuxfoundation.org/training/introduction-to-riscv-lfd110x/', true,
        'Explores the open RISC-V instruction set architecture and ecosystem.', ['Free to audit', 'Open ISA'], ['RISC-V', 'Computer Architecture'], 'Free to audit • Verified certificate is paid'),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Digital electronics and Verilog', '5 - 6 weeks', [
        T('vl-t1', 'Digital Logic Design', 'Boolean algebra, combinational and sequential circuits, FSMs', ['Digital Electronics']),
        T('vl-t2', 'Verilog HDL Basics', 'Modules, always blocks, testbenches and simulation', ['Verilog / VHDL', 'ModelSim']),
        T('vl-t3', 'Linux & Scripting', 'Shell, Makefiles and Python / TCL for EDA flows', ['Linux', 'Python', 'TCL']),
      ], '8-bit ALU & Counter in Verilog', 'Design, simulate and verify an ALU and counter with self-checking testbenches.'),
      S('intermediate', 'Stage 2: Intermediate', 'RTL design, FPGA and verification', '6 - 8 weeks', [
        T('vl-t4', 'Computer Architecture & RTL Design', 'Pipelines, memory, bus protocols (AXI/APB)', ['RISC-V', 'Verilog / VHDL']),
        T('vl-t5', 'FPGA Prototyping', 'Synthesis, constraints and board bring-up', ['FPGA', 'Vivado']),
        T('vl-t6', 'SystemVerilog Verification', 'Constrained-random testing, assertions and coverage', ['SystemVerilog']),
      ], 'RISC-V Core on FPGA', 'Implement a simple pipelined RISC-V core and run it on an FPGA board.'),
      S('advanced', 'Stage 3: Advanced', 'UVM and physical design', '6 - 8 weeks', [
        T('vl-t7', 'UVM Methodology', 'Agents, scoreboards, sequences and functional coverage', ['UVM', 'SystemVerilog']),
        T('vl-t8', 'Static Timing Analysis & Low Power', 'Setup/hold, clock domain crossing, power intent', ['STA', 'Synopsys PrimeTime']),
        T('vl-t9', 'Physical Design (RTL to GDSII)', 'Floorplanning, placement, CTS and routing using OpenROAD', ['OpenROAD', 'Cadence / Synopsys']),
      ], 'Tape-out Ready Mini SoC Block', 'Take a small design through synthesis, STA and place-and-route with open-source tools.'),
    ],
    industryCertifications: [
      K('vl-c1', 'RISC-V Foundations (LFD110x) Verified Certificate', 'Linux Foundation / edX', 'Intermediate', 'Approx. $99', 'Shows understanding of the open RISC-V ISA used across the industry.', ['RISC-V ISA', 'Ecosystem'], 'https://training.linuxfoundation.org/training/introduction-to-riscv-lfd110x/', 'LFD110x'),
      K('vl-c2', 'MathWorks MATLAB Associate Certification', 'MathWorks', 'Beginner', '$100', 'Useful for DSP, modelling and verification workflows.', ['MATLAB Programming', 'Data Analysis'], 'https://www.mathworks.com/learn/training/certification.html'),
    ],
    openSources: [{ label: 'Open-source chip design – Zero to ASIC', url: 'https://www.zerotoasiccourse.com/' }],
    internshipKeywords: ['vlsi', 'verilog', 'rtl design'],
    internships: [
      I('int-vl-1', 'vlsi', 'VLSI Design Intern', 'Intel', 'bg-sky-600 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Verilog / VHDL', 'Digital Design', 'Linux'], 'Work with silicon design teams on RTL and validation.', ['Write RTL', 'Run simulations', 'Debug failures'], 'https://jobs.intel.com/', 'Intel Careers'),
      I('int-vl-2', 'vlsi', 'ASIC Design Intern', 'Qualcomm', 'bg-blue-700 text-white', 'On-site', 'Bengaluru / Hyderabad, India', '6 months', 'As per company norms', ['Verilog / VHDL', 'SystemVerilog', 'Scripting'], 'Contribute to SoC design and verification.', ['Develop testbenches', 'Check timing', 'Document designs'], 'https://www.qualcomm.com/company/careers', 'Qualcomm Careers'),
      I('int-vl-3', 'vlsi', 'Hardware Design Intern', 'Texas Instruments', 'bg-red-700 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Digital Design', 'Verilog / VHDL', 'Analog Basics'], 'Join design teams creating analog and embedded processing products.', ['Simulate circuits', 'Support layout and verification', 'Prepare reports'], 'https://careers.ti.com/', 'TI Careers'),
    ],
  },

  // ================= ROBOTICS =================
  {
    id: 'robotics', title: 'Robotics & Industrial Automation', iconName: 'Cpu', categoryTag: 'Systems & Hardware',
    shortDescription: 'Build intelligent machines: ROS 2, control systems, sensors, PLC / SCADA automation and motion planning.',
    fullDescription: 'Robotics and automation engineers combine mechanics, electronics and software: ROS 2 for robot software, control theory with MATLAB/Simulink, sensors and actuators, PLC/SCADA industrial automation and perception. Great fit for Mechanical, EEE, ECE and Mechatronics students.',
    avgSalary: '$80,000 - $140,000 / yr', hiringDemand: 'High',
    topTools: ['ROS 2', 'Python', 'C++', 'MATLAB / Simulink', 'PLC / SCADA', 'Gazebo', 'Arduino / Raspberry Pi'],
    recommendedCourses: [
      C('rb-1', 'ROS 2 Tutorials', 'Open Robotics (Official Docs)', 'Beginner to Intermediate', 'Self-paced', 4.7, '300,000+', 'https://docs.ros.org/en/jazzy/Tutorials.html', true,
        'Official step-by-step tutorials for nodes, topics, services, launch files and URDF.', ['Official', 'Free'], ['Robotics (ROS)', 'Python', 'C++', 'Linux']),
      C('rb-2', 'Modern Robotics Specialization', 'Coursera (Northwestern University)', 'Intermediate', '~6 months', 4.8, '60,000+', 'https://www.coursera.org/specializations/modernrobotics', false,
        'Rigorous course on kinematics, dynamics, motion planning and control.', ['University programme', 'Strong theory'], ['Robotics (ROS)', 'Control Systems', 'MATLAB'], 'Free to audit • Certificate is paid'),
      C('rb-3', 'MATLAB & Simulink Onramps', 'MathWorks (Free)', 'Beginner', '~2 hours each', 4.7, '2,000,000+', 'https://matlabacademy.mathworks.com/', true,
        'Free interactive intro courses for MATLAB, Simulink and control design.', ['Free onramps', 'Hands-on'], ['MATLAB', 'Simulink', 'Control Systems']),
      C('rb-4', 'Universal Robots Academy', 'Universal Robots (Free)', 'Beginner', 'Self-paced', 4.6, '200,000+', 'https://academy.universal-robots.com/', true,
        'Free online modules on programming collaborative robot arms.', ['Industry cobot platform', 'Free'], ['Industrial Robotics']),
      C('rb-5', 'RealPars PLC Programming Tutorials', 'RealPars', 'Beginner to Intermediate', 'Self-paced', 4.6, '1,000,000+', 'https://www.realpars.com/', false,
        'Clear industrial automation courses on PLC programming, ladder logic and SCADA concepts.', ['Industry focused', 'Visual teaching'], ['PLC / SCADA', 'Industrial Automation'], 'Free videos • Full courses paid'),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Electronics, programming and sensors', '4 - 6 weeks', [
        T('rb-t1', 'Electronics & Microcontrollers', 'Circuits, sensors, motors and Arduino programming', ['Arduino', 'Embedded C']),
        T('rb-t2', 'Python & C++ Basics', 'Programming fundamentals for robotics', ['Python', 'C++']),
        T('rb-t3', 'MATLAB Basics', 'Signals, plotting and simple simulation', ['MATLAB']),
      ], 'Line-Following Robot', 'Build a sensor-driven robot with PID-style control using Arduino.'),
      S('intermediate', 'Stage 2: Intermediate', 'ROS 2 and control systems', '6 - 8 weeks', [
        T('rb-t4', 'ROS 2 Fundamentals', 'Nodes, topics, services, launch files and tf2', ['Robotics (ROS)', 'Linux']),
        T('rb-t5', 'Control Systems', 'Transfer functions, PID tuning and stability in Simulink', ['Simulink', 'MATLAB']),
        T('rb-t6', 'Industrial Automation Basics', 'PLC ladder logic, sensors, HMI and SCADA concepts', ['PLC / SCADA']),
      ], 'Simulated Mobile Robot in Gazebo', 'Create a ROS 2 robot that navigates a simulated world while avoiding obstacles.'),
      S('advanced', 'Stage 3: Advanced', 'Perception, planning and integration', '6 - 8 weeks', [
        T('rb-t7', 'Perception & SLAM', 'Camera/LiDAR processing, mapping and localisation', ['OpenCV', 'SLAM', 'Robotics (ROS)']),
        T('rb-t8', 'Motion Planning & Manipulation', 'Kinematics, MoveIt, trajectory planning', ['MoveIt', 'Python']),
        T('rb-t9', 'System Integration & Safety', 'Hardware-in-the-loop testing, safety standards and deployment', ['Docker', 'Industrial Safety']),
      ], 'Autonomous Navigation Robot', 'Build and demo a robot with SLAM, path planning and obstacle avoidance on real hardware.'),
    ],
    industryCertifications: [
      K('rb-c1', 'MathWorks MATLAB Associate Certification', 'MathWorks', 'Beginner', '$100', 'Credential valued in controls, modelling and automation roles.', ['MATLAB Programming', 'Data Analysis'], 'https://www.mathworks.com/learn/training/certification.html'),
      K('rb-c2', 'Universal Robots Academy Core Certificate', 'Universal Robots', 'Beginner', 'Free', 'Free certificate showing basic cobot programming skills.', ['Robot Programming', 'Safety'], 'https://academy.universal-robots.com/', undefined, true),
    ],
    openSources: [{ label: 'ROS 2 Official Tutorials (open source)', url: 'https://docs.ros.org/en/jazzy/Tutorials.html' }],
    internshipKeywords: ['robotics', 'automation engineer', 'ros'],
    internships: [
      I('int-rb-1', 'robotics', 'Robotics Engineering Intern', 'Bosch', 'bg-red-700 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Python', 'ROS', 'C++'], 'Work on robotics and automation projects across mobility and industrial divisions.', ['Develop ROS nodes', 'Test on hardware', 'Document results'], 'https://www.bosch.in/careers/', 'Bosch Careers'),
      I('int-rb-2', 'robotics', 'Automation Engineering Intern', 'Siemens', 'bg-teal-700 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['PLC / SCADA', 'Control Systems'], 'Support industrial automation and digital factory projects.', ['Program PLCs', 'Commission systems', 'Create documentation'], 'https://jobs.siemens.com/', 'Siemens Careers'),
      I('int-rb-3', 'robotics', 'R&D Intern (Aerospace & Robotics)', 'ISRO', 'bg-orange-600 text-white', 'On-site', 'Bengaluru, Karnataka', 'Project based', 'As per ISRO norms', ['MATLAB', 'Control Systems', 'C / C++'], 'Project-based internships for engineering students under ISRO centres.', ['Assist research projects', 'Simulate systems', 'Report results'], 'https://www.isro.gov.in/Careers.html', 'ISRO Careers'),
    ],
  },

  // ================= EV & POWER ELECTRONICS =================
  {
    id: 'ev', title: 'Electric Vehicles & Power Electronics', iconName: 'Cpu', categoryTag: 'Systems & Hardware',
    shortDescription: 'Engineer the EV revolution: battery management, motor drives, power converters and vehicle software.',
    fullDescription: 'EV engineers work on battery packs and management systems (BMS), motor control, DC-DC converters and chargers, automotive communication protocols (CAN), embedded control and vehicle software. A booming field for EEE, ECE, Mechanical and Automobile students.',
    avgSalary: '$75,000 - $135,000 / yr', hiringDemand: 'Rapidly Growing',
    topTools: ['MATLAB / Simulink', 'Embedded C', 'CAN Bus', 'Power Electronics', 'BMS', 'PCB Design', 'Python'],
    recommendedCourses: [
      C('ev-1', 'Power Electronics Specialization', 'Coursera (University of Colorado Boulder)', 'Intermediate', '~6 months', 4.7, '60,000+', 'https://www.coursera.org/specializations/power-electronics', false,
        'Covers converters, magnetics, control and modelling of switched-mode power supplies.', ['University programme', 'Strong fundamentals'], ['Power Electronics', 'MATLAB'], 'Free to audit • Certificate is paid'),
      C('ev-2', 'Algorithms for Battery Management Systems', 'Coursera (University of Colorado Boulder)', 'Intermediate to Advanced', '~5 months', 4.8, '30,000+', 'https://www.coursera.org/specializations/algorithms-for-battery-management-systems', false,
        'Teaches battery modelling, state-of-charge estimation and BMS algorithms.', ['Specialist EV topic', 'Hands-on simulations'], ['BMS', 'MATLAB', 'Battery Modelling'], 'Free to audit • Certificate is paid'),
      C('ev-3', 'MATLAB & Simulink Onramps', 'MathWorks (Free)', 'Beginner', '~2 hours each', 4.7, '2,000,000+', 'https://matlabacademy.mathworks.com/', true,
        'Free interactive modules for MATLAB, Simulink and Simscape basics.', ['Free onramps', 'Hands-on'], ['MATLAB', 'Simulink']),
      C('ev-4', 'Vector Learning Module: CAN Basics', 'Vector Informatik (Free e-learning)', 'Beginner to Intermediate', 'Self-paced', 4.6, '100,000+', 'https://elearning.vector.com/', true,
        'Free e-learning on CAN, LIN and automotive networking.', ['Industry-standard tools', 'Free'], ['CAN Bus', 'Embedded C']),
      C('ev-5', 'KiCad Getting Started (PCB Design)', 'KiCad (Open Source Docs)', 'Beginner', 'Self-paced', 4.6, '300,000+', 'https://docs.kicad.org/', true,
        'Official guide to schematic capture and PCB layout with the open-source KiCad suite.', ['Open source', 'Free'], ['PCB Design', 'Embedded C']),
    ],
    learningPath: [],
    stages: [
      S('beginner', 'Stage 1: Beginner', 'Electrical fundamentals and EV basics', '4 - 6 weeks', [
        T('ev-t1', 'Circuit Analysis & Electronics', 'Kirchhoff laws, diodes, MOSFETs and op-amps', ['Circuit Analysis', 'LTspice']),
        T('ev-t2', 'EV Architecture Overview', 'Battery, inverter, motor, charger, DC-DC and thermal systems', ['EV Systems']),
        T('ev-t3', 'MATLAB & Simulink Basics', 'Modelling and simulating simple systems', ['MATLAB', 'Simulink']),
      ], 'Buck Converter Simulation', 'Design and simulate a DC-DC buck converter in Simulink or LTspice.'),
      S('intermediate', 'Stage 2: Intermediate', 'Power electronics, motors and BMS', '6 - 8 weeks', [
        T('ev-t4', 'Power Converters', 'Buck/boost, inverters, magnetics and gate drivers', ['Power Electronics']),
        T('ev-t5', 'Motor Drives', 'BLDC / PMSM control, FOC basics', ['Simulink', 'Motor Control']),
        T('ev-t6', 'Battery Modelling & BMS', 'Cell chemistry, state-of-charge estimation, balancing', ['BMS', 'MATLAB']),
      ], 'BMS State-of-Charge Estimator', 'Implement a simple SoC estimator and cell balancing logic in Simulink.'),
      S('advanced', 'Stage 3: Advanced', 'Embedded control and vehicle integration', '6 - 8 weeks', [
        T('ev-t7', 'Embedded Control Software', 'Embedded C, RTOS and real-time control loops', ['Embedded C', 'RTOS']),
        T('ev-t8', 'Automotive Networks & Safety', 'CAN, UDS and ISO 26262 functional safety basics', ['CAN Bus', 'ISO 26262']),
        T('ev-t9', 'Charging, Thermal & Hardware Design', 'Chargers, thermal management and PCB design', ['PCB Design', 'KiCad']),
      ], 'Mini EV Powertrain Prototype', 'Build a small motor-drive prototype with CAN telemetry and protection logic.'),
    ],
    industryCertifications: [
      K('ev-c1', 'MathWorks MATLAB Associate Certification', 'MathWorks', 'Beginner', '$100', 'Recognised across automotive and power-electronics modelling roles.', ['MATLAB Programming', 'Data Analysis'], 'https://www.mathworks.com/learn/training/certification.html'),
      K('ev-c2', 'Power Electronics Specialization Certificate', 'Coursera / CU Boulder', 'Intermediate', 'Coursera subscription', 'University-backed certificate showing power-conversion depth.', ['Converters', 'Magnetics', 'Control'], 'https://www.coursera.org/specializations/power-electronics'),
    ],
    openSources: [{ label: 'KiCad (open-source PCB design)', url: 'https://docs.kicad.org/' }],
    internshipKeywords: ['electric vehicle', 'power electronics', 'battery management'],
    internships: [
      I('int-ev-1', 'ev', 'EV Powertrain Intern', 'Tata Motors', 'bg-blue-800 text-white', 'On-site', 'Pune / Bengaluru, India', '6 months', 'As per company norms', ['MATLAB / Simulink', 'Power Electronics'], 'Support electric-vehicle powertrain and battery projects.', ['Simulate systems', 'Support tests', 'Analyse data'], 'https://www.tatamotors.com/careers/', 'Tata Motors Careers'),
      I('int-ev-2', 'ev', 'Power Electronics Intern', 'Bosch', 'bg-red-700 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['Power Electronics', 'Embedded C'], 'Work on power electronics and control for mobility systems.', ['Design circuits', 'Test prototypes', 'Prepare reports'], 'https://www.bosch.in/careers/', 'Bosch Careers'),
      I('int-ev-3', 'ev', 'Battery & BMS Intern', 'Ather Energy', 'bg-emerald-700 text-white', 'On-site', 'Bengaluru, Karnataka', '6 months', 'As per company norms', ['BMS', 'Python', 'MATLAB'], 'Contribute to battery systems on electric two-wheelers.', ['Analyse battery data', 'Validate BMS logic', 'Support testing'], 'https://www.atherenergy.com/careers', 'Ather Careers'),
    ],
  },
];
