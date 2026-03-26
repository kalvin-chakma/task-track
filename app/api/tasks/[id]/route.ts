import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/app/lib/getUser";

export async function PUT(req: Request, { params }: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = token && getUserFromToken(token);

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, dueDate, status } = await req.json();

  const task = await prisma.task.updateMany({
    where: { id: params.id, userId },
    data: { title, description, dueDate: new Date(dueDate), status },
  });

  if (task.count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = token && getUserFromToken(token);

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.task.deleteMany({ where: { id: params.id, userId } });

  return NextResponse.json({ success: true });
}