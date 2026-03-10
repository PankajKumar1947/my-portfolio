import { NextResponse } from "next/server";
import { getNoteBySlugService } from "@/services/note.service";
import { connectDB } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    const note = await getNoteBySlugService(slug);
    
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    
    return NextResponse.json(note);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch note" },
      { status: 500 }
    );
  }
}
