import prisma from "../../lib/prisma";
import { AIAnalysisStatus } from "@prisma/client";
import explanationQueue from "../shared/queue";
import { ExplanationResponseDto, ProblemExplanation } from "./types";

export async function getExplanationService(
  problemId: string,
  userId: string
): Promise<ExplanationResponseDto> {
  const problem = await prisma.problem.findFirst({
    where: {
      id: problemId,
      userId,
    },
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

  return {
    problemId,
    explanation: explanation.explanation as unknown as ProblemExplanation,
    analysisStatus: explanation.analysisStatus,
    version: explanation.version,
    generatedAt: explanation.generatedAt,
  };
}

export async function triggerExplanation(problemId: string): Promise<void> {
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

  await explanationQueue.add("generate-explanation", { problemId }, {
    jobId: problemId,
  });

  console.log(`Explanation job queued for problem: ${problemId}`);
}
