import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });

    const token = signToken({ userId: user.id });

    return NextResponse.json({ token, user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}