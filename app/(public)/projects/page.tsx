import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { connectDB } from "@/lib/db";
import { getPublishedProjectsService } from "@/services/project.service";
import { ProjectListWithFilter } from "./_components/project-list-with-filter";
import { siteConfig } from "@/config/site";
import { projects as fallbackProjectsData } from "@/config/resume";

export const metadata: Metadata = {
  title: siteConfig.projects.title,
  description: siteConfig.projects.description,
  openGraph: {
    title: siteConfig.projects.title,
    description: siteConfig.projects.description,
  },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  await connectDB();
  const dbProjects = await getPublishedProjectsService();
  
  // Transform data if DB is empty to use fallback projects from resume.json
  const projects = dbProjects.length > 0 
    ? JSON.parse(JSON.stringify(dbProjects))
    : fallbackProjectsData.map(p => ({
        _id: p.id,
        title: p.title,
        description: p.description,
        tags: p.technologies.join(", "),
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        featured: false,
        status: "published",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

  return (
    <>
      <PageHeader
        title={siteConfig.projects.title}
        subtitle={siteConfig.projects.description}
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        <ProjectListWithFilter projects={projects} />
      </div>
    </>
  );
}

