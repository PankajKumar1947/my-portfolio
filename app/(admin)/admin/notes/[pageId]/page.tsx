"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { INotePage } from "@/types/note.types";
import {
  useUpdateNotePage,
  useCreateNotePage,
  useDeleteNotePage,
  useReorderNotePages,
} from "@/hooks/mutation/use-note";
import {
  useNoteById,
  useAdminNotePage,
  useNoteParent,
} from "@/hooks/query/use-note";
import { toast } from "sonner";
import { Loader } from "@/components/common/loader";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { EditorToolbar } from "../_components/editor-toolbar";
import { PageContentEditor } from "../_components/page-content-editor";
import { PageOverviewStrip } from "../_components/page-overview-strip";

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
  const { mutate: updateNotePage } = useUpdateNotePage(noteIdStr || "");
  const { mutate: createPageMutation, isPending: isCreatingPage } = useCreateNotePage(noteIdStr || "");
  const { mutate: deletePageMutation, isPending: isDeletingPage } = useDeleteNotePage(noteIdStr || "");
  const { mutate: reorderMutation } = useReorderNotePages(noteIdStr || "");

  const currentPage = pages[currentIndex] || { _id: "empty", title: "", content: "", order: 0 };

  const debouncedSave = useDebouncedCallback((pageIdToSave: string) => {
    const dirtyData = { ...dirtyFieldsRef.current[pageIdToSave] };
    if (Object.keys(dirtyData).length === 0) return;

    delete dirtyFieldsRef.current[pageIdToSave];

    setSaveStatus("saving");
    updateNotePage(
      { pageId: pageIdToSave, data: dirtyData },
      {
        onSuccess: () => setSaveStatus("saved"),
        onError: () => {
          setSaveStatus("unsaved");
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
        setPages(note.pages as INotePage[]);
      } else {
        setPages([{ _id: `temp-${Date.now()}`, title: "Page 1", content: "", order: 1 }]);
      }
    }
  }, [note]);

  React.useEffect(() => {
    const currentPageId = pages[currentIndex]?._id?.toString();
    if (currentPageId && currentPageId !== pageId && !currentPageId.startsWith("temp-")) {
      window.history.replaceState(null, "", `/admin/notes/${currentPageId}`);
    }
  }, [currentIndex, pages, pageId]);

  React.useEffect(() => {
    if (note?.title) {
      window.dispatchEvent(
        new CustomEvent("breadcrumb-update", {
          detail: { segment: pageId, label: note.title },
        })
      );
    }
  }, [note?.title, pageId]);

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
          setCurrentIndex(pages.length);
        },
        onError: () => toast.error("Failed to create new page"),
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
        const updates = newPages.map((p) => ({ pageId: p._id!.toString(), order: p.order }));
        reorderMutation(updates);
      },
      onError: () => toast.error("Failed to delete page"),
    });
  };

  const movePage = (direction: "up" | "down") => {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= pages.length) return;

    const newPages = [...pages];
    [newPages[currentIndex], newPages[newIndex]] = [newPages[newIndex], newPages[currentIndex]];
    const orderedPages = newPages.map((p, i) => ({ ...p, order: i + 1 }));
    setPages(orderedPages);
    setCurrentIndex(newIndex);

    const updates = orderedPages.map((p) => ({ pageId: p._id!.toString(), order: p.order }));
    reorderMutation(updates);
  };

  const updateCurrentPage = (field: keyof INotePage, value: string | number) => {
    const pId = pages[currentIndex]?._id?.toString();
    if (!pId) return;

    if (!dirtyFieldsRef.current[pId]) {
      dirtyFieldsRef.current[pId] = {};
    }
    const fieldName = field as keyof Partial<INotePage>;
    dirtyFieldsRef.current[pId][fieldName] = value as never;

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
    <div className="space-y-5">
      <EditorToolbar
        pages={pages}
        currentIndex={currentIndex}
        onPageChange={setCurrentIndex}
        onAddPage={addPage}
        onDuplicatePage={duplicatePage}
        onRemovePage={removePage}
        onMovePage={movePage}
        saveStatus={saveStatus}
        isSyncing={isCreatingPage || isDeletingPage}
      />

      <PageContentEditor
        currentPage={currentPage}
        onUpdate={updateCurrentPage}
        isLoading={isLoadingPageContent}
        noteSlug={note.slug}
      />

      <PageOverviewStrip
        pages={pages}
        currentIndex={currentIndex}
        onPageChange={setCurrentIndex}
        onAddPage={addPage}
      />
    </div>
  );
}

