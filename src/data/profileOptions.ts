// Dropdown options for the one-time profile form.

export const COURSES = [
  'B.E / B.Tech',
  'M.E / M.Tech',
  'Diploma in Engineering',
  'BCA',
  'MCA',
  'B.Sc (Computer Science / IT / Electronics)',
  'M.Sc (Computer Science / IT / Electronics)',
];

const ENGINEERING_BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Information Science & Engineering (ISE)',
  'Artificial Intelligence & Machine Learning (AI & ML)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Data Science',
  'Cyber Security',
  'Internet of Things (IoT)',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Electronics & Instrumentation Engineering',
  'Mechanical Engineering',
  'Mechatronics / Robotics & Automation',
  'Automobile / Electric Vehicle Engineering',
  'Civil Engineering',
  'Aerospace Engineering',
  'Biotechnology Engineering',
  'Chemical Engineering',
  'Industrial & Production Engineering',
  'Other Engineering Branch',
];

export const SPECIALISATIONS: Record<string, string[]> = {
  'B.E / B.Tech': ENGINEERING_BRANCHES,
  'M.E / M.Tech': [
    'Computer Science & Engineering',
    'Data Science / AI & ML',
    'VLSI Design & Embedded Systems',
    'Power Electronics & Drives',
    'Cyber Security',
    'Digital Communication / Signal Processing',
    'Mechanical / Design Engineering',
    'Other Specialisation',
  ],
  'Diploma in Engineering': [
    'Computer Science & Engineering',
    'Information Science & Engineering',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Automobile Engineering',
    'Other Branch',
  ],
  BCA: ['General', 'Data Science', 'Artificial Intelligence', 'Cyber Security', 'Cloud Computing', 'Software Development'],
  MCA: ['General', 'Data Science / AI', 'Cyber Security', 'Cloud Computing', 'Software Development'],
  'B.Sc (Computer Science / IT / Electronics)': ['Computer Science', 'Information Technology', 'Electronics', 'Data Science', 'Mathematics / Statistics'],
  'M.Sc (Computer Science / IT / Electronics)': ['Computer Science', 'Information Technology', 'Electronics', 'Data Science', 'Mathematics / Statistics'],
};

const SEMS = (n: number) => {
  const out: string[] = [];
  for (let s = 1; s <= n; s++) {
    const year = Math.ceil(s / 2);
    const ord = ['1st', '2nd', '3rd', '4th', '5th'][year - 1];
    out.push(`${ord} Year – Semester ${s}`);
  }
  out.push('Graduated (0–1 year ago)');
  out.push('Graduated (1+ years ago)');
  return out;
};

export const YEAR_SEM: Record<string, string[]> = {
  'B.E / B.Tech': SEMS(8),
  'M.E / M.Tech': SEMS(4),
  'Diploma in Engineering': SEMS(6),
  BCA: SEMS(6),
  MCA: SEMS(4),
  'B.Sc (Computer Science / IT / Electronics)': SEMS(6),
  'M.Sc (Computer Science / IT / Electronics)': SEMS(4),
};

// Booming, engineering-relevant skills, A to Z. Labels are kept short and standard so that
// they match tools named in the roadmaps and in resumes.
export const SKILLS: string[] = [
  'Agile / Scrum', 'Android Development', 'Angular', 'Ansible', 'API Design', 'Apache Kafka', 'Apache Spark', 'Arduino', 'AutoCAD', 'AWS', 'Azure',
  'Bash / Shell Scripting', 'Big Data', 'Blender', 'Blockchain',
  'C', 'C++', 'C#', 'CI/CD', 'Cloud Computing', 'Computer Networks', 'Computer Vision', 'Cryptography', 'CSS', 'Cyber Security',
  'Data Analysis', 'Data Structures & Algorithms', 'Data Visualization', 'Database Design', 'Deep Learning', 'DevOps', 'Django', 'Docker',
  'Embedded C', 'ESP32', 'Ethical Hacking', 'ETL', 'Excel (Advanced)',
  'FastAPI', 'Figma', 'Firebase', 'Flask', 'Flutter', 'FPGA',
  'Game Development', 'GCP', 'Generative AI', 'Git & GitHub', 'Go', 'GraphQL',
  'Hadoop', 'HTML', 'Hugging Face',
  'Internet of Things (IoT)',
  'Java', 'JavaScript', 'Jenkins', 'JUnit',
  'Kali Linux', 'Keras', 'Kotlin', 'Kubernetes',
  'LangChain', 'Large Language Models (LLMs)', 'Linux',
  'Machine Learning', 'MATLAB', 'Microservices', 'MLOps', 'MongoDB', 'MQTT', 'MySQL',
  'Natural Language Processing', 'Networking (CCNA)', 'Next.js', 'Node.js', 'NumPy',
  'Object-Oriented Programming', 'OpenCV', 'Operating Systems',
  'Pandas', 'PCB Design', 'Penetration Testing', 'PLC / SCADA', 'Postman', 'PostgreSQL', 'Power BI', 'Power Electronics', 'Prompt Engineering', 'Python', 'PyTorch',
  'Quantum Computing', 'QA / Manual Testing',
  'R', 'React', 'React Native', 'Redis', 'REST APIs', 'Robotics (ROS)', 'Rust', 'RTOS',
  'Scikit-learn', 'Selenium', 'Simulink', 'SIEM / Splunk', 'SolidWorks', 'Spring Boot', 'SQL', 'Statistics', 'Swift', 'System Design',
  'Tableau', 'Tailwind CSS', 'TensorFlow', 'Terraform', 'TypeScript',
  'UI/UX Design', 'Unity', 'Unreal Engine',
  'Verilog / VHDL', 'Version Control', 'VLSI Design', 'Vue.js',
  'Web Development', 'Wireshark',
  'XGBoost',
  'YOLO (Object Detection)',
  'Zero Trust Security',
];

export const ROLE_SUGGESTIONS = [
  'Full-Stack Developer', 'Frontend Developer', 'Backend Developer', 'Data Analyst', 'Data Scientist', 'Data Engineer',
  'Machine Learning Engineer', 'Generative AI Engineer', 'DevOps Engineer', 'Cloud Engineer', 'Cyber Security Analyst',
  'Android Developer', 'Software Test Engineer (QA)', 'UI/UX Designer', 'Embedded Systems Engineer', 'VLSI Design Engineer',
  'Robotics Engineer', 'EV / Power Electronics Engineer', 'Game Developer', 'Computer Vision Engineer', 'Java Developer', 'Python Developer',
];
