import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/jwt"
import { UserModel } from "@/models/user.model"
import { apiHandler, ApiError } from "@/lib/api-handler"

export const POST = apiHandler(async (req: Request) => {
  const { email, password } = await req.json()

  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  const user = await UserModel.findOne({ email }).select("+password")

  if (!user) {
    throw new ApiError("Invalid credentials", 401);
  }

  if (!user.password) {
    console.error(`Error: User ${email} exists but has no password hash in database. Re-create this user.`);
    throw new ApiError("Invalid credentials", 401);
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = signToken({
    userId: user._id.toString(),
    email: user.email
  })

  const response = NextResponse.json({ success: true })

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  })

  return response
})