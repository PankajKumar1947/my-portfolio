"use client";

import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IContact, ContactStatus } from "@/types/contact.types";

interface ContactDetailsHeaderProps {
  contact: IContact;
}

export function ContactDetailsHeader({ contact }: ContactDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-muted/30 p-4 border border-border/50">
      <div className="flex items-center justify-between">
        <Badge 
          variant={contact.status === ContactStatus.UNREAD ? "default" : "secondary"}
          className="capitalize"
        >
          {contact.status}
        </Badge>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {format(new Date(contact.createdAt), "PPPP")}
        </div>
      </div>
      
      <h3 className="text-xl font-bold leading-tight">{contact.subject}</h3>
      
      <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shadow-sm">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold truncate">{contact.name}</span>
            <span className="text-xs text-muted-foreground truncate">{contact.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
