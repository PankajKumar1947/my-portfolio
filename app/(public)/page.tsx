import Link from "next/link";
import { ArrowRight, Mail, MapPin, Download, Briefcase, GraduationCap, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/common/section-heading";
import { TechStackGrid } from "@/components/common/tech-stack-grid";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  profileInfo,
  skillCategories,
  projects,
  experiences,
  educations,
} from "@/lib/mock-data";

export default function HomePage() {

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-24 lg:pt-32">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Column: Text Content */}
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

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
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

            {/* Right Column: Profile Picture */}
            <div className="relative mx-auto lg:ml-auto lg:mr-0 max-w-112.5">
              <div className="relative aspect-square">
                {/* Decorative background elements for image */}
                <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-tr from-primary/20 via-transparent to-primary/10 blur-2xl" />
                <div className="absolute inset-0 rounded-3xl border border-primary/10 bg-muted/30" />

                {/* Main Image Container */}
                <div className="relative h-full w-full overflow-hidden rounded-3xl border-2 border-border/50 bg-card shadow-2xl">
                  <img
                    src={profileInfo.profileImage}
                    alt={profileInfo.name}
                    className="h-full w-full object-cover grayscale-[0.2] transition-all hover:grayscale-0 duration-500"
                  />

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-none" />
                </div>

                {/* Optional: Design accent */}
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md hidden lg:flex items-center justify-center p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold gradient-text">4+</p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider leading-tight">Years Exp.</p>
                  </div>
                </div>
              </div>
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


      {/* ─── Contact Section ─── */}
      <section id="contact" className="py-20 lg:py-32">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Get in Touch"
            subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            {/* Left Column: Contact Info */}
            <div className="space-y-8">
              <div className="max-w-md">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I&apos;m currently available for freelance work and full-time opportunities.
                  Feel free to reach out via the form or my contact details below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${profileInfo.email}`}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {profileInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${profileInfo.phone}`}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {profileInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="text-lg font-semibold">{profileInfo.address}</p>
                  </div>
                </div>
              </div>

              {/* Socials - Optional but nice */}
              <div className="pt-8 border-t border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-4">Follow Me</p>
                <div className="flex gap-4">
                  {Object.entries(profileInfo.socials).map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-muted/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all capitalize"
                    >
                      <span className="sr-only">{name}</span>
                      {name === "github" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>}
                      {name === "linkedin" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
                      {name === "twitter" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <Card className="border-border/50 bg-card overflow-hidden">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        className="bg-muted/30 border-border/50 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        className="bg-muted/30 border-border/50 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What is this about?"
                      className="bg-muted/30 border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message details..."
                      rows={6}
                      className="bg-muted/30 border-border/50 focus-visible:ring-primary resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
