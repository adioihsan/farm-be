/*
  Warnings:

  - A unique constraint covering the columns `[userId,farmName]` on the table `Farm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Farm_userId_farmName_key" ON "Farm"("userId", "farmName");
