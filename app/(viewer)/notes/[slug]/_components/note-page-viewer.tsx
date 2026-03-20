"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/common/theme-toggle";
import type { INote, INotePage } from "@/types/note.types";
import { useNotePage } from "@/hooks/query/use-note";
import { Loader } from "@/components/common/loader";
import { Editor } from "@/components/text-editor/dynamic-editor";

interface PopulatedNote extends Omit<INote, "pages"> {
  pages: INotePage[];
}

interface NotePageViewerProps {
  note: PopulatedNote;
  initialPageId: string;
}

export function NotePageViewer({ note, initialPageId }: NotePageViewerProps) {
  const router = useRouter();
  const sortedPages = [...note?.pages].sort((a, b) => a.order - b.order);

  const currentIndex = sortedPages.findIndex(p => p._id?.toString() === initialPageId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const currentPage = sortedPages[safeIndex] as INotePage;
  const totalPages = sortedPages.length;

  const { data: pageContent, isLoading: isLoadingPage } = useNotePage(
    note?.slug,
    currentPage?._id as string
  );

  const handlePageChange = (index: number) => {
    const pageId = sortedPages[index]._id?.toString();
    router.push(`/notes/${note.slug}/${pageId}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-(--max-width) items-center justify-between px-2">
          {/* Left: Back button + Note title */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/notes">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold tracking-tight">
              {note?.title}
            </h1>
          </div>

          {/* Right: Page selector + theme toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Page title + prev/next navigation */}
      <div className="mt-4 flex flex-col items-center gap-2 mx-auto max-w-(--max-width) px-2 w-full">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex-1 flex justify-start">
            <Select
              value={String(safeIndex)}
              onValueChange={(val) => handlePageChange(Number(val))}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortedPages.map((page, index) => (
                  <SelectItem key={String(page._id)} value={String(index)}>
                    {page.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <h2 className="hidden sm:block flex-1 text-center text-lg font-semibold tracking-tight">
            {currentPage?.title}
          </h2>

          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={safeIndex === 0}
                onClick={() => handlePageChange(safeIndex - 1)}
                className="gap-1.5"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {safeIndex > 0 ? sortedPages[safeIndex - 1].title : ""}
                </span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={safeIndex === totalPages - 1}
                onClick={() => handlePageChange(safeIndex + 1)}
                className="gap-1.5"
              >
                <span className="hidden sm:inline">
                  {safeIndex < totalPages - 1
                    ? sortedPages[safeIndex + 1].title
                    : ""}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Page Title */}
        <h2 className="sm:hidden text-center text-base font-bold tracking-tight mt-1">
          {currentPage?.title}
        </h2>
      </div>

      {/* Body */}
      <main className="flex-1 m-2">
        <div className="mx-auto max-w-(--max-width) p-6 sm:p-8 lg:p-10 bg-card rounded-lg">
          {/* Page content */}
          <div className="min-h-[50vh] flex flex-col justify-start overflow-hidden">
            {isLoadingPage ? (
              <div className="flex h-64 items-center justify-center p-8">
                <Loader />
              </div>
            ) : pageContent?.content ? (
              <Editor
                key={`viewer-${currentPage?._id}`}
                initialContent={pageContent?.content}
                editable={false}
              />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/5 p-12 text-center transition-colors hover:border-border/80">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/10">
                  <FileText className="h-6 w-6 text-muted-foreground/40" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold tracking-tight text-foreground/80">
                  Note content not found
                </h3>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Pagination at the bottom */}
      <footer className="mt-auto py-10 border-t border-border/5 mx-auto max-w-(--max-width)">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={safeIndex === 0}
              onClick={() => handlePageChange(safeIndex - 1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Prev
            </Button>

            {sortedPages.map((_, index) => (
              <Button
                key={index}
                variant={index === safeIndex ? "default" : "outline"}
                size="sm"
                className="min-w-9"
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={safeIndex === totalPages - 1}
              onClick={() => handlePageChange(safeIndex + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
