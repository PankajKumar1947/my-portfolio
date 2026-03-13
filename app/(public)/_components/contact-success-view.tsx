"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactSuccessViewProps {
  onReset: () => void;
}

export function ContactSuccessView({ onReset }: ContactSuccessViewProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
      <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </div>
      <h3 className="text-2xl font-bold">Message Sent!</h3>
      <p className="text-muted-foreground max-w-xs">
        Thank you for reaching out. I'll get back to you as soon as possible.
      </p>
      <Button
        variant="outline"
        onClick={onReset}
        className="mt-4"
      >
        Send another message
      </Button>
    </div>
  );
}
