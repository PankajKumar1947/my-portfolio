"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useUpdateNotePage, useCreateNotePage, useDeleteNotePage, useReorderNotePages } from "@/hooks/mutation/use-note";
import { useNoteById, useAdminNotePage, useNoteParent } from "@/hooks/query/use-note";
import { toast } from "sonner";
import { Loader } from "@/components/common/loader";
import { Editor } from "@/components/text-editor/dynamic-editor";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

interface RouteParams {
  params: Promise<{ pageId: string }>;
}

export default function NoteContentEditorPage({ params }: RouteParams) {
  const router = useRouter();
  const { pageId } = React.use(params);

  const { data: noteIdStr } = useNoteParent(pageId);
  const { data: note, isLoading: isLoadingNote } = useNoteById(noteIdStr || "");
  const [pages, setPages] = React.useState<INotePage[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [saveStatus, setSaveStatus] = React.useState<"saved" | "saving" | "unsaved">("saved");

  const dirtyFieldsRef = React.useRef<Record<string, Partial<INotePage>>>({});
  const { mutate: updateNotePage, isPending: isSavingPage } = useUpdateNotePage(noteIdStr || "");
  const { mutate: createPageMutation, isPending: isCreatingPage } = useCreateNotePage(noteIdStr || "");
  const { mutate: deletePageMutation, isPending: isDeletingPage } = useDeleteNotePage(noteIdStr || "");
  const { mutate: reorderMutation } = useReorderNotePages(noteIdStr || "");

  const currentPage = pages[currentIndex] || { _id: "empty", title: "", content: "", order: 0 };
  const totalPages = pages.length;

  const debouncedSave = useDebouncedCallback((pageIdToSave: string) => {
    const dirtyData = { ...dirtyFieldsRef.current[pageIdToSave] };
    if (Object.keys(dirtyData).length === 0) return;

    // Clear the ref so subsequent edits accumulate anew
    delete dirtyFieldsRef.current[pageIdToSave];

    setSaveStatus("saving");
    updateNotePage(
      { pageId: pageIdToSave, data: dirtyData },
      {
        onSuccess: () => setSaveStatus("saved"),
        onError: () => {
          setSaveStatus("unsaved");
          // Re-merge failed dirty data back in if the user didn't overwrite it
          dirtyFieldsRef.current[pageIdToSave] = {
            ...dirtyData,
            ...(dirtyFieldsRef.current[pageIdToSave] || {}),
          };
        },
      }
    );
  }, 2000);

  const { data: activePageData, isLoading: isLoadingPageContent } = useAdminNotePage(
    noteIdStr || "",
    pages[currentIndex]?._id?.toString() || ""
  );

  React.useEffect(() => {
    if (activePageData && activePageData.content && pages.length > 0) {
      setPages((prev) =>
        prev.map((p) =>
          p._id?.toString() === activePageData._id?.toString() ? { ...p, content: activePageData.content } : p
        )
      );
    }
  }, [activePageData]);

  React.useEffect(() => {
    if (note) {
      if (note.pages && note.pages.length > 0) {
        setPages(note.pages);
      } else {
        setPages([{ _id: `temp-${Date.now()}`, title: "Page 1", content: "", order: 1 }]);
      }
    }
  }, [note]);

  // Update URL when switching pages (without triggering Next.js re-render)
  React.useEffect(() => {
    const currentPageId = pages[currentIndex]?._id?.toString();
    if (currentPageId && currentPageId !== pageId && !currentPageId.startsWith("temp-")) {
      window.history.replaceState(null, "", `/admin/notes/${currentPageId}`);
    }
  }, [currentIndex, pages]);

  if (isLoadingNote || !note) {
    return <Loader />;
  }

  const addPage = () => {
    const newOrder = pages.length + 1;
    createPageMutation(
      { title: `Page ${newOrder}`, content: "", order: newOrder },
      {
        onSuccess: (newPage) => {
          setPages((prev) => [...prev, newPage]);
          setCurrentIndex(pages.length); // switch to the new page
        },
        onError: () => {
          toast.error("Failed to create new page");
        },
      }
    );
  };

  const duplicatePage = () => {
    createPageMutation(
      { title: `${currentPage.title} (Copy)`, content: currentPage.content || "", order: pages.length + 1 },
      {
        onSuccess: (newPage) => {
          const newPages = [...pages];
          newPages.splice(currentIndex + 1, 0, newPage);
          setPages(newPages);
          setCurrentIndex(currentIndex + 1);
        },
        onError: () => toast.error("Failed to duplicate page"),
      }
    );
  };

  const removePage = () => {
    if (pages.length <= 1) return;
    const pageToDelete = pages[currentIndex];
    const pid = pageToDelete._id?.toString();
    if (!pid) return;

    deletePageMutation(pid, {
      onSuccess: () => {
        const newPages = pages
          .filter((_, i) => i !== currentIndex)
          .map((p, i) => ({ ...p, order: i + 1 }));
        setPages(newPages);
        setCurrentIndex(Math.min(currentIndex, newPages.length - 1));
        // Batch reorder remaining pages
        const updates = newPages.map((p) => ({ pageId: p._id!.toString(), order: p.order }));
        reorderMutation(updates);
      },
      onError: () => toast.error("Failed to delete page"),
    });
  };

  const movePage = (direction: "up" | "down") => {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= pages.length) return;

    // Swap locally
    const newPages = [...pages];
    [newPages[currentIndex], newPages[newIndex]] = [newPages[newIndex], newPages[currentIndex]];
    const orderedPages = newPages.map((p, i) => ({ ...p, order: i + 1 }));
    setPages(orderedPages);
    setCurrentIndex(newIndex);

    // Single batch call with [{pageId, order}]
    const updates = orderedPages.map((p) => ({ pageId: p._id!.toString(), order: p.order }));
    reorderMutation(updates);
  };

  const updateCurrentPage = (field: keyof INotePage, value: string | number) => {
    const pId = pages[currentIndex]?._id?.toString();
    if (!pId) return;

    if (!dirtyFieldsRef.current[pId]) {
      dirtyFieldsRef.current[pId] = {};
    }
    dirtyFieldsRef.current[pId][field] = value as any;

    setPages((prev) => {
      const newPages = prev.map((p, i) => {
        if (i === currentIndex) {
          return { ...p, [field]: value };
        }
        return p;
      });

      if (saveStatus !== "saving") {
        setSaveStatus("unsaved");
      }

      return newPages;
    });

    debouncedSave(pId);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/notes")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">{note.title}</h1>
        </div>

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

            <span className="text-xs text-muted-foreground mr-2 hidden sm:inline-block">
              {saveStatus === "saving" && "Saving..."}
              {saveStatus === "unsaved" && "Unsaved"}
              {saveStatus === "saved" && "Saved"}
              {(isCreatingPage || isDeletingPage) && "Syncing..."}
            </span>
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
            {isLoadingPageContent ? (
              <div className="flex justify-center p-8 min-h-64 items-center">
                <Loader />
              </div>
            ) : (
              <Editor
                key={`editor-${currentPage._id}`}
                initialContent={currentPage.content || ""}
                onChange={(val) => {
                  if (val !== currentPage.content) {
                    updateCurrentPage("content", val);
                  }
                }}
              />
            )}
          </CardContent>
        </Card>

        {/* Page overview strip */}
        <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-border bg-muted/30 px-4 py-3">
          {pages.map((page, index) => (
            <button
              key={page._id?.toString() || index}
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
