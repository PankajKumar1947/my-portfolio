import * as React from "react";
import { Plus } from "lucide-react";
import { INotePage } from "@/types/note.types";

interface PageOverviewStripProps {
  pages: INotePage[];
  currentIndex: number;
  onPageChange: (index: number) => void;
  onAddPage: () => void;
}

export function PageOverviewStrip({
  pages,
  currentIndex,
  onPageChange,
  onAddPage,
}: PageOverviewStripProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-border bg-muted/30 px-4 py-3">
      {pages.map((page, index) => (
        <button
          key={page._id?.toString() || index}
          onClick={() => onPageChange(index)}
          className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${index === currentIndex
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:text-foreground border border-border"
            }`}
        >
          <span>{index + 1}</span>
          <span className="max-w-24 truncate">{page.title}</span>
        </button>
      ))}
      <button
        onClick={onAddPage}
        className="flex shrink-0 items-center gap-1 rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Plus className="h-3 w-3" />
        Add
      </button>
    </div>
  );
}
