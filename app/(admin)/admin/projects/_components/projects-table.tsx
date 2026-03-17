"use client";

import { projectColumns } from "./project-columns";
import { ProjectForm } from "./project-form";
import { useProjects } from "@/hooks/query/use-project";
import { DataTableShell } from "@/components/data-table/data-table-shell";

export function ProjectsTable() {
  return (
    <DataTableShell
      title="Projects"
      description="Manage your portfolio projects."
      columns={projectColumns}
      queryHook={useProjects}
      ActionComponent={<ProjectForm />}
    />
  );
}
