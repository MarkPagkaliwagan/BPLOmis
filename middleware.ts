import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // Protect SUPERADMIN routes
  if (url.startsWith("/superadmin-dashboard") || url.startsWith("/api/superadmin")) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.redirect(new URL("/Navsection/login", req.url));

    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
      if (decoded.role !== "SUPERADMIN") {
        return NextResponse.redirect(new URL("/Navsection/login", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/Navsection/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/superadmin-dashboard/:path*", "/api/superadmin/:path*"],
};