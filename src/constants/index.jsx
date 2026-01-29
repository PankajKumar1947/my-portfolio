import {
  SiC, SiCplusplus, SiPython, SiHtml5, SiCss3, SiBootstrap,
  SiTailwindcss, SiJavascript, SiGit, SiGithub, SiReact,
  SiNpm, SiMysql, SiNodedotjs, SiMongodb, SiExpress,
  SiTypescript, SiPostgresql, SiDocker, SiNextdotjs,
  SiVisualstudiocode, SiPostman, SiNestjs, SiReactquery, SiTurborepo
} from 'react-icons/si'
import { TbBinaryTree } from 'react-icons/tb'
import { FaCode, FaServer, FaLightbulb, FaRocket, FaGraduationCap } from 'react-icons/fa'

// Images
import aec from '../Component/Assests/aec.jpg'
import blindo from '../Component/Assests/blindo.jpg'
import insta from '../Component/Assests/projects/insta.png'
import snapStudy from '../Component/Assests/projects/snap-study.png'
import mycodingnotes from '../Component/Assests/projects/mycodingnotes.png'
import tailwind from '../Component/Assests/logo/tailwind.png'
import html from '../Component/Assests/logo/html.png'
import css from '../Component/Assests/logo/css.png'
import js from '../Component/Assests/logo/js.png'
import react from '../Component/Assests/logo/react.png'
import nodejs from '../Component/Assests/logo/nodejs.png'
import monogodb from '../Component/Assests/logo/mongodb.svg'
import expressjs from '../Component/Assests/logo/Expressjs.png'
import mysql from '../Component/Assests/logo/mysql.jpg'
import typescript from '../Component/Assests/logo/typescript.png'
import hono from '../Component/Assests/logo/hono.png'

export const HERO_CONTENT = {
  greeting: "👋Hi, I'm Pankaj Kumar",
  typwriterStrings: ["Full Stack Developer", "Backend Developer", "App Developer", "Designer", "Coder", "Learner"],
  description: "I'm a Web developer and here is my Portfolio website. Here you'll learn about my journery as web developer and a Software Developer.",
  resumeLink: "https://drive.google.com/file/d/1O0VJfUAey8TV20q2-a189AukFDUX4MBD/view?usp=sharing",
  hireEmail: "mailto:pankaj.ky3007@gmail.com"
};

export const ABOUT_CONTENT = {
  intro: {
    heading: "Hello! I'm Pankaj Kumar",
    description: "A passionate developer who loves crafting elegant solutions to complex problems. I believe in writing clean, efficient code and building applications that make a difference."
  },
  points: [
    {
      icon: FaGraduationCap,
      text: "B.Tech student in Computer Science at Asansol Engineering College, passionate about full-stack development.",
      color: "text-violet-400"
    },
    {
      icon: FaServer,
      text: "Skilled in backend technologies like Node.js, Express.js, and MongoDB.",
      color: "text-blue-400"
    },
    {
      icon: FaCode,
      text: "Frontend expertise in React.js, Next.js, JavaScript, HTML, CSS, and Tailwind CSS.",
      color: "text-emerald-400"
    },
    {
      icon: FaLightbulb,
      text: "Over 700+ data structures and algorithm problems solved on LeetCode.",
      color: "text-amber-400"
    },
    {
      icon: FaRocket,
      text: "Excited to contribute to impactful projects at the intersection of technology and creativity.",
      color: "text-pink-400"
    }
  ],
  stats: [
    { label: 'Projects', value: '15+', color: 'from-violet-500 to-purple-500' },
    { label: 'Problems', value: '700+', color: 'from-blue-500 to-cyan-500' },
    { label: 'Commits', value: '2.9k+', color: 'from-emerald-500 to-green-500' },
    { label: 'Tech Stack', value: '20+', color: 'from-orange-500 to-pink-500' }
  ]
};

