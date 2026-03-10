"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ProjectForm } from "./project-form";
import { IProject } from "@/types/project.types";
import { useDeleteProject } from "@/hooks/mutation/use-project";

export const projectColumns: ColumnDef<IProject>[] = [
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
      const tagsString = row.original.tags || "";
      const tags = tagsString.split(",").map(t => t.trim()).filter(Boolean);
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
    cell: ({ row }) => {
      const project = row.original;
      const { mutate: deleteProject } = useDeleteProject();

      return (
        <div className="flex items-center gap-2">
          <ProjectForm
            initialData={project}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => {
              if (confirm("Are you sure you want to delete this project?")) {
                deleteProject(project._id.toString());
              }
            }}
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
