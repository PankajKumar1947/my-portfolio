import { NextResponse } from "next/server";
import { getPublishedNotesService } from "@/services/note.service";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const notes = await getPublishedNotesService();
  return NextResponse.json(notes);
});
