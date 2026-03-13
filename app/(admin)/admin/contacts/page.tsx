"use client";

import { useMemo, useState } from "react";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useAdminContacts } from "@/hooks/query/use-contact";
import { IContact } from "@/types/contact.types";
import { Loader } from "@/components/common/loader";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { getContactColumns } from "./_components/contact-columns";
import { ContactDetailsDialog } from "./_components/contact-details-dialog";
import { ContactsHeader } from "./_components/contacts-header";

export default function ContactsPage() {
  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const { data: contacts, isLoading } = useAdminContacts(status);

  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  const columns = useMemo(() => getContactColumns({
    onView: (contact) => setSelectedContact(contact)
  }), []);

  const { table } = useDataTable({
    data: contacts || [],
    columns,
    pageCount: Math.ceil((contacts?.length || 0) / 10),
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <ContactsHeader 
        title="Messages" 
        description="View and manage inquiries from your portfolio." 
      />

      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>

      <ContactDetailsDialog 
        contact={selectedContact}
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
      />
    </div>
  );
}
