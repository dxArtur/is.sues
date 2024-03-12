/*
  Warnings:

  - Added the required column `photo` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "photo" TEXT NOT NULL;
