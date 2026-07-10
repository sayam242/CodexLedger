-- CreateTable
CREATE TABLE "ProblemExplanation" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "explanation" JSONB NOT NULL,
    "analysisStatus" "AIAnalysisStatus" NOT NULL DEFAULT 'PENDING',
    "version" INTEGER NOT NULL DEFAULT 1,
    "generatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemExplanation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProblemExplanation_problemId_key" ON "ProblemExplanation"("problemId");

-- CreateIndex
CREATE INDEX "ProblemExplanation_analysisStatus_idx" ON "ProblemExplanation"("analysisStatus");

-- AddForeignKey
ALTER TABLE "ProblemExplanation" ADD CONSTRAINT "ProblemExplanation_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
