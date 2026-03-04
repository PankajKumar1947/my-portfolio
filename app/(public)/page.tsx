import Link from "next/link";
import { ArrowRight, Mail, MapPin, Download, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard } from "@/components/common/project-card";
import { TechStackGrid } from "@/components/common/tech-stack-grid";
import {
  profileInfo,
  skillCategories,
  projects,
  experiences,
  educations,
} from "@/lib/mock-data";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-16">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Available for opportunities
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="gradient-text">{profileInfo.name}</span>
            </h1>

            <p className="mt-2 text-xl font-medium text-muted-foreground sm:text-2xl">
              {profileInfo.tagline}
            </p>

            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg leading-relaxed">
              {profileInfo.bio}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`mailto:${profileInfo.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </a>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {profileInfo.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Experience Section ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey in software development"
          />
          <div className="relative space-y-6 pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:bg-border">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
                </div>
                <Card className="border-border/50 bg-card">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold">{exp.role}</h3>
                        <p className="flex items-center gap-1.5 text-sm text-primary">
                          <Briefcase className="h-3.5 w-3.5" />
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills Section ─── */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Tech Stack"
            subtitle="Technologies I work with daily"
          />
          <TechStackGrid categories={skillCategories} />
        </div>
      </section>

      {/* ─── Education Section ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Education"
            subtitle="Academic background"
          />
          <div className="space-y-4">
            {educations.map((edu) => (
              <Card key={edu.id} className="border-border/50 bg-card">
                <CardContent className="p-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="flex items-center gap-1.5 text-sm text-primary">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Projects Section ─── */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <SectionHeading
              title="Featured Projects"
              subtitle="Highlights from my recent work"
              className="mb-0"
            />
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/projects">
                View all
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link href="/projects">
                View all projects
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <SectionHeading
              title="Get in Touch"
              subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
              align="center"
            />
            <Card className="gradient-border border-0 bg-card">
              <CardContent className="flex flex-col items-center gap-4 p-8">
                <p className="text-sm text-muted-foreground">
                  Drop me an email and I&apos;ll get back to you as soon as possible.
                </p>
                <Button size="lg" asChild>
                  <a href={`mailto:${profileInfo.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    {profileInfo.email}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
