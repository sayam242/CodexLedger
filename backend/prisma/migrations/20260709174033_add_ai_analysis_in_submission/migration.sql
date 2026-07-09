-- CreateEnum
CREATE TYPE "AIAnalysisStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "complexityAnalysisStatus" "AIAnalysisStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "complexityAnalysisVersion" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "complexityGeneratedAt" TIMESTAMP(3),
ADD COLUMN     "complexityQuizCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "complexityQuizCompletedAt" TIMESTAMP(3),
ADD COLUMN     "complexityReasoning" TEXT,
ADD COLUMN     "spaceComplexity" TEXT,
ADD COLUMN     "spaceComplexityOptions" JSONB,
ADD COLUMN     "timeComplexity" TEXT,
ADD COLUMN     "timeComplexityOptions" JSONB;

-- CreateIndex
CREATE INDEX "Submission_complexityAnalysisStatus_idx" ON "Submission"("complexityAnalysisStatus");
