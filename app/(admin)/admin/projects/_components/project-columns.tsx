"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
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
import { ProjectForm } from "./project-form";
import type { Project } from "@/lib/mock-data";

export const projectColumns: ColumnDef<Project>[] = [
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
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags;
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      );
    },
    meta: { label: "Tags" },
    enableSorting: false,
  },
  {
    accessorKey: "featured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Featured" />
    ),
    cell: ({ row }) => {
      const featured = row.getValue("featured") as boolean;
      return featured ? (
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
          Featured
        </Badge>
      ) : null;
    },
    meta: {
      label: "Featured",
      variant: "select" as const,
      options: [
        { label: "Featured", value: "true" },
        { label: "Not Featured", value: "false" },
      ],
    },
    enableColumnFilter: true,
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
        <ProjectForm
          initialData={{
            ...row.original,
            tags: row.original.tags.join(", "),
            featured: !!row.original.featured,
          }}
        />
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
