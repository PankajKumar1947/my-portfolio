"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { projectColumns } from "./_components/project-columns";
import { ProjectForm } from "./_components/project-form";
import { useProjects } from "@/hooks/query/use-project";
import { Loader } from "@/components/common/loader";

export default function AdminProjectsPage() {
  const { data: projects, isLoading, error } = useProjects();

  const { table } = useDataTable({
    data: projects || [],
    columns: projectColumns,
    pageCount: Math.ceil((projects?.length || 0) / 10),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-destructive">
        Failed to load projects.
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio projects.
          </p>
        </div>
        <ProjectForm />
      </div>

      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
