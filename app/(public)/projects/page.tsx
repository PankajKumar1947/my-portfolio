"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { ProjectCard } from "@/components/common/project-card";
import { TagFilter } from "./_components/tag-filter";
import { usePublishedProjects } from "@/hooks/query/use-project";
import { Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = usePublishedProjects();
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  // Collect unique tags
  const allTags = React.useMemo(() => {
    if (!projects) return [];
    return Array.from(new Set(projects.flatMap((p) => (p.tags || "").split(",").map(t => t.trim()).filter(Boolean))));
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];
    return selectedTag
      ? projects.filter((p) => (p.tags || "").split(",").map(t => t.trim()).includes(selectedTag))
      : projects;
  }, [projects, selectedTag]);

  const featuredProjects = React.useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => p.featured);
  }, [projects]);

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="A collection of projects I've built and contributed to."
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-destructive">
            <p>Failed to load projects. Please try again later.</p>
          </div>
        ) : (
          <>
            {/* Featured Projects Section (Show only when no tag is filtered) */}
            {!selectedTag && featuredProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
                  Featured Projects
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredProjects.map((project) => (
                    <ProjectCard
                      key={`featured-${project._id}`}
                      project={project}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Projects Section */}
            <div className="space-y-8">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {selectedTag
                    ? `Projects tagged with "${selectedTag}"`
                    : "All Projects"}
                </h2>
                <TagFilter
                  tags={allTags}
                  selected={selectedTag}
                  onSelect={setSelectedTag}
                />
              </div>
              {filteredProjects.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project._id.toString()} project={project} />
                  ))}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center text-muted-foreground">
                  <p>No projects found for the selected tag.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
