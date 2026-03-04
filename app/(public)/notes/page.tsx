import { PageHeader } from "@/components/common/page-header";
import { NoteCard } from "@/components/common/note-card";
import { notes } from "@/lib/mock-data";

export default function NotesPage() {
  const publishedNotes = notes.filter((n) => n.published);

  return (
    <>
      <PageHeader
        title="Notes"
        subtitle="Organized notes on various topics — multi-page references I keep handy."
        gradient
      />

      <div className="mx-auto max-w-(--max-width) px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {publishedNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </>
  );
}
