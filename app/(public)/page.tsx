import Link from "next/link";
import { ArrowRight, Mail, MapPin, Briefcase, GraduationCap, Phone, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/section-heading";
import { TechStackGrid } from "@/components/common/tech-stack-grid";
import { profile } from "@/config/profile";
import { skillCategories, experiences, educations } from "@/config/resume";
import { ContactForm } from "./_components/contact-form";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

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
            <div className="max-w-2xl order-2 lg:order-1">
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
                <span className="gradient-text">{profile.name}</span>
              </h1>

              <p className="mt-2 text-xl font-medium text-muted-foreground sm:text-2xl">
                {profile.tagline}
              </p>

              <p className="mt-4 max-w-lg text-muted-foreground ">
                {profile.bio}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" asChild>
                  <a 
                    href="https://drive.google.com/file/d/1O0VJfUAey8TV20q2-a189AukFDUX4MBD/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Get in Touch
                  </a>
                </Button>
                
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/50 bg-muted/30 text-sm text-muted-foreground transition-colors hover:bg-muted/50">
                  <MapPin className="h-4 w-4 text-primary" />
                  {profile.location}
                </div>
              </div>
            </div>

            {/* Right Column: Profile Picture */}
            <div className="relative mx-auto lg:ml-auto lg:mr-0 max-w-72 sm:max-w-96 lg:max-w-112.5 order-1 lg:order-2">
              <div className="relative aspect-square">
                {/* Decorative background elements for image */}
                <div className="absolute -inset-4 rounded-full bg-linear-to-tr from-primary/20 via-transparent to-primary/10 blur-2xl" />
                <div className="absolute inset-0 rounded-full border border-primary/10 bg-muted/30" />

                {/* Main Image Container */}
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-border/50 bg-card shadow-2xl">
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="h-full w-full object-cover grayscale-[0.2] transition-all hover:grayscale-0 duration-500"
                  />

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-none" />
                </div>

                {/* Optional: Design accent */}
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md hidden lg:flex items-center justify-center p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold gradient-text">
                      {profile.yearsOfExperience}
                    </p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider leading-tight">Years Exp.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Experience Section ─── */}
      <section className="pt-20">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey in software development"
          />
          <div className="relative space-y-6 sm:pl-6 sm:before:absolute sm:before:top-0 sm:before:bottom-0 sm:before:left-0 sm:before:w-px sm:before:bg-border">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-2 sm:-left-8 top-1.5 hidden h-5 w-5 items-center justify-center sm:flex">
                  <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
                </div>
                <Card className="border-border/50 bg-card overflow-hidden">
                  <CardContent >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <p className="flex items-start gap-2 text-sm text-primary font-medium mt-1">
                          <Briefcase className="h-4 w-4 mt-0.5 shrink-0" />
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {exp.duration}
                      </span>
                    </div>
                    {Array.isArray(exp.description) ? (
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
                        {exp.description.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary/90 border border-primary/5"
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
      <section className="pt-20">
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
                <CardContent>
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
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Get in Touch"
            subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
            className="mb-8"
          />

          <Card className="border-border/50 bg-card overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 lg:items-stretch">
                {/* Left Side: Contact Info */}
                <div className="p-6 lg:p-10  lg:border-b-0 lg:border-r border-border/50 space-y-8 order-2 lg:order-1">

                  <div className="">
                    <p className="text-muted-foreground text-sm leading-relaxed">
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
                          href={`mailto:${profile.email}`}
                          className="font-semibold text-sm hover:text-primary transition-colors"
                        >
                          {profile.email}
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
                          href={`tel:${profile.phone}`}
                          className="font-semibold text-sm hover:text-primary transition-colors"
                        >
                          {profile.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Github className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Address</p>
                        <a
                          href={profile.socials.github}
                          target="_blank"
                          className="font-semibold text-sm hover:text-primary transition-colors"
                        >
                          Github
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-semibold text-base">{profile.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="p-4 lg:p-8 order-1 lg:order-2">
                  <ContactForm />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
