import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { env } from "@/config/env"

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET)

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const token = req.cookies.get("session")?.value

  // If user is on login page and has a valid session, redirect to admin
  if (path === "/login") {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET)
        return NextResponse.redirect(new URL("/admin", req.url))
      } catch {
        // Invalid token, let them stay on login
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  }

  // Protecting admin routes
  if (!token) {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin",
    "/api/admin/:path*",
    "/api/admin",
    "/login"
  ]
}