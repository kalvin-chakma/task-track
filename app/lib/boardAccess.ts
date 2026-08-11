import { prisma } from "./prisma";
import type { BoardRole } from "@/app/generated/prisma";

export function getMembership(boardId: string, userId: string) {
  return prisma.boardMember.findUnique({
    where: { boardId_userId: { boardId, userId } },
  });
}

export function canEdit(role: BoardRole) {
  return role === "OWNER" || role === "EDITOR";
}
