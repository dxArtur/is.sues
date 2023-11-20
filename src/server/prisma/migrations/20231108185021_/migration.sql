/*
  Warnings:

  - You are about to drop the column `departament` on the `issues` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_companyId_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_authorId_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "labels" DROP CONSTRAINT "labels_departmentId_fkey";

-- AlterTable
ALTER TABLE "issues" DROP COLUMN "departament";

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "labels" ADD CONSTRAINT "labels_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
