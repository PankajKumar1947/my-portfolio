import Link from "next/link";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { INote } from "@/types/note.types";

interface NoteCardProps {
  note: INote;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="card-glow group flex flex-row items-stretch border-border bg-card transition-all duration-300 hover:-translate-y-1">
      {/* Left content area */}
      <div className="flex flex-1 flex-col">
        <CardHeader className="pb-2">
          <div className="mb-2 flex items-center gap-3">
            <Badge variant="secondary" className="text-xs font-normal">
              <FileText className="mr-1 h-3 w-3" />
              {note.pages.length} {note.pages.length === 1 ? "page" : "pages"}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(note.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
            {note.title}
          </h3>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between">
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {note.description}
          </p>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href={`/notes/${note.slug}`}>
                View Note
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
