"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { BlogForm } from "./blog-form";
import type { BlogPost } from "@/lib/mock-data";

export const blogColumns: ColumnDef<BlogPost>[] = [
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
    accessorKey: "published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Status" />
    ),
    cell: ({ row }) => {
      const published = row.getValue("published") as boolean;
      return (
        <Badge
          variant={published ? "default" : "secondary"}
          className={
            published
              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
              : ""
          }
        >
          {published ? "Published" : "Draft"}
        </Badge>
      );
    },
    meta: {
      label: "Status",
      variant: "select" as const,
      options: [
        { label: "Published", value: "true" },
        { label: "Draft", value: "false" },
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
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BlogForm initialData={{ ...row.original, status: row.original.published ? "published" : "draft" }} />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
