// Matching metadata used for personalisation (profile -> domain) and the resume analyser.
// `skills` use the same labels as the profile skill dropdown.

export interface DomainMeta {
  skills: string[];
  roleWords: string[];
  branches: string[];
  openSources?: { label: string; url: string }[];
  internshipKeywords?: string[];
  // keywords an ATS / recruiter expects on a resume for this domain
  resumeKeywords: string[];
}

const CS = ['computer science', 'information science', 'cse', 'ise', 'ai & ml', 'ai & ds', 'data science', 'bca', 'mca', 'information technology', 'b.sc', 'm.sc'];
const ELEC = ['electronics', 'ece', 'eee', 'electrical', 'instrumentation', 'mechatronics', 'iot', 'vlsi'];

export const DOMAIN_META: Record<string, DomainMeta> = {
  fullstack: {
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML', 'CSS', 'Next.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Web Development', 'Git & GitHub', 'Tailwind CSS', 'Angular', 'Vue.js', 'GraphQL', 'Docker'],
    roleWords: ['full stack', 'fullstack', 'full-stack', 'web', 'frontend', 'front-end', 'front end', 'mern', 'react'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – Full Stack', url: 'https://roadmap.sh/full-stack' }, { label: 'roadmap.sh – Frontend', url: 'https://roadmap.sh/frontend' }],
    internshipKeywords: ['full stack developer', 'web developer', 'react'],
    resumeKeywords: ['javascript', 'react', 'node.js', 'html', 'css', 'rest api', 'git', 'sql', 'typescript', 'responsive', 'mongodb', 'docker'],
  },
  datascience: {
    skills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn', 'Statistics', 'SQL', 'Data Analysis', 'Data Visualization', 'Deep Learning', 'R', 'Tableau', 'Power BI', 'TensorFlow', 'PyTorch', 'XGBoost'],
    roleWords: ['data scien', 'machine learning', 'ml engineer', 'ml ', 'data analyst'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – AI & Data Scientist', url: 'https://roadmap.sh/ai-data-scientist' }],
    internshipKeywords: ['data science', 'machine learning', 'data analyst'],
    resumeKeywords: ['python', 'machine learning', 'pandas', 'numpy', 'scikit-learn', 'sql', 'statistics', 'data visualization', 'tensorflow', 'model', 'jupyter', 'regression'],
  },
  cloud: {
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'CI/CD', 'DevOps', 'Linux', 'Cloud Computing', 'Bash / Shell Scripting', 'Git & GitHub', 'Computer Networks'],
    roleWords: ['cloud', 'devops', 'sre', 'site reliability', 'infrastructure', 'platform engineer'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – DevOps', url: 'https://roadmap.sh/devops' }, { label: 'roadmap.sh – AWS', url: 'https://roadmap.sh/aws' }],
    internshipKeywords: ['cloud engineer', 'devops', 'aws'],
    resumeKeywords: ['aws', 'azure', 'docker', 'kubernetes', 'ci/cd', 'terraform', 'linux', 'jenkins', 'git', 'monitoring', 'bash', 'networking'],
  },
  cybersecurity: {
    skills: ['Cyber Security', 'Ethical Hacking', 'Penetration Testing', 'Kali Linux', 'Wireshark', 'Cryptography', 'Networking (CCNA)', 'Computer Networks', 'Linux', 'SIEM / Splunk', 'Zero Trust Security', 'Python', 'Bash / Shell Scripting'],
    roleWords: ['security', 'cyber', 'pentest', 'penetration', 'soc ', 'ethical hack', 'infosec'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – Cyber Security', url: 'https://roadmap.sh/cyber-security' }],
    internshipKeywords: ['cyber security', 'ethical hacking', 'soc analyst'],
    resumeKeywords: ['security', 'penetration testing', 'owasp', 'linux', 'networking', 'wireshark', 'siem', 'vulnerability', 'cryptography', 'kali', 'firewall', 'incident'],
  },
  ai_nlp: {
    skills: ['Natural Language Processing', 'Deep Learning', 'Python', 'PyTorch', 'TensorFlow', 'Hugging Face', 'Large Language Models (LLMs)', 'Generative AI', 'Machine Learning', 'Keras', 'Prompt Engineering'],
    roleWords: ['nlp', 'ai engineer', 'artificial intelligence', 'language model', 'ai/ml'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – AI Engineer', url: 'https://roadmap.sh/ai-engineer' }],
    internshipKeywords: ['nlp', 'artificial intelligence', 'machine learning'],
    resumeKeywords: ['nlp', 'transformers', 'python', 'pytorch', 'tensorflow', 'deep learning', 'bert', 'llm', 'text classification', 'hugging face', 'tokenization', 'embedding'],
  },
  mobile: {
    skills: ['Android Development', 'Kotlin', 'Flutter', 'React Native', 'Swift', 'Java', 'Firebase', 'REST APIs', 'Git & GitHub'],
    roleWords: ['android', 'ios', 'mobile', 'flutter', 'app developer', 'kotlin', 'swift'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – Android', url: 'https://roadmap.sh/android' }, { label: 'roadmap.sh – Flutter', url: 'https://roadmap.sh/flutter' }],
    internshipKeywords: ['android developer', 'flutter', 'mobile app developer'],
    resumeKeywords: ['android', 'kotlin', 'flutter', 'firebase', 'rest api', 'mvvm', 'jetpack', 'play store', 'git', 'ui', 'sqlite', 'react native'],
  },
  gamedev: {
    skills: ['Game Development', 'Unity', 'Unreal Engine', 'C#', 'C++', 'Blender'],
    roleWords: ['game', 'unity', 'unreal', 'graphics'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – Game Developer', url: 'https://roadmap.sh/game-developer' }],
    internshipKeywords: ['game developer', 'unity', 'game design'],
    resumeKeywords: ['unity', 'unreal', 'c#', 'c++', 'gameplay', 'physics', 'shaders', 'blender', 'game design', 'git'],
  },
  embedded: {
    skills: ['Embedded C', 'C', 'C++', 'Arduino', 'ESP32', 'RTOS', 'Internet of Things (IoT)', 'MQTT', 'PCB Design', 'Linux', 'FPGA'],
    roleWords: ['embedded', 'iot', 'firmware', 'microcontroller', 'rtos'],
    branches: [...ELEC, ...CS],
    internshipKeywords: ['embedded systems', 'iot', 'firmware'],
    resumeKeywords: ['embedded c', 'microcontroller', 'rtos', 'i2c', 'spi', 'uart', 'arm', 'iot', 'mqtt', 'debugging', 'esp32', 'pcb'],
  },
  genai: {
    skills: ['Generative AI', 'Large Language Models (LLMs)', 'LangChain', 'Prompt Engineering', 'Hugging Face', 'Python', 'PyTorch', 'FastAPI', 'Natural Language Processing', 'Machine Learning', 'Deep Learning'],
    roleWords: ['generative', 'genai', 'gen ai', 'llm', 'prompt', 'ai engineer', 'rag'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – AI Engineer', url: 'https://roadmap.sh/ai-engineer' }],
    internshipKeywords: ['generative ai', 'machine learning', 'llm'],
    resumeKeywords: ['llm', 'rag', 'prompt engineering', 'langchain', 'python', 'hugging face', 'vector database', 'fine-tuning', 'api', 'embedding', 'transformers', 'agents'],
  },
  dataengg: {
    skills: ['SQL', 'Python', 'Apache Spark', 'Apache Kafka', 'Hadoop', 'ETL', 'Big Data', 'Database Design', 'AWS', 'Azure', 'GCP', 'Docker', 'PostgreSQL', 'MySQL'],
    roleWords: ['data engineer', 'big data', 'etl', 'data pipeline', 'data platform'],
    branches: CS,
    openSources: [{ label: 'DataTalks.Club Data Engineering Zoomcamp', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp' }],
    internshipKeywords: ['data engineer', 'big data', 'etl'],
    resumeKeywords: ['sql', 'python', 'spark', 'kafka', 'airflow', 'etl', 'data pipeline', 'hadoop', 'data warehouse', 'aws', 'docker', 'bigquery'],
  },
  analytics: {
    skills: ['Data Analysis', 'SQL', 'Excel (Advanced)', 'Power BI', 'Tableau', 'Python', 'Statistics', 'Data Visualization', 'Pandas', 'R'],
    roleWords: ['data analyst', 'analytics', 'business analyst', 'bi ', 'business intelligence', 'analyst'],
    branches: [...CS, 'industrial', 'mechanical', 'civil'],
    openSources: [{ label: 'roadmap.sh – Data Analyst', url: 'https://roadmap.sh/data-analyst' }],
    internshipKeywords: ['data analyst', 'business analyst', 'power bi'],
    resumeKeywords: ['sql', 'excel', 'power bi', 'tableau', 'python', 'dashboard', 'statistics', 'data visualization', 'pandas', 'insights', 'kpi', 'reporting'],
  },
  uiux: {
    skills: ['UI/UX Design', 'Figma', 'HTML', 'CSS', 'Web Development'],
    roleWords: ['ui', 'ux', 'design', 'figma', 'product design'],
    branches: [...CS, 'any'],
    openSources: [{ label: 'roadmap.sh – UX Design', url: 'https://roadmap.sh/ux-design' }],
    internshipKeywords: ['ui ux design', 'product design', 'figma'],
    resumeKeywords: ['figma', 'wireframe', 'prototype', 'user research', 'usability', 'design system', 'accessibility', 'ui', 'ux', 'portfolio', 'personas', 'case study'],
  },
  backend: {
    skills: ['Java', 'Spring Boot', 'SQL', 'MySQL', 'PostgreSQL', 'REST APIs', 'Microservices', 'Docker', 'Redis', 'System Design', 'Data Structures & Algorithms', 'Object-Oriented Programming', 'Apache Kafka', 'Node.js', 'Go'],
    roleWords: ['backend', 'back-end', 'back end', 'java', 'spring', 'server-side', 'api developer'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – Backend', url: 'https://roadmap.sh/backend' }, { label: 'roadmap.sh – Java', url: 'https://roadmap.sh/java' }],
    internshipKeywords: ['java developer', 'backend developer', 'spring boot'],
    resumeKeywords: ['java', 'spring boot', 'rest api', 'sql', 'microservices', 'docker', 'hibernate', 'git', 'redis', 'data structures', 'junit', 'system design'],
  },
  qa: {
    skills: ['QA / Manual Testing', 'Selenium', 'Postman', 'JUnit', 'Java', 'Python', 'SQL', 'Jenkins', 'Agile / Scrum', 'REST APIs'],
    roleWords: ['test', 'qa', 'quality', 'sdet'],
    branches: CS,
    openSources: [{ label: 'roadmap.sh – QA', url: 'https://roadmap.sh/qa' }],
    internshipKeywords: ['software testing', 'qa engineer', 'automation testing'],
    resumeKeywords: ['selenium', 'test cases', 'postman', 'api testing', 'jira', 'sql', 'automation', 'regression', 'agile', 'bug', 'jenkins', 'java'],
  },
  computervision: {
    skills: ['Computer Vision', 'OpenCV', 'Deep Learning', 'PyTorch', 'TensorFlow', 'YOLO (Object Detection)', 'Python', 'NumPy', 'Keras', 'Machine Learning'],
    roleWords: ['computer vision', 'vision', 'image', 'cv engineer', 'perception'],
    branches: [...CS, ...ELEC],
    openSources: [{ label: 'roadmap.sh – AI & Data Scientist', url: 'https://roadmap.sh/ai-data-scientist' }],
    internshipKeywords: ['computer vision', 'deep learning', 'machine learning'],
    resumeKeywords: ['opencv', 'python', 'pytorch', 'yolo', 'object detection', 'cnn', 'image processing', 'tensorflow', 'segmentation', 'deep learning', 'dataset', 'model'],
  },
  vlsi: {
    skills: ['VLSI Design', 'Verilog / VHDL', 'FPGA', 'Embedded C', 'Linux', 'Python', 'MATLAB', 'PCB Design'],
    roleWords: ['vlsi', 'verilog', 'rtl', 'asic', 'chip', 'semiconductor', 'physical design', 'verification'],
    branches: ELEC,
    resumeKeywords: ['verilog', 'systemverilog', 'rtl', 'fpga', 'uvm', 'vivado', 'digital design', 'timing', 'linux', 'tcl', 'simulation', 'testbench'],
  },
  robotics: {
    skills: ['Robotics (ROS)', 'MATLAB', 'Simulink', 'Arduino', 'Python', 'C++', 'PLC / SCADA', 'Computer Vision', 'OpenCV', 'Embedded C', 'AutoCAD', 'SolidWorks'],
    roleWords: ['robot', 'automation', 'mechatronic', 'ros', 'plc', 'control'],
    branches: [...ELEC, 'mechanical', 'automobile', 'aerospace', 'robotics', 'industrial'],
    openSources: [{ label: 'ROS 2 Tutorials', url: 'https://docs.ros.org/en/jazzy/Tutorials.html' }],
    internshipKeywords: ['robotics', 'automation engineer', 'ros'],
    resumeKeywords: ['ros', 'python', 'c++', 'matlab', 'simulink', 'plc', 'sensors', 'control systems', 'arduino', 'slam', 'kinematics', 'scada'],
  },
  ev: {
    skills: ['Power Electronics', 'MATLAB', 'Simulink', 'Embedded C', 'PCB Design', 'Arduino', 'Python', 'SolidWorks'],
    roleWords: ['electric vehicle', 'ev ', 'battery', 'power electronics', 'bms', 'powertrain', 'automotive'],
    branches: ['electrical', 'eee', 'electronics', 'ece', 'automobile', 'mechanical', 'instrumentation'],
    internshipKeywords: ['electric vehicle', 'power electronics', 'battery management'],
    resumeKeywords: ['matlab', 'simulink', 'power electronics', 'bms', 'can', 'embedded c', 'motor control', 'battery', 'pcb', 'inverter', 'converter', 'automotive'],
  },
};
