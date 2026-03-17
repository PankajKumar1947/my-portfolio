"use client";

import { useBoard, useUpdateBoard } from "@/hooks/query/use-board";
import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { AppState } from "@excalidraw/excalidraw/types";
import { Loader } from "@/components/common/loader";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, Maximize2 } from "lucide-react";
import { useTheme } from "next-themes";
import { sanitizeAppState } from "@/lib/excalidraw-utils";

// Dynamically import Excalidraw with SSR disabled
const Excalidraw = dynamic(
  async () => (await import("@/components/common/excalidraw-wrapper")).default,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted/20">
        <Loader />
      </div>
    ),
  }
);

export default function BoardEditorPage() {
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
      <div className="flex h-112.5 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground">Board not found</p>
        <Button variant="outline" onClick={() => router.push("/admin/board")}>
          Back to Boards
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-4 overflow-hidden">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/board")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{board.title}</h1>
            <p className="text-xs text-muted-foreground">{board.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.open(`/board/${id}`, '_blank')}
          >
            <Maximize2 className="h-4 w-4" />
            Open Full Screen
          </Button>
          <Button onClick={handleSave} disabled={isUpdating} className="gap-2">
            {isUpdating ? <Loader className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl">
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
    </div>
  );
}
