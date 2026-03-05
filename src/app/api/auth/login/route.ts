import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });

    if (user.status !== "ACTIVE") return NextResponse.json({ error: "Account is pending approval." }, { status: 403 });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };

    const response = NextResponse.json({ message: "Login successful", user: userData });

    // ✅ Set cookie (httpOnly) - works localhost & Vercel
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on Vercel
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}