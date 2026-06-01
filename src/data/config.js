/**
 * SINGLE SOURCE OF TRUTH — All personal / site data lives here.
 * To update any info: change it HERE only. Never in components.
 */

export const PERSONAL = {
  name:         'Suraj Chauhan',
  nameShort:    'Suraj Chauhan',
  initials:     'SC',
  role:         'Data Analyst | AI Enthusiast | Power BI Developer',
  location:     'Haldwani, Uttarakhand',
  timezone:     'IST (UTC+5:30)',
  degree:       'BCA Graduate',
  status:       'Open to Work',
  email:        'surajchauhan22281@gmail.com',
  github:       'https://github.com/Surajchauhan27',
  linkedin:     'https://linkedin.com/in/codewithsuraj',
  githubUser:   'Surajchauhan27',
  linkedinUser: 'codewithsuraj',
  photo:        '/assets/assets/my-photo.jpg.png',
  photoFallback: 'https://ui-avatars.com/api/?name=SC&background=0a0f1e&color=22d3ee&size=200&bold=true',
};

// Roles for the typing animation
export const ROLES = [
  'Python Developer',
  'Research Analyst',
  'Dashboard Developer',
  'Data Visualization Specialist',
  'Full Stack Developer',
];

// Stats highlighted on the landing page
export const STATS = [
  { value: 10000, suffix: '+', label: 'Rows Analyzed', sub: 'Blinkit & Netflix Datasets' },
  { value: 12,    suffix: '+', label: 'Dashboards Built', sub: 'Interactive Power BI & Web' },
  { value: 5,     suffix: '+', label: 'Analytics Projects', sub: 'Python, SQL & Power BI' },
  { value: 3,     suffix: '+', label: 'AI & Web Portfolios', sub: 'Full Stack Integration' }
];

// Skills categorized for progress bars
export const SKILLS = [
  { name: 'Power BI',             level: 92, icon: 'BarChart3',  color: 'from-amber-500 to-orange-400',  glow: 'rgba(245,158,11,.4)' },
  { name: 'Python',               level: 88, icon: 'Terminal',   color: 'from-blue-500 to-indigo-500',   glow: 'rgba(99,102,241,.4)' },
  { name: 'SQL',                  level: 85, icon: 'Database',   color: 'from-cyan-500 to-blue-500',     glow: 'rgba(6,182,212,.4)' },
  { name: 'Excel & Spreadsheets', level: 90, icon: 'Table',      color: 'from-emerald-500 to-teal-400',  glow: 'rgba(16,185,129,.4)' },
  { name: 'Data Visualization',   level: 87, icon: 'PieChart',   color: 'from-violet-500 to-purple-500', glow: 'rgba(139,92,246,.4)' },
  { name: 'ETL Pipelines',        level: 80, icon: 'Layers',     color: 'from-pink-500 to-rose-500',     glow: 'rgba(244,63,94,.4)' },
  { name: 'React.js & Node.js',   level: 78, icon: 'Code',       color: 'from-sky-400 to-blue-600',      glow: 'rgba(56,189,248,.4)' },
  { name: 'AI Tool Integration',  level: 82, icon: 'Cpu',        color: 'from-purple-600 to-cyan-400',   glow: 'rgba(139,92,246,.4)' }
];

// Flat list of tech icons/badges
export const TOOLS = [
  { name: 'Python',      emoji: '🐍' },
  { name: 'SQL',         emoji: '🛢️' },
  { name: 'Power BI',    emoji: '📊' },
  { name: 'Excel',       emoji: '📋' },
  { name: 'Pandas',      emoji: '🐼' },
  { name: 'NumPy',       emoji: '🔢' },
  { name: 'Matplotlib',  emoji: '📈' },
  { name: 'React.js',    emoji: '⚛️' },
  { name: 'Node.js',     emoji: '🟢' },
  { name: 'GitHub',      emoji: '🐙' },
  { name: 'Power Query', emoji: '🔄' },
  { name: 'OpenAI API',  emoji: '🤖' }
];

// Project list
export const PROJECTS = [
  {
    num: '01',
    category: 'Power BI · Analytics',
    title: 'Blinkit Sales Analysis Dashboard',
    description: 'Analyzed 10,000+ rows of grocery sales data and built an interactive Power BI dashboard performing ETL, KPI metrics tracking, revenue analysis, and outlet size comparison.',
    tools: ['Power BI', 'SQL', 'Excel', 'Python'],
    github: 'https://github.com/Surajchauhan27/blinkit-sales-analysis',
    live: 'https://surajchauhan27.github.io/blinkit-sales-analysis',
    featured: true,
    accent: '#00d4ff',
    emoji: '🛒',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    num: '02',
    category: 'Python · Pandas · EDA',
    title: 'Netflix Data Analysis & Insights',
    description: 'Cleaned and analyzed 5,500+ Netflix records to create 12+ visual charts mapping genre popularity, age ratings, releases, and user recommendation patterns.',
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    github: 'https://github.com/Surajchauhan27/netflix-analytics',
    live: 'https://surajchauhan27.github.io/netflix-analytics/',
    featured: true,
    accent: '#7c3aed',
    emoji: '🎬',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1000&auto=format&fit=crop',
  },
  {
    num: '03',
    category: 'React · Node · AI',
    title: 'AuraBot AI Chatbot & Telemetry',
    description: 'A futuristic full-stack AI chatbot interface with telemetry analytics tracking, AI response synthesis, mock conversational AI mode, and interactive responsive UI.',
    tools: ['React.js', 'Node.js', 'AI APIs', 'JavaScript', 'CSS'],
    github: 'https://github.com/Surajchauhan27/AI-chatbot',
    live: 'https://ai-chatbot2k.netlify.app',
    featured: true,
    accent: '#38bdf8',
    emoji: '🤖',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  }
];