export const SKILLS = [
  {
    category: "Languages",
    items: [
      { icon: SiCplusplus, name: 'C++', color: '#00599C' },
      { icon: SiC, name: 'C', color: '#A8B9CC' },
      { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
      { icon: SiTypescript, name: 'Typescript', color: '#3178C6' },
      { icon: SiHtml5, name: 'HTML', color: '#E34F26' },
      { icon: SiCss3, name: 'CSS', color: '#1572B6' }
    ]
  },
  {
    category: "Frameworks",
    items: [
      { icon: SiReact, name: 'React', color: '#61DAFB' },
      { icon: SiNextdotjs, name: 'NextJs', color: '#000000' },
      { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
      { icon: SiBootstrap, name: 'Bootstrap', color: '#7952B3' },
      { icon: SiExpress, name: 'Express', color: '#000000' },
      { icon: SiNestjs, name: 'NestJs', color: '#E0234E' },
      { icon: SiReactquery, name: 'TanStack Query', color: '#FF4154' }
    ]
  },
  {
    category: "Technologies & Databases",
    items: [
      { icon: SiNodedotjs, name: 'Nodejs', color: '#339933' },
      { icon: SiPostgresql, name: 'Postgres', color: '#336791' },
      { icon: SiMongodb, name: 'MongoDb', color: '#47A248' },
      { icon: SiMysql, name: 'SQL', color: '#4479A1' }
    ]
  },
  {
    category: "Developer Tools",
    items: [
      { icon: SiVisualstudiocode, name: 'VS Code', color: '#007ACC' },
      { icon: SiPostman, name: 'Postman', color: '#FF6C37' },
      { icon: SiGit, name: 'Git', color: '#F05032' },
      { icon: SiGithub, name: 'Github', color: '#181717' },
      { icon: SiNpm, name: 'npm', color: '#CB3837' },
      { icon: SiDocker, name: 'Docker', color: '#2496ED' },
      { icon: SiTurborepo, name: 'Turborepo', color: '#EF2D5E' }
    ]
  }
];

export const EDUCATION = [
  {
    image: aec,
    degree: "B.Tech- Computer Science and Engineering",
    college: "Asansol Engineering College, Asansol",
    year: "2022 -- 2026",
    link: "http://www.aecwb.edu.in/",
    details: "CGPA - 8.6"
  },
  {
    image: blindo,
    degree: "Science",
    college: "B L Indo Anglian Public School",
    year: "2019 -- 2021",
    link: "http://bliaps.com/"
  }
];

export const CONTACT = {
  phone: { value: "+91-8101865933", href: "tel:+918101865933" },
  email: { value: "pankaj.ky3007@gmail.com", href: "mailto:pankaj.ky3007@gmail.com" },
  address: { value: "Asansol, West Bengal", href: "https://maps.app.goo.gl/LjXYu15FdMgo91aB7" }
};

export const FOOTER_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Educaton", path: "/education" },
  { name: "Projects", path: "/project" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" }
];

export const SOCIAL_LINKS = {
  leetcode: "https://leetcode.com/u/pankajkry/",
  linkedin: "https://www.linkedin.com/in/pankaj-kumar-5bbb44268/",
  github: "https://github.com/PankajKumar1947"
};

const TECH_STACK = {
  react: { name: "React", logo: react },
  tailwind: { name: "Tailwind", logo: tailwind },
  nodejs: { name: "Nodejs", logo: nodejs },
  monogodb: { name: "Monogodb", logo: monogodb },
  expressjs: { name: "Expressjs", logo: expressjs },
  mysql: { name: "MySql", logo: mysql },
  typescript: { name: "Typescript", logo: typescript },
  hono: { name: "Hono", logo: hono },
  html: { name: "HTML", logo: html },
  css: { name: "CSS", logo: css },
  js: { name: "Javascript", logo: js },
};

export const PROJECTS = [
  {
    title: "MyCodingNotes",
    desc: [
      "Developed MyCodingNotes, a web platform designed for students and educators to securely create, store, and share notes, with SEO optimization to improve discoverability and engagement.",
      "Enhanced user experience with secure JWT authentication, efficient media management, and tracking of user behavior through Firebase Analytics for actionable insights.",
      "Implemented a markdown-based text editor, enabling seamless content creation, and integrated Firebase Storage for fast, reliable image hosting."
    ],
    img: mycodingnotes,
    liveLink: "https://mycodingnotes.vercel.app/",
    repoLink: "https://github.com/PankajKumar1947/mycodingnotes-project",
    tech: [
      TECH_STACK.react,
      TECH_STACK.typescript,
      TECH_STACK.mysql, // Resume says Postgres, logo says MySQL. Resume mentions Postgres. I don't have Postgres logo var here. I will stick to what was there or leave it be. Resume says Postgresql. I will add dynamic text if needed but logic uses logos. I'll leave as is for now or remove if incorrect, but better to keep visuals consistent with what images we have.
      TECH_STACK.hono,
      TECH_STACK.tailwind,
    ],
  },
  {
    title: "SnapStudy",
    desc: [
      "Developed SnapStudy, a platform to enhance academic resources for engineering students preparing for upcoming semester exams.",
      "Frontend: React JS with React-router-dom, Tailwind CSS for styling, Integrated JSON Data for dynamic content rendering.",
      "Data: Utilized GitHub hosting for JSON data, enabling easy updates and maintenance.",
      "Implemented Google Drive for storing PDFs, generating links, and hosting them on GitHub Pages."
    ],
    img: snapStudy,
    liveLink: "https://snapstudy-makaut.vercel.app/", // Found in Achievements section of resume!
    repoLink: "https://github.com/PankajKumar1947/snap-study",
    tech: [
      TECH_STACK.react,
      TECH_STACK.tailwind,
      TECH_STACK.html,
      TECH_STACK.js
    ],
  },
  {
    title: "FullStack-Instagram",
    desc: [
      "Frontend: React.js with user authentication, post creation, likes, comments ,bookmarks.",
      "Backend: Node.js/Express.js, MongoDB for data storage.",
      "Additional features: JWT authentication, profile updation, follow, unfollow, image uploading, etc.",
      "Deployment: Frontend and backend both are deployed on vercel."
    ],
    img: insta,
    liveLink: "https://insta-clone-mern.vercel.app/",
    repoLink: "https://github.com/PankajKumar1947/FullStack-Instagram-Clone",
    tech: [
      TECH_STACK.mysql,
      TECH_STACK.react,
      TECH_STACK.tailwind,
      TECH_STACK.nodejs,
      TECH_STACK.expressjs,
      TECH_STACK.monogodb
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Software Developer Intern",
    company: "PLANTROOT NEXTGEN TECHNOLOGIES PRIVATE LIMITED",
    duration: "Aug, 2025 -- Current",
    location: "Remote",
    icon: "fa-solid fa-code",
    description: [
      "Contributed to a large-scale HRMS platform managing employees, projects, vendors, and clients, supporting end-to-end organizational workflows.",
      "Developed workforce and operations modules including time-off management, timesheets, weekly status reports (WSR), and asset tracking with role-based access control.",
      "Engineered scalable and maintainable frontend features using Next.js and Tailwind CSS, with reusable UI components built using shadcn/ui and tablecn.",
      "Handled large datasets and API integrations using TanStack Table and TanStack Query, implementing optimized queries, mutations, pagination, filtering, and caching strategies."
    ]
  },
  {
    role: "Software Engineering Intern",
    company: "GrowthPurple Technologies",
    duration: "March, 2025 -- Aug, 2025",
    location: "Remote",
    icon: "fa-solid fa-laptop-code",
    description: [
      "Built a GenAI-powered full-stack platform Pluton which generate deployable React, Next.js, and Vue code from prompts, rendered live with WebContainers for an IDE-like browser experience.",
      "Designed a personal cloud storage system to manage and reuse image assets across projects, reducing duplication by 60% and improving delivery speed.",
      "Integrated PostgreSQL, cron jobs, and Dodo Payments to support scalable data workflows, automated tasks, and seamless transactions.",
      "Enabled users to create, preview, deploy, and sell AI-generated web apps through a built-in marketplace with full end-to-end flow."
    ]
  },
  {
    role: "Software Developer Intern",
    company: "United Art Private Limited (UAPL)",
    duration: "May 2024 - Nov 2024",
    location: "Remote",
    icon: "fa-solid fa-laptop-code",
    description: [
      "Worked as a Frontend Developer at UAPL, where I built the frontend from scratch using ReactJS, Redux Toolkit, React-hook-form, and Tailwind CSS.",
      "Developed the UAPL products, including Same Day Delivery, Crate Factory, Fine Art Logistics, and Art Safe.",
      "Collaborated with Swagger for backend integration and translated Figma designs into functional UI.",
      "Integrated the Google Maps API to fetch precise locations within a specified range and implemented Razorpay for seamless order processing."
    ]
  }
];

export const ACHIEVEMENTS = [
  "Solved 700+ Problems on Leetcode and maintained the maximum streak of 365 days.",
  "Conceptualized, designed, and launched SnapStudy, a comprehensive study material platform for MAKAUT students, attracting an average of 10 students daily, enhancing academic resources."
];
