"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { PartialBlock } from "@blocknote/core";

interface EditorProps {
  initialContent?: string;
  onChange: (value: string) => void;
}

export default function Editor({ initialContent, onChange }: EditorProps) {
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
  });

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
    />
  );
}