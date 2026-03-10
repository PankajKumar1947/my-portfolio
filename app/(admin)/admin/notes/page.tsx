"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { noteColumns } from "./_components/note-columns";
import { NoteForm } from "./_components/note-form";
import { useNotes } from "@/hooks/query/use-note";

export default function AdminNotesPage() {
  const { data: notes = [], isLoading } = useNotes();
  const { table } = useDataTable({
    data: notes,
    columns: noteColumns,
    pageCount: Math.ceil(notes.length / 10),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
          <p className="text-sm text-muted-foreground">
            Manage your multi-page notes.
          </p>
        </div>
        <NoteForm />
      </div>

      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
