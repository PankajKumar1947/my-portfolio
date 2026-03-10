import { NextResponse } from "next/server";
import { getNotePage } from "@/repositories/note.repository";
import { connectDB } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string; pageId: string }> }
) {
  try {
    const { slug, pageId } = await params;
    await connectDB();
    
    const note = await getNotePage(slug, pageId);
    
    if (!note || !note.pages || note.pages.length === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    
    // Return only the requested page object
    return NextResponse.json(note.pages[0]);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch page" },
      { status: 500 }
    );
  }
}
