"use client";

import { blogColumns } from "./blog-columns";
import { BlogForm } from "./blog-form";
import { useBlogs } from "@/hooks/query/use-blog";
import { DataTableShell } from "@/components/data-table/data-table-shell";

export function BlogTable() {
  return (
    <DataTableShell
      title="Blog Posts"
      description="Manage your blog posts."
      columns={blogColumns}
      queryHook={useBlogs}
      ActionComponent={<BlogForm />}
    />
  );
}
