import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createBoardSchema } from "@/app/lib/validations";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const memberships = await prisma.boardMember.findMany({
    where: { userId },
    include: { board: true },
    orderBy: { createdAt: "asc" },
  });

  const boards = memberships.map((m) => ({
    id: m.board.id,
    name: m.board.name,
    role: m.role,
    ownerId: m.board.ownerId,
    createdAt: m.board.createdAt,
  }));

  return NextResponse.json(boards);
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

  const parsed = createBoardSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const board = await prisma.board.create({
    data: {
      name: parsed.data.name,
      ownerId: userId,
      members: { create: { userId, role: "OWNER" } },
    },
  });

  return NextResponse.json(board, { status: 201 });
}
