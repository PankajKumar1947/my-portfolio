"use client";

import { useBoard, useUpdateBoard } from "@/hooks/query/use-board";
import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { AppState } from "@excalidraw/excalidraw/types";
import { Loader } from "@/components/common/loader";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useTheme } from "next-themes";
import { sanitizeAppState } from "@/lib/excalidraw-utils";

// Dynamically import Excalidraw with SSR disabled
const Excalidraw = dynamic(
  async () => (await import("@/components/common/excalidraw-wrapper")).default,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center bg-muted/20">
        <Loader />
      </div>
    ),
  }
);

export default function FullScreenBoardPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { resolvedTheme } = useTheme();

  const { data: board, isLoading } = useBoard(id);
  const { mutate: updateBoard, isPending: isUpdating } = useUpdateBoard();

  const [elements, setElements] = useState<readonly ExcalidrawElement[]>([]);
  const [appState, setAppState] = useState<Partial<AppState>>({});

  // Initialize board data
  useEffect(() => {
    if (board?.scene) {
      setElements(board.scene.elements || []);
      setAppState(board.scene.appState || {});
    }
  }, [board]);

  const handleSave = () => {
    updateBoard({
      id,
      data: {
        scene: {
          elements,
          appState: sanitizeAppState(appState),
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Board not found</p>
        <Button variant="outline" onClick={() => router.push("/admin/board")}>
          Back to Boards
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Floating Toolbar */}
      <div className="absolute top-4 right-4 z-999 flex items-center gap-2 rounded-full border border-border bg-background/80 p-1 backdrop-blur-md shadow-lg transition-opacity hover:opacity-100 opacity-60">
        <div className="px-3 py-1 flex flex-col">
          <span className="text-xs font-bold truncate max-w-37.5">{board.title}</span>
          <span className="text-[10px] text-muted-foreground">Full Screen Mode</span>
        </div>
        <div className="h-6 w-px bg-border mx-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          disabled={isUpdating}
          className="h-8 w-8 rounded-full"
          title="Save Changes"
        >
          {isUpdating ? <Loader className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/admin/board/${id}`)}
          className="h-8 w-8 rounded-full"
          title="Exit Full Screen"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Excalidraw
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        initialData={{
          elements: board.scene?.elements || [],
          appState: { 
            ...sanitizeAppState(board.scene?.appState || {}), 
            isLoading: false,
            viewBackgroundColor: undefined, // Let CSS handle the background
          },
          scrollToContent: true,
        }}
        onChange={(newElements: readonly ExcalidrawElement[], newAppState: AppState) => {
          setElements(newElements);
          setAppState(newAppState);
        }}
      />
    </div>
  );
}
