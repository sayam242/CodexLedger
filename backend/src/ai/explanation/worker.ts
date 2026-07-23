import { Worker, Job } from "bullmq";
import prisma from "../../lib/prisma";
import { AIAnalysisStatus } from "@prisma/client";
import { openai, AI_MODEL } from "../shared/aiClient";
import { ExplanationJobData } from "./types";
import { buildExplanationContext } from "./context-builder";
import { buildExplanationPrompt } from "./prompt";
import { validateExplanation } from "./schema";
import { emitToUser } from "../../lib/socketManager";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

function extractJSON(text: string): unknown | null {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return null;
  }
}

async function processExplanationJob(job: Job<ExplanationJobData>) {
  const { problemId, userId } = job.data;

  console.log(`Processing explanation job for problem: ${problemId}`);

  await prisma.problemExplanation.update({
    where: { problemId },
    data: { analysisStatus: AIAnalysisStatus.PROCESSING },
  });

  try {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        content: true,
        topics: { include: { topic: true } },
      },
    });

    if (!problem) {
      throw new Error(`Problem not found: ${problemId}`);
    }

    const context = buildExplanationContext(problem);
    const messages = buildExplanationPrompt(context);

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
    if (!parsed) {
      throw new Error("Failed to extract JSON from AI response");
    }

    const validated = validateExplanation(parsed);
    if (!validated) {
      throw new Error("AI response failed Zod validation");
    }

    await prisma.problemExplanation.update({
      where: { problemId },
      data: {
        explanation: validated as any,
        analysisStatus: AIAnalysisStatus.COMPLETED,
        generatedAt: new Date(),
      },
    });

    emitToUser(userId, "explanation:completed", { problemId });

    console.log(`Explanation completed for problem: ${problemId}`);
  } catch (error) {
    console.error(`Explanation failed for problem ${problemId}:`, error);

    await prisma.problemExplanation.update({
      where: { problemId },
      data: {
        analysisStatus: AIAnalysisStatus.FAILED,
      },
    });

    emitToUser(userId, "explanation:failed", { problemId });

    throw error;
  }
}

let worker: Worker | null = null;

export function startExplanationWorker() {
  if (worker) return;

  worker = new Worker("explanation", processExplanationJob, {
    connection: {
      url: REDIS_URL,
    },
    concurrency: 2,
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
  });

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  console.log("Explanation worker started");
}

export function stopExplanationWorker() {
  if (worker) {
    worker.close();
    worker = null;
  }
}
