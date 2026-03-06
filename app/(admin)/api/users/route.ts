import { NextResponse } from "next/server"
import { createUserSchema } from "@/validations/user.schema"
import { createUserService, getUsersService } from "@/services/user.service"
import { apiHandler } from "@/lib/api-handler"
import bcrypt from "bcryptjs"

export const GET = apiHandler(async () => {
  const users = await getUsersService()
  return NextResponse.json(users)
})

export const POST = apiHandler(async (req: Request) => {
  const body = await req.json()

  const parsed = createUserSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10)

  console.log("Debug - Creating User:", {
    email: parsed.data.email,
    hasHashedPassword: !!hashedPassword
  })

  const user = await createUserService({
    ...parsed.data,
    password: hashedPassword
  })

  return NextResponse.json(user)
})