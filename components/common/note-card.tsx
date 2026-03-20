import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { INote, INotePage } from "@/types/note.types";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: INote;
}

function isNotePage(page: INote["pages"][number]): page is INotePage {
  return typeof page === "object" && page !== null && "title" in page;
}

export function NoteCard({ note }: NoteCardProps) {
  const hasPages = note.pages.length > 0;
  const createdAt = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="group relative flex min-h-20 items-center overflow-hidden border border-border/40 bg-card transition-all duration-300  rounded-t-2xl rounded-b-2xl rounded-r-2xl">
      {/* Accent Spine */}
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover:w-1.5",
          hasPages ? "bg-primary" : "bg-muted-foreground/30"
        )}
      />

      <div className="flex w-full items-center justify-between gap-6 px-6 py-4">
        <div className="flex flex-1 flex-col gap-1.5 min-w-0 sm:flex-row sm:items-center sm:gap-6">
          {/* Date */}
          <time className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground/50">
            {createdAt}
          </time>

          {/* Title & Description */}
          <div className="flex flex-col min-w-0">
            <h3 className="line-clamp-1 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {note.title}
            </h3>
            <p className="line-clamp-1 text-sm text-muted-foreground/70">
              {note.description}
            </p>
          </div>
        </div>

        {/* Right side: Meta & Action */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="hidden items-center gap-1.5 font-mono text-sm md:flex">
            <FileText className="h-3 w-3" />
            {note.pages.length}
          </div>

          <Button
            variant={hasPages ? "outline" : "ghost"}
            size="icon"
            asChild={hasPages}
            className={cn(
              "h-9 w-9 rounded-full transition-all duration-300",
              hasPages
                ? "border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                : "cursor-not-allowed opacity-40"
            )}
          >
            {hasPages ? (
              <Link href={`/notes/${note.slug}`}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Lock className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
