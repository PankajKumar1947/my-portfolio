import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/common/loader";
import { Editor } from "@/components/text-editor/dynamic-editor";
import { INotePage } from "@/types/note.types";

interface PageContentEditorProps {
  currentPage: INotePage;
  onUpdate: (field: keyof INotePage, value: string | number) => void;
  isLoading: boolean;
}

export function PageContentEditor({
  currentPage,
  onUpdate,
  isLoading,
}: PageContentEditorProps) {
  return (
    <Card className="border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <Label className="mb-2 block text-xs text-muted-foreground">
          Page Title
        </Label>
        <Input
          value={currentPage.title}
          onChange={(e) => onUpdate("title", e.target.value)}
          placeholder="Enter page title..."
          className=""
        />
      </div>
      <CardContent className="px-5">
        <Label className="mb-2 block text-xs text-muted-foreground">
          Content
        </Label>
        {isLoading ? (
          <div className="flex justify-center p-8 min-h-64 items-center">
            <Loader />
          </div>
        ) : (
          <Editor
            key={`editor-${currentPage._id}`}
            initialContent={currentPage.content || ""}
            onChange={(val) => {
              if (val !== currentPage.content) {
                onUpdate("content", val);
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
