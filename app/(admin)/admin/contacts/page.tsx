import { Metadata } from "next";
import { ContactsShell } from "./_components/contacts-shell";

export const metadata: Metadata = {
  title: "Contacts | Admin",
  description: "Manage your portfolio messages.",
};

export default function ContactsPage() {
  return <ContactsShell />;
}
