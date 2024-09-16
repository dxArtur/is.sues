-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "assignedUserId" TEXT;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
