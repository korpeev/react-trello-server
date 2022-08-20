/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspace_title_key" ON "Workspace"("title");
