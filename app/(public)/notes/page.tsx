import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { NoteCard } from "@/components/common/note-card";
import { connectDB } from "@/lib/db";
import { getPublishedNotesService } from "@/services/note.service";
import { siteConfig } from "@/config/site";
import type { INote } from "@/types/note.types";

export const metadata: Metadata = {
  title: siteConfig.notes.title,
  description: siteConfig.notes.description,
  openGraph: {
    title: siteConfig.notes.title,
    description: siteConfig.notes.description,
  },
};

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  await connectDB();
  const notes = await getPublishedNotesService();
  const publishedNotes: INote[] = JSON.parse(JSON.stringify(notes));

  return (
    <>
      <PageHeader
        title={siteConfig.notes.title}
        subtitle={siteConfig.notes.description}
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        {publishedNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
