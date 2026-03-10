"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { NotePageViewer } from "./_components/note-page-viewer";
import { useNote } from "@/hooks/query/use-note";
import { Loader } from "@/components/common/loader";

interface NoteDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { slug } = React.use(params);
  const { data: note, isLoading, error } = useNote(slug);

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (error || !note) {
    notFound();
  }

  return <NotePageViewer note={note} />;
}
