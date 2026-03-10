"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { blogColumns } from "./_components/blog-columns";
import { BlogForm } from "./_components/blog-form";
import { useBlogs } from "@/hooks/query/use-blog";
import { Loader } from "@/components/common/loader";

export default function AdminBlogsPage() {
  const { data: blogs, isLoading } = useBlogs();

  const { table } = useDataTable({
    data: blogs || [],
    columns: blogColumns,
    pageCount: Math.ceil((blogs?.length || 0) / 10),
  });

  if (isLoading) {
    return <Loader />;
  }

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
