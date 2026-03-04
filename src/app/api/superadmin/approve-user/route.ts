import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, role } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: "ACTIVE",
        role: role, // USER or ADMIN
      },
    });

    return NextResponse.json({
      message: "User approved successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error("Approve error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}