const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const axios = require('axios'); // For Hugging Face API integration
const OpenAI = require('openai');
require('dotenv').config(); // For environment variables

// Import routes and models
const User = require('./models/User');
const contactRoutes = require('./routes/contact');
const profileRoutes = require('./routes/profile_route');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
      'https://your-production-frontend.com'
    ];

    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy error: Origin not allowed'), false);
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));

// Session Configuration
app.use(
  session({
    secret: 'your_generated_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

// Basic health route
app.get('/', (req, res) => {
  res.send('SkillForge backend is running');
});

// MongoDB Connection
const connectWithRetry = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/EDI')
    .then(() => console.log('MongoDB connected to EDI database'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    });
};
connectWithRetry();

// User Registration Route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// User Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({ msg: 'Login successful', user: req.session.user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Hugging Face Course Categorization Route
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli';
const HUGGING_FACE_API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

app.post('/categorize', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const headers = {
      Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json', 
    };

    const response = await axios.post(
      HUGGING_FACE_API_URL,
      {
        inputs: content,
        parameters: { candidate_labels: ['Basic', 'Intermediate', 'Advanced'] },
      },
      { headers }
    );

    const { labels, scores } = response.data;

    if (labels && labels.length > 0) {
      const category = labels[0];
      const keywords = []; // Placeholder for keyword extraction logic
      return res.json({ keywords, category });
    } else {
      return res.status(500).json({ error: 'No labels found in the response' });
    }
  } catch (error) {
    console.error('Error processing the content:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }

    res.status(500).json({ error: 'An error occurred while processing the content' });
  }
});

// Comprehensive course database with skills mapping
const courseDatabase = [
  { name: 'Python for Data Science', skills: ['python', 'data science', 'data analysis'], level: 'Intermediate', duration: '8 weeks' },
  { name: 'Data Science with Python', skills: ['python', 'data', 'analytics', 'pandas', 'numpy'], level: 'Intermediate', duration: '10 weeks' },
  { name: 'Machine Learning Basics', skills: ['machine learning', 'ml', 'algorithms', 'python'], level: 'Intermediate', duration: '12 weeks' },
  { name: 'Deep Learning Specialization', skills: ['deep learning', 'neural networks', 'ai', 'tensorflow'], level: 'Advanced', duration: '16 weeks' },
  { name: 'React for Beginners', skills: ['react', 'frontend', 'javascript', 'web'], level: 'Beginner', duration: '6 weeks' },
  { name: 'Advanced React', skills: ['react', 'hooks', 'state management', 'frontend'], level: 'Advanced', duration: '8 weeks' },
  { name: 'Web Development Bootcamp', skills: ['html', 'css', 'javascript', 'web', 'frontend', 'ui'], level: 'Beginner', duration: '12 weeks' },
  { name: 'Full Stack Development', skills: ['nodejs', 'express', 'backend', 'frontend', 'database', 'api'], level: 'Advanced', duration: '16 weeks' },
  { name: 'Node.js Crash Course', skills: ['nodejs', 'express', 'backend', 'server', 'api'], level: 'Beginner', duration: '6 weeks' },
  { name: 'Advanced JavaScript', skills: ['javascript', 'async', 'promises', 'callbacks', 'es6'], level: 'Advanced', duration: '8 weeks' },
  { name: 'CSS Mastery', skills: ['css', 'frontend', 'ui', 'responsive design'], level: 'Intermediate', duration: '6 weeks' },
  { name: 'Database Design & SQL', skills: ['sql', 'database', 'mongodb', 'mysql', 'backend'], level: 'Intermediate', duration: '8 weeks' },
  { name: 'Cloud Computing with AWS', skills: ['aws', 'cloud', 'devops', 'deployment'], level: 'Advanced', duration: '10 weeks' },
  { name: 'AI & NLP Fundamentals', skills: ['ai', 'nlp', 'chatbots', 'llm', 'transformers'], level: 'Advanced', duration: '12 weeks' },
  { name: 'Mobile Development with React Native', skills: ['react native', 'mobile', 'app development'], level: 'Intermediate', duration: '10 weeks' },
];

// Function to extract skills from questions
const extractSkillsFromQuestion = (question) => {
  const q = question.toLowerCase();
  const skillKeywords = [
    'python', 'javascript', 'react', 'nodejs', 'node', 'express', 'backend', 'frontend',
    'data science', 'machine learning', 'ml', 'deep learning', 'ai', 'artificial intelligence',
    'web development', 'html', 'css', 'ui', 'ux', 'sql', 'database', 'mongodb',
    'api', 'rest', 'graphql', 'devops', 'aws', 'cloud', 'nlp', 'chatbot',
    'app development', 'mobile', 'android', 'ios', 'flutter', 'data analysis',
    'pandas', 'numpy', 'tensorflow', 'pytorch', 'async', 'promises'
  ];
  
  return skillKeywords.filter(skill => q.includes(skill));
};

// Function to get relevant courses
const getRelevantCourses = (question, count = 3) => {
  const extractedSkills = extractSkillsFromQuestion(question);
  
  if (extractedSkills.length === 0) {
    return courseDatabase.slice(0, count).map(c => c.name);
  }

  const scoredCourses = courseDatabase.map(course => {
    const matchingSkills = course.skills.filter(skill => extractedSkills.includes(skill));
    const score = matchingSkills.length;
    return { ...course, score };
  }).filter(c => c.score > 0).sort((a, b) => b.score - a.score);

  return scoredCourses.slice(0, count).map(c => c.name);
};

const generateFallbackAIAnswer = (question) => {
  const normalized = question.toLowerCase();
  const relevantCourses = getRelevantCourses(question, 3);

  if (normalized.match(/^(hi|hey|hello|hii|hiiii|heyy|yo|sup|greetings?|good morning|good afternoon|good evening)/)) {
    const greeting = `Hey! 👋 Welcome to SkillForge! I'm so excited to help you on your learning journey. What kind of skills are you interested in picking up? Whether it's coding, data science, AI, or anything else - I'm here to guide you to the perfect courses!`;
    return greeting;
  }

  if (normalized.includes('course') || normalized.includes('recommend') || normalized.includes('suggest')) {
    const courses = relevantCourses.length > 0 ? relevantCourses.join(', ') : 'tons of amazing courses in your interest area';
    return `That's awesome that you want to learn! Based on what you're looking for, I'd totally recommend checking out: ${courses}. Each one is designed to take you from beginner to confident, and you'll build real projects along the way. You've got this! 🚀`;
  }

  if (normalized.includes('skill assessment') || normalized.includes('assessment') || normalized.includes('quiz') || normalized.includes('test')) {
    return `Great idea! Our Skill Assessment is like a learning compass - it helps us understand where you are now and points you toward the courses that'll help you grow. It's quick, fun, and honestly really insightful. Give it a shot! 💪`;
  }

  if (normalized.includes('profile') || normalized.includes('my profile') || normalized.includes('user') || normalized.includes('goal')) {
    return `Your profile is your learning hub! It's where you tell us about your dreams, goals, and what excites you about learning. The more you personalize it, the better recommendations we can give you. Let's make this personal to YOU! 🎯`;
  }

  if (normalized.includes('login') || normalized.includes('signup') || normalized.includes('register') || normalized.includes('account')) {
    return `Welcome! Sign up in like 30 seconds, and you're ready to start your learning adventure. Once you're in, you can create your profile, take assessments, and start enrolling in courses that actually match your interests. Let's get you started! 🎉`;
  }

  if (normalized.includes('contact') || normalized.includes('support') || normalized.includes('help')) {
    return `I'm sorry you need help! But don't worry - our amazing support team is ready to help. Just hop over to the Contact Us page and send us a message. We genuinely care and will get back to you quickly! 💙`;
  }

  if (relevantCourses.length > 0) {
    return `Ooh, I love that you're curious about this! Here's what I'd recommend: ${relevantCourses.join(', ')}. Any of these would be perfect for leveling up your skills. Which one sounds most exciting to you? 🌟`;
  }

  return `Hey! I'm pumped to help you learn something new. Tell me - what gets you excited? Are you into web development, data science, AI, mobile apps, or something else? Once I know what fires you up, I can point you toward courses that'll be absolutely perfect for you!`;
};

const generateFallbackCourseAnswer = (question) => {
  const q = question.toLowerCase();
  const relevantCourses = getRelevantCourses(question, 4);
  
  let answer = '';

  // Handle greetings first
  if (q.match(/^(hi|hey|hello|hii|hiiii|heyy|yo|sup|greetings?|good morning|good afternoon|good evening)/)) {
    return `Hey! 👋 Welcome to SkillForge! I'm so excited to help you on your learning journey. What kind of skills are you interested in picking up? Whether it's coding, data science, AI, or anything else - I'm here to guide you to the perfect courses!`;
  }

  if (q.match(/\b(python|data science|data analysis|pandas|numpy)\b/)) {
    answer = `Python for data science? That's a fantastic path! You'll learn to work with real data, discover patterns, and make sense of complex information. It's honestly so cool. `;
  } else if (q.match(/\b(machine learning|ml|deep learning|neural network|ai|artificial intelligence)\b/)) {
    answer = `Machine Learning and AI - now that's cutting edge! You're talking about building systems that actually learn and adapt. It's the future, and you're smart for wanting to learn it. `;
  } else if (q.match(/\b(react|frontend|ui|user interface|web design)\b/)) {
    answer = `React is SO much fun! You get to build beautiful, interactive experiences that people actually use. It's super satisfying to see your code come to life on screen. `;
  } else if (q.match(/\b(node|express|backend|server|api|database|sql)\b/)) {
    answer = `Backend development is where the magic happens behind the scenes! You'll build the systems that power apps and websites. It's powerful stuff, and honestly really rewarding. `;
  } else if (q.match(/\b(web development|html|css|javascript|full.?stack)\b/)) {
    answer = `Web development is awesome - you get to create things that work across the whole stack! From design to data, you'll be able to build complete applications. That's powerful. `;
  } else if (q.match(/\b(mobile|app|ios|android|react native|flutter)\b/)) {
    answer = `Mobile app development? You'll be creating apps that millions of people use on their phones. How cool is that? You can reach so many people with your work. `;
  } else if (q.match(/\b(devops|cloud|aws|docker|kubernetes)\b/)) {
    answer = `Cloud and DevOps are in huge demand right now! You'll learn to deploy, scale, and manage systems like a pro. Companies are literally hunting for these skills. `;
  } else if (q.match(/\b(skill|assessment|evaluate|progress|level)\b/)) {
    answer = `Our Skill Assessment will give you a clear picture of where you're at and what you should focus on next. It's like a personalized roadmap just for you! `;
  } else if (q.match(/\b(profile|interest|goal|career|path)\b/)) {
    answer = `Setting up your profile is so important! It helps us understand your dreams and match you with courses that genuinely excite you. Let's make this journey personal to YOU. `;
  } else {
    answer = `That's a great question! `;
  }

  if (relevantCourses.length > 0) {
    answer += `Here's what I think would be perfect for you: ${relevantCourses.slice(0, 3).join(', ')}. Each one is carefully designed to take you step by step, and you'll build real projects that you'll be proud of. You're gonna crush it! 💪`;
  } else {
    answer += `Check out courses like ${courseDatabase.slice(0, 3).map(c => c.name).join(', ')}. There's something for every interest and skill level. Browse through the Courses page and see what calls to you!`;
  }

  return answer;
};

app.post('/api/chat', async (req, res) => {
  const { question, userInterests = [] } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.json({
      answer: generateFallbackCourseAnswer(question),
      courses: getRelevantCourses(question, 4),
      fallback: true,
      error: 'OpenAI API key is not configured on the backend.',
    });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const systemPrompt = `You are SkillForge Assistant, a warm, friendly, and helpful learning companion. Think of yourself as a knowledgeable mentor who genuinely cares about helping students succeed. Your personality traits:
- Conversational and natural, like chatting with a friend
- Encouraging and enthusiastic about learning
- Patient and understanding
- Practical and action-oriented
- Personable with genuine warmth

How to respond:
1. For ANY question - even simple greetings like "hi", "hello", "hey" - respond warmly and ask about their learning interests
2. Always be conversational: Use contractions (you're, I'm, we're), casual language, and natural flow
3. Share relevant course recommendations naturally - don't just list them, explain why they'd be great for the student
4. Ask follow-up questions to understand what they really need
5. Be encouraging and positive about their learning journey
6. Keep responses concise but warm (2-3 sentences usually, max 4-5)
7. Use phrases like "That's awesome!", "I love your interest in...", "Here's what I'd suggest...", "You'd be great at..."

Example response style for a greeting:
"Hey there! 👋 Welcome to SkillForge! I'm so glad you're here. What kind of skills are you interested in learning? Whether it's web development, data science, AI, or something else - I'm here to help you find the perfect courses!"

Example response style for a technical question:
"That's a great question! React is amazing for building interactive user interfaces. I'd definitely recommend our React for Beginners course - it's perfect for getting started, and then you can move to Advanced React. You'll build real projects and have so much fun with it!"

Available courses to recommend:
- Python for Data Science, Data Science with Python, Machine Learning Basics, Deep Learning Specialization
- React for Beginners, Advanced React, Web Development Bootcamp, Full Stack Development
- Node.js Crash Course, Advanced JavaScript, CSS Mastery, Database Design & SQL
- Cloud Computing with AWS, AI & NLP Fundamentals, Mobile Development with React Native`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const answer = response?.choices?.[0]?.message?.content?.trim() || '';
    const courses = getRelevantCourses(question, 4);
    
    res.json({ 
      answer: answer || 'I could not generate an answer at this time.', 
      courses: courses,
      source: 'openai'
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.json({
      answer: generateFallbackCourseAnswer(question),
      courses: getRelevantCourses(question, 4),
      fallback: true,
      error: error.message || 'Failed to generate a chat response',
    });
  }
});

app.use('/api/contactus', contactRoutes);
app.use('/api/profile', profileRoutes);

// New endpoint to get personalized course recommendations
app.post('/api/recommendations', async (req, res) => {
  try {
    const { interests = [], skillLevel = 'Beginner', count = 5 } = req.body;
    
    let recommendedCourses = courseDatabase;
    
    // Filter by skill level if specified
    if (skillLevel && skillLevel !== 'All') {
      recommendedCourses = recommendedCourses.filter(course => 
        course.level === skillLevel || 
        (skillLevel === 'Beginner' && course.level === 'Beginner') ||
        (skillLevel === 'Intermediate' && (course.level === 'Beginner' || course.level === 'Intermediate')) ||
        (skillLevel === 'Advanced' && course.level === 'Advanced')
      );
    }
    
    // Score courses based on interests
    if (interests.length > 0) {
      const interestLower = interests.map(i => i.toLowerCase());
      recommendedCourses = recommendedCourses.map(course => {
        const matchScore = course.skills.filter(skill => 
          interestLower.some(interest => skill.includes(interest) || interest.includes(skill))
        ).length;
        return { ...course, matchScore };
      }).sort((a, b) => b.matchScore - a.matchScore);
    } else {
      recommendedCourses = recommendedCourses.slice(0, count);
    }
    
    res.json({ 
      courses: recommendedCourses.slice(0, count),
      total: recommendedCourses.length 
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: 'Failed to get recommendations', message: error.message });
  }
});

// Endpoint to get all available courses
app.get('/api/courses', (req, res) => {
  try {
    res.json({ courses: courseDatabase });
  } catch (error) {
    console.error('Courses error:', error);
    res.status(500).json({ error: 'Failed to get courses' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
