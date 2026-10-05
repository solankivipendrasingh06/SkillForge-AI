// Course Database and Interactive Learning Roadmaps Data
// Priority 5 (Course Details), Priority 6 (Recommendations), Priority 7 (Visual Roadmap)

export const ALL_COURSES = [
  {
    id: 'web-dev-fullstack',
    title: 'Full Stack Web Development',
    domain: 'Web Development',
    category: 'Web Development',
    description: 'Master frontend & backend web development with HTML5, CSS Grid, Modern JS, React 18, Node.js Express, and MongoDB. Build production-ready web apps.',
    difficulty: 'Intermediate',
    estimatedTime: '12 weeks • 6 hrs/week',
    prerequisites: 'Basic computer literacy & logic',
    rating: 4.9,
    enrollments: 14200,
    price: 'Free',
    badge: 'Best Match',
    skillsCovered: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React 18', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git'],
    roadmap: [
      {
        id: 'web_topic_1',
        step: 1,
        title: 'HTML & CSS Fundamentals',
        description: 'Semantic markup, CSS Flexbox & Grid, responsive mobile-first layouts, and typography.',
        estimatedHours: '15 hours',
        keyConcepts: ['Semantic HTML5', 'CSS Flexbox & Grid', 'Responsive Media Queries', 'CSS Variables'],
        resourceLink: 'https://developer.mozilla.org/en-US/docs/Learn/HTML'
      },
      {
        id: 'web_topic_2',
        step: 2,
        title: 'JavaScript & DOM Manipulation',
        description: 'Variables, arrow functions, DOM traversal, async/await promises, ES modules, and fetch API.',
        estimatedHours: '20 hours',
        keyConcepts: ['ES6+ Syntax', 'DOM Selection & Events', 'Promises & Async/Await', 'Fetch API'],
        resourceLink: 'https://javascript.info/'
      },
      {
        id: 'web_topic_3',
        step: 3,
        title: 'React & Component Architecture',
        description: 'JSX, useState & useEffect hooks, props drilling vs Context API, component lifecycles, and React Router.',
        estimatedHours: '25 hours',
        keyConcepts: ['JSX Syntax', 'Hooks (useState, useEffect)', 'Context API', 'React Router DOM'],
        resourceLink: 'https://react.dev/'
      },
      {
        id: 'web_topic_4',
        step: 4,
        title: 'Node.js & Express REST APIs',
        description: 'Event loop, building HTTP servers, REST routing, middleware pipelines, and error handling.',
        estimatedHours: '20 hours',
        keyConcepts: ['Node Event Loop', 'Express Router', 'Middleware Pattern', 'JSON API Response'],
        resourceLink: 'https://expressjs.com/'
      },
      {
        id: 'web_topic_5',
        step: 5,
        title: 'MongoDB & Database Design',
        description: 'NoSQL collections, Mongoose ODM schemas, CRUD operations, indexing, and aggregation pipelines.',
        estimatedHours: '18 hours',
        keyConcepts: ['NoSQL Data Modeling', 'Mongoose Schemas', 'CRUD Operations', 'Indexing & Performance'],
        resourceLink: 'https://www.mongodb.com/docs/'
      },
      {
        id: 'web_topic_6',
        step: 6,
        title: 'Authentication & Security',
        description: 'JWT tokens, bcrypt password hashing, session management, CORS policies, and security headers.',
        estimatedHours: '15 hours',
        keyConcepts: ['JSON Web Tokens', 'Bcrypt Hashing', 'CORS & Security', 'Protected Routes'],
        resourceLink: 'https://jwt.io/'
      },
      {
        id: 'web_topic_7',
        step: 7,
        title: 'Deployment & CI/CD',
        description: 'Deploying frontend to Vercel/Netlify, backend to Render/AWS, Git GitHub workflow, and CI/CD basics.',
        estimatedHours: '12 hours',
        keyConcepts: ['Git Branching', 'Environment Variables', 'Cloud Hosting', 'Continuous Integration'],
        resourceLink: 'https://vercel.com/docs'
      },
      {
        id: 'web_topic_8',
        step: 8,
        title: 'Final Capstone Project',
        description: 'Design, code, test, and deploy a full-stack SaaS application with authentication and live database.',
        estimatedHours: '30 hours',
        keyConcepts: ['Full Stack Integration', 'User Authentication', 'Live Production Deployment', 'Portfolio Showcase'],
        resourceLink: 'https://github.com'
      }
    ]
  },

  {
    id: 'java-dev-enterprise',
    title: 'Enterprise Java & Spring Boot',
    domain: 'Java Development',
    category: 'Java Development',
    description: 'Master Java 17 OOP, Collections, Multithreading, Spring Boot 3 microservices, Hibernate ORM, and PostgreSQL.',
    difficulty: 'Intermediate',
    estimatedTime: '14 weeks • 5 hrs/week',
    prerequisites: 'Basic programming concepts',
    rating: 4.8,
    enrollments: 9800,
    price: 'Free',
    badge: 'High Demand',
    skillsCovered: ['Java 17', 'OOP Principles', 'Spring Boot 3', 'Spring Data JPA', 'PostgreSQL', 'Microservices', 'Maven'],
    roadmap: [
      { id: 'java_t1', step: 1, title: 'Java Core & OOP Principles', description: 'Classes, Objects, Inheritance, Polymorphism, Interfaces, Abstraction', estimatedHours: '20 hours' },
      { id: 'java_t2', step: 2, title: 'Collections & Generics', description: 'List, Set, Map, Queue, Stream API, Lambda Expressions', estimatedHours: '18 hours' },
      { id: 'java_t3', step: 3, title: 'Concurrency & Exception Handling', description: 'Multithreading, Executor Service, Try-Catch, Custom Exceptions', estimatedHours: '15 hours' },
      { id: 'java_t4', step: 4, title: 'Spring Boot 3 Architecture', description: 'Dependency Injection, Spring MVC, REST Controllers', estimatedHours: '25 hours' },
      { id: 'java_t5', step: 5, title: 'Spring Data JPA & Hibernate', description: 'ORM entities, Repositories, PostgreSQL queries, Transactions', estimatedHours: '20 hours' },
      { id: 'java_t6', step: 6, title: 'Microservices & Security', description: 'Spring Security, OAuth2, API Gateway, Docker Containers', estimatedHours: '22 hours' }
    ]
  },

  {
    id: 'python-mastery',
    title: 'Python Core & Automation Mastery',
    domain: 'Python',
    category: 'Python',
    description: 'Learn Python 3 from scratch to advanced. Master data structures, OOP, file processing, web scraping, and API building.',
    difficulty: 'Beginner',
    estimatedTime: '8 weeks • 4 hrs/week',
    prerequisites: 'None — ideal for total beginners',
    rating: 4.9,
    enrollments: 18500,
    price: 'Free',
    badge: 'Popular',
    skillsCovered: ['Python 3', 'Data Structures', 'OOP', 'Web Scraping', 'Automation', 'Flask Basics'],
    roadmap: [
      { id: 'py_t1', step: 1, title: 'Python Syntax & Variables', description: 'Numbers, Strings, Control flow (if-else, loops), Functions', estimatedHours: '10 hours' },
      { id: 'py_t2', step: 2, title: 'Data Structures Deep Dive', description: 'Lists, Tuples, Dictionaries, Sets, List Comprehensions', estimatedHours: '12 hours' },
      { id: 'py_t3', step: 3, title: 'Object-Oriented Python', description: 'Classes, Objects, Inheritance, Dunder Methods', estimatedHours: '15 hours' },
      { id: 'py_t4', step: 4, title: 'File I/O & Automation Scripts', description: 'Reading/writing files, OS module, Web Scraping with BeautifulSoup', estimatedHours: '14 hours' },
      { id: 'py_t5', step: 5, title: 'Building Lightweight APIs', description: 'Introduction to Flask & FastAPI for Python web services', estimatedHours: '16 hours' }
    ]
  },

  {
    id: 'data-science-python',
    title: 'Python for Data Science & Machine Learning',
    domain: 'Data Science',
    category: 'Data Science',
    description: 'Transform raw data into actionable insights using Python, NumPy, Pandas, Matplotlib, Seaborn, and Scikit-Learn.',
    difficulty: 'Intermediate',
    estimatedTime: '10 weeks • 6 hrs/week',
    prerequisites: 'Basic Python knowledge',
    rating: 4.9,
    enrollments: 16100,
    price: 'Free',
    badge: 'Top Rated',
    skillsCovered: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-Learn', 'EDA', 'Feature Engineering'],
    roadmap: [
      { id: 'ds_t1', step: 1, title: 'NumPy & Vectorized Computing', description: 'Arrays, slicing, broadcasting, mathematical operations', estimatedHours: '12 hours' },
      { id: 'ds_t2', step: 2, title: 'Pandas Data Analysis', description: 'DataFrames, cleaning missing values, groupby, merging tables', estimatedHours: '18 hours' },
      { id: 'ds_t3', step: 3, title: 'Data Visualization', description: 'Creating publication-quality charts with Matplotlib & Seaborn', estimatedHours: '15 hours' },
      { id: 'ds_t4', step: 4, title: 'Exploratory Data Analysis (EDA)', description: 'Correlation matrices, distribution plots, outlier detection', estimatedHours: '16 hours' },
      { id: 'ds_t5', step: 5, title: 'Supervised ML Models', description: 'Linear Regression, Decision Trees, Random Forests, Scikit-Learn', estimatedHours: '24 hours' }
    ]
  },

  {
    id: 'ai-ml-specialization',
    title: 'AI & Deep Learning Specialization',
    domain: 'AI/ML',
    category: 'AI/ML',
    description: 'Build modern AI applications. Master Neural Networks, CNNs, RNNs, Transformers, PyTorch, and Large Language Models (LLMs).',
    difficulty: 'Advanced',
    estimatedTime: '16 weeks • 8 hrs/week',
    prerequisites: 'Python & linear algebra basics',
    rating: 4.95,
    enrollments: 8900,
    price: 'Free',
    badge: 'Cutting Edge',
    skillsCovered: ['PyTorch', 'TensorFlow', 'Neural Networks', 'CNNs', 'Transformers', 'LLMs', 'Prompt Engineering'],
    roadmap: [
      { id: 'aiml_t1', step: 1, title: 'Neural Network Foundations', description: 'Perceptrons, Activation functions, Backpropagation, Gradient Descent', estimatedHours: '20 hours' },
      { id: 'aiml_t2', step: 2, title: 'PyTorch Deep Learning Framework', description: 'Tensors, Autograd, Model training loops, GPU acceleration', estimatedHours: '22 hours' },
      { id: 'aiml_t3', step: 3, title: 'Computer Vision with CNNs', description: 'Convolutional layers, ResNet architectures, Object detection', estimatedHours: '25 hours' },
      { id: 'aiml_t4', step: 4, title: 'Natural Language Processing & Transformers', description: 'Self-Attention, Transformer models, Hugging Face, Fine-tuning LLMs', estimatedHours: '30 hours' }
    ]
  },

  {
    id: 'data-analytics-sql',
    title: 'Data Analytics & Business Intelligence',
    domain: 'Data Analytics',
    category: 'Data Analytics',
    description: 'Become a Data Analyst. Master SQL queries, Power BI / Tableau dashboards, Advanced Excel, and business reporting.',
    difficulty: 'Beginner',
    estimatedTime: '8 weeks • 5 hrs/week',
    prerequisites: 'Basic math & computer comfort',
    rating: 4.7,
    enrollments: 12400,
    price: 'Free',
    badge: 'Beginner Friendly',
    skillsCovered: ['SQL', 'Power BI', 'Tableau', 'Excel Pivot Tables', 'Data Storytelling', 'KPI Dashboards'],
    roadmap: [
      { id: 'da_t1', step: 1, title: 'Advanced Excel & Pivot Tables', description: 'VLOOKUP, XLOOKUP, Pivot tables, Conditional formatting', estimatedHours: '10 hours' },
      { id: 'da_t2', step: 2, title: 'SQL Querying Mastery', description: 'SELECT, WHERE, JOINs, GROUP BY, Subqueries, Window functions', estimatedHours: '20 hours' },
      { id: 'da_t3', step: 3, title: 'Power BI Dashboard Creation', description: 'Connecting data sources, DAX formulas, interactive visual reports', estimatedHours: '18 hours' },
      { id: 'da_t4', step: 4, title: 'Business Analytics & Storytelling', description: 'Translating data metrics into actionable executive decisions', estimatedHours: '14 hours' }
    ]
  },

  {
    id: 'cyber-security-defense',
    title: 'Cyber Security & Ethical Hacking',
    domain: 'Cyber Security',
    category: 'Cyber Security',
    description: 'Learn offensive & defensive security. Master network protocols, Linux administration, OWASP Web Security, penetration testing, and cryptography.',
    difficulty: 'Intermediate',
    estimatedTime: '12 weeks • 6 hrs/week',
    prerequisites: 'Basic networking knowledge',
    rating: 4.85,
    enrollments: 11100,
    price: 'Free',
    badge: 'High Importance',
    skillsCovered: ['Network Security', 'Wireshark', 'Metasploit', 'OWASP Top 10', 'Linux CLI', 'Cryptography', 'SIEM'],
    roadmap: [
      { id: 'cs_t1', step: 1, title: 'Computer Networking & Protocols', description: 'TCP/IP model, OSI layers, DNS, DHCP, Packet analysis with Wireshark', estimatedHours: '16 hours' },
      { id: 'cs_t2', step: 2, title: 'Linux System Administration', description: 'Command line, user permissions, SSH, bash scripting', estimatedHours: '15 hours' },
      { id: 'cs_t3', step: 3, title: 'OWASP Web Application Security', description: 'SQL Injection, XSS, CSRF, Authentication bypass mechanisms', estimatedHours: '22 hours' },
      { id: 'cs_t4', step: 4, title: 'Ethical Hacking & Pen Testing', description: 'Reconnaissance, Nmap, Metasploit, Privilege escalation', estimatedHours: '25 hours' }
    ]
  },

  {
    id: 'cloud-computing-aws',
    title: 'Cloud Architect with AWS & Cloud Native',
    domain: 'Cloud Computing',
    category: 'Cloud Computing',
    description: 'Design resilient, scalable cloud systems on Amazon Web Services (AWS). Learn EC2, S3, RDS, Lambda, VPC, and IAM.',
    difficulty: 'Intermediate',
    estimatedTime: '10 weeks • 5 hrs/week',
    prerequisites: 'Basic OS & web infrastructure knowledge',
    rating: 4.9,
    enrollments: 13800,
    price: 'Free',
    badge: 'Cloud Certified',
    skillsCovered: ['AWS EC2', 'AWS S3', 'AWS VPC', 'AWS Lambda', 'AWS IAM', 'Serverless', 'Cloud Security'],
    roadmap: [
      { id: 'cc_t1', step: 1, title: 'Cloud Fundamentals & AWS Global Infra', description: 'Regions, Availability Zones, Edge Locations, IAM Roles', estimatedHours: '12 hours' },
      { id: 'cc_t2', step: 2, title: 'Virtual Compute & EC2 Auto Scaling', description: 'Launching instances, Security groups, Load balancers, Auto Scaling', estimatedHours: '18 hours' },
      { id: 'cc_t3', step: 3, title: 'Cloud Storage & Databases', description: 'Amazon S3 buckets, EBS volumes, RDS PostgreSQL, DynamoDB', estimatedHours: '16 hours' },
      { id: 'cc_t4', step: 4, title: 'Networking & VPC Design', description: 'Subnets, Internet Gateways, NAT Gateways, Route Tables', estimatedHours: '18 hours' }
    ]
  },

  {
    id: 'devops-kubernetes',
    title: 'DevOps Engineering with Docker & Kubernetes',
    domain: 'DevOps',
    category: 'DevOps',
    description: 'Build automated CI/CD pipelines. Master Git, Docker containers, Kubernetes orchestration, Terraform IaC, and GitHub Actions.',
    difficulty: 'Advanced',
    estimatedTime: '12 weeks • 6 hrs/week',
    prerequisites: 'Linux CLI & basic cloud knowledge',
    rating: 4.88,
    enrollments: 7600,
    price: 'Free',
    badge: 'Pro Level',
    skillsCovered: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana'],
    roadmap: [
      { id: 'dev_t1', step: 1, title: 'Containerization with Docker', description: 'Dockerfiles, multi-stage builds, Docker Compose, volume mounts', estimatedHours: '15 hours' },
      { id: 'dev_t2', step: 2, title: 'CI/CD Pipelines with GitHub Actions', description: 'Automated test runners, building Docker images, release workflows', estimatedHours: '18 hours' },
      { id: 'dev_t3', step: 3, title: 'Kubernetes Cluster Management', description: 'Pods, Deployments, Services, Ingress, Helm Charts, Scaling', estimatedHours: '25 hours' },
      { id: 'dev_t4', step: 4, title: 'Infrastructure as Code (Terraform)', description: 'Writing HCL code, state management, provisioning cloud infra', estimatedHours: '20 hours' }
    ]
  },

  {
    id: 'ui-ux-product-design',
    title: 'UI/UX Design & Product Strategy',
    domain: 'UI/UX',
    category: 'UI/UX',
    description: 'Design beautiful, intuitive digital experiences. Master Figma, user research, wireframing, interactive prototyping, and design systems.',
    difficulty: 'Beginner',
    estimatedTime: '8 weeks • 4 hrs/week',
    prerequisites: 'Creative interest & empathy for users',
    rating: 4.92,
    enrollments: 10400,
    price: 'Free',
    badge: 'Creative Choice',
    skillsCovered: ['Figma', 'Wireframing', 'User Research', 'Color Theory', 'Typography', 'Prototyping', 'Design Systems'],
    roadmap: [
      { id: 'ux_t1', step: 1, title: 'UX Research & User Personas', description: 'Conducting interviews, journey maps, defining problem statements', estimatedHours: '12 hours' },
      { id: 'ux_t2', step: 2, title: 'Information Architecture & Wireframing', description: 'User flows, low-fidelity paper wireframes, layout grids', estimatedHours: '14 hours' },
      { id: 'ux_t3', step: 3, title: 'Figma UI Mastery', description: 'Components, Auto Layout, Variants, Typography scales, Color palettes', estimatedHours: '20 hours' },
      { id: 'ux_t4', step: 4, title: 'Interactive Prototyping & Usability Testing', description: 'Micro-interactions, smart animate, testing designs with users', estimatedHours: '16 hours' }
    ]
  },

  {
    id: 'blockchain-smart-contracts',
    title: 'Blockchain & Ethereum Smart Contracts',
    domain: 'Blockchain',
    category: 'Blockchain',
    description: 'Build decentralized Web3 applications. Master Solidity, Ethereum EVM, Hardhat, Ethers.js, smart contract security, and DeFi protocols.',
    difficulty: 'Advanced',
    estimatedTime: '12 weeks • 6 hrs/week',
    prerequisites: 'JavaScript or Python coding background',
    rating: 4.82,
    enrollments: 6200,
    price: 'Free',
    badge: 'Next-Gen Tech',
    skillsCovered: ['Solidity', 'Ethereum EVM', 'Hardhat', 'Ethers.js', 'Smart Contracts', 'Web3.js', 'DeFi'],
    roadmap: [
      { id: 'bc_t1', step: 1, title: 'Blockchain & Cryptography Core', description: 'Distributed consensus, hashing, public-private key cryptography', estimatedHours: '12 hours' },
      { id: 'bc_t2', step: 2, title: 'Solidity Smart Contract Programming', description: 'Data types, state variables, mappings, modifiers, events', estimatedHours: '22 hours' },
      { id: 'bc_t3', step: 3, title: 'Hardhat & Web3 Frontend Integration', description: 'Testing smart contracts, Ethers.js integration, Metamask login', estimatedHours: '20 hours' },
      { id: 'bc_t4', step: 4, title: 'DeFi & Security Auditing', description: 'ERC-20 & ERC-721 tokens, reentrancy attacks, contract security', estimatedHours: '24 hours' }
    ]
  }
];

