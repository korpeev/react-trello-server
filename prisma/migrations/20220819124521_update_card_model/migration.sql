/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Card_title_key" ON "Card"("title");
