"use client";

import { noteColumns } from "./note-columns";
import { NoteForm } from "./note-form";
import { useNotes } from "@/hooks/query/use-note";
import { DataTableShell } from "@/components/data-table/data-table-shell";
import { INoteListItem } from "@/types/note.types";

export function NotesTable() {
  return (
    <DataTableShell<INoteListItem>
      title="Notes"
      description="Manage your multi-page notes."
      columns={noteColumns}
      queryHook={useNotes}
      ActionComponent={<NoteForm />}
    />
  );
}
