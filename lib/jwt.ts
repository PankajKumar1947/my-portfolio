import jwt from "jsonwebtoken"
import { JwtPayload } from "@/types/auth.types"
import { env } from "@/config/env"

const JWT_SECRET = env.JWT_SECRET

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d"
  })
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}