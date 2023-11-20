/*
  Warnings:

  - Added the required column `adm` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "adm" BOOLEAN NOT NULL,
ADD COLUMN     "occupation" TEXT NOT NULL;
