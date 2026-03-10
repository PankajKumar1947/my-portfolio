"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { NoteForm } from "./note-form";
import type { INote } from "@/types/note.types";
import { useDeleteNote } from "@/hooks/mutation/use-note";

export const noteColumns: ColumnDef<INote>[] = [
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isPublished = status === "published";
      return (
        <Badge
          variant={isPublished ? "default" : "secondary"}
          className={
            isPublished
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
      const { mutate: deleteNote } = useDeleteNote();

      const handleEditContent = () => {
        router.push(`/admin/notes/${note._id}`);
      };

      const handleDelete = () => {
        if (confirm("Are you sure you want to delete this note?")) {
          deleteNote(note._id.toString(), {
            onSuccess: () => toast.success("Note deleted successfully"),
            onError: (error) => toast.error(error.message || "Failed to delete note"),
          });
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
          <NoteForm initialData={note} />
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
