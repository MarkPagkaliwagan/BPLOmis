import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // 🔎 Basic validation
    if (!body.firstName || body.firstName.trim().length < 2) {
      return NextResponse.json(
        { message: "First name must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!body.lastName || body.lastName.trim().length < 2) {
      return NextResponse.json(
        { message: "Last name must be at least 2 characters." },
        { status: 400 }
      );
    }

    // 📧 Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    const updateData: any = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
    };

    // 🔐 Password validation (only if changing)
    if (body.password && body.password.trim() !== "") {
      if (body.password.length < 8) {
        return NextResponse.json(
          { message: "Password must be at least 8 characters." },
          { status: 400 }
        );
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

      if (!passwordRegex.test(body.password)) {
        return NextResponse.json(
          {
            message:
              "Password must contain uppercase, lowercase, and number.",
          },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: body.id },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}