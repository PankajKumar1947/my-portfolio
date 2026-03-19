import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  FileText,
  Lock,
  NotebookTabs,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    day: "numeric",
    year: "numeric",
  });
  const noteInitial = note.title.trim().charAt(0).toUpperCase() || "N";
  const recentPages = note.pages.filter(isNotePage).slice(0, 3);

  const content = (
    <div className="flex flex-1 flex-col lg:flex-row bg-card">
      <div className="flex flex-1 flex-col">
        <CardHeader className="space-y-5 px-6 pt-6 pb-4 lg:px-7 lg:pt-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground/70">
            Notebook
          </p>

          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-lg font-bold",
                hasPages
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/40 text-muted-foreground"
              )}
            >
              {noteInitial}
            </div>

            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="line-clamp-1 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {note.title}
                </h3>
                <Badge
                  variant="secondary"
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em]",
                    hasPages
                      ? "border-primary/15 bg-primary/10 text-primary"
                      : "border-border/50 bg-muted/40 text-muted-foreground"
                  )}
                >
                  {hasPages ? "Published" : "Locked"}
                </Badge>
              </div>

              <p className="line-clamp-3 max-w-2xl text-sm leading-7 text-muted-foreground/85">
                {note.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground/70">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {note.pages.length} {note.pages.length === 1 ? "page" : "pages"}
                </span>
                <span className="text-muted-foreground/40">&bull;</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {createdAt}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="mt-auto flex items-center justify-between px-6 pt-0 lg:px-7 ">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            {hasPages ? "Ready to read" : "Coming soon"}
          </div>

          <Button
            variant={hasPages ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-10 rounded-full px-4 text-xs font-semibold",
              hasPages
                ? "shadow-lg shadow-primary/10 transition-all duration-300 group-hover:translate-x-0.5"
                : "border-border/50 bg-transparent text-muted-foreground opacity-60 pointer-events-none"
            )}
          >
            <span>{hasPages ? "Explore" : "Locked"}</span>
            {hasPages ? <ArrowRight className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
          </Button>
        </CardFooter>
      </div>

      <CardContent className="border-t border-border/40 px-6 py-4 lg:w-[320px] lg:border-t-0 lg:border-l lg:px-7 ">
        <div className="h-full rounded-2xl border border-border/40 bg-background/30 px-4 py-4">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/65">
            <NotebookTabs className="h-3.5 w-3.5" />
            Recent Pages
          </div>

          {recentPages.length > 0 ? (
            <div className="space-y-3">
              {recentPages.map((page, index) => (
                <div
                  key={page._id?.toString() ?? `${page.title}-${index}`}
                  className="flex items-center justify-between gap-4"
                >
                  <p className="line-clamp-1 text-sm font-medium text-foreground/90">
                    {page.title}
                  </p>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/55">
                    Page {index + 1}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-muted-foreground/70">
              {hasPages
                ? "Pages are available inside this note."
                : "This note is still in progress and will unlock once pages are added."}
            </p>
          )}
        </div>
      </CardContent>
    </div>
  );

  return (
    <Card
      className={cn(
        "group flex overflow-hidden duration-500",
        hasPages
          ? "cursor-pointer hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover"
          : "opacity-85"
      )}
    >
      {hasPages ? (
        <Link href={`/notes/${note.slug}`} className="flex flex-1">
          {content}
        </Link>
      ) : (
        <div className="flex flex-1">{content}</div>
      )}
    </Card>
  );
}
