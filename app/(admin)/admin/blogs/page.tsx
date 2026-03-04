"use client";

import { blogPosts } from "@/lib/mock-data";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { blogColumns } from "./_components/blog-columns";
import { BlogForm } from "./_components/blog-form";

export default function AdminBlogsPage() {
  const { table } = useDataTable({
    data: blogPosts,
    columns: blogColumns,
    pageCount: Math.ceil(blogPosts.length / 10),
  });

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">
            Manage your blog posts.
          </p>
        </div>
        <BlogForm />
      </div>

      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
