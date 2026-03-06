import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"

export const getCurrentUser = async () => {
  const token = (await cookies()).get("session")?.value

  if (!token) return null

  try {
    return verifyToken(token)
  } catch {
    return null
  }
}