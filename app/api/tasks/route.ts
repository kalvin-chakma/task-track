import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { taskCreateSchema } from "@/app/lib/validations";
import { getMembership, canEdit } from "@/app/lib/boardAccess";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const boardId = new URL(req.url).searchParams.get("boardId");
  if (!boardId) return NextResponse.json({ error: "boardId is required" }, { status: 400 });

  const membership = await getMembership(boardId, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const tasks = await prisma.task.findMany({
    where: { boardId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = taskCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { boardId, title, description, dueDate, status } = parsed.data;

  const membership = await getMembership(boardId, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!canEdit(membership.role)) {
    return NextResponse.json(
      { error: "You don't have permission to add tasks to this board" },
      { status: 403 },
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      board: { connect: { id: boardId } },
      user: { connect: { id: userId } },
    },
  });

  return NextResponse.json(task);
}