// Calculation helper for recommendations
export function calculateRecommendation(generalAnswers, domainScores) {
  const selectedDomain = generalAnswers.gen_1 || 'Web Development';
  const experience = generalAnswers.gen_2 || 'Beginner';
  const careerGoal = generalAnswers.gen_4 || 'Land Job';

  // Primary course match
  let primaryCourse = ALL_COURSES.find(c => c.domain === selectedDomain) || ALL_COURSES[0];

  // Match score calculation
  const quizScoreObj = domainScores[selectedDomain] || { correct: 4, total: 5 };
  const domainPct = Math.round((quizScoreObj.correct / (quizScoreObj.total || 1)) * 100);
  
  // Weighted calculation (quiz score 50% + interest alignment 50%)
  const matchPercentage = Math.min(98, Math.max(68, Math.round(50 + (domainPct * 0.45))));

  // Tailored match reasons
  const matchReasons = [
    `High interest expressed in ${selectedDomain}`,
    `Scored ${domainPct}% proficiency on ${selectedDomain} baseline skill check`,
    `Course difficulty (${primaryCourse.difficulty}) aligns with your ${experience} background`,
    `Structured to support your goal: ${careerGoal}`
  ];

  // Select 3 alternative career paths
  const alternatives = ALL_COURSES
    .filter(c => c.id !== primaryCourse.id)
    .slice(0, 3)
    .map((alt, idx) => ({
      ...alt,
      matchPercentage: Math.max(65, matchPercentage - (idx + 1) * 8)
    }));

  return {
    recommendedCourse: primaryCourse,
    recommendedCourseId: primaryCourse.id,
    matchPercentage,
    matchReasons,
    alternatives,
    quizScorePct: domainPct,
    targetDomain: selectedDomain
  };
}
