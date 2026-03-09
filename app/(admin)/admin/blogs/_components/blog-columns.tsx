"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { BlogForm } from "./blog-form";
import { IBlog } from "@/types/blog.types";
import { useDeleteBlog } from "@/hooks/mutation/use-blog";

export const blogColumns: ColumnDef<IBlog>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Title" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("title")}</span>
    ),
    meta: { label: "Title" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "published" ? "default" : "secondary"}
          className={
            status === "published"
              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
              : ""
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    meta: {
      label: "Status",
      variant: "select" as const,
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "readTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Read Time" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("readTime")}</span>
    ),
    meta: { label: "Read Time" },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Date" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.getValue("createdAt") as string).toLocaleDateString()}
      </span>
    ),
    meta: { label: "Date" },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Actions" />
    ),
    cell: ({ row }) => {
      const router = useRouter();
      const blog = row.original;
      const { mutate: deleteBlog } = useDeleteBlog();

      const handleEditContent = () => {
        router.push(`/admin/blogs/edit/${blog._id}`);
      };

      const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
          deleteBlog(blog._id.toString());
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={handleEditContent}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">Edit Content</span>
          </Button>
          <BlogForm initialData={blog} />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
