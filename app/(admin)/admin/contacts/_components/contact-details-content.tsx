"use client";

import { MessageSquare } from "lucide-react";

interface ContactDetailsContentProps {
  message: string;
}

export function ContactDetailsContent({ message }: ContactDetailsContentProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground px-1">
        <MessageSquare className="h-4 w-4" />
        <span>Message Body</span>
      </div>
      <div className="rounded-xl border border-border/50 bg-card p-6 text-sm leading-relaxed whitespace-pre-wrap shadow-sm min-h-37.5">
        {message}
      </div>
    </div>
  );
}
