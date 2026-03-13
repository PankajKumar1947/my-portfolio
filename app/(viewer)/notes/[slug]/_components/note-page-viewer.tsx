"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { useNotePage } from "@/hooks/query/use-note";
import { Loader } from "@/components/common/loader";
import { Editor } from "@/components/text-editor/dynamic-editor";

interface NotePageViewerProps {
  note: INote;
}

export function NotePageViewer({ note }: NotePageViewerProps) {
  const sortedPages = [...note.pages].sort((a, b) => a.order - b.order);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentPage = sortedPages[currentIndex] as INotePage;
  const totalPages = sortedPages.length;

  const { data: pageContent, isLoading: isLoadingPage } = useNotePage(
    note.slug,
    currentPage?._id as string
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-(--max-width) items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Back button + Note title */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/notes">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold tracking-tight">
              {note.title}
            </h1>
          </div>

          {/* Right: Page selector + theme toggle */}
          <div className="flex items-center gap-3">
            <Select
              value={String(currentIndex)}
              onValueChange={(val) => setCurrentIndex(Number(val))}
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
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
          {/* Page title + prev/next navigation */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {currentPage.title}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="gap-1.5"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {currentIndex > 0 ? sortedPages[currentIndex - 1].title : ""}
                </span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentIndex === totalPages - 1}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="gap-1.5"
              >
                <span className="hidden sm:inline">
                  {currentIndex < totalPages - 1
                    ? sortedPages[currentIndex + 1].title
                    : ""}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Page content */}
          <div className="mt-8 -mx-10 sm:-mx-12 min-h-64 flex flex-col justify-start">
            {isLoadingPage ? (
              <div className="flex h-full items-center justify-center p-8">
                <Loader />
              </div>
            ) : (
              <Editor
                key={`viewer-${currentPage?._id}`}
                initialContent={pageContent?.content || ""}
                editable={false}
              />
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Prev
            </Button>

            {sortedPages.map((_, index) => (
              <Button
                key={index}
                variant={index === currentIndex ? "default" : "outline"}
                size="sm"
                className="min-w-9"
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentIndex === totalPages - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
