/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Todo_name_key` ON `Todo`(`name`);
