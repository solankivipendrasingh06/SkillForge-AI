// Comprehensive Question Bank for Skill Assessment
// Priorities 3 & 4: Step-by-step general questions and course-specific technical questions across 11 domains

export const GENERAL_QUESTIONS = [
  {
    id: 'gen_1',
    category: 'General',
    title: 'Interests & Technology Domain',
    question: 'Which area of technology interests you the most right now?',
    subtitle: 'This helps us narrow down your career pathway and core course domain.',
    options: [
      { label: 'Web & Full Stack Development', value: 'Web Development', domain: 'Web Development' },
      { label: 'Java Enterprise Systems', value: 'Java Development', domain: 'Java Development' },
      { label: 'Python & Automation', value: 'Python', domain: 'Python' },
      { label: 'Data Science & Analytics', value: 'Data Science', domain: 'Data Science' },
      { label: 'Artificial Intelligence & Machine Learning', value: 'AI/ML', domain: 'AI/ML' },
      { label: 'Data Analytics & Business Intelligence', value: 'Data Analytics', domain: 'Data Analytics' },
      { label: 'Cyber Security & Ethical Hacking', value: 'Cyber Security', domain: 'Cyber Security' },
      { label: 'Cloud Computing & AWS', value: 'Cloud Computing', domain: 'Cloud Computing' },
      { label: 'DevOps & CI/CD Pipelines', value: 'DevOps', domain: 'DevOps' },
      { label: 'UI/UX Design & Product Experience', value: 'UI/UX', domain: 'UI/UX' },
      { label: 'Blockchain & Web3 Engineering', value: 'Blockchain', domain: 'Blockchain' }
    ]
  },
  {
    id: 'gen_2',
    category: 'General',
    title: 'Programming Experience',
    question: 'How would you describe your overall coding background?',
    subtitle: 'Be honest — we customize pace according to your real experience.',
    options: [
      { label: 'Complete Beginner (Never written a line of code)', value: 'Beginner', scoreWeight: 1 },
      { label: 'Novice (Familiar with HTML/variables/basic loops)', value: 'Novice', scoreWeight: 2 },
      { label: 'Intermediate (Built small projects, know OOP/arrays)', value: 'Intermediate', scoreWeight: 3 },
      { label: 'Advanced Developer (Comfortable with frameworks & databases)', value: 'Advanced', scoreWeight: 4 }
    ]
  },
  {
    id: 'gen_3',
    category: 'General',
    title: 'Current Skill Level',
    question: 'What level of technical expertise do you feel you currently hold?',
    subtitle: 'Select the option that best reflects your current problem-solving confidence.',
    options: [
      { label: 'Level 1: Entry Level / Student Explorer', value: 'Level 1', scoreWeight: 1 },
      { label: 'Level 2: Junior Developer / Practitioner', value: 'Level 2', scoreWeight: 2 },
      { label: 'Level 3: Mid-Level Engineer looking to upskill', value: 'Level 3', scoreWeight: 3 },
      { label: 'Level 4: Senior / Specialist expanding stack', value: 'Level 4', scoreWeight: 4 }
    ]
  },
  {
    id: 'gen_4',
    category: 'General',
    title: 'Career Goals',
    question: 'What is your primary motivation for taking this assessment?',
    subtitle: 'We match courses to your end objective.',
    options: [
      { label: 'Land a full-time software developer role in tech', value: 'Land Job' },
      { label: 'Build my own web/mobile app or launch a startup', value: 'Startup' },
      { label: 'Switch career domains into high-growth field', value: 'Career Switch' },
      { label: 'Academic mastery & certified skill validation', value: 'Upskilling' }
    ]
  },
  {
    id: 'gen_5',
    category: 'General',
    title: 'Learning Preferences',
    question: 'How do you learn best?',
    subtitle: 'Your style dictates the structure of your learning path recommendations.',
    options: [
      { label: 'Hands-on practical coding projects & step-by-step roadmaps', value: 'Project Based' },
      { label: 'Guided video lectures with interactive quick quizzes', value: 'Video + Quiz' },
      { label: 'Comprehensive documentation & deep architectural reading', value: 'Text & Docs' },
      { label: 'Mentored problem solving & gamified code challenges', value: 'Interactive' }
    ]
  },
  {
    id: 'gen_6',
    category: 'General',
    title: 'Available Learning Time',
    question: 'How many hours per week can you dedicate to learning?',
    subtitle: 'Helps us estimate your course completion timeline.',
    options: [
      { label: '1–3 hours/week (Light casual learning)', value: '1-3 hrs' },
      { label: '4–8 hours/week (Steady part-time pace)', value: '4-8 hrs' },
      { label: '9–15 hours/week (Accelerated focused track)', value: '9-15 hrs' },
      { label: '15+ hours/week (Full-time immersive bootcamp pace)', value: '15+ hrs' }
    ]
  }
];

