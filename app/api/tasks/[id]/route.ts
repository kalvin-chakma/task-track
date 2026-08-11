import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { taskUpdateSchema } from "@/app/lib/validations";
import { getMembership, canEdit } from "@/app/lib/boardAccess";

export async function PUT(req: Request, { params }: any) {
  const { id } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const membership = await getMembership(existing.boardId, userId);
  if (!membership || !canEdit(membership.role)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = taskUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { title, description, dueDate, status } = parsed.data;

  await prisma.task.update({
    where: { id },
    data: { title, description, dueDate: new Date(dueDate), status },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: any) {
  const { id } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const membership = await getMembership(existing.boardId, userId);
  if (!membership || !canEdit(membership.role)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.task.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