// Retail Internship Experience
export const EXPERIENCE = [
  {
    role: 'Retail Operations Intern',
    company: 'Operational & Sales Analytics',
    duration: '2024 – 2025',
    responsibilities: [
      'Inventory Tracking: Monitored stock levels and streamlined supply chain metrics using automated spreadsheets.',
      'Operational Reporting: Prepared weekly efficiency reports highlighting workflow bottlenecks.',
      'Sales Analysis: Consolidated sales transactions to map consumer purchasing trends and seasonal demand.',
      'Excel Reporting: Used pivot tables, lookup formulas, and VBA scripts to generate clean, dynamic summaries.',
      'Workflow Optimization: Assisted in redesigning operational workflows, increasing business processing speed by 15%.'
    ],
    accent: '#00d4ff',
    iconName: 'TrendingUp'
  }
];

// Achievements with animated counters
export const ACHIEVEMENTS = [
  { value: 10000, suffix: '+', title: 'Rows Analyzed', desc: 'Sourced, cleaned, and processed from raw operational and viewer files.' },
  { value: 12,    suffix: '+', title: 'Analytics Dashboards Built', desc: 'Crafted with Power BI, Tableau, and full-stack web wrappers.' },
  { value: 4,     suffix: '+', title: 'AI Portfolio Projects Developed', desc: 'Full-stack conversational models and interactive telemetry trackers.' },
  { value: 8,     suffix: '+', title: 'Interactive Visualization Sites Created', desc: 'Dynamic web portals transforming static insights into live graphics.' }
];

// Certifications
export const CERTIFICATIONS = [
  {
    title: 'Google Data Analytics',
    org: 'Google | Coursera',
    duration: 'In Progress',
    iconName: 'GraduationCap',
    accent: '#00d4ff',
    desc: 'Comprehensive training in data cleaning, SQL, R programming, and data visualization tools for professional analysis.',
    tags: ['Data Cleaning', 'SQL', 'R Programming', 'Data Viz'],
  },
  {
    title: 'Power BI Data Analyst',
    org: 'Microsoft Learning Pathway',
    duration: 'Learning',
    iconName: 'BarChart3',
    accent: '#7c3aed',
    desc: 'Specializing in DAX calculations, advanced data modeling, row-level security, and publishing interactive corporate dashboards.',
    tags: ['DAX', 'Data Modeling', 'Power Query', 'Power BI'],
  },
  {
    title: 'SQL for Data Analysis',
    org: 'Professional Specialization',
    duration: 'Certified',
    iconName: 'Database',
    accent: '#38bdf8',
    desc: 'Advanced query building, CTEs, window functions, and database structure design to manipulate large-scale datasets.',
    tags: ['CTEs', 'Window Functions', 'Subqueries', 'MySQL'],
  },
  {
    title: 'Advanced Excel',
    org: 'Professional Certificate',
    duration: 'Certified',
    iconName: 'Table',
    accent: '#8b5cf6',
    desc: 'Mastering lookup formulas (VLOOKUP, INDEX-MATCH), pivot tables, dynamic arrays, VBA macros, and financial modeling.',
    tags: ['Pivot Tables', 'VLOOKUP', 'VBA Macros', 'Data Solver'],
  }
];

// Services
export const SERVICES = [
  {
    title: 'Data Analytics & BI Dashboards',
    desc: 'Building modern, interactive, and automated dashboards in Power BI and Excel that empower leaders to make decisions driven by hard facts.',
    iconName: 'BarChart3',
    accent: '#00d4ff',
    bgGlow: 'rgba(0,212,255,.05)'
  },
  {
    title: 'Predictive Modeling & AI Solutions',
    desc: 'Integrating OpenAI API and custom Python algorithms into web platforms to create intelligent assistants, classifiers, and agents.',
    iconName: 'Cpu',
    accent: '#7c3aed',
    bgGlow: 'rgba(124,58,237,.05)'
  },
  {
    title: 'Full-Stack Web Applications',
    desc: 'Developing responsive, high-performance web systems using React.js and Node.js with a strong focus on smooth kinematics and micro-interactions.',
    iconName: 'Code',
    accent: '#38bdf8',
    bgGlow: 'rgba(56,189,248,.05)'
  },
  {
    title: 'Custom ETL Pipelines & Automation',
    desc: 'Writing clean Python scripting and VBA macros to transform messy, unformatted sheets into fully optimized datasets in seconds.',
    iconName: 'Layers',
    accent: '#8b5cf6',
    bgGlow: 'rgba(139,92,246,.05)'
  }
];

export const SOCIALS = [
  { label: 'Email',    emoji: '✉️', color: '#00d4ff', href: `mailto:${PERSONAL.email}`,     value: PERSONAL.email },
  { label: 'LinkedIn', emoji: '💼', color: '#7c3aed', href: PERSONAL.linkedin,               value: `linkedin.com/in/${PERSONAL.linkedinUser}` },
  { label: 'GitHub',   emoji: '🐙', color: '#8b5cf6', href: PERSONAL.github,                 value: `github.com/${PERSONAL.githubUser}` },
];

export const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Credentials',  href: '#credentials' },
  { label: 'Services',     href: '#services' },
  { label: 'Contact',      href: '#contact' },
];
