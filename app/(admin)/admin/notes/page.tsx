import { Metadata } from "next";
import { NotesTable } from "./_components/notes-table";

export const metadata: Metadata = {
  title: "Notes | Admin",
  description: "Manage your multi-page notes.",
};

export default function AdminNotesPage() {
  return <NotesTable />;
}
