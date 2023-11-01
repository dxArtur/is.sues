/*
  Warnings:

  - Changed the type of `departament` on the `issues` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "issues" DROP COLUMN "departament",
ADD COLUMN     "departament" INTEGER NOT NULL;
