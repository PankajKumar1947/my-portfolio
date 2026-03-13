import { NextResponse } from "next/server";
import { getNoteIdByPageIdService } from "@/services/note.service";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async (req: Request, { params }: { params: Promise<{ pageId: string }> }) => {
  const { pageId } = await params;
  
  if (!pageId) {
    return NextResponse.json({ error: "Missing pageId" }, { status: 400 });
  }

  const noteId = await getNoteIdByPageIdService(pageId);
  if (!noteId) {
    return NextResponse.json({ error: "Parent note not found" }, { status: 404 });
  }

  return NextResponse.json({ noteId: noteId.toString() });
});
