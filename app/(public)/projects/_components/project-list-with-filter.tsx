"use client";

import * as React from "react";
import { ProjectCard } from "@/components/common/project-card";
import { TagFilter } from "./tag-filter";

import { IProject } from "@/types/project.types";

interface ProjectListWithFilterProps {
  projects: IProject[];
}

export function ProjectListWithFilter({ projects }: ProjectListWithFilterProps) {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => {
    return Array.from(
      new Set(
        projects.flatMap((p) =>
          (p.tags || "")
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        )
      )
    );
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    return selectedTag
      ? projects.filter((p) =>
        (p.tags || "")
          .split(",")
          .map((t: string) => t.trim())
          .includes(selectedTag)
      )
      : projects;
  }, [projects, selectedTag]);

  const featuredProjects = React.useMemo(() => {
    return projects.filter((p) => p.featured);
  }, [projects]);

  return (
    <div className="w-full">
      {/* Featured Projects Section (Show only when no tag is filtered) */}
      {!selectedTag && featuredProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
            Featured Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={`featured-${project._id}`}
                project={project}
                index={index}
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
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project._id.toString()}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            <p>No projects found for the selected tag.</p>
          </div>
        )}
      </div>
    </div>
  );
}
