"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Plus,
  X,
  FileText,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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

interface PageData {
  id: string;
  title: string;
  content: string;
}

interface NoteMeta {
  title: string;
  slug: string;
  description: string;
  status: string;
}

export default function NoteContentEditorPage() {
  const router = useRouter();
  const [meta, setMeta] = React.useState<NoteMeta | null>(null);
  const [pages, setPages] = React.useState<PageData[]>([
    { id: "page-1", title: "Page 1", content: "" },
  ]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const stored = sessionStorage.getItem("note-draft-meta");
    if (stored) {
      const parsed = JSON.parse(stored);
      setMeta(parsed);
      if (parsed.pages && parsed.pages.length > 0) {
        setPages(parsed.pages);
      }
    } else {
      router.replace("/admin/notes");
    }
  }, [router]);

  if (!meta) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const currentPage = pages[currentIndex];
  const totalPages = pages.length;

  const addPage = () => {
    const newId = `page-${Date.now()}`;
    const newPages = [
      ...pages,
      { id: newId, title: `Page ${pages.length + 1}`, content: "" },
    ];
    setPages(newPages);
    setCurrentIndex(newPages.length - 1);
  };

  const duplicatePage = () => {
    const newId = `page-${Date.now()}`;
    const newPage = {
      ...currentPage,
      id: newId,
      title: `${currentPage.title} (Copy)`,
    };
    const newPages = [...pages];
    newPages.splice(currentIndex + 1, 0, newPage);
    setPages(newPages);
    setCurrentIndex(currentIndex + 1);
  };

  const removePage = () => {
    if (pages.length <= 1) return;
    const newPages = pages.filter((_, i) => i !== currentIndex);
    setPages(newPages);
    setCurrentIndex(Math.min(currentIndex, newPages.length - 1));
  };

  const movePage = (direction: "up" | "down") => {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= pages.length) return;
    const newPages = [...pages];
    [newPages[currentIndex], newPages[newIndex]] = [
      newPages[newIndex],
      newPages[currentIndex],
    ];
    setPages(newPages);
    setCurrentIndex(newIndex);
  };

  const updateCurrentPage = (field: keyof PageData, value: string) => {
    setPages((prev) =>
      prev.map((p, i) => (i === currentIndex ? { ...p, [field]: value } : p))
    );
  };

  const handleSavePage = () => {
    const noteData = { ...meta, page: currentPage, pageIndex: currentIndex };
    console.log("Saving page:", noteData);
    // TODO: API call to save individual page
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-5">


        {/* Toolbar */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-2.5">
          {/* Left: Page navigation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Select
                value={String(currentIndex)}
                onValueChange={(val) => setCurrentIndex(Number(val))}
              >
                <SelectTrigger className="h-8 w-48 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page, index) => (
                    <SelectItem key={page.id} value={String(index)}>
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
                onClick={() => setCurrentIndex((i) => i + 1)}
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
                  onClick={() => movePage("up")}
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
                  onClick={() => movePage("down")}
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
                  onClick={duplicatePage}
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
                  onClick={addPage}
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
                    onClick={removePage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete this page</TooltipContent>
              </Tooltip>
            )}

            <Separator orientation="vertical" className="mx-1 h-5" />

            <Button size="sm" className="h-8 gap-1.5" onClick={handleSavePage}>
              <Save className="h-3.5 w-3.5" />
              Save Page
            </Button>
          </div>
        </div>

        {/* Current Page Editor */}
        <Card className="border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <Label className="mb-2 block text-xs text-muted-foreground">
              Page Title
            </Label>
            <Input
              value={currentPage.title}
              onChange={(e) => updateCurrentPage("title", e.target.value)}
              placeholder="Enter page title..."
              className="h-9 border-none bg-transparent px-0 text-lg font-semibold shadow-none focus-visible:ring-0"
            />
          </div>
          <CardContent className="p-5">
            <Label className="mb-2 block text-xs text-muted-foreground">
              Content
            </Label>
            <Textarea
              value={currentPage.content}
              onChange={(e) => updateCurrentPage("content", e.target.value)}
              placeholder="Write your content here... (Markdown supported)"
              className="min-h-96 resize-y border-none bg-transparent p-0 font-mono text-sm leading-relaxed shadow-none focus-visible:ring-0"
            />
          </CardContent>
        </Card>

        {/* Page overview strip */}
        <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-border bg-muted/30 px-4 py-3">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentIndex(index)}
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
            onClick={addPage}
            className="flex shrink-0 items-center gap-1 rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Plus className="h-3 w-3" />
            Add
          </button>
        </div>
      </div>
    </TooltipProvider>
  );
}
