import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { connectDB } from "@/lib/db";
import { getPublishedProjectsService } from "@/services/project.service";
import { ProjectListWithFilter } from "./_components/project-list-with-filter";
import { siteConfig } from "@/config/site";

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
  const projects = await getPublishedProjectsService();
  const serializedProjects = JSON.parse(JSON.stringify(projects));

  return (
    <>
      <PageHeader
        title={siteConfig.projects.title}
        subtitle={siteConfig.projects.description}
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        <ProjectListWithFilter projects={serializedProjects} />
      </div>
    </>
  );
}
