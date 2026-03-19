import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { getNoteBySlugService } from "@/services/note.service";

interface NoteDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NoteDetailPage({
  params,
}: NoteDetailPageProps) {
  const { slug } = await params;
  await connectDB();
  const note = await getNoteBySlugService(slug);

  if (!note || !note.pages || note.pages.length === 0) {
    redirect("/notes");
  }

  const firstPageId = note.pages[0]._id?.toString();
  redirect(`/notes/${slug}/${firstPageId}`);
}
