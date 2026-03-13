import { NextResponse } from "next/server";
import { updateNotePageService, getNotePageByIdService, deleteNotePageService } from "@/services/note.service";
import { apiHandler } from "@/lib/api-handler";
import { Types } from "mongoose";

export const GET = apiHandler(async (req: Request, { params }: { params: Promise<{ id: string; pageId: string }> }) => {
  const { id, pageId } = await params;
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const note = await getNotePageByIdService(new Types.ObjectId(id), pageId);
  if (!note || !note.pages || note.pages.length === 0) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(note.pages[0]);
});

export const PATCH = apiHandler(async (req: Request, { params }: { params: Promise<{ id: string; pageId: string }> }) => {
  const { id, pageId } = await params;
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();

  // Basic validation that we are only updating whitelisted page fields
  const allowedFields = ["title", "content", "order"];
  const updateData: any = {};
  
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
  }

  const note = await updateNotePageService(new Types.ObjectId(id), pageId, updateData);
  if (!note) {
    return NextResponse.json({ error: "Note or page not found" }, { status: 404 });
  }

  return NextResponse.json(note);
});

export const DELETE = apiHandler(async (req: Request, { params }: { params: Promise<{ id: string; pageId: string }> }) => {
  const { id, pageId } = await params;
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const deleted = await deleteNotePageService(new Types.ObjectId(id), pageId);
  if (!deleted) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Page deleted" });
});
