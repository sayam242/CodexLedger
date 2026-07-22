-- AlterTable
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_userId_slug_key";
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_problemNumber_key" UNIQUE ("userId", "problemNumber");
