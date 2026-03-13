import * as React from "react";
import {
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { INotePage } from "@/types/note.types";

interface EditorToolbarProps {
  pages: INotePage[];
  currentIndex: number;
  onPageChange: (index: number) => void;
  onAddPage: () => void;
  onDuplicatePage: () => void;
  onRemovePage: () => void;
  onMovePage: (direction: "up" | "down") => void;
  saveStatus: "saved" | "saving" | "unsaved";
  isSyncing: boolean;
}

export function EditorToolbar({
  pages,
  currentIndex,
  onPageChange,
  onAddPage,
  onDuplicatePage,
  onRemovePage,
  onMovePage,
  saveStatus,
  isSyncing,
}: EditorToolbarProps) {
  const totalPages = pages.length;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-2.5">
        {/* Left: Page navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentIndex === 0}
              onClick={() => onPageChange(currentIndex - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Select
              value={String(currentIndex)}
              onValueChange={(val) => onPageChange(Number(val))}
            >
              <SelectTrigger className="h-8 w-48 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page, index) => (
                  <SelectItem key={page._id?.toString() || index} value={String(index)}>
                    <span className="mr-2 text-muted-foreground">
                      {index + 1}.
                    </span>
                    {page.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentIndex === totalPages - 1}
              onClick={() => onPageChange(currentIndex + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-5" />

          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} / {totalPages}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentIndex === 0}
                onClick={() => onMovePage("up")}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move page up</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentIndex === totalPages - 1}
                onClick={() => onMovePage("down")}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move page down</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-5" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onDuplicatePage}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate page</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onAddPage}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add new page</TooltipContent>
          </Tooltip>

          {pages.length > 1 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={onRemovePage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete this page</TooltipContent>
            </Tooltip>
          )}

          <Separator orientation="vertical" className="mx-1 h-5" />

          <span className="text-xs text-muted-foreground mr-2 hidden sm:inline-block">
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "unsaved" && "Unsaved"}
            {saveStatus === "saved" && "Saved"}
            {isSyncing && "Syncing..."}
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
}
