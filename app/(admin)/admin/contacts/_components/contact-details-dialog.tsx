"use client";

import { 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Circle, 
} from "lucide-react";

import { BaseDialog } from "@/components/layout/base-dialog";
import { Button } from "@/components/ui/button";
import { IContact, ContactStatus } from "@/types/contact.types";
import { useUpdateContactStatus, useDeleteContact } from "@/hooks/mutation/use-contact";
import { ContactDetailsHeader } from "./contact-details-header";
import { ContactDetailsContent } from "./contact-details-content";

interface ContactDetailsDialogProps {
  contact: IContact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDetailsDialog({
  contact,
  open,
  onOpenChange,
}: ContactDetailsDialogProps) {
  const { mutate: updateStatus } = useUpdateContactStatus();
  const { mutate: deleteContact } = useDeleteContact();

  if (!contact) return null;

  const handleToggleStatus = () => {
    const newStatus = contact.status === ContactStatus.UNREAD ? ContactStatus.READ : ContactStatus.UNREAD;
    updateStatus({ id: contact._id, status: newStatus });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteContact(contact._id);
      onOpenChange(false);
    }
  };

  const footer = (
    <div className="flex w-full justify-end gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggleStatus}
      >
        {contact.status === ContactStatus.UNREAD ? (
          <><CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Read</>
        ) : (
          <><Circle className="mr-2 h-4 w-4" /> Mark as Unread</>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
      >
        <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}>
          <Mail className="mr-2 h-4 w-4" /> Reply
        </a>
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
      >
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      trigger={null}
      title="Message Details"
      className="sm:max-w-xl"
      footer={footer}
    >
      <div className="space-y-6">
        <ContactDetailsHeader contact={contact} />
        <ContactDetailsContent message={contact.message} />
      </div>
    </BaseDialog>
  );
}
