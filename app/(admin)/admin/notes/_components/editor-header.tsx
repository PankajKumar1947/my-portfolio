import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorHeaderProps {
  title: string;
  onBack: () => void;
}

export function EditorHeader({ title, onBack }: EditorHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}
