import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { updateBoardSchema } from "@/app/lib/validations";
import { getMembership } from "@/app/lib/boardAccess";

export async function GET(req: Request, { params }: any) {
  const { id } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const membership = await getMembership(id, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      members: { include: { user: { select: { id: true, name: true, email: true } } } },
    },
  });

  if (!board) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ...board, role: membership.role });
}

export async function PATCH(req: Request, { params }: any) {
  const { id } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const membership = await getMembership(id, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (membership.role !== "OWNER") {
    return NextResponse.json(
      { error: "Only the board owner can rename this board" },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = updateBoardSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const board = await prisma.board.update({ where: { id }, data: { name: parsed.data.name } });
  return NextResponse.json(board);
}

export async function DELETE(req: Request, { params }: any) {
  const { id } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const membership = await getMembership(id, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (membership.role !== "OWNER") {
    return NextResponse.json(
      { error: "Only the board owner can delete this board" },
      { status: 403 },
    );
  }

  await prisma.board.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
