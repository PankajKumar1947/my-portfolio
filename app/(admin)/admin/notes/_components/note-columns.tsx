"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { NoteForm } from "./note-form";
import type { Note } from "@/lib/mock-data";

export const noteColumns: ColumnDef<Note>[] = [
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
    accessorKey: "pages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Pages" />
    ),
    cell: ({ row }) => {
      const pages = row.original.pages;
      return (
        <span className="text-muted-foreground">
          {pages.length} {pages.length === 1 ? "page" : "pages"}
        </span>
      );
    },
    meta: { label: "Pages" },
    enableSorting: false,
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
      const note = row.original;

      const handleEditContent = () => {
        sessionStorage.setItem("note-draft-meta", JSON.stringify(note));
        router.push("/admin/notes/new");
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
          <NoteForm initialData={{ ...note, status: note.published ? "published" : "draft" }} />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
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
