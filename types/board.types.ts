import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";

export interface IBoard {
  _id?: string;
  title: string;
  description: string;
  scene?: {
    elements?: readonly ExcalidrawElement[];
    appState?: Partial<AppState>;
    files?: BinaryFiles;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type IBoardMeta = Omit<IBoard, "scene">;
