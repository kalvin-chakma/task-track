import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { addMemberSchema } from "@/app/lib/validations";
import { getMembership } from "@/app/lib/boardAccess";

export async function GET(req: Request, { params }: any) {
  const { id } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const membership = await getMembership(id, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const members = await prisma.boardMember.findMany({
    where: { boardId: id },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(members);
}

export async function POST(req: Request, { params }: any) {
  const { id } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const membership = await getMembership(id, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (membership.role !== "OWNER") {
    return NextResponse.json(
      { error: "Only the board owner can add members" },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = addMemberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) {
    return NextResponse.json({ error: "No user found with that email" }, { status: 404 });
  }

  const existing = await getMembership(id, user.id);
  if (existing) {
    return NextResponse.json({ error: "User is already a member of this board" }, { status: 400 });
  }

  const member = await prisma.boardMember.create({
    data: { boardId: id, userId: user.id, role: parsed.data.role },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(member, { status: 201 });
}
