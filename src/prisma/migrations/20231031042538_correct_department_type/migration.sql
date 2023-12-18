/*
  Warnings:

  - The `departament` column on the `issues` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "issues" DROP COLUMN "departament",
ADD COLUMN     "departament" INTEGER[];
