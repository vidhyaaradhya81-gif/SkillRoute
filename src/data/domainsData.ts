import { CSDomain } from '../types';

export const CS_DOMAINS: CSDomain[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Development',
    iconName: 'Code2',
    shortDescription: 'Build modern end-to-end web applications with scalable frontends, serverless APIs, microservices, and databases.',
    fullDescription: 'Full-Stack Web Development covers frontend architectures (React, Next.js, Vue), backend API design (Node.js, Express, Go, Python), database engines (PostgreSQL, MongoDB, Redis), cloud deployments, and modern CI/CD pipelines.',
    categoryTag: 'Web & App',
    avgSalary: '$98,000 - $145,000 / yr',
    hiringDemand: 'Extremely High',
    topTools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js', 'Docker', 'Tailwind CSS'],
    recommendedCourses: [
      {
        id: 'fs-1',
        title: 'Harvard CS50\'s Web Programming with Python & JavaScript',
        platform: 'Harvard University (Open Course & edX)',
        skillLevel: 'Beginner to Intermediate',
        duration: '12 weeks (Self-paced)',
        rating: 4.95,
        studentsEnrolled: '650,000+',
        url: 'https://cs50.harvard.edu/web/',
        isFree: true,
        description: 'Taught by celebrated Harvard professor David J. Malan. Deeply explains Git, HTML5, CSS3, Python, Django, SQL databases, JavaScript, React, CI/CD, and scaling with crystal-clear visual analogies.',
        keyHighlights: ['Taught by David J. Malan', '100% Free Open Course', 'Real-World Capstone Project']
      },
      {
        id: 'fs-2',
        title: 'Full Stack Open 2026: Modern Web Development',
        platform: 'University of Helsinki',
        skillLevel: 'Intermediate',
        duration: 'Self-paced (~120 hours)',
        rating: 4.98,
        studentsEnrolled: '350,000+',
        url: 'https://fullstackopen.com/en/',
        isFree: true,
        description: 'One of the world\'s most acclaimed modern web curriculums. Builds full-stack applications from scratch using React, Redux, Node.js REST APIs, MongoDB, GraphQL, TypeScript, and Docker.',
        keyHighlights: ['Modern TypeScript & React', 'Production-Grade Practices', 'Free University Certificate Option']
      },
      {
        id: 'fs-3',
        title: 'The Odin Project — Full Stack JavaScript Path',
        platform: 'The Odin Project (Open Source Curriculum)',
        skillLevel: 'Beginner to Intermediate',
        duration: 'Self-paced (~250 hours)',
        rating: 4.92,
        studentsEnrolled: '500,000+',
        url: 'https://www.theodinproject.com/paths/full-stack-javascript',
        isFree: true,
        description: 'Renowned zero-fluff, hands-on curriculum that takes learners from basic HTML to professional full-stack applications with Node.js, Express, PostgreSQL, and Git portfolio projects.',
        keyHighlights: ['Project-Driven Learning', 'No Prior Coding Required', 'Active Global Community']
      },
      {
        id: 'fs-4',
        title: 'freeCodeCamp Full-Stack Developer Curriculum',
        platform: 'freeCodeCamp.org',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~300 hours)',
        rating: 4.88,
        studentsEnrolled: '1,500,000+',
        url: 'https://www.freecodecamp.org/learn/',
        isFree: true,
        description: 'Completely interactive, in-browser coding platform. Practice algorithms, build responsive interfaces, design relational databases, and construct secure backend microservices.',
        keyHighlights: ['Browser-Based Interactive Coding', '100% Free Verified Certificate', 'Beginner-Friendly Steps']
      },
      {
        id: 'fs-5',
        title: 'Meta Front-End & Back-End Developer Professional Certificates',
        platform: 'Coursera (Meta / Free Audit Available)',
        skillLevel: 'Beginner',
        duration: '6 months (Free audit available)',
        rating: 4.85,
        studentsEnrolled: '320,000+',
        url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
        isFree: true,
        description: 'Designed by software engineers at Meta to prepare students for entry-level engineering roles. Covers modern React, UI/UX principles, version control, and coding interview preparation.',
        keyHighlights: ['Designed by Meta Engineers', 'Free Audit Option Available', 'Interview Prep Included']
      }
    ],
    learningPath: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Foundations',
        subtitle: 'Master Web Fundamentals & Core Syntax',
        duration: 'Weeks 1 - 4',
        topics: [
          { id: 'fs-t1', name: 'Semantic HTML5 & Modern CSS3', description: 'Flexbox, CSS Grid, Responsive Design & Accessibility standards', keyTools: ['HTML5', 'CSS3', 'Tailwind CSS'] },
          { id: 'fs-t2', name: 'JavaScript Deep Dive (ES6+)', description: 'Asynchronous JS, Promises, Event Loop, Closures, DOM Manipulation', keyTools: ['JavaScript (ES2024)', 'Browser DevTools'] },
          { id: 'fs-t3', name: 'Git & Developer Environment', description: 'Branching strategies, pull requests, CLI commands, and GitHub workflows', keyTools: ['Git', 'GitHub', 'VS Code'] }
        ],
        capstoneProject: {
          name: 'Interactive Personal Developer Portfolio',
          description: 'Build an ultra-responsive dark-mode portfolio showcasing projects, contact forms, and custom CSS micro-interactions.'
        }
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Core Frontend & State Management',
        subtitle: 'Modern Component Architectures & Single Page Apps',
        duration: 'Weeks 5 - 8',
        topics: [
          { id: 'fs-t4', name: 'React 19 & Component Architecture', description: 'JSX, Custom Hooks, Context API, state optimization, and React Router', keyTools: ['React', 'Vite', 'Lucide Icons'] },
          { id: 'fs-t5', name: 'TypeScript Integration', description: 'Type safety, generics, interfaces, and strict type checking in React', keyTools: ['TypeScript'] },
          { id: 'fs-t6', name: 'State Management & Form Handling', description: 'Zustand / Redux Toolkit, TanStack Query, and React Hook Form with Zod validation', keyTools: ['Zustand', 'TanStack Query', 'Zod'] }
        ],
        capstoneProject: {
          name: 'Real-time Task Collaboration Kanban Board',
          description: 'Construct a drag-and-drop task dashboard with persistent local/cloud storage, tag filtering, and activity logs.'
        }
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Backend Services & Databases',
        subtitle: 'RESTful APIs, Authentication & Database Persistence',
        duration: 'Weeks 9 - 12',
        topics: [
          { id: 'fs-t7', name: 'Node.js & Express API Development', description: 'Routing, middleware, rate limiting, validation, and error handling', keyTools: ['Node.js', 'Express', 'Postman'] },
          { id: 'fs-t8', name: 'Relational & NoSQL Databases', description: 'PostgreSQL schema modeling, Drizzle/Prisma ORMs, indexes, and MongoDB queries', keyTools: ['PostgreSQL', 'MongoDB', 'Prisma'] },
          { id: 'fs-t9', name: 'Authentication & Security', description: 'JWT tokens, OAuth2 integration, password hashing (bcrypt), and OWASP security practices', keyTools: ['JWT', 'OAuth', 'Helmet'] }
        ],
        capstoneProject: {
          name: 'Full-Stack E-Commerce Platform with Stripe Checkout',
          description: 'Create a full shopping platform featuring product catalogs, server-side search, JWT auth, shopping cart state, and payment handling.'
        }
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Advanced Architecture & Deployment',
        subtitle: 'Server-Side Rendering, Containers & CI/CD',
        duration: 'Weeks 13 - 16',
        topics: [
          { id: 'fs-t10', name: 'Next.js 15 & Server Components', description: 'App Router, Server Actions, Dynamic Rendering, SEO optimization, and Edge functions', keyTools: ['Next.js', 'Vercel'] },
          { id: 'fs-t11', name: 'Docker & Containerization', description: 'Dockerfiles, multi-stage builds, container networks, and Docker Compose environments', keyTools: ['Docker', 'Docker Compose'] },
          { id: 'fs-t12', name: 'CI/CD Pipelines & Cloud Hosting', description: 'GitHub Actions automated testing, deployment to Vercel/Cloud Run, and application logging', keyTools: ['GitHub Actions', 'Cloud Run', 'Sentry'] }
        ],
        capstoneProject: {
          name: 'Multi-Tenant SaaS Management Platform',
          description: 'Design a serverless SaaS app with multi-user workspace access, analytics dashboard, role permissions, and Docker containerized setup.'
        }
      }
    ],
    industryCertifications: [
      {
        id: 'cert-fs-1',
        title: 'Meta Full-Stack Developer Professional Certificate',
        provider: 'Meta',
        difficulty: 'Intermediate',
        industryValue: 'Top-tier entry certification recognized by global tech enterprises.',
        avgExamFee: '$39/month (Subscription)',
        keyTopics: ['React', 'Node.js', 'Python/Django', 'Databases', 'Git', 'System Design Basics'],
        examCode: 'META-FS-2026',
        url: 'https://www.coursera.org/professional-certificates/meta-full-stack-developer'
      },
      {
        id: 'cert-fs-2',
        title: 'AWS Certified Developer – Associate',
        provider: 'Amazon Web Services',
        difficulty: 'Intermediate',
        industryValue: 'Highly sought after for full-stack cloud-native serverless roles.',
        avgExamFee: '$150',
        keyTopics: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'ECS Containers', 'IAM Security'],
        examCode: 'DVA-C02',
        url: 'https://aws.amazon.com/certification/certified-developer-associate/'
      },
      {
        id: 'cert-fs-3',
        title: 'OpenJS Node.js Application Developer (JSNAD)',
        provider: 'Linux Foundation / OpenJS',
        difficulty: 'Advanced',
        industryValue: 'Gold-standard practical performance certification for backend Node.js developers.',
        avgExamFee: '$300',
        keyTopics: ['Node Core APIs', 'Buffer/Streams', 'Control Flow', 'Security & Error Handling'],
        examCode: 'JSNAD',
        url: 'https://training.linuxfoundation.org/certification/jsnad/'
      }
    ],
    internships: [
      {
        id: 'int-fs-1',
        domainId: 'fullstack',
        roleTitle: 'Full-Stack Software Engineering Intern (Web Platforms & Cloud Services)',
        companyName: 'Google India',
        companyLogoBg: 'bg-blue-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (RMZ Infinity / Old Madras Road)',
        duration: '12 - 14 Weeks (Summer 2026)',
        stipend: '₹1,15,000 / month + Relocation Support',
        requiredSkills: ['TypeScript', 'React', 'Go / Java', 'GCP Cloud Architecture', 'System Design'],
        postedDate: 'Posted 1 day ago',
        deadline: 'Oct 31, 2026 (Priority Review)',
        description: 'Join Google India\'s engineering center in Bengaluru designing high-throughput developer portals, cloud management consoles, and real-time enterprise collaboration tools.',
        responsibilities: [
          'Design and deploy production React and TypeScript features serving millions of active users.',
          'Build resilient microservice RPC endpoints using Go, Java, and Google Cloud Platform technologies.',
          'Participate in design doc reviews, automated testing, and web performance profiling (LCP / INP optimization).'
        ],
        applyUrl: 'https://www.google.com/about/careers/applications/jobs/results/?location=Bengaluru%2C%20Karnataka%2C%20India&q=intern',
        portalName: 'Google India Careers Portal',
        jobReqId: 'REQ-2026-GOOG-BLR-SWE',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-fs-2',
        domainId: 'fullstack',
        roleTitle: 'Full-Stack SDE Intern (E-Commerce Web Architecture & High Scale APIs)',
        companyName: 'Flipkart',
        companyLogoBg: 'bg-yellow-500 text-blue-900',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Bellandur Outer Ring Road Campus)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹85,000 / month + Corporate Transit & Meals',
        requiredSkills: ['React', 'Node.js / Java', 'TypeScript', 'MySQL / PostgreSQL', 'Redis'],
        postedDate: 'Posted 2 days ago',
        deadline: 'Nov 15, 2026',
        description: 'Work at India\'s premier e-commerce campus in Bengaluru, building lightning-fast storefront interfaces, checkout flows, and seller dashboard web portals.',
        responsibilities: [
          'Develop reusable React design system components with strict accessibility and mobile responsiveness.',
          'Build low-latency REST and GraphQL middleware microservices handling millions of peak requests.',
          'Implement Redis caching strategies to optimize product listing page load speeds.'
        ],
        applyUrl: 'https://www.flipkartcareers.com/',
        portalName: 'Flipkart Careers Portal',
        jobReqId: 'REQ-2026-FK-BLR-FS88',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-fs-3',
        domainId: 'fullstack',
        roleTitle: 'Full-Stack Developer Intern (Payments Gateway & Checkout Experience)',
        companyName: 'Razorpay',
        companyLogoBg: 'bg-blue-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Koramangala 4th Block)',
        duration: '16 Weeks (Summer / Fall 2026)',
        stipend: '₹65,000 / month + Wellness Allowance',
        requiredSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'REST APIs'],
        postedDate: 'Posted 3 days ago',
        deadline: 'Rolling Applications (Apply Early)',
        description: 'Architect world-class payment checkout interfaces, merchant analytics dashboards, and developer API SDKs powering digital commerce across India.',
        responsibilities: [
          'Build responsive, highly accessible React components with strict TypeScript types and tokenization.',
          'Develop reliable REST services backed by PostgreSQL database storage and Kafka event buses.',
          'Participate in architectural reviews and security auditing for sensitive financial transactions.'
        ],
        applyUrl: 'https://razorpay.com/jobs/',
        portalName: 'Razorpay Careers (Greenhouse)',
        jobReqId: 'REQ-2026-RZP-PAY21',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-fs-4',
        domainId: 'fullstack',
        roleTitle: 'API Platform Full-Stack Engineering Intern',
        companyName: 'Postman',
        companyLogoBg: 'bg-orange-600 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Karnataka Remote)',
        duration: '12 Weeks (Summer 2026)',
        stipend: '₹70,000 / month + Home Office Setup Allowance',
        requiredSkills: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'API Testing'],
        postedDate: 'Posted 4 days ago',
        deadline: 'Nov 01, 2026',
        description: 'Contribute to the world\'s leading API collaboration platform used by over 30 million developers, building collaborative workspace views, mock servers, and interactive docs.',
        responsibilities: [
          'Build collaborative WebSocket-powered team editing features in Postman Web.',
          'Optimize rendering performance for large JSON request/response payloads in React.',
          'Author developer documentation, interactive tutorials, and automated integration test suites.'
        ],
        applyUrl: 'https://www.postman.com/company/careers/',
        portalName: 'Postman Careers (Greenhouse)',
        jobReqId: 'REQ-2026-POST-API39',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-fs-5',
        domainId: 'fullstack',
        roleTitle: 'Open Source & Full-Stack Web Systems Intern',
        companyName: 'Zerodha',
        companyLogoBg: 'bg-blue-800 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Bengaluru Tech)',
        duration: '12 - 16 Weeks (Fall 2026)',
        stipend: '₹50,000 / month',
        requiredSkills: ['Go / Python', 'Vue.js / React', 'PostgreSQL', 'Linux', 'Microservices'],
        postedDate: 'Posted this week',
        deadline: 'Dec 01, 2026',
        description: 'Join India\'s biggest retail stockbroker engineering team, building clean, ultra-reliable fintech trading interfaces, financial education portals, and open-source tooling.',
        responsibilities: [
          'Develop minimal, lightning-fast UI components with minimal dependency bloat.',
          'Construct scalable backend endpoints in Go and PostgreSQL handling market ticks.',
          'Participate in open-source developer tooling initiatives supported by Zerodha Tech.'
        ],
        applyUrl: 'https://zerodha.com/careers/',
        portalName: 'Zerodha Careers Portal',
        jobReqId: 'REQ-2026-ZRD-FST14',
        batchSeason: 'Fall 2026 Term'
      }
    ]
  },
  {
    id: 'datascience',
    title: 'Data Science & Machine Learning',
    iconName: 'Database',
    shortDescription: 'Extract insights from massive datasets, build predictive statistical models, and deploy production ML pipelines.',
    fullDescription: 'Data Science & Machine Learning combines statistical analysis, data engineering, feature selection, deep learning models (PyTorch, TensorFlow), ML operations (MLflow), and business intelligence data visualization.',
    categoryTag: 'AI & Data',
    avgSalary: '$105,000 - $155,000 / yr',
    hiringDemand: 'Extremely High',
    topTools: ['Python', 'PyTorch', 'Pandas', 'Scikit-learn', 'SQL', 'Jupyter', 'Tableau'],
    recommendedCourses: [
      {
        id: 'ds-1',
        title: 'Machine Learning Specialization by Andrew Ng',
        platform: 'DeepLearning.AI & Stanford (Coursera / Free Audit)',
        skillLevel: 'Beginner',
        duration: '3 months (Free audit available)',
        rating: 4.96,
        studentsEnrolled: '1,800,000+',
        url: 'https://www.coursera.org/specializations/machine-learning-introduction',
        isFree: true,
        description: 'The world\'s most famous introductory machine learning course. Andrew Ng breaks down linear regression, neural networks, decision trees, and recommender systems with zero intimidating math jargon.',
        keyHighlights: ['Taught by Andrew Ng', 'Intuitive Real-World Explanations', 'Free Audit Option Available']
      },
      {
        id: 'ds-2',
        title: 'Kaggle Learn: Python, Pandas & Machine Learning Tracks',
        platform: 'Kaggle (Google / 100% Free)',
        skillLevel: 'Beginner',
        duration: '25 hours (Self-paced micro-courses)',
        rating: 4.92,
        studentsEnrolled: '2,400,000+',
        url: 'https://www.kaggle.com/learn',
        isFree: true,
        description: 'Interactive, in-browser Jupyter notebooks with hands-on exercises. Clean dirty datasets with Pandas, train Scikit-learn regressors, and submit solutions directly to real data competitions.',
        keyHighlights: ['Zero Setup (In-Browser GPU)', 'Fast Hands-on Micro-Lessons', 'Free Verified Badges']
      },
      {
        id: 'ds-3',
        title: 'Harvard CS50\'s Introduction to AI with Python',
        platform: 'Harvard University (Open Course & edX)',
        skillLevel: 'Beginner to Intermediate',
        duration: '7 weeks (Self-paced)',
        rating: 4.94,
        studentsEnrolled: '480,000+',
        url: 'https://cs50.harvard.edu/ai/',
        isFree: true,
        description: 'Covers the algorithmic thinking behind modern AI: search algorithms (Minimax, A*), probability networks, Markov models, machine learning classification, and neural networks with Python.',
        keyHighlights: ['Harvard CS Curriculum', 'Interactive Python Problem Sets', '100% Free Open Course']
      },
      {
        id: 'ds-4',
        title: 'Practical Deep Learning for Coders',
        platform: 'fast.ai (100% Free)',
        skillLevel: 'Beginner to Intermediate',
        duration: 'Self-paced (~60 hours)',
        rating: 4.95,
        studentsEnrolled: '300,000+',
        url: 'https://course.fast.ai/',
        isFree: true,
        description: 'Pragmatic, top-down teaching philosophy created by Jeremy Howard. Train state-of-the-art computer vision models and text classifiers in Python before diving into calculus and algebra foundations.',
        keyHighlights: ['Code-First Pragmatic Style', 'PyTorch & Hugging Face', '100% Free Open Access']
      },
      {
        id: 'ds-5',
        title: 'Google Data Analytics Professional Certificate',
        platform: 'Coursera (Google / Free Audit Available)',
        skillLevel: 'Beginner',
        duration: '6 months (Free audit available)',
        rating: 4.88,
        studentsEnrolled: '1,100,000+',
        url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
        isFree: true,
        description: 'Designed by senior Google data analysts for beginners with zero prior tech experience. Covers spreadsheet analysis, SQL database queries, Tableau visualizations, and R programming.',
        keyHighlights: ['Curated by Google Experts', 'No Prerequisites Needed', 'Free Audit Option Available']
      }
    ],
    learningPath: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Math & Python Foundations',
        subtitle: 'Linear Algebra, Probability, & Data Wrangling',
        duration: 'Weeks 1 - 4',
        topics: [
          { id: 'ds-t1', name: 'Python for Data Science', description: 'Data structures, NumPy vectorized operations, Pandas DataFrames', keyTools: ['Python 3.12', 'NumPy', 'Pandas', 'Jupyter'] },
          { id: 'ds-t2', name: 'Applied Mathematics & Statistics', description: 'Matrix operations, calculus derivatives, hypothesis testing, distributions', keyTools: ['SciPy', 'Statsmodels'] },
          { id: 'ds-t3', name: 'SQL & Data Querying', description: 'Aggregations, joins, window functions, CTEs, and relational database queries', keyTools: ['PostgreSQL', 'DuckDB', 'DBeaver'] }
        ],
        capstoneProject: {
          name: 'Exploratory Data Analysis (EDA) on Real-World Housing Market Data',
          description: 'Clean raw dataset with 100k+ rows, impute missing values, run statistical tests, and present visual insights.'
        }
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Machine Learning Fundamentals',
        subtitle: 'Supervised & Unsupervised Learning Algorithms',
        duration: 'Weeks 5 - 8',
        topics: [
          { id: 'ds-t4', name: 'Supervised Learning', description: 'Linear/Logistic Regression, Decision Trees, Random Forests, XGBoost, SVMs', keyTools: ['Scikit-learn', 'XGBoost'] },
          { id: 'ds-t5', name: 'Unsupervised Learning', description: 'K-Means clustering, PCA dimension reduction, Anomaly Detection', keyTools: ['Scikit-learn', 'Matplotlib', 'Seaborn'] },
          { id: 'ds-t6', name: 'Model Evaluation & Tuning', description: 'Cross-validation, ROC-AUC, precision-recall, hyperparameter optimization', keyTools: ['Optuna', 'GridSearchCV'] }
        ],
        capstoneProject: {
          name: 'Predictive Customer Churn & Lifetime Value Model',
          description: 'Train gradient boosted classifiers to identify churn risks with feature importance charts and automated API reporting.'
        }
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Deep Learning & Neural Networks',
        subtitle: 'Computer Vision, Sequential Data, & Transformers',
        duration: 'Weeks 9 - 12',
        topics: [
          { id: 'ds-t7', name: 'Neural Networks with PyTorch', description: 'Tensors, autograd, backpropagation, activation functions, custom Loss loops', keyTools: ['PyTorch', 'Torchvision'] },
          { id: 'ds-t8', name: 'Convolutional & Recurrent Networks', description: 'CNN architectures (ResNet, EfficientNet) for image classification and time series forecasting', keyTools: ['PyTorch', 'TensorBoard'] },
          { id: 'ds-t9', name: 'Introduction to Transformers & Hugging Face', description: 'Self-attention mechanism, fine-tuning pre-trained models for text classification', keyTools: ['Hugging Face', 'Transformers'] }
        ],
        capstoneProject: {
          name: 'Medical Image Diagnostic Classifier',
          description: 'Fine-tune a PyTorch vision model to detect X-ray abnormalities with heatmaps (Grad-CAM) and precision metrics.'
        }
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: MLOps & Production Deployment',
        subtitle: 'Model Serving, Monitoring & Pipeline Automation',
        duration: 'Weeks 13 - 16',
        topics: [
          { id: 'ds-t10', name: 'FastAPI Model Serving', description: 'REST APIs for ML model inferencing, Docker packaging, input validation', keyTools: ['FastAPI', 'Uvicorn', 'Pydantic'] },
          { id: 'ds-t11', name: 'ML Experiment Tracking', description: 'MLflow model registry, artifact storage, metric logging, and versioning', keyTools: ['MLflow', 'DVC'] },
          { id: 'ds-t12', name: 'Interactive Dashboards & Cloud Hosting', description: 'Streamlit/Gradio web interfaces deployed to AWS/GCP with live drift monitoring', keyTools: ['Streamlit', 'Gradio', 'Docker'] }
        ],
        capstoneProject: {
          name: 'Production End-to-End Sentiment Analysis API Platform',
          description: 'Deploy a containerized NLP model endpoint with Streamlit monitoring dashboard, Docker build, and MLflow metric logs.'
        }
      }
    ],
    industryCertifications: [
      {
        id: 'cert-ds-1',
        title: 'Google Professional Data Engineer',
        provider: 'Google Cloud',
        difficulty: 'Advanced',
        industryValue: 'Premier industry credential for big data, pipeline building, and ML on GCP.',
        avgExamFee: '$200',
        keyTopics: ['BigQuery', 'Dataflow', 'Dataproc', 'Vertex AI', 'Pipeline Design'],
        examCode: 'GCP-PDE',
        url: 'https://cloud.google.com/learn/certification/data-engineer'
      },
      {
        id: 'cert-ds-2',
        title: 'AWS Certified Machine Learning – Specialty',
        provider: 'Amazon Web Services',
        difficulty: 'Advanced',
        industryValue: 'Validated standard for designing, implementing, and deploying ML models on AWS SageMaker.',
        avgExamFee: '$300',
        keyTopics: ['SageMaker', 'Feature Engineering', 'Model Optimization', 'Computer Vision/NLP'],
        examCode: 'MLS-C01',
        url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/'
      },
      {
        id: 'cert-ds-3',
        title: 'IBM Data Science Professional Certificate',
        provider: 'IBM',
        difficulty: 'Beginner',
        industryValue: 'Excellent entry certification covering Python, SQL, data visualization, and ML basics.',
        avgExamFee: '$39/month',
        keyTopics: ['Python', 'SQL', 'Data Analysis', 'Data Visualization', 'Scikit-learn'],
        examCode: 'IBM-DS-2026',
        url: 'https://www.coursera.org/professional-certificates/ibm-data-science'
      }
    ],
    internships: [
      {
        id: 'int-ds-1',
        domainId: 'datascience',
        roleTitle: 'Data Science & Applied Machine Learning Intern',
        companyName: 'Microsoft India',
        companyLogoBg: 'bg-blue-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Outer Ring Road Tech Campus)',
        duration: '12 - 14 Weeks (Summer 2026)',
        stipend: '₹1,25,000 / month + Relocation & Housing Support',
        requiredSkills: ['Python', 'PyTorch', 'Statistical Evaluation', 'SQL', 'Transformer Models'],
        postedDate: 'Posted 1 day ago',
        deadline: 'Nov 01, 2026',
        description: 'Join Microsoft India Development Center in Bengaluru developing enterprise machine learning pipelines, predictive customer models, and AI copilot evaluation harnesses.',
        responsibilities: [
          'Build end-to-end evaluation pipelines to assess model accuracy, latency, and fairness metrics.',
          'Execute large-scale data cleansing and statistical feature engineering workflows in Python and PySpark.',
          'Collaborate with global research teams on applied NLP and user intent classification.'
        ],
        applyUrl: 'https://jobs.careers.microsoft.com/global/en/search?q=intern&lc=Bengaluru%2C%20Karnataka%2C%20India',
        portalName: 'Microsoft India Careers Portal',
        jobReqId: 'REQ-2026-MSFT-BLR-DS',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-ds-2',
        domainId: 'datascience',
        roleTitle: 'Data Science & Algorithmic Optimization Intern',
        companyName: 'Amazon India',
        companyLogoBg: 'bg-amber-600 text-black',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Bagmane Tech Park, CV Raman Nagar)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹1,10,000 / month + Relocation Allowance',
        requiredSkills: ['Python', 'SQL', 'A/B Testing', 'Causal Inference', 'Pandas / Spark'],
        postedDate: 'Posted 2 days ago',
        deadline: 'Oct 25, 2026',
        description: 'Uncover insights into Indian e-commerce fulfillment, consumer demand forecasting, and recommendation ranking algorithms at Amazon India\'s flagship Bengaluru tech campus.',
        responsibilities: [
          'Query petabyte-scale fulfillment and catalog logs using Redshift, Athena, and Spark.',
          'Build causal inference statistical models measuring regional demand spikes and inventory latency.',
          'Present actionable experimentation results to principal scientists and product directors.'
        ],
        applyUrl: 'https://www.amazon.jobs/en/locations/bangalore-india',
        portalName: 'Amazon India Student Programs',
        jobReqId: 'REQ-2026-AMZN-BLR-DS44',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-ds-3',
        domainId: 'datascience',
        roleTitle: 'Machine Learning & TensorRT Acceleration Intern',
        companyName: 'NVIDIA India',
        companyLogoBg: 'bg-lime-700 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (Manyata Embassy Business Park)',
        duration: '14 Weeks (Summer 2026)',
        stipend: '₹90,000 / month + Corporate Transit & Meals',
        requiredSkills: ['Python', 'PyTorch', 'CUDA Compute', 'TensorRT', 'C++'],
        postedDate: 'Posted 3 days ago',
        deadline: 'Nov 10, 2026',
        description: 'Join NVIDIA\'s AI Applied Research Labs at Manyata Tech Park Bengaluru to benchmark deep neural network training efficiency, profiling memory throughput, and optimizing TensorRT model quantization.',
        responsibilities: [
          'Benchmark multimodal vision models on NVIDIA GPU clusters hosted in Bengaluru.',
          'Curate and clean multimodal training datasets with high-throughput streaming loaders.',
          'Document latency benchmarks and contribute to open-source NVIDIA AI toolkits.'
        ],
        applyUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite',
        portalName: 'NVIDIA India University Portal (Workday)',
        jobReqId: 'REQ-2026-NVDA-BLR-ML',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-ds-4',
        domainId: 'datascience',
        roleTitle: 'Data Science & Delivery Logistics Optimization Intern',
        companyName: 'Swiggy',
        companyLogoBg: 'bg-orange-600 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Karnataka Remote)',
        duration: '12 Weeks (Summer 2026)',
        stipend: '₹75,000 / month + Meal Credits',
        requiredSkills: ['Python', 'Probability & Statistics', 'Machine Learning', 'Spatial Data / Geospatial', 'SQL'],
        postedDate: 'Posted 4 days ago',
        deadline: 'Nov 05, 2026',
        description: 'Work with Swiggy\'s remote-first data science team tackling hyper-local delivery routing, automated surge pricing, and restaurant recommendation algorithms across 500+ Indian cities.',
        responsibilities: [
          'Develop predictive machine learning models estimating delivery partner arrival times (ETAs).',
          'Analyze geospatial delivery heatmaps to balance delivery supply and demand equilibrium.',
          'Perform robust A/B hypothesis tests for app homepage dish recommendations.'
        ],
        applyUrl: 'https://careers.swiggy.com/',
        portalName: 'Swiggy Careers Portal',
        jobReqId: 'REQ-2026-SWG-DS19',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-ds-5',
        domainId: 'datascience',
        roleTitle: 'Data Analytics & Financial Intelligence Intern',
        companyName: 'CRED',
        companyLogoBg: 'bg-black text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Indiranagar 100ft Road)',
        duration: '12 Weeks (Fall 2026)',
        stipend: '₹60,000 / month + Perks',
        requiredSkills: ['SQL', 'Python / R', 'Statistical Modeling', 'Tableau', 'Data Storytelling'],
        postedDate: 'Posted this week',
        deadline: 'Nov 30, 2026',
        description: 'Analyze member credit repayment behaviors, design gamification engagement metrics, and build automated analytics dashboards at CRED\'s Indiranagar design lab.',
        responsibilities: [
          'Build automated executive dashboards measuring payment adoption and user retention.',
          'Formulate statistical experiment designs to test novel user reward reward drops.',
          'Collaborate directly with cross-functional leadership across product, engineering, and risk.'
        ],
        applyUrl: 'https://cred.club/careers',
        portalName: 'CRED Careers Portal',
        jobReqId: 'REQ-2026-CRED-ANL82',
        batchSeason: 'Fall 2026 Cohort'
      }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Computing & DevOps',
    iconName: 'Cloud',
    shortDescription: 'Architect resilient multi-cloud infrastructure, automate CI/CD release pipelines, and manage Kubernetes clusters.',
    fullDescription: 'Cloud Computing & DevOps focuses on cloud infrastructure automation (AWS, GCP, Azure), Infrastructure as Code (Terraform), container orchestration (Kubernetes), continuous deployment (GitHub Actions, ArgoCD), and site reliability engineering (SRE).',
    categoryTag: 'Cloud & Sec',
    avgSalary: '$108,000 - $160,000 / yr',
    hiringDemand: 'Extremely High',
    topTools: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Linux', 'Ansible', 'Prometheus'],
    recommendedCourses: [
      {
        id: 'cl-1',
        title: 'AWS Cloud Practitioner Essentials (Official Amazon Training)',
        platform: 'AWS Skill Builder (Amazon / 100% Free)',
        skillLevel: 'Beginner',
        duration: '6 hours (Self-paced)',
        rating: 4.92,
        studentsEnrolled: '1,200,000+',
        url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials',
        isFree: true,
        description: 'Amazon\'s official free course teaching fundamental cloud architecture: EC2 instances, S3 buckets, VPC networks, RDS databases, IAM security, and pricing with beginner-friendly metaphors.',
        keyHighlights: ['Official AWS Curriculum', 'Zero-Cost Free Enrollment', 'Fundamental Cloud Concepts']
      },
      {
        id: 'cl-2',
        title: 'Google Cloud Computing Foundations',
        platform: 'Google Cloud Skills Boost (100% Free)',
        skillLevel: 'Beginner',
        duration: '15 hours (Self-paced)',
        rating: 4.89,
        studentsEnrolled: '450,000+',
        url: 'https://www.cloudskillsboost.google/course_templates/153',
        isFree: true,
        description: 'Interactive introduction by Google Cloud engineers. Practice launching compute instances, setting up BigQuery, configuring IAM roles, and managing Google Kubernetes Engine clusters.',
        keyHighlights: ['Hands-on Cloud Console Labs', 'Google Official Course', 'Earn Shareable Skill Badges']
      },
      {
        id: 'cl-3',
        title: 'Docker & Kubernetes Handbook for Beginners',
        platform: 'freeCodeCamp.org (100% Free)',
        skillLevel: 'Beginner to Intermediate',
        duration: 'Self-paced (~25 hours)',
        rating: 4.95,
        studentsEnrolled: '750,000+',
        url: 'https://www.freecodecamp.org/news/the-docker-handbook/',
        isFree: true,
        description: 'The clearest guide to containerization in software engineering. Learn how to write Dockerfiles, connect multi-container networks with Docker Compose, and deploy microservices to Kubernetes.',
        keyHighlights: ['Zero Cloud Costs Required', 'Visual Diagrams & CLI Guides', '100% Free Open Course']
      },
      {
        id: 'cl-4',
        title: 'Architecting with Google Cloud Platform Specialization',
        platform: 'Coursera (Google Cloud / Free Audit Available)',
        skillLevel: 'Intermediate',
        duration: '3 months (Free audit available)',
        rating: 4.86,
        studentsEnrolled: '350,000+',
        url: 'https://www.coursera.org/specializations/gcp-architecture',
        isFree: true,
        description: 'Deep-dive into designing highly available, reliable cloud infrastructure on Google Cloud. Covers virtual private clouds (VPCs), autoscaling compute pools, and disaster recovery architectures.',
        keyHighlights: ['Enterprise Cloud Architecture', 'Free Audit Option Available', 'Aligned to GCP Associate Exam']
      },
      {
        id: 'cl-5',
        title: 'Terraform Infrastructure as Code (IaC) Official Tutorials',
        platform: 'HashiCorp Developer (100% Free)',
        skillLevel: 'Intermediate',
        duration: 'Self-paced (~15 hours)',
        rating: 4.91,
        studentsEnrolled: '220,000+',
        url: 'https://developer.hashicorp.com/terraform/tutorials',
        isFree: true,
        description: 'Official interactive tutorials from HashiCorp. Learn to provision, change, and version cloud infrastructure safely using declarative HCL code across AWS, Azure, and Google Cloud.',
        keyHighlights: ['Official HashiCorp Docs', 'Live Sandbox Examples', '100% Free Interactive Guides']
      }
    ],
    learningPath: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Linux & Networking Foundations',
        subtitle: 'Command Line Mastery & Networking Protocols',
        duration: 'Weeks 1 - 4',
        topics: [
          { id: 'cl-t1', name: 'Linux System Administration', description: 'Bash scripting, permissions, systemd services, SSH, process monitoring', keyTools: ['Ubuntu/Debian', 'Bash', 'Systemd', 'SSH'] },
          { id: 'cl-t2', name: 'Networking Fundamentals', description: 'TCP/IP, DNS routing, HTTP/S, SSL/TLS certificates, firewalls, and CIDR subnets', keyTools: ['Wireshark', 'Nmap', 'Dig', 'Curl'] },
          { id: 'cl-t3', name: 'Version Control & GitOps Basics', description: 'Branching, Git tags, semantic versioning, and automated repository hooks', keyTools: ['Git', 'GitHub'] }
        ],
        capstoneProject: {
          name: 'Automated Linux Web Server & Reverse Proxy Setup',
          description: 'Configure an Ubuntu cloud VM running Nginx, Let\'s Encrypt SSL auto-renewal, and firewall rules via Bash scripts.'
        }
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Cloud Infrastructure & Automation',
        subtitle: 'AWS/GCP Core Services & Infrastructure as Code',
        duration: 'Weeks 5 - 8',
        topics: [
          { id: 'cl-t4', name: 'AWS & GCP Core Services', description: 'EC2/Compute Engine, VPCs, S3 buckets, IAM roles, security groups, RDS databases', keyTools: ['AWS Management Console', 'AWS CLI', 'GCP'] },
          { id: 'cl-t5', name: 'Infrastructure as Code (IaC)', description: 'Terraform modules, state management, variables, environments, and drift detection', keyTools: ['Terraform', 'Terragrunt'] },
          { id: 'cl-t6', name: 'Configuration Management', description: 'Ansible playbooks, task automation, secrets management', keyTools: ['Ansible', 'Vault'] }
        ],
        capstoneProject: {
          name: 'Multi-Region High-Availability VPC & Web App with Terraform',
          description: 'Provision an entire AWS infrastructure stack with auto-scaling groups, application load balancer, and PostgreSQL RDS via Terraform.'
        }
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Containers & Orchestration',
        subtitle: 'Docker Microservices & Production Kubernetes',
        duration: 'Weeks 9 - 12',
        topics: [
          { id: 'cl-t7', name: 'Docker Containerization', description: 'Multi-stage Dockerfiles, image security scanning, docker-compose orchestration', keyTools: ['Docker', 'Trivy'] },
          { id: 'cl-t8', name: 'Kubernetes Core Objects', description: 'Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, Persistent Volumes', keyTools: ['Kubectl', 'Minikube/Kind', 'Helm'] },
          { id: 'cl-t9', name: 'Kubernetes Cluster Management & Helm', description: 'Helm package charts, cluster scaling, node pools, service mesh (Istio) basics', keyTools: ['Helm', 'EKS/GKE'] }
        ],
        capstoneProject: {
          name: 'Production Kubernetes Cluster with Helm Packaging',
          description: 'Deploy a microservices application to AWS EKS using Helm charts, Cert-Manager, and Nginx Ingress Controller.'
        }
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: CI/CD, SRE & Observability',
        subtitle: 'Continuous Deployment & Infrastructure Monitoring',
        duration: 'Weeks 13 - 16',
        topics: [
          { id: 'cl-t10', name: 'CI/CD Pipelines & GitOps', description: 'GitHub Actions workflows, automated testing, ArgoCD continuous deployment', keyTools: ['GitHub Actions', 'ArgoCD'] },
          { id: 'cl-t11', name: 'Observability & Monitoring', description: 'Prometheus metrics collection, Grafana dashboards, alerting rules, and log aggregation', keyTools: ['Prometheus', 'Grafana', 'Loki'] },
          { id: 'cl-t12', name: 'Site Reliability Engineering (SRE)', description: 'SLOs, SLIs, error budgets, blameless post-mortems, and chaos engineering', keyTools: ['Chaos Mesh', 'PagerDuty'] }
        ],
        capstoneProject: {
          name: 'GitOps CI/CD Pipeline with Prometheus/Grafana Alerting',
          description: 'Build a zero-downtime GitOps pipeline using GitHub Actions and ArgoCD with real-time Grafana telemetry dashboards.'
        }
      }
    ],
    industryCertifications: [
      {
        id: 'cert-cl-1',
        title: 'AWS Certified Solutions Architect – Associate',
        provider: 'Amazon Web Services',
        difficulty: 'Intermediate',
        industryValue: 'World\'s #1 recognized cloud architecture credential.',
        avgExamFee: '$150',
        keyTopics: ['VPC Networking', 'S3 & Storage', 'EC2 & Auto Scaling', 'IAM Security', 'RDS'],
        examCode: 'SAA-C03',
        url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
      },
      {
        id: 'cert-cl-2',
        title: 'Certified Kubernetes Administrator (CKA)',
        provider: 'Cloud Native Computing Foundation (CNCF)',
        difficulty: 'Advanced',
        industryValue: 'Hands-on practical performance exam required by top DevOps teams globally.',
        avgExamFee: '$395',
        keyTopics: ['Cluster Architecture', 'Workloads & Scheduling', 'Networking', 'Storage', 'Troubleshooting'],
        examCode: 'CKA',
        url: 'https://www.cncf.io/certification/cka/'
      },
      {
        id: 'cert-cl-3',
        title: 'HashiCorp Certified: Terraform Associate (003)',
        provider: 'HashiCorp',
        difficulty: 'Intermediate',
        industryValue: 'Industry standard certification for Infrastructure as Code (IaC) automation.',
        avgExamFee: '$705',
        keyTopics: ['IaC Concepts', 'Terraform CLI', 'Modules', 'State Management', 'Cloud Workflows'],
        examCode: 'TA-003',
        url: 'https://www.hashicorp.com/certification/terraform-associate'
      }
    ],
    internships: [
      {
        id: 'int-cl-1',
        domainId: 'cloud',
        roleTitle: 'Cloud Infrastructure & SRE Systems Engineering Intern',
        companyName: 'Amazon Web Services (AWS India)',
        companyLogoBg: 'bg-amber-600 text-black',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Bagmane World Technology Center, ORR)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹1,10,000 / month + Relocation Support',
        requiredSkills: ['Linux Systems', 'AWS Core (EC2/S3/VPC)', 'Python / Bash', 'Terraform', 'Networking'],
        postedDate: 'Posted 1 day ago',
        deadline: 'Nov 15, 2026',
        description: 'Work directly on AWS elastic compute, hypervisor infrastructure, and distributed telemetry teams in Bengaluru automating cloud fleet capacity, VPC routing, and IAM security controls.',
        responsibilities: [
          'Develop automated Terraform and CloudFormation scripts for AWS elastic cluster provisioning.',
          'Audit cloud infrastructure security boundaries using AWS Config and IAM Access Analyzer.',
          'Author Bash and Python automation scripts for metric aggregation, disk healing, and health telemetry.'
        ],
        applyUrl: 'https://www.amazon.jobs/en/locations/bangalore-india',
        portalName: 'Amazon India Student Programs',
        jobReqId: 'REQ-2026-AWS-BLR-INFRA89',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-cl-2',
        domainId: 'cloud',
        roleTitle: 'Multi-Cloud Kubernetes & Platform Operations Intern',
        companyName: 'Cisco Systems India',
        companyLogoBg: 'bg-teal-700 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Cessna Business Park, Kadubeesanahalli, ORR)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹75,000 / month + Health & Wellness Allowance',
        requiredSkills: ['Kubernetes', 'Docker', 'Go / Python', 'Prometheus', 'Helm'],
        postedDate: 'Posted 2 days ago',
        deadline: 'Nov 01, 2026',
        description: 'Scale multi-cloud Kubernetes control planes and cloud-native service mesh clusters hosting critical microservices across enterprise hybrid cloud environments at Cisco Bengaluru campus.',
        responsibilities: [
          'Maintain and tune Kubernetes Horizontal Pod Autoscaling (HPA) rules across large distributed node pools.',
          'Enhance CI/CD validation pipelines to accelerate developer container builds and image signing.',
          'Construct custom Grafana alerting dashboards for real-time site reliability incident mitigation.'
        ],
        applyUrl: 'https://jobs.cisco.com/jobs/SearchJobs/internship%20bangalore',
        portalName: 'Cisco India Early Careers Portal',
        jobReqId: 'REQ-2026-CSCO-BLR-K8S44',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-cl-3',
        domainId: 'cloud',
        roleTitle: 'Enterprise Linux & Cloud Automation Systems Intern',
        companyName: 'Red Hat India',
        companyLogoBg: 'bg-red-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Bagmane Tech Park, CV Raman Nagar)',
        duration: '14 Weeks (Summer / Fall 2026)',
        stipend: '₹65,000 / month + Learning Budget',
        requiredSkills: ['Linux Kernel', 'Ansible', 'OpenShift / K8s', 'Bash / Python', 'GitOps'],
        postedDate: 'Posted 4 days ago',
        deadline: 'Dec 05, 2026',
        description: 'Join Red Hat India in Bengaluru engineering open-source enterprise Linux, OpenShift hybrid cloud orchestrators, and automated Ansible deployment playbooks.',
        responsibilities: [
          'Develop and test automated Ansible playbooks for multi-tenant Linux cluster configuration.',
          'Validate OpenShift operator lifecycle management routines and container storage interfaces.',
          'Participate in upstream open-source cloud native and CNCF community initiatives.'
        ],
        applyUrl: 'https://www.redhat.com/en/jobs',
        portalName: 'Red Hat Early Career Careers',
        jobReqId: 'REQ-2026-RH-BLR-OS21',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-cl-4',
        domainId: 'cloud',
        roleTitle: 'Cloud Solutions & DevOps Automation Intern',
        companyName: 'Wipro Technologies',
        companyLogoBg: 'bg-indigo-700 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (Sarjapur Road Campus) / Hubballi, Karnataka',
        duration: '16 Weeks (Summer 2026)',
        stipend: '₹45,000 / month + Commute Support',
        requiredSkills: ['Linux', 'Azure / AWS', 'Docker', 'Terraform', 'CI/CD Pipelines'],
        postedDate: 'Posted 3 days ago',
        deadline: 'Oct 30, 2026 (Priority)',
        description: 'Collaborate with Wipro FullStride Cloud services teams in Karnataka designing automated deployment pipelines, infrastructure security benchmarks, and hybrid cloud migrations.',
        responsibilities: [
          'Build reusable GitHub Actions and GitLab CI pipelines for automated image builds and testing.',
          'Automate multi-region failover tests across international client cloud environments.',
          'Implement infrastructure as code using Terraform to standardize cloud resource configurations.'
        ],
        applyUrl: 'https://careers.wipro.com/global-careers',
        portalName: 'Wipro Elite & Student Careers',
        jobReqId: 'REQ-2026-WIP-KTK-CLD95',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-cl-5',
        domainId: 'cloud',
        roleTitle: 'Infrastructure as Code & Cloud Automation Intern',
        companyName: 'HashiCorp (IBM)',
        companyLogoBg: 'bg-slate-900 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Karnataka Remote)',
        duration: '12 Weeks (Summer / Fall 2026)',
        stipend: '₹70,000 / month + Home Workstation Allowance',
        requiredSkills: ['Terraform', 'Vault', 'Go', 'Docker', 'GitHub Actions'],
        postedDate: 'Posted this week',
        deadline: 'Open until filled',
        description: 'Contribute to Terraform and Vault cloud automation ecosystems, validating multi-cloud provider modules, automated secrets rotation, and enterprise GitOps workflows.',
        responsibilities: [
          'Develop and test Terraform provider modules in Go against AWS, GCP, and Azure APIs.',
          'Build automated secrets rotation workflows using HashiCorp Vault.',
          'Author developer tutorials and open-source documentation for Indian cloud engineers.'
        ],
        applyUrl: 'https://www.hashicorp.com/careers',
        portalName: 'HashiCorp Careers Portal',
        jobReqId: 'REQ-2026-HASH-IN-TF12',
        batchSeason: 'Summer 2026 Cohort'
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    iconName: 'ShieldAlert',
    shortDescription: 'Defend enterprise infrastructure, perform penetration testing, analyze security threats, and implement zero-trust architectures.',
    fullDescription: 'Cybersecurity covers red teaming (ethical hacking, penetration testing), blue teaming (SOC monitoring, SIEM, incident response), vulnerability management, cryptography, web security (OWASP), and cloud security.',
    categoryTag: 'Cloud & Sec',
    avgSalary: '$102,000 - $152,000 / yr',
    hiringDemand: 'Extremely High',
    topTools: ['Wireshark', 'Burp Suite', 'Metasploit', 'Nmap', 'Kali Linux', 'Splunk', 'Python'],
    recommendedCourses: [
      {
        id: 'sec-1',
        title: 'Google Cybersecurity Professional Certificate',
        platform: 'Coursera (Google / Free Audit Available)',
        skillLevel: 'Beginner',
        duration: '6 months (Free audit available)',
        rating: 4.89,
        studentsEnrolled: '500,000+',
        url: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
        isFree: true,
        description: 'Taught by Google security analysts for complete beginners. Covers Linux CLI commands, Python security scripting, SQL database audits, SIEM tools, and network packet analysis with Wireshark.',
        keyHighlights: ['Curated by Google Security Teams', 'Zero Prior Background Needed', 'Free Audit Option Available']
      },
      {
        id: 'sec-2',
        title: 'PortSwigger Web Security Academy (Burp Suite Official)',
        platform: 'PortSwigger (100% Free Interactive Labs)',
        skillLevel: 'Beginner to Advanced',
        duration: 'Self-paced (~80 hours)',
        rating: 4.98,
        studentsEnrolled: '650,000+',
        url: 'https://portswigger.net/web-security',
        isFree: true,
        description: 'The industry-standard hands-on training built by the creators of Burp Suite. Learn ethical web vulnerability exploitation: SQL injection, cross-site scripting (XSS), CSRF, authentication bypasses, and SSRF.',
        keyHighlights: ['Real In-Browser Vulnerable Labs', 'Industry Standard Burp Suite', '100% Free Open Training']
      },
      {
        id: 'sec-3',
        title: 'TryHackMe: Pre-Security & Complete Beginner Path',
        platform: 'TryHackMe (Free Browser Rooms)',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~40 hours)',
        rating: 4.95,
        studentsEnrolled: '2,200,000+',
        url: 'https://tryhackme.com/path/outline/pre-security',
        isFree: true,
        description: 'Fun, gamified introduction to hacking and defense. Teaches networking fundamentals, web protocols, and terminal mechanics using cloud-hosted Linux virtual machines directly inside your browser.',
        keyHighlights: ['In-Browser Virtual Machines', 'Gamified Badges & Streaks', 'Free Foundational Rooms']
      },
      {
        id: 'sec-4',
        title: 'Harvard CS50\'s Introduction to Cybersecurity',
        platform: 'Harvard University (Open Course & edX)',
        skillLevel: 'Beginner',
        duration: '5 weeks (Self-paced)',
        rating: 4.94,
        studentsEnrolled: '350,000+',
        url: 'https://cs50.harvard.edu/cybersecurity/',
        isFree: true,
        description: 'Harvard University course explaining high-level threat defense, encryption algorithms, hashing, multi-factor authentication, phishing defense, and privacy architectures.',
        keyHighlights: ['Harvard Faculty Instruction', 'High-Concept Threat Modeling', '100% Free Open Course']
      },
      {
        id: 'sec-5',
        title: 'OverTheWire: Bandit Linux Security Wargame',
        platform: 'OverTheWire.org (100% Free)',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~20 hours)',
        rating: 4.92,
        studentsEnrolled: '800,000+',
        url: 'https://overthewire.org/wargames/bandit/',
        isFree: true,
        description: 'Beloved classic ethical hacking challenge that teaches real Linux command mastery, SSH protocols, file permissions, decoding strings, and network sockets through 34 progressively tricky levels.',
        keyHighlights: ['Real Live SSH Terminal Target', 'Interactive Puzzle Solving', '100% Free Community Classic']
      }
    ],
    learningPath: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Security Fundamentals & Networking',
        subtitle: 'OS Security, Packets, Protocols & Linux Mastery',
        duration: 'Weeks 1 - 4',
        topics: [
          { id: 'sec-t1', name: 'Networking Protocols & Packet Analysis', description: 'OSI 7-layer model, TCP 3-way handshake, DNS, DHCP, SSL/TLS, packet capture', keyTools: ['Wireshark', 'Tcpdump', 'Nmap'] },
          { id: 'sec-t2', name: 'Linux & Windows OS Security Internals', description: 'Permissions, Active Directory basics, registry, processes, system logging', keyTools: ['Kali Linux', 'PowerShell', 'Sysinternals'] },
          { id: 'sec-t3', name: 'Security Concepts & Cryptography', description: 'CIA Triad, symmetric/asymmetric encryption, hashing, PKI certificates, Zero Trust', keyTools: ['OpenSSL', 'GPG'] }
        ],
        capstoneProject: {
          name: 'Network Threat Inspection & Packet Capture Analysis',
          description: 'Analyze PCAP files in Wireshark to identify port scans, cleartext passwords, and malicious beacon traffic.'
        }
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Web Application Security & Red Teaming',
        subtitle: 'OWASP Top 10 Exploitation & Vulnerability Assessment',
        duration: 'Weeks 5 - 8',
        topics: [
          { id: 'sec-t4', name: 'OWASP Top 10 Web Vulnerabilities', description: 'SQL Injection, XSS, CSRF, Broken Auth, IDOR, SSRF, Command Injection', keyTools: ['Burp Suite Community', 'OWASP ZAP'] },
          { id: 'sec-t5', name: 'Penetration Testing Frameworks', description: 'Reconnaissance, scanning, exploitation, privilege escalation, reporting', keyTools: ['Metasploit', 'Gobuster', 'Hydra'] },
          { id: 'sec-t6', name: 'Python for Ethical Hackers', description: 'Writing custom port scanners, credential brute-forcers, and exploit payloads', keyTools: ['Python', 'Requests', 'Scapy'] }
        ],
        capstoneProject: {
          name: 'Vulnerability Assessment Report on Lab Targets',
          description: 'Perform a comprehensive security audit on a vulnerable web target (DVWA/Juice Shop) with executive mitigation recommendations.'
        }
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Defensive Security (Blue Team) & SIEM',
        subtitle: 'SOC Operations, Threat Hunting & Incident Response',
        duration: 'Weeks 9 - 12',
        topics: [
          { id: 'sec-t7', name: 'SIEM & Log Aggregation', description: 'Splunk searching, ELK stack queries, correlation rules, threat alerts', keyTools: ['Splunk', 'Elastic Security', 'Wazuh'] },
          { id: 'sec-t8', name: 'Endpoint Detection & Threat Hunting', description: 'Sysmon logs, YARA rules, Memory forensics, Volatility framework', keyTools: ['Sysmon', 'Volatility', 'Autopsy'] },
          { id: 'sec-t9', name: 'Incident Response Frameworks', description: 'NIST/SANS incident handling cycles, containment, eradication, recovery', keyTools: ['TheHive', 'Cortex'] }
        ],
        capstoneProject: {
          name: 'SOC Incident Response Simulation in Splunk',
          description: 'Detect malware infection vectors in Splunk event logs, build rule alerts, and document forensic containment steps.'
        }
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Cloud Security & DevSecOps',
        subtitle: 'AWS Security, Container Auditing & CI/CD Guardrails',
        duration: 'Weeks 13 - 16',
        topics: [
          { id: 'sec-t10', name: 'Cloud Security Architecture (AWS/GCP)', description: 'IAM policies, GuardDuty, AWS Security Hub, S3 bucket lock down', keyTools: ['AWS IAM', 'Prowler', 'ScoutSuite'] },
          { id: 'sec-t11', name: 'Container & Code Security', description: 'SAST/DAST scanning, dependency vulnerability audit, Docker file hardening', keyTools: ['Snyk', 'Trivy', 'SonarQube'] },
          { id: 'sec-t12', name: 'Security Compliance & Standards', description: 'ISO 27001, SOC 2 Type II, NIST Cybersecurity Framework, GDPR basics', keyTools: ['NIST CSF', 'CIS Benchmarks'] }
        ],
        capstoneProject: {
          name: 'Automated DevSecOps Security Pipeline',
          description: 'Integrate Snyk vulnerability scanning, Docker image security checks, and secret scanners into GitHub Actions.'
        }
      }
    ],
    industryCertifications: [
      {
        id: 'cert-sec-1',
        title: 'CompTIA Security+ (SY0-701)',
        provider: 'CompTIA',
        difficulty: 'Beginner',
        industryValue: 'Definitive baseline global security certification required by government and corporate IT teams.',
        avgExamFee: '$392',
        keyTopics: ['Threats & Attacks', 'Architecture & Design', 'Implementation', 'Operations & Response', 'Governance'],
        examCode: 'SY0-701',
        url: 'https://www.comptia.org/certifications/security'
      },
      {
        id: 'cert-sec-2',
        title: 'Offensive Security Certified Professional (OSCP)',
        provider: 'OffSec',
        difficulty: 'Advanced',
        industryValue: 'The premier hands-on 24-hour penetration testing certification worldwide.',
        avgExamFee: '$1,649 (includes lab access)',
        keyTopics: ['Buffer Overflows', 'Active Directory Attacks', 'Privilege Escalation', 'Exploit Development'],
        examCode: 'PEN-200 / OSCP',
        url: 'https://www.offsec.com/courses/pen-200/'
      },
      {
        id: 'cert-sec-3',
        title: 'Certified Ethical Hacker (CEH v12)',
        provider: 'EC-Council',
        difficulty: 'Intermediate',
        industryValue: 'Widely recognized brand credential for ethical hacking and vulnerability assessment roles.',
        avgExamFee: '$1,199',
        keyTopics: ['Footprinting', 'Sniffing', 'Social Engineering', 'Malware Analysis', 'Web Application Attacks'],
        examCode: '312-50',
        url: 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/'
      }
    ],
    internships: [
      {
        id: 'int-sec-1',
        domainId: 'cybersecurity',
        roleTitle: 'Threat Hunting & Adversary Emulation Intern',
        companyName: 'CrowdStrike India',
        companyLogoBg: 'bg-red-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Prestige Tech Park, Marathahalli-Sarjapur ORR)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹85,000 / month + Tech Gear & Housing Allowance',
        requiredSkills: ['Python / Go', 'Reverse Engineering', 'MITRE ATT&CK', 'Burp Suite', 'Linux Internals'],
        postedDate: 'Posted 1 day ago',
        deadline: 'Nov 12, 2026',
        description: 'Conduct real-world vulnerability research, emulate adversary tradecraft, and stress-test defenses across CrowdStrike Falcon enterprise sensor architectures at Bengaluru innovation center.',
        responsibilities: [
          'Perform vulnerability assessments on simulated enterprise cloud network architectures.',
          'Develop automated proof-of-concept exploit signatures mapping to MITRE ATT&CK techniques.',
          'Author in-depth technical threat bulletins detailing zero-day vulnerability attack surfaces.'
        ],
        applyUrl: 'https://crowdstrike.wd5.myworkdayjobs.com/crowdstrikecareers?locationCountry=bc33aa3152ec42d4995f4791a106ed09',
        portalName: 'CrowdStrike India Careers (Workday)',
        jobReqId: 'REQ-2026-CRWD-BLR-SEC77',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-sec-2',
        domainId: 'cybersecurity',
        roleTitle: 'Offensive Security & Vulnerability Research Intern',
        companyName: 'Palo Alto Networks India',
        companyLogoBg: 'bg-orange-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Helios Business Park, Kadubeesanahalli, ORR)',
        duration: '14 Weeks (Summer 2026)',
        stipend: '₹90,000 / month + Commute & Wellness Benefits',
        requiredSkills: ['C / Python', 'Wireshark', 'Reverse Engineering (Ghidra/IDA)', 'Memory Corruption', 'TCP/IP'],
        postedDate: 'Posted 2 days ago',
        deadline: 'Oct 28, 2026',
        description: 'Join Unit 42 and threat research teams in Bengaluru analyzing zero-day exploits, dissecting firmware binaries, and developing automated detection rules for next-gen firewalls.',
        responsibilities: [
          'Decompile and analyze malicious network payloads using Ghidra and dynamic debuggers.',
          'Extract Indicators of Compromise (IOCs) from advanced persistent threat (APT) samples.',
          'Author automated detection scripts for Cortex XSOAR security orchestration engines.'
        ],
        applyUrl: 'https://jobs.paloaltonetworks.com/en/jobs/?location=Bengaluru%2C+Karnataka%2C+India',
        portalName: 'Palo Alto Networks Early Career India',
        jobReqId: 'REQ-2026-PANW-BLR-OFF63',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-sec-3',
        domainId: 'cybersecurity',
        roleTitle: 'Security Intelligence & Threat Assessment Intern',
        companyName: 'Sophos Technologies',
        companyLogoBg: 'bg-blue-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Embassy GolfLinks Business Park) / Mysuru, Karnataka',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹55,000 / month + Certification Sponsorship',
        requiredSkills: ['Network Security', 'Python / Bash', 'SIEM / Splunk', 'Malware Analysis', 'Wireshark'],
        postedDate: 'Posted 3 days ago',
        deadline: 'Nov 05, 2026',
        description: 'Collaborate with SophosLabs security analysts across Karnataka triaging telemetry, analyzing obfuscated malware payloads, and writing endpoint protection signatures.',
        responsibilities: [
          'Parse corporate network event logs and memory dumps to identify intrusion timestamps.',
          'Investigate unauthorized access attempts across multi-cloud tenant infrastructure.',
          'Participate in red-blue team simulation exercises with senior security architects.'
        ],
        applyUrl: 'https://www.sophos.com/en-us/company/careers',
        portalName: 'Sophos India Careers Portal',
        jobReqId: 'REQ-2026-SPH-KTK-SEC19',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-sec-4',
        domainId: 'cybersecurity',
        roleTitle: 'Network Security & Threat Intelligence Intern',
        companyName: 'Cisco Systems India (Talos)',
        companyLogoBg: 'bg-teal-700 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (Cessna Business Park, ORR)',
        duration: '12 Weeks (Summer 2026)',
        stipend: '₹75,000 / month + Corporate Amenities & Transit',
        requiredSkills: ['Assembly / C', 'Python', 'Snort / Suricata', 'Network Protocols', 'YARA'],
        postedDate: 'Posted 4 days ago',
        deadline: 'Nov 20, 2026',
        description: 'Track global botnets, unpack polymorphic malware, and write detection signatures deployed to enterprise firewalls and routers at Cisco\'s premier R&D center in Bengaluru.',
        responsibilities: [
          'Deobfuscate malicious scripts and write YARA rules for automated repository scanning.',
          'Author and test Snort intrusion detection system (IDS) network inspection rules.',
          'Analyze emergent phishing telemetry collected across Cisco Talos honeypots.'
        ],
        applyUrl: 'https://jobs.cisco.com/jobs/SearchJobs/security%20intern%20bangalore',
        portalName: 'Cisco India University Recruiting',
        jobReqId: 'REQ-2026-CSCO-BLR-TLS05',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-sec-5',
        domainId: 'cybersecurity',
        roleTitle: 'Cloud Security & DevSecOps Engineering Intern',
        companyName: 'Trellix / Quick Heal Technologies',
        companyLogoBg: 'bg-slate-900 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Karnataka Remote)',
        duration: '12 Weeks (Summer / Fall 2026)',
        stipend: '₹50,000 / month + Hardware Allowance',
        requiredSkills: ['Cloud Security', 'Python', 'OWASP Top 10', 'Docker / K8s', 'Burp Suite'],
        postedDate: 'Posted this week',
        deadline: 'Dec 15, 2026',
        description: 'Design automated vulnerability scanning pipelines, audit container configurations, and perform dynamic web application penetration testing on cloud security products.',
        responsibilities: [
          'Execute automated SAST/DAST security scans across microservice codebases.',
          'Review third-party open source dependencies for critical CVE vulnerabilities.',
          'Document remediation playbooks for common web application vulnerability patterns.'
        ],
        applyUrl: 'https://www.trellix.com/about/careers/',
        portalName: 'Trellix Careers Portal',
        jobReqId: 'REQ-2026-TRLX-IN-SEC88',
        batchSeason: 'Summer 2026 Cohort'
      }
    ]
  },
  {
    id: 'ai_nlp',
    title: 'Artificial Intelligence & NLP',
    iconName: 'Sparkles',
    shortDescription: 'Train generative foundation models, build LLM agent workflows, optimize vector search, and build intelligent speech/vision apps.',
    fullDescription: 'Artificial Intelligence & Natural Language Processing spans Large Language Models (LLMs), RAG (Retrieval-Augment Generation), AI Agents, fine-tuning (LoRA, PEFT), vector databases (Pinecone, Qdrant), speech synthesis, and reinforcement learning from human feedback (RLHF).',
    categoryTag: 'AI & Data',
    avgSalary: '$115,000 - $175,000 / yr',
    hiringDemand: 'Extremely High',
    topTools: ['PyTorch', 'Hugging Face', 'LangChain', 'LlamaIndex', 'Pinecone', 'Gemini API', 'vLLM'],
    recommendedCourses: [
      {
        id: 'ai-1',
        title: 'Generative AI for Everyone by Andrew Ng',
        platform: 'DeepLearning.AI (Coursera / Free Audit Available)',
        skillLevel: 'Beginner',
        duration: '3 weeks (Free audit available)',
        rating: 4.93,
        studentsEnrolled: '450,000+',
        url: 'https://www.coursera.org/learn/generative-ai-for-everyone',
        isFree: true,
        description: 'The friendliest, most accessible introduction to generative AI and LLMs in the world. Understand how foundation models work, prompt engineering techniques, and real enterprise AI capabilities.',
        keyHighlights: ['Taught by Andrew Ng', 'Zero Math or Coding Prerequisites', 'Free Audit Option Available']
      },
      {
        id: 'ai-2',
        title: 'Hugging Face NLP Course (Official Interactive Handbook)',
        platform: 'Hugging Face (100% Free)',
        skillLevel: 'Beginner to Intermediate',
        duration: 'Self-paced (~40 hours)',
        rating: 4.96,
        studentsEnrolled: '400,000+',
        url: 'https://huggingface.co/learn/nlp-course/chapter1/1',
        isFree: true,
        description: 'Official interactive training on using Transformers, tokenizers, fine-tuning pre-trained models on custom datasets with PyTorch, and deploying models to Hugging Face Spaces.',
        keyHighlights: ['Industry Standard Transformers', 'Free Google Colab Notebooks', '100% Free Open Training']
      },
      {
        id: 'ai-3',
        title: 'DeepLearning.AI: RAG & Multi-Agent LLM Short Courses',
        platform: 'DeepLearning.AI (100% Free)',
        skillLevel: 'Intermediate',
        duration: '1-2 hours per topic (Self-paced)',
        rating: 4.95,
        studentsEnrolled: '320,000+',
        url: 'https://www.deeplearning.ai/short-courses/',
        isFree: true,
        description: 'Concise masterclasses created with LangChain, LlamaIndex, Pinecone, and Anthropic. Build vector search pipelines, RAG question-answering systems, and multi-agent workflows with live code.',
        keyHighlights: ['Bite-Sized Practical Labs', 'Taught by Framework Creators', '100% Free Access']
      },
      {
        id: 'ai-4',
        title: 'Google Cloud: Introduction to Generative AI Learning Path',
        platform: 'Google Cloud Skills Boost (100% Free)',
        skillLevel: 'Beginner',
        duration: '5 micro-courses (~8 hours)',
        rating: 4.88,
        studentsEnrolled: '650,000+',
        url: 'https://www.cloudskillsboost.google/course_templates/536',
        isFree: true,
        description: 'Official Google training introducing Generative AI foundations, Large Language Models, Attention mechanisms, Transformer architectures, and Responsible AI guidelines.',
        keyHighlights: ['Official Google Badges', 'Micro-Learning Modules', '100% Free Online Access']
      },
      {
        id: 'ai-5',
        title: 'Stanford CS224N: Natural Language Processing with Deep Learning',
        platform: 'Stanford University (Open Course & YouTube)',
        skillLevel: 'Intermediate to Advanced',
        duration: '10 weeks (Open Access)',
        rating: 4.97,
        studentsEnrolled: '500,000+',
        url: 'https://web.stanford.edu/class/cs224n/',
        isFree: true,
        description: 'World-renowned Stanford university lectures by Christopher Manning. Thoroughly explains word embeddings, recurrent networks, attention mechanisms, self-attention, and multimodal language models.',
        keyHighlights: ['Stanford Faculty Masterclass', 'Open Lecture Slides & Code', '100% Free Video Lectures']
      }
    ],
    learningPath: [
      {
        phaseNumber: 1,
        title: 'Phase 1: PyTorch & Classical NLP',
        subtitle: 'Text Preprocessing, Embeddings & Language Models',
        duration: 'Weeks 1 - 4',
        topics: [
          { id: 'ai-t1', name: 'Text Vectorization & Embeddings', description: 'Tokenization, TF-IDF, Word2Vec, GloVe, subword tokenizers (BPE)', keyTools: ['NLTK', 'spaCy', 'Gensim'] },
          { id: 'ai-t2', name: 'PyTorch Neural NLP', description: 'RNNs, LSTMs, GRUs, Seq2Seq architectures, attention mechanism basics', keyTools: ['PyTorch', 'TorchText'] },
          { id: 'ai-t3', name: 'Vector Similarity & Search', description: 'Cosine similarity, Dot product, Euclidean distance, HNSW vector indexing', keyTools: ['FAISS', 'NumPy'] }
        ],
        capstoneProject: {
          name: 'Custom Spam & Intent Text Classifier with PyTorch',
          description: 'Build an end-to-end multi-class intent classifier with custom PyTorch training loops and evaluation matrices.'
        }
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Transformers & Foundation Models',
        subtitle: 'BERT, GPT Architecture & Hugging Face Ecosystem',
        duration: 'Weeks 5 - 8',
        topics: [
          { id: 'ai-t4', name: 'Attention Mechanism & Transformer Architecture', description: 'Self-attention, multi-head attention, positional encodings, encoder-decoder models', keyTools: ['Transformers', 'PyTorch'] },
          { id: 'ai-t5', name: 'Fine-Tuning Pre-Trained Transformers', description: 'BERT sequence classification, T5 text generation, Hugging Face Trainer API', keyTools: ['Hugging Face', 'Datasets', 'Evaluate'] },
          { id: 'ai-t6', name: 'Parameter-Efficient Fine-Tuning (PEFT/LoRA)', description: 'LoRA, QLoRA, adapter weights, quantizing models (bitsandbytes 4-bit/8-bit)', keyTools: ['PEFT', 'Bitsandbytes', 'TRL'] }
        ],
        capstoneProject: {
          name: 'Fine-Tuned Domain Specialist LLM with LoRA',
          description: 'Fine-tune an open-source LLM (Llama 3 / Mistral) on a specialized technical dataset using QLoRA.'
        }
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: RAG (Retrieval-Augmented Generation)',
        subtitle: 'Vector Databases, Hybrid Search & Context Augmentation',
        duration: 'Weeks 9 - 12',
        topics: [
          { id: 'ai-t7', name: 'Document Ingestion & Chunking Strategies', description: 'Text splitters, semantic chunking, metadata filtering, PDF/HTML parsing', keyTools: ['LangChain', 'LlamaIndex', 'Unstructured'] },
          { id: 'ai-t8', name: 'Production Vector Databases', description: 'Pinecone, Qdrant, ChromaDB vector indexing, hybrid dense/sparse search', keyTools: ['Pinecone', 'Qdrant', 'ChromaDB'] },
          { id: 'ai-t9', name: 'Advanced RAG Evaluation & Re-Ranking', description: 'Cross-encoders, Cohere rerank, Ragas evaluation framework (faithfulness, relevancy)', keyTools: ['Ragas', 'Cohere'] }
        ],
        capstoneProject: {
          name: 'Enterprise Knowledge Base RAG Search System',
          description: 'Create a full RAG app enabling semantic multi-document chat with exact citation line tracking and vector search.'
        }
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: AI Agents & LLM Deployment',
        subtitle: 'Multi-Agent Frameworks, Function Calling & vLLM Serving',
        duration: 'Weeks 13 - 16',
        topics: [
          { id: 'ai-t10', name: 'LLM Function Calling & Tool Use', description: 'Structured JSON generation, API function execution, tool usage with Gemini API', keyTools: ['Gemini API', 'OpenAI SDK'] },
          { id: 'ai-t11', name: 'Autonomous Multi-Agent Orchestration', description: 'ReAct pattern, LangGraph stateful agent graphs, CrewAI team workflows', keyTools: ['LangGraph', 'CrewAI', 'Autogen'] },
          { id: 'ai-t12', name: 'High-Throughput Model Inference & vLLM', description: 'vLLM, TensorRT-LLM, continuous batching, PagedAttention, streaming endpoints', keyTools: ['vLLM', 'FastAPI', 'Docker'] }
        ],
        capstoneProject: {
          name: 'Autonomous Research AI Agent with Web & Code Tools',
          description: 'Architect a stateful LangGraph agent that autonomously searches the web, executes Python code, and writes technical reports.'
        }
      }
    ],
    industryCertifications: [
      {
        id: 'cert-ai-1',
        title: 'Google Cloud Professional Machine Learning Engineer',
        provider: 'Google Cloud',
        difficulty: 'Advanced',
        industryValue: 'Highly respected certification for architecting AI pipelines and LLM solutions on GCP.',
        avgExamFee: '$200',
        keyTopics: ['Vertex AI', 'LLM Engineering', 'Feature Store', 'Model Inferencing', 'Data Pipelines'],
        examCode: 'GCP-MLE',
        url: 'https://cloud.google.com/learn/certification/machine-learning-engineer'
      },
      {
        id: 'cert-ai-2',
        title: 'NVIDIA Certified Associate – Generative AI and LLMs',
        provider: 'NVIDIA',
        difficulty: 'Intermediate',
        industryValue: 'Fast-growing industry credential for LLM architecture and AI application development.',
        avgExamFee: '$135',
        keyTopics: ['Transformer Models', 'Prompt Engineering', 'RAG Architectures', 'NVIDIA NeMo'],
        examCode: 'NCA-GENAI',
        url: 'https://www.nvidia.com/en-us/training/certification/'
      },
      {
        id: 'cert-ai-3',
        title: 'TensorFlow Developer Certificate',
        provider: 'TensorFlow / Google',
        difficulty: 'Intermediate',
        industryValue: 'Demonstrates practical ability to build computer vision, time-series, and NLP deep learning models.',
        avgExamFee: '$100',
        keyTopics: ['Computer Vision', 'Sequential Models', 'NLP Text Tokenization', 'TensorFlow 2.x'],
        examCode: 'TF-DEV',
        url: 'https://www.tensorflow.org/certificate'
      }
    ],
    internships: [
      {
        id: 'int-ai-1',
        domainId: 'ai_nlp',
        roleTitle: 'Frontier AI Research & Multimodal Models Intern',
        companyName: 'Google Research & DeepMind India',
        companyLogoBg: 'bg-emerald-700 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (RMZ Infinity, Old Madras Road)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹1,30,000 / month + Relocation & Meals',
        requiredSkills: ['PyTorch / JAX', 'Transformers', 'Multilingual NLP', 'Indic Language Models', 'Distributed Training'],
        postedDate: 'Posted 1 day ago',
        deadline: 'Nov 01, 2026',
        description: 'Work alongside Google Research and DeepMind scientists in Bengaluru developing multilingual Indic foundation models, efficient multimodal transformers, and tool-augmented reasoning agents.',
        responsibilities: [
          'Design distributed data-parallel training workflows across Google Cloud TPU/GPU clusters.',
          'Execute post-training alignment using DPO and RLHF adapted to multilingual regional dialects.',
          'Benchmark hallucination rates and safety guardrails across complex coding and mathematics benchmarks.'
        ],
        applyUrl: 'https://www.google.com/about/careers/applications/jobs/results/?location=Bengaluru%2C%20Karnataka%2C%20India&q=AI+intern',
        portalName: 'Google Research India Student Programs',
        jobReqId: 'REQ-2026-GOOG-BLR-AI08',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-ai-2',
        domainId: 'ai_nlp',
        roleTitle: 'On-Device Generative AI & Vision Intelligence Intern',
        companyName: 'Samsung R&D Institute India (SRI-B)',
        companyLogoBg: 'bg-blue-600 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (Bagmane Constellation Business Park, Doddanekundi)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹85,000 / month + Corporate Transit & Meals',
        requiredSkills: ['PyTorch', 'Quantization (AWQ/GGUF)', 'Python / C++', 'On-Device NPU', 'Computer Vision'],
        postedDate: 'Posted 2 days ago',
        deadline: 'Oct 30, 2026 (Priority)',
        description: 'Join Samsung\'s largest global software R&D center outside Korea in Bengaluru, optimizing generative AI foundation models, real-time image generators, and on-device NLP for Galaxy devices.',
        responsibilities: [
          'Benchmark low-bit quantization algorithms on mobile Neural Processing Units (NPUs).',
          'Optimize transformer attention kernels to reduce latency and thermal throttling.',
          'Develop multimodal image-to-text generation pipelines with edge device constraints.'
        ],
        applyUrl: 'https://research.samsung.com/sri-b',
        portalName: 'Samsung SRI-Bengaluru University Careers',
        jobReqId: 'REQ-2026-SRIB-BLR-AI92',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-ai-3',
        domainId: 'ai_nlp',
        roleTitle: 'AI Compute & Deep Learning Acceleration Intern',
        companyName: 'Intel India',
        companyLogoBg: 'bg-blue-700 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Sarjapur Ring Road Campus, Bellandur)',
        duration: '14 Weeks (Summer 2026)',
        stipend: '₹80,000 / month + Fitness & Commuter Benefits',
        requiredSkills: ['PyTorch', 'OpenVINO', 'C++ / Python', 'CUDA / oneAPI', 'Model Pruning'],
        postedDate: 'Posted 3 days ago',
        deadline: 'Nov 15, 2026',
        description: 'Collaborate with Intel Labs in Bengaluru accelerating transformer inference, optimizing OpenVINO execution providers, and profiling deep learning workloads on Intel Gaudi and Core Ultra silicon.',
        responsibilities: [
          'Evaluate neural architecture search algorithms for low-power edge neural coprocessors.',
          'Optimize OpenVINO runtime inference engines for latency-sensitive speech and vision tasks.',
          'Document reproducibility benchmarks and contribute to Intel oneAPI open toolkits.'
        ],
        applyUrl: 'https://jobs.intel.com/en/search-jobs/India',
        portalName: 'Intel India Student Center',
        jobReqId: 'REQ-2026-INTC-BLR-DL31',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-ai-4',
        domainId: 'ai_nlp',
        roleTitle: 'Indic LLM & Autonomous Intelligence Intern',
        companyName: 'Ola Krutrim AI',
        companyLogoBg: 'bg-amber-700 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (Regent Insignia, Koramangala 4th Block)',
        duration: '12 - 16 Weeks (Summer / Fall 2026)',
        stipend: '₹70,000 / month + EV Commute Perks',
        requiredSkills: ['Python', 'Indic NLP', 'Tokenizer Engineering', 'Fine-Tuning (LoRA)', 'FastAPI'],
        postedDate: 'Posted 4 days ago',
        deadline: 'Nov 05, 2026',
        description: 'Help build India\'s native sovereign AI foundation model at Krutrim in Bengaluru, focusing on multilingual tokenizers across 22 Indian languages, voice synthesis, and vernacular agentic reasoning.',
        responsibilities: [
          'Curate high-quality bilingual Indic text corpora with deduplication and quality filters.',
          'Train parameter-efficient LoRA adapters for domain-specific healthcare and legal tasks.',
          'Deploy low-latency streaming endpoints powering conversational voice assistants.'
        ],
        applyUrl: 'https://www.krutrim.com/',
        portalName: 'Krutrim AI Careers Portal',
        jobReqId: 'REQ-2026-KRT-BLR-LLM45',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-ai-5',
        domainId: 'ai_nlp',
        roleTitle: 'Agentic Workflows & Open-Source AI Fellowship Intern',
        companyName: 'AI Fellowship India / Hugging Face Community Labs',
        companyLogoBg: 'bg-teal-700 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Bengaluru Remote)',
        duration: '12 Weeks (Summer / Fall 2026)',
        stipend: '₹75,000 / month + GPU Compute Credits',
        requiredSkills: ['Python', 'LangChain / LlamaIndex', 'Vector Databases', 'Hugging Face Transformers', 'FastAPI'],
        postedDate: 'Posted this week',
        deadline: 'Dec 01, 2026',
        description: 'Build enterprise-grade agentic reasoning frameworks, evaluate multilingual embeddings, and build open-source AI developer tools supporting Indian tech builders.',
        responsibilities: [
          'Benchmark retrieval precision and context utilization across hybrid dense-sparse vector search.',
          'Construct reproducible evaluation suites assessing agentic tool selection accuracy.',
          'Publish community demo apps and interactive Gradio spaces for developers.'
        ],
        applyUrl: 'https://huggingface.co/jobs',
        portalName: 'Hugging Face Open Research Fellowship',
        jobReqId: 'REQ-2026-HF-IN-RAG18',
        batchSeason: 'Summer 2026 Cohort'
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Application Development',
    iconName: 'Smartphone',
    shortDescription: 'Craft slick native and cross-platform mobile apps for iOS and Android with smooth 60fps animations and offline sync.',
    fullDescription: 'Mobile Application Development encompasses iOS (Swift, SwiftUI), Android (Kotlin, Jetpack Compose), and cross-platform technologies (React Native, Flutter) with focus on local SQLite/Room databases, push notifications, and device sensors.',
    categoryTag: 'Web & App',
    avgSalary: '$95,000 - $140,000 / yr',
    hiringDemand: 'High',
    topTools: ['SwiftUI', 'Kotlin', 'React Native', 'Flutter', 'Xcode', 'Android Studio', 'Firebase'],
    recommendedCourses: [
      {
        id: 'mob-1',
        title: 'Android Basics with Jetpack Compose (Official Google)',
        platform: 'Google Developers (100% Free Interactive Codelabs)',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~50 hours)',
        rating: 4.96,
        studentsEnrolled: '600,000+',
        url: 'https://developer.android.com/courses/android-basics-compose/course',
        isFree: true,
        description: 'Google\'s official curriculum for building modern Android apps using Kotlin and Jetpack Compose. Includes step-by-step interactive codelabs, app architecture guides, and building real playable apps.',
        keyHighlights: ['Official Google Android Curriculum', 'Modern Declarative Jetpack Compose', '100% Free With Badges']
      },
      {
        id: 'mob-2',
        title: 'Swift & SwiftUI App Foundations by Apple',
        platform: 'Apple Developer Tutorials (100% Free)',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~40 hours)',
        rating: 4.93,
        studentsEnrolled: '450,000+',
        url: 'https://developer.apple.com/tutorials/swiftui',
        isFree: true,
        description: 'Apple\'s official interactive guide that walks you through building iOS, iPadOS, and watchOS apps. Learn Swift 6 syntax, declarative UI layout, state bindings, and animations with Xcode live previews.',
        keyHighlights: ['Official Apple Engineering Guide', 'Live Xcode Previews & Code', '100% Free Open Access']
      },
      {
        id: 'mob-3',
        title: 'React Native & Expo Crash Course for Web Developers',
        platform: 'React Native Official & freeCodeCamp',
        skillLevel: 'Beginner to Intermediate',
        duration: 'Self-paced (~25 hours)',
        rating: 4.9,
        studentsEnrolled: '550,000+',
        url: 'https://reactnative.dev/docs/getting-started',
        isFree: true,
        description: 'Leverage your React knowledge to build native iOS and Android apps with a single JavaScript/TypeScript codebase. Covers Expo Go on physical phones, Flexbox layouts, gestures, and native APIs.',
        keyHighlights: ['One Codebase for iOS & Android', 'Test Instantly on Real Phone (Expo)', '100% Free Handbook']
      },
      {
        id: 'mob-4',
        title: 'Flutter & Dart Apprentice by the Flutter Team',
        platform: 'Flutter Official Documentation & Codelabs',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~30 hours)',
        rating: 4.91,
        studentsEnrolled: '380,000+',
        url: 'https://docs.flutter.dev/get-started/codelab',
        isFree: true,
        description: 'Hands-on interactive codelabs from Google\'s Flutter engineering team. Write responsive widget trees, handle state management with Provider/Riverpod, and compile high-performance native apps.',
        keyHighlights: ['Official Flutter Codelabs', 'High-Performance 120fps UI', '100% Free Step-by-Step']
      },
      {
        id: 'mob-5',
        title: 'Meta Android Developer Professional Certificate',
        platform: 'Coursera (Meta / Free Audit Available)',
        skillLevel: 'Beginner',
        duration: '6 months (Free audit available)',
        rating: 4.82,
        studentsEnrolled: '220,000+',
        url: 'https://www.coursera.org/professional-certificates/meta-android-developer',
        isFree: true,
        description: 'Designed by Meta engineers covering Kotlin fundamentals, Android Studio development, SQLite/Room database persistence, network calls, and publishing to Google Play Store.',
        keyHighlights: ['Curated by Meta Software Engineers', 'Job-Ready Capstone Portfolio', 'Free Audit Option Available']
      }
    ],
    learningPath: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Language Syntax & Mobile Core',
        subtitle: 'Swift/Kotlin Mechanics & UI Layout Engines',
        duration: 'Weeks 1 - 4',
        topics: [
          { id: 'mob-t1', name: 'Swift (iOS) or Kotlin (Android) Mechanics', description: 'Optionally handling, null safety, view models, coroutines / async await', keyTools: ['Swift 6', 'Kotlin 2.0', 'Xcode', 'Android Studio'] },
          { id: 'mob-t2', name: 'Declarative UI Frameworks', description: 'SwiftUI layout views or Jetpack Compose composables, modifiers, previews', keyTools: ['SwiftUI', 'Jetpack Compose'] },
          { id: 'mob-t3', name: 'Mobile Navigation & State', description: 'NavigationStacks, NavigationPath, state properties (@State, @Binding, StateFlow)', keyTools: ['StateFlow', 'ObservableObject'] }
        ],
        capstoneProject: {
          name: 'Interactive Habit & Habit Tracker Mobile App',
          description: 'Build a native mobile tracker with custom chart visualizations, dark mode support, and interactive calendar widgets.'
        }
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Data Persistence & Networking',
        subtitle: 'REST APIs, Local SQLite & Cache Strategy',
        duration: 'Weeks 5 - 8',
        topics: [
          { id: 'mob-t4', name: 'Mobile Networking & JSON Parsing', description: 'URLSession / Retrofit HTTP requests, Codable / Kotlinx.serialization', keyTools: ['URLSession', 'Retrofit', 'Moshi'] },
          { id: 'mob-t5', name: 'Local Database Storage', description: 'SwiftData / CoreData for iOS or Room DB for Android, migration scripts', keyTools: ['SwiftData', 'Room DB', 'SQLite'] },
          { id: 'mob-t6', name: 'Offline-First Synchronization', description: 'Repository pattern, local database caching, work managers for background sync', keyTools: ['WorkManager', 'BackgroundTasks'] }
        ],
        capstoneProject: {
          name: 'Offline-First News & Article Reader App',
          description: 'Develop a news app that caches articles locally in SwiftData/Room for offline reading with background refresh.'
        }
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Cross-Platform & Device Hardware',
        subtitle: 'React Native/Flutter & Native Device APIs',
        duration: 'Weeks 9 - 12',
        topics: [
          { id: 'mob-t7', name: 'Cross-Platform Frameworks (React Native / Flutter)', description: 'Expo workflows, React Native Reanimated or Flutter Widget trees', keyTools: ['React Native', 'Expo', 'Flutter'] },
          { id: 'mob-t8', name: 'Device Hardware Integration', description: 'Camera access, Geolocation GPS, Biometric Auth (FaceID / Fingerprint), Bluetooth LE', keyTools: ['CoreLocation', 'Biometrics API'] },
          { id: 'mob-t9', name: 'Push Notifications & Firebase', description: 'APNs (Apple Push Notification service), FCM (Firebase Cloud Messaging), deep linking', keyTools: ['FCM', 'APNs', 'Branch.io'] }
        ],
        capstoneProject: {
          name: 'Geo-Tagged Photo & Workout Activity Tracker',
          description: 'Build a cross-platform fitness app that records GPS route polylines, captures camera photos, and syncs push notifications.'
        }
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Store Deployment & Performance',
        subtitle: 'App Store / Play Store Publishing & Analytics',
        duration: 'Weeks 13 - 16',
        topics: [
          { id: 'mob-t10', name: 'App Store Guidelines & TestFlight', description: 'App Store Connect provisioning profiles, Google Play Console release tracks', keyTools: ['TestFlight', 'Google Play Console'] },
          { id: 'mob-t11', name: 'Automated Mobile CI/CD', description: 'Fastlane scripts for automated app signing, building, and beta deployment', keyTools: ['Fastlane', 'Bitrise'] },
          { id: 'mob-t12', name: 'Performance & Memory Optimization', description: 'Memory leak detection, 60fps gesture rendering, crash analytics reporting', keyTools: ['Firebase Crashlytics', 'Instruments'] }
        ],
        capstoneProject: {
          name: 'Production Ready Mobile App Published to TestFlight/Internal Beta',
          description: 'Package and deploy an app build with Fastlane CI/CD, integrated Crashlytics, and App Store metadata.'
        }
      }
    ],
    industryCertifications: [
      {
        id: 'cert-mob-1',
        title: 'Associate Android Developer Certification',
        provider: 'Google',
        difficulty: 'Intermediate',
        industryValue: 'Official Google performance certification for Android software engineers.',
        avgExamFee: '$149',
        keyTopics: ['Android Core', 'UI Design with Compose', 'Data Management', 'Debugging'],
        examCode: 'AAD-2026',
        url: 'https://developer.android.com/certification/associate-android-developer'
      },
      {
        id: 'cert-mob-2',
        title: 'Apple Certified iOS Developer Specialist',
        provider: 'Apple (App Development Curriculum)',
        difficulty: 'Intermediate',
        industryValue: 'Validated iOS development competency in Swift and SwiftUI.',
        avgExamFee: '$150',
        keyTopics: ['Swift', 'SwiftUI', 'App Architecture', 'Core Data', 'Xcode'],
        examCode: 'APPLE-iOS',
        url: 'https://developer.apple.com/'
      },
      {
        id: 'cert-mob-3',
        title: 'Meta React Native Specialization',
        provider: 'Meta',
        difficulty: 'Intermediate',
        industryValue: 'Recognized industry credential for building cross-platform native iOS & Android apps.',
        avgExamFee: '$39/month',
        keyTopics: ['React Native', 'Mobile UI Components', 'State & Navigation', 'Native Modules'],
        examCode: 'META-RN',
        url: 'https://www.coursera.org/professional-certificates/meta-react-native'
      }
    ],
    internships: [
      {
        id: 'int-mob-1',
        domainId: 'mobile',
        roleTitle: 'Mobile Engineering Intern (Rider & Driver Core Platform)',
        companyName: 'Uber India Tech Center',
        companyLogoBg: 'bg-black text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (RMZ Ecoworld, Bellandur, Outer Ring Road)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹1,05,000 / month + Uber Rides Credit & Relocation',
        requiredSkills: ['Kotlin / Swift', 'Jetpack Compose / SwiftUI', 'Coroutines', 'Mapbox SDK', 'WebSocket'],
        postedDate: 'Posted 1 day ago',
        deadline: 'Nov 08, 2026',
        description: 'Join Uber\'s core mobile application team in Bengaluru building live geospatial map tracking, sub-second fare quoting views, and reactive ride state machines serving hundreds of millions of riders globally.',
        responsibilities: [
          'Build scalable mobile UI features utilizing RIBs architecture and modern Jetpack Compose.',
          'Optimize GPS location polling and battery consumption on millions of devices in transit.',
          'Participate in code reviews, design critiques, and weekly release train QA testing.'
        ],
        applyUrl: 'https://www.uber.com/in/en/careers/list/',
        portalName: 'Uber India University Programs',
        jobReqId: 'REQ-2026-UBER-BLR-MOB36',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-mob-2',
        domainId: 'mobile',
        roleTitle: 'Android Platform & Hyperlocal Cart Experience Intern',
        companyName: 'Zepto',
        companyLogoBg: 'bg-purple-700 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (Koramangala 7th Block Tech HQ)',
        duration: '14 Weeks (Summer 2026)',
        stipend: '₹80,000 / month + Daily Catered Meals & Snacks',
        requiredSkills: ['Kotlin', 'Jetpack Compose', 'MVI Architecture', 'Room DB', 'Offline-First Sync'],
        postedDate: 'Posted 2 days ago',
        deadline: 'Oct 24, 2026',
        description: 'Engineer ultra-low latency checkout flows, live delivery rider GPS tracking, and instant search interfaces for India\'s fastest growing quick-commerce mobile app in Bengaluru.',
        responsibilities: [
          'Develop reusable Jetpack Compose components maintaining strict 60 FPS scroll performance.',
          'Implement Room SQLite database offline cache routines for high-stress flash sale scenarios.',
          'Instrument Firebase performance monitoring and crash analytics pipelines.'
        ],
        applyUrl: 'https://www.zeptonow.com/careers',
        portalName: 'Zepto Engineering Careers',
        jobReqId: 'REQ-2026-ZEP-BLR-ANDR21',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-mob-3',
        domainId: 'mobile',
        roleTitle: 'iOS & Android Payments Architecture Intern',
        companyName: 'PhonePe',
        companyLogoBg: 'bg-indigo-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Office-2, Bellandur, Outer Ring Road)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹85,000 / month + Health Cover & Commute',
        requiredSkills: ['Kotlin / Swift', 'Biometric Security', 'UPI Dynamic SDK', 'Coroutines / Combine'],
        postedDate: 'Posted 3 days ago',
        deadline: 'Nov 01, 2026',
        description: 'Collaborate with PhonePe\'s client engineering teams in Bengaluru engineering high-security UPI QR payment sheets, biometric finger/face login, and merchant soundbox integrations.',
        responsibilities: [
          'Harden client storage security with iOS Keychain and Android Keystore hardware enclaves.',
          'Implement dynamic QR code decoders with low camera latency in varying lighting conditions.',
          'Run automated espresso and XCTest suites across device test-farms.'
        ],
        applyUrl: 'https://www.phonepe.com/careers/',
        portalName: 'PhonePe Early Career Portal',
        jobReqId: 'REQ-2026-PP-BLR-MOB55',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-mob-4',
        domainId: 'mobile',
        roleTitle: 'Cross-Platform Mobile App Engineering Intern (Flutter & iOS)',
        companyName: 'Robosoft Technologies',
        companyLogoBg: 'bg-blue-600 text-white',
        locationType: 'On-site',
        location: 'Udupi / Mangaluru, Karnataka & Bengaluru Hub',
        duration: '16 Weeks (Summer 2026)',
        stipend: '₹45,000 / month + Coastal Campus Housing',
        requiredSkills: ['Flutter / Dart', 'Swift / Kotlin', 'REST APIs', 'State Management (Bloc/Riverpod)'],
        postedDate: 'Posted 4 days ago',
        deadline: 'Nov 20, 2026',
        description: 'Build enterprise banking, automotive, and media streaming mobile applications at one of Karnataka\'s pioneering software engineering campuses in coastal Udupi and Bengaluru.',
        responsibilities: [
          'Design and build responsive Flutter and native Android/iOS mobile interfaces.',
          'Integrate third-party RESTful APIs and push notification messaging services.',
          'Participate in agile sprint ceremonies, code reviews, and device compatibility testing.'
        ],
        applyUrl: 'https://www.robosoftin.com/careers',
        portalName: 'Robosoft Technologies Careers',
        jobReqId: 'REQ-2026-ROBO-KTK-APP82',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-mob-5',
        domainId: 'mobile',
        roleTitle: 'Mobile Client Experience Engineering Intern',
        companyName: 'Zoho Corporation',
        companyLogoBg: 'bg-emerald-700 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Karnataka Remote)',
        duration: '12 - 16 Weeks (Summer / Fall 2026)',
        stipend: '₹50,000 / month + Hardware Setup Allowance',
        requiredSkills: ['Flutter / React Native', 'Swift / Kotlin', 'SQLite', 'Offline Sync', 'Push Notifications'],
        postedDate: 'Posted this week',
        deadline: 'Dec 05, 2026',
        description: 'Contribute to Zoho\'s suite of mobile productivity apps, developing rich text note-taking, CRM contact cards, and real-time collaborative document synchronization.',
        responsibilities: [
          'Build low-latency SQLite offline databases with background sync workers.',
          'Optimize memory consumption and battery overhead for background push notifications.',
          'Ensure accessibility compliance (TalkBack / VoiceOver) across all screen layouts.'
        ],
        applyUrl: 'https://www.zoho.com/careers/',
        portalName: 'Zoho Careers Portal',
        jobReqId: 'REQ-2026-ZOHO-IN-MOB19',
        batchSeason: 'Summer 2026 Cohort'
      }
    ]
  },
  {
    id: 'gamedev',
    title: 'Game Development & Graphics',
    iconName: 'Gamepad2',
    shortDescription: 'Engineer immersive 3D/2D game worlds, physics engines, shader effects, and interactive graphics with Unity and Unreal Engine.',
    fullDescription: 'Game Development & Graphics focuses on modern game engines (Unreal Engine 5, Unity), C++ game architecture, HLSL/GLSL shaders, real-time ray tracing, physics engines, WebGL/Three.js, and multiplayer game networking.',
    categoryTag: 'Systems & Hardware',
    avgSalary: '$90,000 - $138,000 / yr',
    hiringDemand: 'High',
    topTools: ['Unreal Engine 5', 'Unity', 'C++', 'C#', 'Three.js / WebGL', 'Blender', 'HLSL'],
    recommendedCourses: [
      {
        id: 'game-1',
        title: 'Harvard CS50\'s Introduction to Game Development',
        platform: 'Harvard University (Open Course & edX)',
        skillLevel: 'Beginner',
        duration: '12 weeks (Self-paced)',
        rating: 4.95,
        studentsEnrolled: '450,000+',
        url: 'https://cs50.harvard.edu/games/',
        isFree: true,
        description: 'Harvard\'s beloved course taught by Colton Ogden. Deconstruct and rebuild classic video games (Pong, Flappy Bird, Breakout, Super Mario Bros, Zelda, and Portal) using Lua, LÖVE2D, and Unity.',
        keyHighlights: ['Harvard University Instruction', 'Recreate Classic Video Games', '100% Free Open Course']
      },
      {
        id: 'game-2',
        title: 'Unity Essentials & Junior Programmer Pathway (Official)',
        platform: 'Unity Learn (Unity Technologies / 100% Free)',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~40 hours)',
        rating: 4.91,
        studentsEnrolled: '550,000+',
        url: 'https://learn.unity.com/pathway/unity-essentials',
        isFree: true,
        description: 'Official interactive learning pathway by Unity. Learn the Unity 3D engine interface, C# scripting, physics rigidbodies, collision events, audio triggers, and build complete playable games.',
        keyHighlights: ['Official Unity Engine Training', 'Guided In-Editor Projects', '100% Free Open Learning']
      },
      {
        id: 'game-3',
        title: 'Unreal Engine 5 Fundamentals & C++ Learning Community',
        platform: 'Epic Games Developer Portal (100% Free)',
        skillLevel: 'Beginner to Intermediate',
        duration: 'Self-paced (~35 hours)',
        rating: 4.93,
        studentsEnrolled: '380,000+',
        url: 'https://dev.epicgames.com/community/learning/',
        isFree: true,
        description: 'Epic Games\' official developer courses. Learn Nanite virtualized geometry, Lumen real-time lighting, Blueprints visual scripting, and C++ gameplay programming for AAA 3D worlds.',
        keyHighlights: ['Official Epic Games Hub', 'Next-Gen UE5 Graphics', '100% Free Video & Project Files']
      },
      {
        id: 'game-4',
        title: 'Three.js & WebGL 3D Interactive Graphics Manual',
        platform: 'Three.js Official Fundamentals (100% Free)',
        skillLevel: 'Beginner to Intermediate',
        duration: 'Self-paced (~25 hours)',
        rating: 4.89,
        studentsEnrolled: '220,000+',
        url: 'https://threejs.org/manual/#en/fundamentals',
        isFree: true,
        description: 'Master rendering real-time 3D graphics in web browsers. Learn camera projections, scene graphs, lighting models, materials, GLTF 3D model loaders, and custom shaders.',
        keyHighlights: ['Run 3D Games In Any Browser', 'Interactive Code Samples', '100% Free Open Standard']
      },
      {
        id: 'game-5',
        title: 'Godot Engine 2D & 3D Beginner Game Creation Guide',
        platform: 'Godot Engine Official & GDQuest (100% Free)',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~20 hours)',
        rating: 4.94,
        studentsEnrolled: '310,000+',
        url: 'https://docs.godotengine.org/en/stable/getting_started/introduction/index.html',
        isFree: true,
        description: 'The easiest, most friendly game engine for indie developers. Understand nodes, scene inheritance, GDScript programming, and create 2D platformers and 3D adventures without any licensing royalties.',
        keyHighlights: ['100% Free & Open Source', 'Lightweight & Beginner-Friendly', 'Zero Royalties Forever']
      }
    ],
    learningPath: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Math & C++/C# Fundamentals',
        subtitle: 'Linear Algebra, Vectors, Matrices & Object OOP',
        duration: 'Weeks 1 - 4',
        topics: [
          { id: 'gm-t1', name: '3D Math & Vectors', description: 'Dot products, cross products, quaternions, transformations, matrices', keyTools: ['C++', 'GLM', 'Math Visualizer'] },
          { id: 'gm-t2', name: 'C++ or C# Object Oriented Game Systems', description: 'Pointers, memory management, templates, entity component patterns', keyTools: ['C++', 'C#', 'Visual Studio'] },
          { id: 'gm-t3', name: 'Game Engine Architecture Basics', description: 'Game loop, delta time calculation, input handling, frame buffers', keyTools: ['SDL2', 'Raylib'] }
        ],
        capstoneProject: {
          name: 'Classic Arcade Game Remake in C++ / Raylib',
          description: 'Program a custom 2D arcade shooter featuring collision detection, particle explosions, and score tracking.'
        }
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Unity or Unreal Engine Mastery',
        subtitle: 'Engine Workflows, Animation & Physics',
        duration: 'Weeks 5 - 8',
        topics: [
          { id: 'gm-t4', name: 'Unreal Engine 5 Blueprints & C++', description: 'Actor components, game modes, player controllers, UPROPERTY macros', keyTools: ['Unreal Engine 5', 'Visual Studio'] },
          { id: 'gm-t5', name: 'Physics & Animation State Machines', description: 'Rigidbodies, ragdolls, inverse kinematics (IK), blend trees, state transitions', keyTools: ['Control Rig', 'Mecanim'] },
          { id: 'gm-t6', name: 'Level Design & Lighting (Lumen & Nanite)', description: 'Real-time global illumination, virtualized geometry, landscape sculpting', keyTools: ['Lumen', 'Nanite', 'Quixel Megascans'] }
        ],
        capstoneProject: {
          name: 'First-Person Action/Puzzle Game in Unreal Engine 5',
          description: 'Construct a multi-room puzzle game featuring physics interactions, atmospheric Lumen lighting, and enemy AI patrols.'
        }
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Shaders, WebGL & Graphics Programming',
        subtitle: 'HLSL Shaders, GPU Pipelines & WebGL',
        duration: 'Weeks 9 - 12',
        topics: [
          { id: 'gm-t7', name: 'Shader Programming (HLSL / GLSL)', description: 'Vertex & Fragment shaders, lighting models (Phong, PBR), water/dissolve effects', keyTools: ['HLSL', 'Shader Graph', 'Shadertoy'] },
          { id: 'gm-t8', name: 'Web 3D Graphics with Three.js', description: 'WebGL renderers, cameras, custom meshes, glTF model loaders, post-processing', keyTools: ['Three.js', 'React Three Fiber'] },
          { id: 'gm-t9', name: 'Graphics APIs (Vulkan / DirectX 12 Basics)', description: 'Graphics pipeline stages, command buffers, descriptor sets, ray tracing shaders', keyTools: ['Vulkan SDK', 'DirectX 12'] }
        ],
        capstoneProject: {
          name: 'Interactive WebGL 3D Product Showcase with Custom Shaders',
          description: 'Build a browser 3D experience with custom water shaders, metallic reflections, and orbit controls.'
        }
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Game Networking & Optimization',
        subtitle: 'Multiplayer Synchronization & Profiling',
        duration: 'Weeks 13 - 16',
        topics: [
          { id: 'gm-t10', name: 'Multiplayer Game Networking', description: 'Client-side prediction, server reconciliation, lag compensation, UDP sockets', keyTools: ['Photon / Fusion', 'Unreal Replication'] },
          { id: 'gm-t11', name: 'Game Audio & Sound Design', description: 'Spatial 3D audio, FMOD / Wwise integration, dynamic audio state changes', keyTools: ['FMOD', 'Wwise'] },
          { id: 'gm-t12', name: 'Performance Profiling & Optimization', description: 'Draw call reduction, occlusion culling, memory leak audits, frame rate targets', keyTools: ['Unreal Insights', 'Unity Profiler'] }
        ],
        capstoneProject: {
          name: '4-Player Arena Multiplayer Demo Game',
          description: 'Develop a fast-paced networked multiplayer arena game with client prediction and server-authoritative state.'
        }
      }
    ],
    industryCertifications: [
      {
        id: 'cert-gm-1',
        title: 'Unity Certified Associate / Professional Programmer',
        provider: 'Unity Technologies',
        difficulty: 'Intermediate',
        industryValue: 'Official credential validating Unity engine programming proficiency.',
        avgExamFee: '$245',
        keyTopics: ['Core Programming', '3D Graphics', 'UI Systems', 'Optimization & Debugging'],
        examCode: 'UNITY-PROG',
        url: 'https://unity.com/learn/certifications'
      },
      {
        id: 'cert-gm-2',
        title: 'Unreal Engine Certified Associate',
        provider: 'Epic Games',
        difficulty: 'Intermediate',
        industryValue: 'Industry standard certification for Unreal Engine 5 developers and technical artists.',
        avgExamFee: '$150',
        keyTopics: ['UE5 Architecture', 'C++ & Blueprints', 'Materials & Shaders', 'Rendering & Physics'],
        examCode: 'EPIC-UE5',
        url: 'https://www.unrealengine.com/en-US/certifications'
      },
      {
        id: 'cert-gm-3',
        title: 'Autodesk Certified Professional in Maya / 3ds Max',
        provider: 'Autodesk',
        difficulty: 'Advanced',
        industryValue: 'Validated credential for 3D technical artists and asset creators.',
        avgExamFee: '$200',
        keyTopics: ['3D Modeling', 'Texturing', 'Rigging & Animation', 'Export Workflows'],
        examCode: 'AUTODESK-3D',
        url: 'https://www.autodesk.com/education/learn'
      }
    ],
    internships: [
      {
        id: 'int-gm-1',
        domainId: 'gamedev',
        roleTitle: 'AAA Gameplay Engine & Core C++ Systems Intern',
        companyName: 'Rockstar Games India',
        companyLogoBg: 'bg-amber-600 text-black',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Whitefield EPIP Zone)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹75,000 / month + Gaming Gear & Transit Allowance',
        requiredSkills: ['C++', 'Linear Algebra & 3D Math', 'Memory Optimization', 'Game Physics', 'Multithreading'],
        postedDate: 'Posted 1 day ago',
        deadline: 'Nov 10, 2026',
        description: 'Work directly on Rockstar\'s proprietary game engine technology in Bengaluru, profiling memory throughput, character physics interaction, and open-world streaming subsystems for flagship AAA titles.',
        responsibilities: [
          'Benchmark rendering frame times and CPU/GPU bottlenecks across PC and modern console architectures.',
          'Implement low-latency spatial partitioning algorithms for streaming world geometry.',
          'Investigate and resolve core C++ memory stability issues with senior engine leads.'
        ],
        applyUrl: 'https://www.rockstargames.com/careers/openings/position/india',
        portalName: 'Rockstar Games India Careers',
        jobReqId: 'REQ-2026-RS-BLR-ENG88',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-gm-2',
        domainId: 'gamedev',
        roleTitle: '3D Graphics & Rendering Pipeline Engineering Intern',
        companyName: 'Ubisoft India Studios',
        companyLogoBg: 'bg-blue-700 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (Prestige Shantiniketan, Whitefield)',
        duration: '14 Weeks (Summer 2026)',
        stipend: '₹65,000 / month + Game Library Access & Meals',
        requiredSkills: ['C++', 'DirectX 12 / Vulkan', 'HLSL / GLSL Shaders', 'GPU Profiling', '3D Math'],
        postedDate: 'Posted 2 days ago',
        deadline: 'Oct 28, 2026 (Priority)',
        description: 'Join Ubisoft Bengaluru\'s engineering studio to optimize real-time global illumination, shader compute passes, and fluid character rendering pipelines on high-end PC and consoles.',
        responsibilities: [
          'Profile GPU compute shaders using RenderDoc and proprietary performance telemetry tools.',
          'Develop custom HLSL compute shaders for volumetric lighting and water simulation.',
          'Collaborate with lead technical artists to minimize texture memory footprints.'
        ],
        applyUrl: 'https://www.ubisoft.com/en-us/company/careers/search?location=India',
        portalName: 'Ubisoft India University Careers',
        jobReqId: 'REQ-2026-UBI-BLR-RNDR1',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-gm-3',
        domainId: 'gamedev',
        roleTitle: 'Mobile Game Engine & Network Synchronization Intern',
        companyName: 'Krafton India',
        companyLogoBg: 'bg-slate-900 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Outer Ring Road Tech Center)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹80,000 / month + Meal Allowance & Esports Pass',
        requiredSkills: ['C++ / C#', 'Unreal Engine / Unity', 'UDP Networking', 'Replication', 'Git'],
        postedDate: 'Posted 3 days ago',
        deadline: 'Nov 01, 2026',
        description: 'Collaborate with Krafton\'s Indian game development studio building localized battle royale features, responsive weapon ballistics, and 60-tick multiplayer network synchronization.',
        responsibilities: [
          'Program gameplay mechanics in C++ within custom Unreal Engine multiplayer frameworks.',
          'Implement client-side prediction and lag compensation algorithms for high-ping cellular networks.',
          'Profile memory allocations to maintain strict thermal budgets on mid-range Android devices.'
        ],
        applyUrl: 'https://krafton.in/careers/',
        portalName: 'Krafton India Early Career',
        jobReqId: 'REQ-2026-KRFT-BLR-MP74',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-gm-4',
        domainId: 'gamedev',
        roleTitle: 'Casual & Social Game Client Engineering Intern',
        companyName: 'Moonfrog Labs (Stillfront Group)',
        companyLogoBg: 'bg-emerald-600 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Indiranagar 100 Feet Road)',
        duration: '12 Weeks (Summer / Fall 2026)',
        stipend: '₹60,000 / month + Wellness Perks',
        requiredSkills: ['Unity Engine', 'C#', 'UI Shaders', 'Mobile Performance Profiling', 'Animation Systems'],
        postedDate: 'Posted 4 days ago',
        deadline: 'Nov 15, 2026',
        description: 'Help build and optimize high-engagement mobile multiplayer games played by millions across India, tuning UI animations, card physics, and socket connection stability.',
        responsibilities: [
          'Enhance UI particle effects and card dealing animations in Unity C# maintaining 60 FPS.',
          'Develop automated visual regression tests across varying screen resolutions.',
          'Instrument real-time telemetry tracking frame pacing stutters and memory leaks.'
        ],
        applyUrl: 'https://moonfroglabs.com/careers/',
        portalName: 'Moonfrog Labs Careers',
        jobReqId: 'REQ-2026-MF-BLR-UNT5',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-gm-5',
        domainId: 'gamedev',
        roleTitle: 'Game Engine Architecture & Tools Intern',
        companyName: 'Electronic Arts (EA India)',
        companyLogoBg: 'bg-red-600 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Bengaluru Remote)',
        duration: '12 - 16 Weeks (Summer / Fall 2026)',
        stipend: '₹70,000 / month + EA Digital Game Pass & Tech Kit',
        requiredSkills: ['C++', 'Physics Simulation', 'Python Tools', 'Linear Algebra', 'Profiling'],
        postedDate: 'Posted this week',
        deadline: 'Dec 01, 2026',
        description: 'Contribute to core EA engine tools and automated DCC export pipelines, assisting sports and action game teams with collision detection meshes and asset validation.',
        responsibilities: [
          'Optimize spatial partitioning data structures (Octrees/BVH) for physics queries.',
          'Author Python pipeline plugins for Maya and Blender automating level asset export.',
          'Collaborate with global technical directors on automated multi-platform engine builds.'
        ],
        applyUrl: 'https://www.ea.com/careers/students',
        portalName: 'EA India University Relations Portal',
        jobReqId: 'REQ-2026-EA-IN-FRST29',
        batchSeason: 'Summer 2026 Cohort'
      }
    ]
  },
  {
    id: 'embedded',
    title: 'Systems, Embedded Systems & IoT',
    iconName: 'Cpu',
    shortDescription: 'Program bare-metal microcontrollers, real-time operating systems (RTOS), hardware drivers, and connected smart IoT devices.',
    fullDescription: 'Systems & Embedded Systems involves low-level programming (C, C++, Rust, Assembly), microcontroller hardware architecture (ARM Cortex, RISC-V, ESP32), RTOS (FreeRTOS), Linux kernel drivers, and IoT communication protocols (MQTT, I2C, SPI).',
    categoryTag: 'Systems & Hardware',
    avgSalary: '$100,000 - $148,000 / yr',
    hiringDemand: 'High',
    topTools: ['C', 'C++', 'Rust', 'FreeRTOS', 'ARM Assembly', 'ESP32', 'GDB / Oscilloscope'],
    recommendedCourses: [
      {
        id: 'emb-1',
        title: 'Embedded Systems - Shape the World: Microcontroller I/O',
        platform: 'University of Texas at Austin (edX / Free Audit)',
        skillLevel: 'Beginner to Intermediate',
        duration: '16 weeks (Free audit available)',
        rating: 4.93,
        studentsEnrolled: '350,000+',
        url: 'https://www.edx.org/learn/embedded-systems/the-university-of-texas-at-austin-embedded-systems-shape-the-world-microcontroller-input-output',
        isFree: true,
        description: 'Celebrated laboratory course by UT Austin professors Jonathan Valvano & Ramesh Yerraballi. Learn C programming, ARM Cortex-M microcontrollers, oscilloscopes, timers, analog I/O, and interrupts.',
        keyHighlights: ['Taught by UT Austin Faculty', 'Free Simulation & Hardware Labs', 'World-Class Embedded Pedagogy']
      },
      {
        id: 'emb-2',
        title: 'Ben Eater: Building an 8-bit Computer on Breadboards',
        platform: 'Ben Eater (100% Free Video Course & Schematics)',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~35 hours)',
        rating: 4.99,
        studentsEnrolled: '950,000+',
        url: 'https://eater.net/8bit/',
        isFree: true,
        description: 'Universally acclaimed as one of the best computer hardware explanations ever created. Ben Eater demonstrates clock modules, registers, ALU, RAM, microcode, and assembly on real breadboards.',
        keyHighlights: ['Crystal-Clear Hardware Explanations', 'Watch Logic Gates In Action', '100% Free Open Course']
      },
      {
        id: 'emb-3',
        title: 'The Embedded Rust Discovery Book & Microcontroller Guide',
        platform: 'Rust Embedded Working Group (100% Free)',
        skillLevel: 'Beginner to Intermediate',
        duration: 'Self-paced (~40 hours)',
        rating: 4.95,
        studentsEnrolled: '350,000+',
        url: 'https://docs.rust-embedded.org/book/',
        isFree: true,
        description: 'Official introduction to writing memory-safe embedded firmware with Rust. Covers bare-metal programming, peripheral access crates, GPIO pins, UART serial communication, and zero-overhead abstractions.',
        keyHighlights: ['Memory-Safe Hardware Code', 'ARM Cortex-M Hardware Targets', '100% Free Official Guide']
      },
      {
        id: 'emb-4',
        title: 'Arduino & ESP32 IoT Foundations by Arduino Education',
        platform: 'Arduino Official Documentation & Tutorials (100% Free)',
        skillLevel: 'Beginner',
        duration: 'Self-paced (~25 hours)',
        rating: 4.9,
        studentsEnrolled: '700,000+',
        url: 'https://docs.arduino.cc/learn/',
        isFree: true,
        description: 'The gentlest introduction to electronics and microcontrollers. Program digital inputs, PWM actuators, I2C temperature sensors, and Wi-Fi IoT web dashboards on ESP32 boards.',
        keyHighlights: ['Zero Intimidating Jargon', 'Hands-on Sensor Projects', '100% Free Interactive Tutorials']
      },
      {
        id: 'emb-5',
        title: 'Operating Systems: Three Easy Pieces (OSTEP)',
        platform: 'University of Wisconsin-Madison (Free Open Textbook & Labs)',
        skillLevel: 'Intermediate',
        duration: 'Self-paced (~50 hours)',
        rating: 4.97,
        studentsEnrolled: '400,000+',
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
        isFree: true,
        description: 'The legendary systems course by Remzi & Andrea Arpaci-Dusseau. Deeply explains virtualization (CPU, virtual memory), concurrency (threads, locks, semaphores), and persistence (file systems, SSDs).',
        keyHighlights: ['Gold-Standard Systems Book', 'Hands-on C Coding Projects', '100% Free Open Textbook']
      }
    ],
    learningPath: [
      {
        phaseNumber: 1,
        title: 'Phase 1: C Programming & Computer Architecture',
        subtitle: 'Memory Registers, Pointers, Bitwise Ops & ARM Basics',
        duration: 'Weeks 1 - 4',
        topics: [
          { id: 'emb-t1', name: 'C Language Deep Dive & Memory', description: 'Pointers, memory alignment, stack vs heap, volatile keyword, bitwise masking', keyTools: ['C99 / C11', 'GCC', 'GDB'] },
          { id: 'emb-t2', name: 'Microcontroller Hardware Architecture', description: 'ARM Cortex-M architecture, memory map, GPIO pins, clock configuration', keyTools: ['STM32', 'ESP32', 'Keil / STM32CubeIDE'] },
          { id: 'emb-t3', name: 'Serial Communication Protocols', description: 'UART, I2C, SPI, CAN bus protocols, timing diagrams, logic analyzers', keyTools: ['Logic Analyzer', 'Oscilloscope', 'Saleae'] }
        ],
        capstoneProject: {
          name: 'Bare-Metal Sensor Monitoring Firmware in C',
          description: 'Write custom C peripheral drivers for I2C temperature sensors and UART data logging without external HAL libraries.'
        }
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: RTOS & Multi-Tasking Systems',
        subtitle: 'FreeRTOS Scheduler, Mutexes & Interrupts',
        duration: 'Weeks 5 - 8',
        topics: [
          { id: 'emb-t4', name: 'Real-Time Operating System (FreeRTOS)', description: 'Task priority scheduling, queues, semaphores, mutexes, event groups', keyTools: ['FreeRTOS', 'ESP-IDF'] },
          { id: 'emb-t5', name: 'Interrupt Handling & DMA', description: 'ISR (Interrupt Service Routines), interrupt priorities, Direct Memory Access (DMA)', keyTools: ['ARM NVIC', 'DMA Controller'] },
          { id: 'emb-t6', name: 'Embedded System Power Management', description: 'Sleep modes, watchdog timers (WDT), battery power optimization', keyTools: ['Power Profiler', 'STM32 Low Power'] }
        ],
        capstoneProject: {
          name: 'Multi-Tasking Smart Environmental Monitor with FreeRTOS',
          description: 'Design a multi-task FreeRTOS firmware with queue-based sensor sampling, OLED displays, and low-power sleep cycles.'
        }
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Embedded Linux & Rust Systems',
        subtitle: 'Kernel Drivers, Yocto & Memory Safety in Rust',
        duration: 'Weeks 9 - 12',
        topics: [
          { id: 'emb-t7', name: 'Embedded Linux & Yocto Project', description: 'Custom Linux kernel compilation, device trees, U-Boot bootloader, Yocto builds', keyTools: ['Yocto', 'U-Boot', 'Device Tree'] },
          { id: 'emb-t8', name: 'Linux Kernel Driver Development', description: 'Character device drivers, sysfs entries, memory mapping (mmap), kernel modules', keyTools: ['Linux Kernel Source', 'In-Kernel APIs'] },
          { id: 'emb-t9', name: 'Embedded Rust Development', description: 'no_std Rust, PAC (Peripheral Access Crates), HALs, ownership safety on hardware', keyTools: ['Rust Embedded', 'cargo-embed'] }
        ],
        capstoneProject: {
          name: 'Custom Yocto Embedded Linux System with Rust Control Daemon',
          description: 'Build a minimal custom Linux image for Raspberry Pi / BeagleBone running a memory-safe Rust system control service.'
        }
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: IoT Wireless Protocols & Cloud Security',
        subtitle: 'MQTT, BLE, TLS Encryption & Firmware Updates',
        duration: 'Weeks 13 - 16',
        topics: [
          { id: 'emb-t10', name: 'IoT Wireless Protocols', description: 'Wi-Fi, Bluetooth LE (BLE), Zigbee, LoRaWAN, MQTT pub/sub brokers', keyTools: ['Mosquitto MQTT', 'BLE Stack'] },
          { id: 'emb-t11', name: 'Firmware Over-The-Air (FOTA) Updates', description: 'Bootloaders, dual-bank flash memory, cryptographic payload signing', keyTools: ['mbed TLS', 'MCUboot'] },
          { id: 'emb-t12', name: 'Hardware Security & TPM', description: 'Secure Boot, TrustZone, hardware cryptographic accelerators, AES keys', keyTools: ['ARM TrustZone', 'Crypto Engine'] }
        ],
        capstoneProject: {
          name: 'Secure Cloud-Connected IoT Gateway with FOTA',
          description: 'Construct an encrypted ESP32/ARM IoT gateway that securely publishes MQTT sensor metrics and performs FOTA upgrades.'
        }
      }
    ],
    industryCertifications: [
      {
        id: 'cert-emb-1',
        title: 'Arm Accredited Engineer (AAE)',
        provider: 'Arm Education',
        difficulty: 'Advanced',
        industryValue: 'Globally recognized certification for Arm architecture and microcontroller systems.',
        avgExamFee: '$200',
        keyTopics: ['ARM Cortex Architecture', 'Assembly & C', 'Memory Maps', 'Interrupts & Exceptions'],
        examCode: 'ARM-AAE',
        url: 'https://www.arm.com/resources/education'
      },
      {
        id: 'cert-emb-2',
        title: 'Linux Foundation Certified System Administrator (LFCS)',
        provider: 'Linux Foundation',
        difficulty: 'Intermediate',
        industryValue: 'Hands-on performance certification for systems administration and Linux internals.',
        avgExamFee: '$395',
        keyTopics: ['Storage & Filesystems', 'Service Config', 'Networking', 'Security & System Calls'],
        examCode: 'LFCS',
        url: 'https://training.linuxfoundation.org/certification/linux-foundation-certified-system-administrator-lfcs/'
      },
      {
        id: 'cert-emb-3',
        title: 'Certified Rust Systems Engineer',
        provider: 'Rust Foundation Partner',
        difficulty: 'Intermediate',
        industryValue: 'High-value credential validating memory-safe systems programming skills.',
        avgExamFee: '$250',
        keyTopics: ['Rust Core', 'Ownership & Lifetimes', 'Concurrency', 'Unsafe & Foreign Function Interfaces'],
        examCode: 'RUST-SYS',
        url: 'https://www.rust-lang.org/'
      }
    ],
    internships: [
      {
        id: 'int-emb-1',
        domainId: 'embedded',
        roleTitle: 'Automotive Embedded Firmware & ECU Systems Intern',
        companyName: 'Bosch Global Software Technologies (BGSW)',
        companyLogoBg: 'bg-red-700 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Adugodi Tech Center / Electronic City) & Mysuru DC',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹65,000 / month + Bus Transit & Cafeteria Privileges',
        requiredSkills: ['Embedded C / C++', 'AUTOSAR / FreeRTOS', 'CAN Bus / CAN-FD', 'Microcontrollers (STM32/AURIX)', 'Oscilloscopes'],
        postedDate: 'Posted 1 day ago',
        deadline: 'Nov 05, 2026',
        description: 'Write deterministic real-time C/C++ firmware at Bosch\'s largest global software hub in Karnataka, powering automotive powertrain ECUs, body electronics, and active safety sensor gateways.',
        responsibilities: [
          'Develop bare-metal peripheral drivers for SPI, I2C, and CAN-FD communication buses.',
          'Implement hard real-time FreeRTOS/AUTOSAR task scheduling with sub-millisecond guarantees.',
          'Debug prototype boards using JTAG/SWD debuggers, logic analyzers, and digital oscilloscopes.'
        ],
        applyUrl: 'https://careers.smartrecruiters.com/BoschGroup/india',
        portalName: 'Bosch India Careers (SmartRecruiters)',
        jobReqId: 'REQ-2026-BSCH-BLR-HW48',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-emb-2',
        domainId: 'embedded',
        roleTitle: 'Low-Level Embedded Linux & Snapdragon BSP Intern',
        companyName: 'Qualcomm India',
        companyLogoBg: 'bg-blue-800 text-white',
        locationType: 'Hybrid',
        location: 'Bengaluru, Karnataka (Bagmane World Technology Centre, Marathahalli ORR)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹95,000 / month + Relocation Grant',
        requiredSkills: ['C / C++', 'ARM Assembly', 'Linux Kernel Drivers', 'Device Trees', 'Power Management'],
        postedDate: 'Posted 2 days ago',
        deadline: 'Oct 29, 2026 (Priority)',
        description: 'Join Qualcomm\'s Snapdragon modem and processor engineering center in Bengaluru developing Board Support Packages (BSPs), bootloaders, and Linux kernel drivers for 5G IoT and automotive silicon.',
        responsibilities: [
          'Develop and debug Linux device tree bindings and interrupt controllers for ARM SoCs.',
          'Optimize low-power processor states (DVFS) and thermal throttling control loops.',
          'Perform automated hardware-in-the-loop (HIL) regression testing across prototype silicon boards.'
        ],
        applyUrl: 'https://qualcomm.wd5.myworkdayjobs.com/External?locations=101017d91d9201e74f8b22a00030eb97',
        portalName: 'Qualcomm India Student Center (Workday)',
        jobReqId: 'REQ-2026-QCOM-BLR-EMB91',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-emb-3',
        domainId: 'embedded',
        roleTitle: 'Analog & Embedded Microcontroller Applications Intern',
        companyName: 'Texas Instruments India',
        companyLogoBg: 'bg-red-700 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (Bagmane Tech Park, CV Raman Nagar)',
        duration: '14 Weeks (Summer 2026)',
        stipend: '₹1,00,000 / month + Housing Allowance',
        requiredSkills: ['MSP430 / C2000', 'Embedded C', 'Real-Time Control', 'Motor Drive Algorithms', 'PCB Testing'],
        postedDate: 'Posted 3 days ago',
        deadline: 'Nov 12, 2026',
        description: 'Contribute to TI India\'s world-renowned semiconductor engineering lab in Bengaluru, testing digital motor control algorithms, high-efficiency power converters, and MSPM0 microcontroller software SDKs.',
        responsibilities: [
          'Implement field-oriented motor control algorithms using TI C2000 microcontrollers in C.',
          'Characterize ADC sampling jitter and PWM timing precision on mixed-signal hardware.',
          'Publish technical application notes and reference firmware for Indian industrial designers.'
        ],
        applyUrl: 'https://careers.ti.com/search-jobs/?location=Bangalore%2C+India',
        portalName: 'Texas Instruments India Student Careers',
        jobReqId: 'REQ-2026-TI-BLR-MCU32',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-emb-4',
        domainId: 'embedded',
        roleTitle: 'EV Vehicle Telematics & Battery Management Systems Intern',
        companyName: 'Ather Energy',
        companyLogoBg: 'bg-emerald-600 text-white',
        locationType: 'On-site',
        location: 'Bengaluru, Karnataka (IBC Knowledge Park, Bannerghatta Road)',
        duration: '12 - 16 Weeks (Summer 2026)',
        stipend: '₹60,000 / month + EV Scooter Testing Privileges',
        requiredSkills: ['Embedded C', 'Battery Management (BMS)', 'CAN / UART', 'FreeRTOS', 'IoT Telematics'],
        postedDate: 'Posted 4 days ago',
        deadline: 'Nov 18, 2026',
        description: 'Write mission-critical embedded software for electric smart scooters at Ather Energy in Bengaluru, engineering state-of-charge battery estimations, dashboard touch firmware, and cellular telematics.',
        responsibilities: [
          'Develop deterministic drivers for battery thermal sensors and high-voltage contactors.',
          'Test CAN bus messaging reliability between smart dash displays and motor controllers.',
          'Participate in vehicle prototype dyno testing and real-world ride data logging.'
        ],
        applyUrl: 'https://www.atherenergy.com/careers',
        portalName: 'Ather Energy Early Career Portal',
        jobReqId: 'REQ-2026-ATHR-BLR-BMS14',
        batchSeason: 'Summer 2026 Cohort'
      },
      {
        id: 'int-emb-5',
        domainId: 'embedded',
        roleTitle: 'Connected IoT Hardware Firmware & Cloud Telemetry Intern',
        companyName: 'Particle IoT / Arduino India',
        companyLogoBg: 'bg-teal-700 text-white',
        locationType: 'Virtual / Remote',
        location: 'Virtual / Remote (Pan-India / Karnataka Remote)',
        duration: '12 Weeks (Summer / Fall 2026)',
        stipend: '₹55,000 / month + Hardware Development Kits',
        requiredSkills: ['Embedded C / C++', 'ESP32 / Nordic nRF52', 'MQTT / TLS', 'BLE', 'Over-the-Air (OTA) Updates'],
        postedDate: 'Posted this week',
        deadline: 'Dec 10, 2026',
        description: 'Design smart environmental sensors, BLE beacon security handshakes, and encrypted MQTT cloud reporting firmware with failsafe over-the-air firmware update support.',
        responsibilities: [
          'Implement sensor telemetry reporting over cellular NB-IoT and Wi-Fi networks in C/C++.',
          'Optimize low-power deep sleep cycles extending field battery life on remote nodes.',
          'Author developer hardware reference guides and open-source starter repos.'
        ],
        applyUrl: 'https://www.particle.io/careers/',
        portalName: 'Particle Developer Relations Portal',
        jobReqId: 'REQ-2026-PTCL-IN-IOT67',
        batchSeason: 'Summer 2026 Cohort'
      }
    ]
  }
];
