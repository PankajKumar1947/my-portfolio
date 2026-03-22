import { SignJWT, jwtVerify } from "jose"
import { JwtPayload } from "@/types/auth.types"
import { env } from "@/config/env"

const JWT_SECRET_STR = env.JWT_SECRET
console.log(`[JWT Library] Secret length: ${JWT_SECRET_STR.length}`);
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STR)

export const signToken = async (payload: JwtPayload): Promise<string> => {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  const { payload } = await jwtVerify(token, JWT_SECRET)
  return payload as unknown as JwtPayload
}