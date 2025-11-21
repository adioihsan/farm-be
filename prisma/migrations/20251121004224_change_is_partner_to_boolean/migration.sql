/*
  Warnings:

  - Changed the type of `isPartner` on the `Farm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "isPartner",
ADD COLUMN     "isPartner" BOOLEAN NOT NULL;
