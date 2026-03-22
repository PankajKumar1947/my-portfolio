"use client";

import { BlockNoteSchema, PartialBlock } from "@blocknote/core";
import { defaultBlockSpecs, createCodeBlockSpec } from "@blocknote/core/blocks";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";
import { codeBlockOptions } from "@blocknote/code-block";
import * as React from "react";

import { uploadFile as uploadFileUtil } from "@/lib/upload-utils";

// Define the custom schema with syntax highlighting
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    codeBlock: createCodeBlockSpec(codeBlockOptions),
  },
});

export interface EditorProps {
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
    schema,
    initialContent: initialBlocks,
    uploadFile: async (file: File) => {
      const url = await uploadFileUtil(file, folder);
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