// ============================================================
// Mock Data — Portfolio
// Replace with API calls + TanStack Query in the backend phase
// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: string;
  published: boolean;
  createdAt: string;
}

export interface NotePage {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  description: string;
  pages: NotePage[];
  published: boolean;
  createdAt: string;
}

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

// ---- Projects ----
export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, payment integration, and admin dashboard.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
    createdAt: "2024-11-15",
  },
  {
    id: "2",
    title: "Real-time Chat Application",
    description:
      "WebSocket-based messaging app with rooms, file sharing, and online status tracking.",
    image: "/projects/chat-app.jpg",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/username/chat-app",
    liveUrl: "https://chatapp-demo.vercel.app",
    featured: true,
    createdAt: "2024-09-20",
  },
  {
    id: "3",
    title: "Task Management Dashboard",
    description:
      "Kanban-style task manager with drag-and-drop, team collaboration, and analytics.",
    image: "/projects/task-manager.jpg",
    tags: ["React", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/username/task-manager",
    featured: true,
    createdAt: "2024-07-10",
  },
  {
    id: "4",
    title: "Portfolio CMS",
    description:
      "Content management system built for developers to manage their portfolios, blogs, and notes.",
    image: "/projects/portfolio-cms.jpg",
    tags: ["Next.js", "MongoDB", "TanStack Query"],
    githubUrl: "https://github.com/username/portfolio-cms",
    featured: false,
    createdAt: "2024-05-01",
  },
  {
    id: "5",
    title: "API Gateway Service",
    description:
      "Microservice API gateway with rate limiting, authentication, and request routing.",
    image: "/projects/api-gateway.jpg",
    tags: ["NestJS", "Docker", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/username/api-gateway",
    featured: false,
    createdAt: "2024-03-15",
  },
  {
    id: "6",
    title: "DevOps Pipeline Tool",
    description:
      "Automated deployment pipeline with CI/CD integration, monitoring, and rollback capabilities.",
    image: "/projects/devops-tool.jpg",
    tags: ["Node.js", "Docker", "Turborepo", "GitHub Actions"],
    githubUrl: "https://github.com/username/devops-pipeline",
    featured: false,
    createdAt: "2024-01-20",
  },
];

// ---- Blog Posts ----
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable APIs with NestJS and PostgreSQL",
    slug: "building-scalable-apis-nestjs",
    excerpt:
      "Learn how to architect and build production-ready REST APIs using NestJS framework with PostgreSQL database, covering best practices for validation, error handling, and testing.",
    content: `# Building Scalable APIs with NestJS and PostgreSQL

NestJS provides an excellent framework for building server-side applications. Combined with PostgreSQL, you get a robust foundation for any backend service.

## Setting Up the Project

First, install NestJS CLI globally and create a new project...

## Database Configuration

Configure TypeORM with PostgreSQL for seamless database operations...

## Creating Modules

Structure your application using NestJS modules for better organization...

## Best Practices

- Use DTOs for request validation
- Implement proper error handling with exception filters
- Write unit and e2e tests
- Use environment variables for configuration`,
    coverImage: "/blog/nestjs-api.jpg",
    readTime: "8 min read",
    published: true,
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    title: "Modern State Management with TanStack Query",
    slug: "modern-state-management-tanstack-query",
    excerpt:
      "Ditch complex state management libraries. Learn how TanStack Query simplifies server state management in React applications with caching, background refetching, and optimistic updates.",
    content: `# Modern State Management with TanStack Query

TanStack Query (formerly React Query) has revolutionized how we handle server state in React apps.

## Why TanStack Query?

Traditional state management treats server data like client state. TanStack Query understands that server state is fundamentally different...

## Core Concepts

### Queries
Fetch and cache data effortlessly...

### Mutations
Handle create, update, and delete operations...

### Invalidation
Keep your UI in sync with server state...`,
    coverImage: "/blog/tanstack-query.jpg",
    readTime: "6 min read",
    published: true,
    createdAt: "2024-10-15",
  },
  {
    id: "3",
    title: "Docker for Full Stack Developers",
    slug: "docker-for-fullstack-developers",
    excerpt:
      "A practical guide to containerizing your full-stack applications with Docker, from development environment setup to production deployment.",
    content: `# Docker for Full Stack Developers

Docker simplifies the development workflow by providing consistent environments across all stages.

## Getting Started

Understanding images, containers, and volumes...

## Docker Compose

Orchestrate your full-stack application services...

## Production Best Practices

Multi-stage builds, security considerations, and optimization tips...`,
    coverImage: "/blog/docker-guide.jpg",
    readTime: "10 min read",
    published: true,
    createdAt: "2024-08-22",
  },
  {
    id: "4",
    title: "Turborepo: Managing Monorepos at Scale",
    slug: "turborepo-monorepos-at-scale",
    excerpt:
      "Explore how Turborepo can supercharge your monorepo workflow with intelligent caching, parallel execution, and seamless package management.",
    content: `# Turborepo: Managing Monorepos at Scale

Monorepos have become the go-to approach for managing related projects. Turborepo makes it effortless.

## Setup and Configuration

Initialize a Turborepo workspace and configure pipelines...

## Caching Strategies

Leverage local and remote caching for faster builds...`,
    coverImage: "/blog/turborepo.jpg",
    readTime: "7 min read",
    published: true,
    createdAt: "2024-06-10",
  },
];

