import { NextResponse } from "next/server"
import { createUserSchema } from "@/validations/user.schema"
import { createUserService, getUsersService } from "@/services/user.service"
import { connectDB } from "@/lib/db"

export async function GET() {
  await connectDB()

  const users = await getUsersService()

  return NextResponse.json(users)
}

export async function POST(req: Request) {
  await connectDB()

  const body = await req.json()

  const parsed = createUserSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const user = await createUserService(parsed.data)

  return NextResponse.json(user)
}