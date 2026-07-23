import prisma from "../../lib/prisma";
import { AIAnalysisStatus } from "@prisma/client";
import { openai, AI_MODEL } from "../shared/aiClient";
import { ComplexityAnalysisResult } from "./types/complexity.types";
import { ComplexityResponseDto } from "./dto/complexity.dto";
import { buildComplexityPrompt } from "./prompts/complexityPrompt";
import { emitToUser } from "../../lib/socketManager";

function validateAnalysisResult(data: unknown): data is ComplexityAnalysisResult {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;

  if (!obj.timeComplexity || !obj.spaceComplexity || typeof obj.reasoning !== "string") return false;

  const tc = obj.timeComplexity as Record<string, unknown>;
  const sc = obj.spaceComplexity as Record<string, unknown>;

  if (typeof tc.correctAnswer !== "string" || !Array.isArray(tc.options) || tc.options.length !== 4) return false;
  if (typeof sc.correctAnswer !== "string" || !Array.isArray(sc.options) || sc.options.length !== 4) return false;

  return true;
}

function extractJSON(text: string): unknown | null {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return null;
  }
}

async function runAIAnalysis(submissionId: string) {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        problem: {
          include: {
            content: true,
            topics: { include: { topic: true } },
          },
        },
      },
    });

    if (!submission) {
      await prisma.submission.update({
        where: { id: submissionId },
        data: { complexityAnalysisStatus: AIAnalysisStatus.FAILED },
      });
      return;
    }

    const problem = submission.problem;
    const tags = problem.topics.map((pt) => pt.topic.name).join(", ");

    const messages = buildComplexityPrompt(
      problem.title,
      problem.content?.plainText || "",
      problem.content?.plainText || "",
      "",
      problem.difficulty,
      tags,
      submission.language,
      submission.code
    );

    const aiResponse = await openai.chat.completions.create({
      model: AI_MODEL,
      messages,
      temperature: 0.3,
    });

    const content = aiResponse.choices[0]?.message?.content;
    if (!content) {
      throw new Error("AI returned empty response");
    }

    const parsed = extractJSON(content);
    if (!parsed || !validateAnalysisResult(parsed)) {
      throw new Error("AI returned invalid JSON structure");
    }

    const result = parsed as ComplexityAnalysisResult;

    await prisma.submission.update({
      where: { id: submissionId },
      data: {
        complexityAnalysisStatus: AIAnalysisStatus.COMPLETED,
        timeComplexity: result.timeComplexity.correctAnswer,
        spaceComplexity: result.spaceComplexity.correctAnswer,
        timeComplexityOptions: result.timeComplexity.options,
        spaceComplexityOptions: result.spaceComplexity.options,
        complexityReasoning: result.reasoning,
        complexityGeneratedAt: new Date(),
      },
    });

    emitToUser(submission.userId, "complexity:completed", { submissionId });
  } catch (error) {
    console.error("AI Analysis failed:", error);
    try {
      const failedSubmission = await prisma.submission.findUnique({
        where: { id: submissionId },
        select: { userId: true },
      });

      await prisma.submission.update({
        where: { id: submissionId },
        data: { complexityAnalysisStatus: AIAnalysisStatus.FAILED },
      });

      if (failedSubmission) {
        emitToUser(failedSubmission.userId, "complexity:failed", { submissionId });
      }
    } catch (updateError) {
      console.error("CRITICAL: Failed to set FAILED status:", updateError);
    }
  }
}

export async function getComplexityAnalysisService(
  submissionId: string,
  userId: string
): Promise<ComplexityResponseDto> {
  const submission = await prisma.submission.findFirst({
    where: {
      id: submissionId,
      userId,
    },
    include: {
      problem: {
        include: {
          content: true,
          topics: { include: { topic: true } },
        },
      },
    },
  });

  if (!submission) {
    throw new Error("Submission not found or unauthorized");
  }

  if (submission.complexityAnalysisStatus === AIAnalysisStatus.COMPLETED) {
    return formatResponse(submission);
  }

  if (submission.complexityAnalysisStatus === AIAnalysisStatus.PROCESSING) {
    return formatResponse(submission);
  }

  await prisma.submission.update({
    where: { id: submissionId },
    data: { complexityAnalysisStatus: AIAnalysisStatus.PROCESSING },
  });

  runAIAnalysis(submissionId).catch(console.error);

  const processingSubmission = await prisma.submission.findUnique({
    where: { id: submissionId },
  });

  return formatResponse(processingSubmission!);
}

function formatResponse(submission: any): ComplexityResponseDto {
  return {
    submissionId: submission.id,
    timeComplexity: submission.timeComplexity || "",
    spaceComplexity: submission.spaceComplexity || "",
    timeComplexityOptions: (submission.timeComplexityOptions as string[]) || [],
    spaceComplexityOptions: (submission.spaceComplexityOptions as string[]) || [],
    reasoning: submission.complexityReasoning || "",
    analysisStatus: submission.complexityAnalysisStatus,
    analysisVersion: submission.complexityAnalysisVersion,
    generatedAt: submission.complexityGeneratedAt,
    quizCompleted: submission.complexityQuizCompleted,
  };
}

export async function markQuizCompletedService(
  submissionId: string,
  userId: string
): Promise<void> {
  const submission = await prisma.submission.findFirst({
    where: {
      id: submissionId,
      userId,
    },
  });

  if (!submission) {
    throw new Error("Submission not found or unauthorized");
  }

  await prisma.submission.update({
    where: { id: submissionId },
    data: {
      complexityQuizCompleted: true,
      complexityAnalysisStatus : AIAnalysisStatus.COMPLETED,
      complexityQuizCompletedAt: new Date(),
    },
  });
}
