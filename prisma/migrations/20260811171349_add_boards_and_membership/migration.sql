-- CreateEnum
CREATE TYPE "BoardRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardMember" (
    "id" TEXT NOT NULL,
    "role" "BoardRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BoardMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "Board_ownerId_idx" ON "Board"("ownerId");

-- CreateIndex
CREATE INDEX "BoardMember_userId_idx" ON "BoardMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardMember_boardId_userId_key" ON "BoardMember"("boardId", "userId");

-- AlterTable: add boardId nullable first so existing rows can be backfilled
ALTER TABLE "Task" ADD COLUMN "boardId" TEXT;

-- DataMigration: give every existing user a personal board they own
INSERT INTO "Board" ("id", "name", "createdAt", "updatedAt", "ownerId")
SELECT gen_random_uuid(), 'Personal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, "id"
FROM "User";

-- DataMigration: make each owner an OWNER member of their own personal board
INSERT INTO "BoardMember" ("id", "role", "createdAt", "boardId", "userId")
SELECT gen_random_uuid(), 'OWNER', CURRENT_TIMESTAMP, "id", "ownerId"
FROM "Board";

-- DataMigration: move every existing task onto its owner's personal board
UPDATE "Task" t
SET "boardId" = b."id"
FROM "Board" b
WHERE b."ownerId" = t."userId";

-- AlterTable: now that every row has a board, enforce it going forward
ALTER TABLE "Task" ALTER COLUMN "boardId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "Task_boardId_idx" ON "Task"("boardId");
