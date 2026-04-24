import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { apiHandler } from "@/lib/api-handler";
import { NextResponse } from "next/server";

export const GET = apiHandler(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const user = await verifyToken(token);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
});
