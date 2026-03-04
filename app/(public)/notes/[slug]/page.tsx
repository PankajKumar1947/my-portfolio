import { notFound } from "next/navigation";
import { NotePageViewer } from "./_components/note-page-viewer";
import { notes } from "@/lib/mock-data";

interface NoteDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  return <NotePageViewer note={note} />;
}
