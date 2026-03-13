import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactModel } from "@/models/contact.model";
import { contactSchema } from "@/validations/contact.schema";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const contact = await ContactModel.create(result.data);

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
