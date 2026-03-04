"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { ProjectCard } from "@/components/common/project-card";
import { TagFilter } from "./_components/tag-filter";
import { projects } from "@/lib/mock-data";

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  // Collect unique tags
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filteredProjects = selectedTag
    ? projects.filter((p) => p.tags.includes(selectedTag))
    : projects;

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="A collection of projects I've built and contributed to."
        gradient
      >
        <div className="mt-6">
          <TagFilter
            tags={allTags}
            selected={selectedTag}
            onSelect={setSelectedTag}
          />
        </div>
      </PageHeader>

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