// ---- Notes ----
export const notes: Note[] = [
  {
    id: "1",
    title: "React Design Patterns",
    slug: "react-design-patterns",
    description:
      "Collection of advanced React patterns including compound components, render props, and custom hooks.",
    pages: [
      {
        id: "1-1",
        title: "Compound Components",
        content: `# Compound Components Pattern

The compound components pattern allows you to create expressive and declarative components. It provides an implicit way to share state between components.

## Example

\`\`\`tsx
<Select>
  <Select.Trigger>Choose an option</Select.Trigger>
  <Select.Options>
    <Select.Option value="a">Option A</Select.Option>
    <Select.Option value="b">Option B</Select.Option>
  </Select.Options>
</Select>
\`\`\`

## When to Use

- When building UI component libraries
- When components have implicit relationships
- When you need flexible composition`,
        order: 1,
      },
      {
        id: "1-2",
        title: "Custom Hooks",
        content: `# Custom Hooks Pattern

Custom hooks allow you to extract component logic into reusable functions.

## Guidelines

1. Always prefix with "use"
2. Keep hooks focused on a single concern
3. Return consistent interfaces
4. Handle cleanup in useEffect

## Example: useDebounce

\`\`\`tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}
\`\`\``,
        order: 2,
      },
      {
        id: "1-3",
        title: "Render Props",
        content: `# Render Props Pattern

A technique for sharing code between React components using a prop whose value is a function.

## Modern Alternative

With hooks, render props are less common but still useful for certain cases like libraries and complex rendering logic.

## Example

\`\`\`tsx
<DataFetcher url="/api/users" render={(data) => (
  <ul>
    {data.map(user => <li key={user.id}>{user.name}</li>)}
  </ul>
)} />
\`\`\``,
        order: 3,
      },
    ],
    published: true,
    createdAt: "2024-11-20",
  },
  {
    id: "2",
    title: "TypeScript Advanced Types",
    slug: "typescript-advanced-types",
    description:
      "Deep dive into TypeScript's advanced type system including generics, conditional types, and mapped types.",
    pages: [
      {
        id: "2-1",
        title: "Generics",
        content: `# Generics in TypeScript

Generics provide a way to create reusable components that work with a variety of types.

## Basic Syntax

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## Constraints

Use \`extends\` to constrain generic types:

\`\`\`typescript
interface HasLength { length: number; }
function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\``,
        order: 1,
      },
      {
        id: "2-2",
        title: "Conditional Types",
        content: `# Conditional Types

Conditional types select one of two possible types based on a condition.

## Syntax

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

## Utility Types

Many built-in utility types use conditional types:
- \`Exclude<T, U>\`
- \`Extract<T, U>\`
- \`NonNullable<T>\`
- \`ReturnType<T>\``,
        order: 2,
      },
    ],
    published: true,
    createdAt: "2024-10-05",
  },
  {
    id: "3",
    title: "MongoDB Aggregation Pipeline",
    slug: "mongodb-aggregation-pipeline",
    description:
      "Comprehensive notes on MongoDB aggregation framework, stages, operators, and optimization techniques.",
    pages: [
      {
        id: "3-1",
        title: "Pipeline Stages",
        content: `# MongoDB Aggregation Pipeline Stages

The aggregation pipeline is a framework for data aggregation modeled as a pipeline of stages.

## Common Stages

- **$match** — Filter documents
- **$group** — Group documents by expression
- **$sort** — Sort documents
- **$project** — Reshape documents
- **$lookup** — Left outer join
- **$unwind** — Deconstruct arrays`,
        order: 1,
      },
      {
        id: "3-2",
        title: "Optimization Tips",
        content: `# Pipeline Optimization

## Best Practices

1. Place \`$match\` early in the pipeline
2. Use indexes for \`$match\` and \`$sort\` stages
3. Limit fields with \`$project\` early
4. Use \`allowDiskUse\` for large datasets
5. Consider \`$facet\` for parallel pipelines`,
        order: 2,
      },
    ],
    published: true,
    createdAt: "2024-09-01",
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
