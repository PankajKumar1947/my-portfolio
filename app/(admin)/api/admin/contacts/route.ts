import { apiHandler } from "@/lib/api-handler";
import * as contactService from "@/services/contact.service";
import { NextResponse } from "next/server";

export const GET = apiHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;

  const contacts = await contactService.getContactsService(status);
  return NextResponse.json(contacts);
});
