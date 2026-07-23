import prisma from "../../lib/prisma";
import { AIAnalysisStatus } from "@prisma/client";
import explanationQueue from "../shared/queue";
import { ExplanationResponseDto, ProblemExplanation } from "./types";

export async function getExplanationService(
  problemId: string,
  userId: string
): Promise<ExplanationResponseDto> {
  // Problem is shared — just verify it exists
  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
  });

  if (!problem) {
    throw new Error("Problem not found or unauthorized");
  }

  const explanation = await prisma.problemExplanation.findUnique({
    where: { problemId },
  });

  if (!explanation) {
    return {
      problemId,
      explanation: null,
      analysisStatus: "PENDING",
      version: null,
      generatedAt: null,
    };
  }

  // Auto-retry FAILED explanations: delete and re-queue
  if (explanation.analysisStatus === AIAnalysisStatus.FAILED) {
    await prisma.problemExplanation.delete({ where: { problemId } });
    await triggerExplanation(problemId, userId);
    return {
      problemId,
      explanation: null,
      analysisStatus: "PENDING",
      version: null,
      generatedAt: null,
    };
  }

  return {
    problemId,
    explanation: explanation.explanation as unknown as ProblemExplanation,
    analysisStatus: explanation.analysisStatus,
    version: explanation.version,
    generatedAt: explanation.generatedAt,
  };
}

export async function triggerExplanation(problemId: string, userId?: string): Promise<void> {
  const existing = await prisma.problemExplanation.findUnique({
    where: { problemId },
  });

  if (existing) {
    return;
  }

  await prisma.problemExplanation.create({
    data: {
      problemId,
      explanation: {},
      analysisStatus: AIAnalysisStatus.PENDING,
    },
  });

  await explanationQueue.add("generate-explanation", { problemId, userId }, {
    jobId: problemId,
  });

  console.log(`Explanation job queued for problem: ${problemId}`);
}
