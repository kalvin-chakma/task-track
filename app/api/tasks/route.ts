import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/app/lib/getUser";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = token && getUserFromToken(token);

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = token && getUserFromToken(token);

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, dueDate, status } = await req.json();

  const task = await prisma.task.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      user: { connect: { id: userId } },
    },
  });

  return NextResponse.json(task);
}