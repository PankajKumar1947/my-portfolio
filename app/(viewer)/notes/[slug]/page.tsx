import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotePageViewer } from "./_components/note-page-viewer";
import { connectDB } from "@/lib/db";
import { getNoteBySlugService } from "@/services/note.service";
import { profile } from "@/config/profile";

interface NoteDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const note = await getNoteBySlugService(slug);

  if (!note) {
    return { title: "Note Not Found" };
  }

  const title = note.title;
  const description =
    note.description || `Read "${note.title}" — notes by ${profile.name}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${profile.name}`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function NoteDetailPage({
  params,
}: NoteDetailPageProps) {
  const { slug } = await params;
  await connectDB();
  const note = await getNoteBySlugService(slug);

  if (!note) {
    notFound();
  }

  const serializedNote = JSON.parse(JSON.stringify(note));

  return <NotePageViewer note={serializedNote} />;
}
