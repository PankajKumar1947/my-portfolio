"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IBoardMeta } from "@/types/board.types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { format } from "date-fns";
import { MoreHorizontal, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDeleteBoard } from "@/hooks/query/use-board";

export const boardColumns: ColumnDef<IBoardMeta>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Title" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/admin/board/${row.original._id}`}
        className="font-medium hover:underline flex items-center gap-2"
      >
        {row.getValue("title")}
        <SquareArrowOutUpRight className="h-3 w-3 text-muted-foreground" />
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-75 truncate text-muted-foreground">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return date ? format(new Date(date), "PPP") : "N/A";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const board = row.original;
      const { mutate: deleteBoard } = useDeleteBoard();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/board/${board._id}`}>Edit Board</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                if (confirm("Are you sure you want to delete this board?")) {
                  deleteBoard(board._id!);
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