export const DOMAIN_QUESTIONS = {
  'Web Development': [
    {
      id: 'web_1',
      question: 'What does HTML stand for in web development?',
      options: ['HyperText Markup Language', 'High Tech Main Language', 'Hyperlinks Textual Model Language', 'Home Tool Management Logic'],
      correct: 'HyperText Markup Language',
      explanation: 'HTML stands for HyperText Markup Language, the standard markup language for creating web pages.'
    },
    {
      id: 'web_2',
      question: 'Which CSS layout model provides 2D grid-based positioning for modern web layouts?',
      options: ['CSS Grid', 'Float positioning', 'Table layout', 'Inline-block layout'],
      correct: 'CSS Grid',
      explanation: 'CSS Grid is a 2D layout system designed for complex web page structures.'
    },
    {
      id: 'web_3',
      question: 'In JavaScript ES6+, which keyword creates a block-scoped variable that cannot be re-assigned?',
      options: ['const', 'let', 'var', 'global'],
      correct: 'const',
      explanation: 'const creates a read-only, block-scoped reference to a value.'
    },
    {
      id: 'web_4',
      question: 'In React, what hook is used to handle side effects like data fetching or DOM updates?',
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correct: 'useEffect',
      explanation: 'useEffect allows component side-effects after DOM rendering.'
    },
    {
      id: 'web_5',
      question: 'In Node.js Express, which method handles HTTP GET requests for a specific endpoint?',
      options: ['app.get()', 'app.post()', 'app.listen()', 'app.use()'],
      correct: 'app.get()',
      explanation: 'app.get() routes HTTP GET requests to the specified callback function.'
    }
  ],

  'Java Development': [
    {
      id: 'java_1',
      question: 'Which principle of Object-Oriented Programming in Java enables a subclass to provide a specific implementation of a superclass method?',
      options: ['Method Overriding (Polymorphism)', 'Encapsulation', 'Abstraction', 'Interface Inheritance'],
      correct: 'Method Overriding (Polymorphism)',
      explanation: 'Method overriding allows a subclass to provide a concrete implementation of a parent class method.'
    },
    {
      id: 'java_2',
      question: 'What is the purpose of the Java Virtual Machine (JVM)?',
      options: ['Executes compiled Java bytecode cross-platform', 'Compiles source code into Java files', 'Formats Java syntax in IDEs', 'Manages HTML templates'],
      correct: 'Executes compiled Java bytecode cross-platform',
      explanation: 'JVM converts bytecode into machine-level code for portable execution.'
    },
    {
      id: 'java_3',
      question: 'Which interface in Java Collections does NOT allow duplicate elements?',
      options: ['Set', 'List', 'ArrayList', 'Vector'],
      correct: 'Set',
      explanation: 'The Set interface represents an unordered collection containing no duplicate elements.'
    },
    {
      id: 'java_4',
      question: 'In Java, how do you handle checked exceptions at runtime?',
      options: ['try-catch block', 'if-else statement', 'switch-case block', 'for-each loop'],
      correct: 'try-catch block',
      explanation: 'try-catch blocks capture exceptions and handle runtime errors safely.'
    },
    {
      id: 'java_5',
      question: 'Which framework is widely used in enterprise Java for building RESTful microservices dependency injection?',
      options: ['Spring Boot', 'Hibernate', 'JUnit', 'Maven'],
      correct: 'Spring Boot',
      explanation: 'Spring Boot simplifies production-ready Java application development.'
    }
  ],

  'Python': [
    {
      id: 'py_1',
      question: 'Which built-in Python data structure is ordered, mutable, and enclosed in square brackets []?',
      options: ['List', 'Tuple', 'Set', 'Dictionary'],
      correct: 'List',
      explanation: 'Python Lists are ordered, mutable sequences defined with square brackets.'
    },
    {
      id: 'py_2',
      question: 'What is the output of len({"a": 1, "b": 2, "a": 3}) in Python?',
      options: ['2', '3', '1', 'Error'],
      correct: '2',
      explanation: 'Dictionary keys must be unique; key "a" is overwritten, yielding 2 items.'
    },
    {
      id: 'py_3',
      question: 'Which keyword in Python is used to define a function or method?',
      options: ['def', 'function', 'fn', 'define'],
      correct: 'def',
      explanation: 'def defines a function object in Python.'
    },
    {
      id: 'py_4',
      question: 'How do you handle exceptions in Python?',
      options: ['try...except', 'try...catch', 'do...while', 'catch...finally'],
      correct: 'try...except',
      explanation: 'Python uses try...except blocks for exception handling.'
    },
    {
      id: 'py_5',
      question: 'What special method in a Python class acts as the constructor during object instantiation?',
      options: ['__init__', '__construct__', '__main__', '__new__'],
      correct: '__init__',
      explanation: '__init__ initializes class instances in Python OOP.'
    }
  ],

  'Data Science': [
    {
      id: 'ds_1',
      question: 'Which Python library is the industry standard for tabular data manipulation and DataFrame structures?',
      options: ['Pandas', 'NumPy', 'SciPy', 'Matplotlib'],
      correct: 'Pandas',
      explanation: 'Pandas provides DataFrames and Series for fast data analysis.'
    },
    {
      id: 'ds_2',
      question: 'What does EDA stand for in Data Science exploratory workflows?',
      options: ['Exploratory Data Analysis', 'Essential Data Aggregation', 'Extracted Data Algorithm', 'Empirical Data Architecture'],
      correct: 'Exploratory Data Analysis',
      explanation: 'EDA summarizes dataset main characteristics using visual graphs and summary metrics.'
    },
    {
      id: 'ds_3',
      question: 'Which statistical metric measures the strength and direction of a linear relationship between two continuous variables?',
      options: ['Correlation Coefficient (Pearson r)', 'Standard Deviation', 'Variance', 'Median Absolute Error'],
      correct: 'Correlation Coefficient (Pearson r)',
      explanation: 'Pearson r ranges between -1 and +1 indicating linear relationship.'
    },
    {
      id: 'ds_4',
      question: 'What is the main goal of Data Cleaning / Data Imputation?',
      options: ['Handle missing values, duplicate records, and outliers', 'Compress raw data into ZIP archives', 'Encrypt sensitive strings', 'Compile code to native binaries'],
      correct: 'Handle missing values, duplicate records, and outliers',
      explanation: 'Data cleaning ensures model input accuracy by rectifying missing or corrupt records.'
    },
    {
      id: 'ds_5',
      question: 'Which plot is best suited to inspect the distribution of a single numerical feature?',
      options: ['Histogram / Box Plot', 'Pie Chart', 'Scatter Plot', 'Network Graph'],
      correct: 'Histogram / Box Plot',
      explanation: 'Histograms and box plots display skewness, spread, and outliers.'
    }
  ],

  'AI/ML': [
    {
      id: 'aiml_1',
      question: 'What is the main distinction between Supervised and Unsupervised Learning?',
      options: [
        'Supervised learning uses labeled target data; Unsupervised operates on unlabeled data',
        'Supervised runs on GPU; Unsupervised runs on CPU',
        'Supervised is only for text; Unsupervised is only for images',
        'Supervised requires no training data at all'
      ],
      correct: 'Supervised learning uses labeled target data; Unsupervised operates on unlabeled data',
      explanation: 'Supervised learning trains on target labels (y), while Unsupervised finds hidden patterns.'
    },
    {
      id: 'aiml_2',
      question: 'What occurs when a Machine Learning model performs exceptionally on training data but poorly on unseen test data?',
      options: ['Overfitting', 'Underfitting', 'Convergence', 'Optimal generalization'],
      correct: 'Overfitting',
      explanation: 'Overfitting happens when a model learns training noise instead of general patterns.'
    },
    {
      id: 'aiml_3',
      question: 'Which artificial neural network architecture is tailored specifically for computer vision and image processing?',
      options: ['Convolutional Neural Network (CNN)', 'Recurrent Neural Network (RNN)', 'Decision Tree', 'K-Means Clustering'],
      correct: 'Convolutional Neural Network (CNN)',
      explanation: 'CNNs use spatial convolution filters to extract visual feature maps.'
    },
    {
      id: 'aiml_4',
      question: 'What metric evaluates a binary classification model when false positives carry a high penalty?',
      options: ['Precision', 'Recall', 'Accuracy', 'Mean Squared Error'],
      correct: 'Precision',
      explanation: 'Precision measures True Positives / (True Positives + False Positives).'
    },
    {
      id: 'aiml_5',
      question: 'Which open-source deep learning library was developed by Google Brain for building complex neural networks?',
      options: ['TensorFlow', 'Scikit-Learn', 'Flask', 'Django'],
      correct: 'TensorFlow',
      explanation: 'TensorFlow is Google open-source framework for machine learning computation.'
    }
  ],

  'Data Analytics': [
    {
      id: 'da_1',
      question: 'Which SQL clause is used to aggregate rows into summary groups based on shared column values?',
      options: ['GROUP BY', 'ORDER BY', 'HAVING', 'WHERE'],
      correct: 'GROUP BY',
      explanation: 'GROUP BY groups rows sharing property values to run aggregate functions (COUNT, SUM, AVG).'
    },
    {
      id: 'da_2',
      question: 'What type of SQL JOIN returns all matching records from both tables plus non-matching records from the left table?',
      options: ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
      correct: 'LEFT JOIN',
      explanation: 'LEFT JOIN keeps all rows from the left table and populates NULLs where right match fails.'
    },
    {
      id: 'da_3',
      question: 'Which tool/technique is widely used in Excel to dynamically summarize, slice, and cross-tabulate large datasets?',
      options: ['Pivot Table', 'VLOOKUP macro', 'Data Validation dropdown', 'Conditional Formatting rule'],
      correct: 'Pivot Table',
      explanation: 'Pivot tables summarize categorical data without modifying raw source rows.'
    },
    {
      id: 'da_4',
      question: 'What is a Key Performance Indicator (KPI)?',
      options: ['A quantifiable metric used to measure progress toward business goals', 'A database primary key index', 'A secret server authorization token', 'A chart color palette'],
      correct: 'A quantifiable metric used to measure progress toward business goals',
      explanation: 'KPIs track strategic success metrics such as revenue growth, churn rate, or CAC.'
    },
    {
      id: 'da_5',
      question: 'Which chart best displays proportion percentages of a whole dataset?',
      options: ['Pie / Donut Chart', 'Scatter Plot', 'Line Graph', 'Bubble Chart'],
      correct: 'Pie / Donut Chart',
      explanation: 'Pie and donut charts show categorical slice proportions of 100% total.'
    }
  ],

  'Cyber Security': [
    {
      id: 'cs_1',
      question: 'What is the primary difference between Symmetric and Asymmetric encryption?',
      options: [
        'Symmetric uses one shared key; Asymmetric uses a public-private key pair',
        'Symmetric is for passwords; Asymmetric is for files',
        'Symmetric is uncrackable; Asymmetric is legacy',
        'Symmetric requires no key'
      ],
      correct: 'Symmetric uses one shared key; Asymmetric uses a public-private key pair',
      explanation: 'Symmetric uses a single secret key for encrypt/decrypt; Asymmetric uses public key pair.'
    },
    {
      id: 'cs_2',
      question: 'Which security threat occurs when malicious SQL statements are inserted into user input fields to manipulate backend database queries?',
      options: ['SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Man-in-the-Middle', 'DDoS Attack'],
      correct: 'SQL Injection (SQLi)',
      explanation: 'SQLi targets unescaped SQL strings in database queries.'
    },
    {
      id: 'cs_3',
      question: 'What is the role of a Firewall in network security?',
      options: ['Monitors and controls incoming/outgoing network traffic based on security rules', 'Accelerates web page loading speeds', 'Encrypts user hard drives', 'Generates strong passwords'],
      correct: 'Monitors and controls incoming/outgoing network traffic based on security rules',
      explanation: 'Firewalls inspect packets to block unauthorized traffic based on defined rules.'
    },
    {
      id: 'cs_4',
      question: 'What does HTTPS add over standard HTTP protocol?',
      options: ['TLS/SSL encryption for data in transit', 'Faster connection speeds', 'Automatic database backups', 'Video streaming capabilities'],
      correct: 'TLS/SSL encryption for data in transit',
      explanation: 'HTTPS encrypts HTTP packets with TLS/SSL preventing wiretapping.'
    },
    {
      id: 'cs_5',
      question: 'What principle states that users and processes should only be granted the minimum access necessary to perform their duties?',
      options: ['Principle of Least Privilege', 'Zero Defect Policy', 'Open Source Security', 'Defense in Depth'],
      correct: 'Principle of Least Privilege',
      explanation: 'Least Privilege restricts access rights to lower potential attack surface area.'
    }
  ],

  'Cloud Computing': [
    {
      id: 'cc_1',
      question: 'What service model is AWS EC2 (Elastic Compute Cloud)?',
      options: ['Infrastructure as a Service (IaaS)', 'Platform as a Service (PaaS)', 'Software as a Service (SaaS)', 'Function as a Service (FaaS)'],
      correct: 'Infrastructure as a Service (IaaS)',
      explanation: 'EC2 provides raw virtual servers and storage infrastructure.'
    },
    {
      id: 'cc_2',
      question: 'What AWS service provides highly scalable object storage for files, images, and backups?',
      options: ['Amazon S3', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon CloudFront'],
      correct: 'Amazon S3',
      explanation: 'Simple Storage Service (S3) stores object data with 99.999999999% durability.'
    },
    {
      id: 'cc_3',
      question: 'What is the main benefit of Auto Scaling in cloud infrastructure?',
      options: ['Dynamically adjusts compute capacity based on incoming traffic demand', 'Reduces database query latency automatically', 'Generates automated code tests', 'Fixes software bugs automatically'],
      correct: 'Dynamically adjusts compute capacity based on incoming traffic demand',
      explanation: 'Auto scaling launches or terminates instances according to CPU/traffic metrics.'
    },
    {
      id: 'cc_4',
      question: 'What does Serverless Computing (e.g. AWS Lambda) mean?',
      options: ['Developers run code without provisioning or managing server infrastructure', 'No physical servers exist anywhere in the cloud provider', 'Applications run purely inside client web browsers', 'Databases operate without storage disks'],
      correct: 'Developers run code without provisioning or managing server infrastructure',
      explanation: 'Serverless handles event-driven code execution without background server management.'
    },
    {
      id: 'cc_5',
      question: 'Which AWS service manages user identities, permissions, and security roles?',
      options: ['AWS IAM (Identity and Access Management)', 'AWS VPC', 'AWS Route 53', 'AWS CloudWatch'],
      correct: 'AWS IAM (Identity and Access Management)',
      explanation: 'IAM controls who can access AWS resources and what actions they can perform.'
    }
  ],

  'DevOps': [
    {
      id: 'dev_1',
      question: 'What does CI/CD stand for in DevOps engineering?',
      options: ['Continuous Integration & Continuous Deployment', 'Code Inspection & Code Delivery', 'Cloud Infrastructure & Cloud Development', 'Centralized Installation & Command Diagnostics'],
      correct: 'Continuous Integration & Continuous Deployment',
      explanation: 'CI/CD automates code testing, building, and deployment pipelines.'
    },
    {
      id: 'dev_2',
      question: 'What is Docker used for in modern application architecture?',
      options: ['Containerizing applications into lightweight portable units', 'Writing database queries', 'Designing UI wireframes', 'Generating domain SSL certificates'],
      correct: 'Containerizing applications into lightweight portable units',
      explanation: 'Docker packages code and dependencies together into executable container images.'
    },
    {
      id: 'dev_3',
      question: 'Which tool is an open-source container orchestration platform for automating deployment and scaling of containerized apps?',
      options: ['Kubernetes (K8s)', 'Jenkins', 'Git', 'Ansible'],
      correct: 'Kubernetes (K8s)',
      explanation: 'Kubernetes automates container cluster management, scaling, and failover.'
    },
    {
      id: 'dev_4',
      question: 'What is Infrastructure as Code (IaC)?',
      options: ['Managing and provisioning infrastructure using declarative code files (e.g. Terraform)', 'Writing code inside server BIOS chipsets', 'Building hardware circuits using Python', 'Running databases inside HTML files'],
      correct: 'Managing and provisioning infrastructure using declarative code files (e.g. Terraform)',
      explanation: 'IaC allows provisioning infrastructure declaratively using version-controlled code.'
    },
    {
      id: 'dev_5',
      question: 'In Git version control, which command creates a new branch and switches to it in one step?',
      options: ['git checkout -b <branch_name>', 'git branch create <branch_name>', 'git merge <branch_name>', 'git commit -m <branch_name>'],
      correct: 'git checkout -b <branch_name>',
      explanation: 'git checkout -b creates a new branch and switches working directory to it.'
    }
  ],

  'UI/UX': [
    {
      id: 'ux_1',
      question: 'What is the primary difference between UI (User Interface) and UX (User Experience)?',
      options: [
        'UI focuses on visual elements & aesthetics; UX focuses on overall user feel & workflow efficiency',
        'UI is for mobile; UX is for desktop',
        'UI is frontend code; UX is backend database code',
        'UI and UX are identical terms with no difference'
      ],
      correct: 'UI focuses on visual elements & aesthetics; UX focuses on overall user feel & workflow efficiency',
      explanation: 'UI deals with visual typography/colors; UX deals with customer journey, ease of use, and usability.'
    },
    {
      id: 'ux_2',
      question: 'What is a Wireframe in digital product design?',
      options: ['A low-fidelity visual schematic representing layout structure', 'A final high-resolution animated prototype', 'A CSS stylesheet file', 'A 3D model file'],
      correct: 'A low-fidelity visual schematic representing layout structure',
      explanation: 'Wireframes outline page layout, content positioning, and functional intent before visual detail.'
    },
    {
      id: 'ux_3',
      question: 'What does Accessibility (a11y) in web design ensure?',
      options: ['Websites can be navigated by users with disabilities (contrast, screen readers, keyboard nav)', 'Websites load instantly on 2G connections', 'Websites have dark mode options', 'Websites rank first on Google search'],
      correct: 'Websites can be navigated by users with disabilities (contrast, screen readers, keyboard nav)',
      explanation: 'Accessibility ensures digital products work for everyone regardless of physical or visual ability.'
    },
    {
      id: 'ux_4',
      question: 'What is a User Persona in UX research?',
      options: ['A fictional representation of an ideal target user based on real research data', 'A user profile account inside a SQL table', 'An avatar image upload', 'A customer service rep profile'],
      correct: 'A fictional representation of an ideal target user based on real research data',
      explanation: 'User personas synthesize customer goals, pain points, and behaviors to guide design decisions.'
    },
    {
      id: 'ux_5',
      question: 'Which tool is the industry standard for collaborative UI design, prototyping, and design systems?',
      options: ['Figma', 'Photoshop CS6', 'MS Paint', 'Eclipse IDE'],
      correct: 'Figma',
      explanation: 'Figma is the leading browser-based interface design and prototyping software.'
    }
  ],

  'Blockchain': [
    {
      id: 'bc_1',
      question: 'What is a Smart Contract in Blockchain development?',
      options: ['Self-executing code stored on the blockchain that runs when predetermined conditions are met', 'A legal paper contract signed digitally via PDF', 'A domain name SSL certificate', 'An encrypted email message'],
      correct: 'Self-executing code stored on the blockchain that runs when predetermined conditions are met',
      explanation: 'Smart contracts execute tamper-proof logic decentralized across network nodes.'
    },
    {
      id: 'bc_2',
      question: 'Which consensus mechanism relies on miners solving complex mathematical cryptographic puzzles to validate transactions?',
      options: ['Proof of Work (PoW)', 'Proof of Stake (PoS)', 'Delegated Proof of Stake (DPoS)', 'Proof of Authority (PoA)'],
      correct: 'Proof of Work (PoW)',
      explanation: 'Proof of Work uses computational hashing power to secure block consensus.'
    },
    {
      id: 'bc_3',
      question: 'What is the primary programming language used to write Ethereum Smart Contracts?',
      options: ['Solidity', 'Python', 'Java', 'PHP'],
      correct: 'Solidity',
      explanation: 'Solidity is an object-oriented, high-level language targeting the Ethereum Virtual Machine (EVM).'
    },
    {
      id: 'bc_4',
      question: 'What makes a Blockchain ledger "immutable"?',
      options: ['Transactions cannot be deleted or altered once confirmed by consensus', 'Data is stored in RAM without hard drives', 'Blocks can be edited by network admins', 'Data expires automatically after 30 days'],
      correct: 'Transactions cannot be deleted or altered once confirmed by consensus',
      explanation: 'Cryptographic hashing links blocks sequentially, preventing historical tampering.'
    },
    {
      id: 'bc_5',
      question: 'What is Web3 in modern software development?',
      options: ['A decentralized web ecosystem powered by blockchain, smart contracts, and user data ownership', 'A new HTML5 tag standard', 'A 3D browser graphics engine', 'An ultra-fast Wi-Fi 6 router protocol'],
      correct: 'A decentralized web ecosystem powered by blockchain, smart contracts, and user data ownership',
      explanation: 'Web3 integrates decentralized protocols giving users sovereign control over digital identity and assets.'
    }
  ]
};
