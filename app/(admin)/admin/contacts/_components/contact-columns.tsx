"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MailOpen, Circle, Trash2, User, Mail, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IContact, ContactStatus } from "@/types/contact.types";
import { useUpdateContactStatus, useDeleteContact } from "@/hooks/mutation/use-contact";

interface ContactColumnsProps {
  onView: (contact: IContact) => void;
}

export const getContactColumns = ({ onView }: ContactColumnsProps): ColumnDef<IContact>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Sender" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("name")}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
    meta: { label: "Sender" },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Subject" />
    ),
    cell: ({ row }) => {
      const isUnread = row.original.status === ContactStatus.UNREAD;
      return (
        <div className="flex items-center gap-2">
          <span className={isUnread ? "font-bold" : "text-muted-foreground"}>
            {row.getValue("subject")}
          </span>
          {isUnread && (
            <Badge variant="default" className="h-4 px-1 text-[10px] font-bold">NEW</Badge>
          )}
        </div>
      );
    },
    meta: { label: "Subject" },
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as ContactStatus;
      return (
        <Badge
          variant={status === ContactStatus.UNREAD ? "default" : "secondary"}
          className={status === ContactStatus.UNREAD ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    meta: {
      label: "Status",
      variant: "select" as const,
      options: [
        { label: "Unread", value: ContactStatus.UNREAD },
        { label: "Read", value: ContactStatus.READ },
      ],
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Date" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
      </span>
    ),
    meta: { label: "Date" },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Actions" />
    ),
    cell: ({ row }) => {
      const contact = row.original;
      const { mutate: updateStatus } = useUpdateContactStatus();
      const { mutate: deleteContact } = useDeleteContact();

      const handleToggleStatus = () => {
        const newStatus = contact.status === ContactStatus.UNREAD ? ContactStatus.READ : ContactStatus.UNREAD;
        updateStatus({ id: contact._id, status: newStatus });
      };

      const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this message?")) {
          deleteContact(contact._id);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onView(contact)}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View Message</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={handleToggleStatus}
            title={contact.status === ContactStatus.UNREAD ? "Mark as Read" : "Mark as Unread"}
          >
            {contact.status === ContactStatus.UNREAD ? (
              <MailOpen className="h-4 w-4" />
            ) : (
              <Circle className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
