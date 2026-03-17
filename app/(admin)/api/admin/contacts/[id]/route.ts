import { apiHandler } from "@/lib/api-handler";
import * as contactService from "@/services/contact.service";
import { NextResponse } from "next/server";

export const PATCH = apiHandler(async (req, { params }) => {
  const { id } = await params;
  const body = await req.json();

  const contact = await contactService.updateContactService(id, body);

  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json(contact);
});

export const DELETE = apiHandler(async (req, { params }) => {
  const { id } = await params;

  const contact = await contactService.deleteContactService(id);

  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Contact deleted successfully" });
});
