/*
  Warnings:

  - You are about to drop the column `refreshTokenHash` on the `Session` table. All the data in the column will be lost.
  - Added the required column `refreshToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_refreshTokenHash_idx";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "refreshTokenHash",
ADD COLUMN     "refreshToken" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Session_refreshToken_idx" ON "Session"("refreshToken");
