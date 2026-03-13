import Link from "next/link";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { INote } from "@/types/note.types";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: INote;
}

export function NoteCard({ note }: NoteCardProps) {
  const hasPages = note.pages.length > 0;

  const content = (
    <div className="flex flex-1 flex-col">
      <CardHeader className="space-y-4 px-6 pt-6 pb-2">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className={cn(
              "h-6 px-2 text-[10px] font-medium uppercase tracking-wider",
              hasPages ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-transparent"
            )}
          >
            <FileText className="mr-1.5 h-3 w-3" />
            {note.pages.length} {note.pages.length === 1 ? "page" : "pages"}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <Calendar className="h-3 w-3" />
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
        <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {note.title}
        </h3>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">
          {note.description}
        </p>
      </CardContent>

      <CardFooter className="mt-auto px-6 pb-6 pt-0 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-2 rounded-full border-border/60 transition-all duration-300",
            hasPages ? "group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground" : "opacity-50 pointer-events-none"
          )}
        >
          <span className="text-xs font-semibold">
            {hasPages ? "View Note" : "Locked"}
          </span>
          <ArrowRight className={cn("h-3.5 w-3.5 transition-transform duration-300", hasPages && "group-hover:translate-x-1")} />
        </Button>
      </CardFooter>
    </div>
  );

  return (
    <Card
      className={cn(
        "group relative flex border-border/40 bg-card transition-all duration-500",
        hasPages
          ? "hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer"
          : "opacity-80 grayscale-[0.3]"
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
