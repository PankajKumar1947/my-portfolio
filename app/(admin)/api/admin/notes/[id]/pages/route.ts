import { NextResponse } from "next/server";
import { createNotePageService, reorderNotePagesService } from "@/services/note.service";
import { apiHandler } from "@/lib/api-handler";
import { Types } from "mongoose";

export const POST = apiHandler(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();
  const page = await createNotePageService(new Types.ObjectId(id), body);
  return NextResponse.json(page, { status: 201 });
});

export const PATCH = apiHandler(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body: { pageId: string; order: number }[] = await req.json();
  if (!Array.isArray(body) || body.length === 0) {
    return NextResponse.json({ error: "Expected array of {pageId, order}" }, { status: 400 });
  }

  await reorderNotePagesService(new Types.ObjectId(id), body);
  return NextResponse.json({ message: "Pages reordered" });
});
