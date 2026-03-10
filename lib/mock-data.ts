export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

// ---- Skills ----
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "C++" },
      { name: "C" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Express" },
      { name: "NestJS" },
      { name: "TanStack Query" },
    ],
  },
  {
    category: "Technologies & Databases",
    skills: [
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "MySQL" },
    ],
  },
  {
    category: "Developer Tools",
    skills: [
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "NPM" },
      { name: "Docker" },
      { name: "Turborepo" },
    ],
  },
];

// ---- Experience ----
export const experiences: Experience[] = [
  {
    id: "1",
    role: "Full Stack Developer",
    company: "Tech Company",
    duration: "Jan 2024 — Present",
    description:
      "Building scalable web applications with React, Next.js, and NestJS. Leading frontend architecture decisions and implementing CI/CD pipelines with Docker and Turborepo.",
    technologies: ["React", "Next.js", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    id: "2",
    role: "Frontend Developer",
    company: "Startup Inc.",
    duration: "Jun 2023 — Dec 2023",
    description:
      "Developed responsive user interfaces using React and Tailwind CSS. Implemented state management and API integrations with TanStack Query.",
    technologies: ["React", "Tailwind CSS", "TypeScript", "TanStack Query"],
  },
];

// ---- Education ----
export const educations: Education[] = [
  {
    id: "1",
    degree: "B.Tech in Computer Science",
    institution: "University of Technology",
    duration: "2020 — 2024",
    description:
      "Specialized in software engineering with focus on web technologies, data structures, and algorithms.",
  },
];

// ---- Profile Info ----
export const profileInfo = {
  name: "Pankaj",
  profileImage: "/profile-picture.png",
  tagline: "Full Stack Web Developer",
  bio: "Passionate full-stack developer with expertise in building scalable web applications. I love turning complex problems into simple, elegant solutions using modern technologies.",
  email: "hello@pankaj.dev",
  phone: "+91 12345 67890",
  address: "123, Tech Park, Bangalore, India",
  location: "India",
  socials: {
    github: "https://github.com/pankaj",
    linkedin: "https://linkedin.com/in/pankaj",
    twitter: "https://twitter.com/pankaj",
  },
};
