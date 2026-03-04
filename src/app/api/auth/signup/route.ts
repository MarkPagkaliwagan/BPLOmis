import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, username, phone, email, password } = body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        phone,
        email,
        password: hashedPassword,
        role: "USER",
        status: "PENDING",
      },
    });

    return NextResponse.json({
      message: "Signup successful! Await SUPERADMIN approval.",
      user: { id: user.id, email: user.email, status: user.status, role: user.role },
    });
  } catch (err: any) {
    console.error("Signup API error:", err); // ← LOG ERROR
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}