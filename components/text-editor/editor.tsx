"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";

import { uploadFile } from "@/lib/upload-utils";

interface EditorProps {
  initialContent?: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  folder?: string;
}

export default function Editor({ initialContent, onChange, editable = true, folder }: EditorProps) {
  const { resolvedTheme } = useTheme();

  const initialBlocks: PartialBlock[] | undefined = (() => {
    if (!initialContent) return undefined;
    try {
      const parsed = JSON.parse(initialContent);
      return Array.isArray(parsed) ? parsed : undefined;
    } catch {
      return undefined;
    }
  })();

  const editor = useCreateBlockNote({
    initialContent: initialBlocks,
    uploadFile: async (file: File) => {
      const url = await uploadFile(file, folder);
      return url;
    }
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      className={editable ? "" : "read-only-editor"}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => {
        if (onChange) {
          onChange(JSON.stringify(editor.document, null, 2));
        }
      }}
      style={{ "--bn-colors-editor-background": "transparent" } as React.CSSProperties}
    />
  );
}