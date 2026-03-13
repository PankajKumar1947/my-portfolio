import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactModel } from "@/models/contact.model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: { status?: { $in: string[] } } = {};
    if (status) {
      query.status = { $in: status.split(",") };
    }

    const contacts = await ContactModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
