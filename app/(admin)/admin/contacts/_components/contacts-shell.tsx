"use client";

import { useMemo, useState } from "react";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useAdminContacts } from "@/hooks/query/use-contact";
import { IContact } from "@/types/contact.types";
import { getContactColumns } from "./contact-columns";
import { ContactDetailsDialog } from "./contact-details-dialog";
import { DataTableShell } from "@/components/data-table/data-table-shell";

export function ContactsShell() {
  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  const columns = useMemo(() => getContactColumns({
    onView: (contact) => setSelectedContact(contact)
  }), []);

  return (
    <>
      <DataTableShell
        title="Messages"
        description="View and manage inquiries from your portfolio."
        columns={columns}
        queryHook={() => useAdminContacts(status)}
      />

      <ContactDetailsDialog 
        contact={selectedContact}
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
      />
    </>
  );
}
