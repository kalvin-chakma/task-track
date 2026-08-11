import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { updateMemberRoleSchema } from "@/app/lib/validations";
import { getMembership } from "@/app/lib/boardAccess";

async function assertNotLastOwner(boardId: string) {
  const ownerCount = await prisma.boardMember.count({ where: { boardId, role: "OWNER" } });
  return ownerCount <= 1;
}

export async function PATCH(req: Request, { params }: any) {
  const { id, userId: targetUserId } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const membership = await getMembership(id, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (membership.role !== "OWNER") {
    return NextResponse.json(
      { error: "Only the board owner can change member roles" },
      { status: 403 },
    );
  }

  const target = await getMembership(id, targetUserId);
  if (!target) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = updateMemberRoleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  if (target.role === "OWNER" && parsed.data.role !== "OWNER" && (await assertNotLastOwner(id))) {
    return NextResponse.json({ error: "A board must have at least one owner" }, { status: 400 });
  }

  const updated = await prisma.boardMember.update({
    where: { boardId_userId: { boardId: id, userId: targetUserId } },
    data: { role: parsed.data.role },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  const { id, userId: targetUserId } = await params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const membership = await getMembership(id, userId);
  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isSelf = userId === targetUserId;
  if (!isSelf && membership.role !== "OWNER") {
    return NextResponse.json(
      { error: "Only the board owner can remove members" },
      { status: 403 },
    );
  }

  const target = await getMembership(id, targetUserId);
  if (!target) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  if (target.role === "OWNER" && (await assertNotLastOwner(id))) {
    return NextResponse.json({ error: "A board must have at least one owner" }, { status: 400 });
  }

  await prisma.boardMember.delete({ where: { boardId_userId: { boardId: id, userId: targetUserId } } });
  return NextResponse.json({ success: true });
}
