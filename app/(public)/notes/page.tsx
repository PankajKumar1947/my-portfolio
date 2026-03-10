"use client";

import { PageHeader } from "@/components/common/page-header";
import { NoteCard } from "@/components/common/note-card";
import { usePublishedNotes } from "@/hooks/query/use-note";
import { Loader } from "@/components/common/loader";

export default function NotesPage() {
  const { data: notes, isLoading, error } = usePublishedNotes();
  const publishedNotes = notes || [];

  return (
    <>
      <PageHeader
        title="Notes"
        subtitle="Organized notes on various topics — multi-page references I keep handy."
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-destructive">
            <p>Failed to load notes. Please try again later.</p>
          </div>
        ) : publishedNotes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {publishedNotes.map((note) => (
              <NoteCard key={note._id.toString()} note={note} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            <p>No notes found.</p>
          </div>
        )}
      </div>
    </>
  );
}
