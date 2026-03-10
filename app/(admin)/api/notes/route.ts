import { NextResponse } from "next/server";
import { createNoteService, getNotesService } from "@/services/note.service";
import { noteSchema } from "@/validations/notes.schema";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const notes = await getNotesService();
  return NextResponse.json(notes);
});

export const POST = apiHandler(async (req: Request) => {
  const body = await req.json();

  const parsed = noteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const note = await createNoteService(parsed.data);
  return NextResponse.json(note, { status: 201 });
});
