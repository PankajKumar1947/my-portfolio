import { env } from "@/config/env"
import { NextResponse } from "next/server"
import { signToken } from "@/lib/jwt"
import { apiHandler, ApiError } from "@/lib/api-handler"

export const POST = apiHandler(async (req: Request) => {
  const { email, password } = await req.json()

  const adminEmail = env.ADMIN_EMAIL
  const adminPassword = env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  if (email !== adminEmail || password !== adminPassword) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = await signToken({
    userId: "admin",
    email: adminEmail as string,
    name: env.ADMIN_NAME as string
  })

  const response = NextResponse.json({ success: true })

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  })

  return response
})