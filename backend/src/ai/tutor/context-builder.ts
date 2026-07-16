import prisma from "../../lib/prisma";
import {
  MentorContext,
  MentorProblemContext,
  MentorSubmissionContext,
  MentorExplanationContext,
} from "./types";

interface ExplanationJson {
  overview?: string;
  inputExplanation?: string;
  outputExplanation?: string;
  realWorldAnalogy?: string;
}

export async function buildMentorContext(
  submissionId: string,
  userId: string
): Promise<MentorContext> {
  const submission = await prisma.submission.findFirst({
    where: {
      id: submissionId,
      problem: { userId },
    },
    include: {
      problem: {
        include: {
          content: true,
          topics: { include: { topic: true } },
          explanation: true,
        },
      },
    },
  });

  if (!submission) {
    throw new Error("Submission not found or unauthorized");
  }

  const problem = submission.problem;
  const content = problem.content;
  const plainText = content?.plainText || "";

  const problemCtx: MentorProblemContext = {
    problemId: problem.id,
    title: problem.title,
    problemNumber: problem.problemNumber,
    platform: problem.platform,
    difficulty: problem.difficulty,
    description: extractStatement(plainText),
    examples: extractExamples(plainText),
    constraints: extractConstraints(plainText),
    tags: problem.topics.map((pt) => pt.topic.name),
  };

  const submissionCtx: MentorSubmissionContext = {
    submissionId: submission.id,
    language: submission.language,
    code: submission.code,
  };

  let explanationCtx: MentorExplanationContext | null = null;
  if (problem.explanation?.explanation) {
    const exp = problem.explanation.explanation as unknown as ExplanationJson;
    if (exp.overview) {
      explanationCtx = {
        overview: exp.overview || "",
        inputExplanation: exp.inputExplanation || "",
        outputExplanation: exp.outputExplanation || "",
        realWorldAnalogy: exp.realWorldAnalogy || "",
      };
    }
  }

  return {
    problem: problemCtx,
    submission: submissionCtx,
    explanation: explanationCtx,
  };
}

function extractStatement(plainText: string): string {
  const exampleIndex = plainText.indexOf("Example");
  const constraintIndex = plainText.indexOf("Constraints");
  let endIndex = plainText.length;
  if (exampleIndex !== -1 && exampleIndex < endIndex) endIndex = exampleIndex;
  if (constraintIndex !== -1 && constraintIndex < endIndex)
    endIndex = constraintIndex;
  return plainText.substring(0, endIndex).trim();
}

function extractExamples(plainText: string): string {
  const exampleRegex =
    /Example\s*\d*[:\s]*(.*?)(?=Example\s*\d*[:\s]*|Constraints[:\s]|$)/gis;
  const matches: string[] = [];
  let match;
  while ((match = exampleRegex.exec(plainText)) !== null) {
    const example = match[1]?.trim();
    if (example) matches.push(example);
  }
  if (matches.length === 0) {
    const constraintStart = plainText.indexOf("Constraints");
    if (constraintStart > 0) {
      return plainText.substring(0, constraintStart).trim();
    }
    return plainText;
  }
  return matches.join("\n\n");
}

function extractConstraints(plainText: string): string {
  const constraintIndex = plainText.indexOf("Constraints");
  if (constraintIndex === -1) return "";
  const afterConstraints = plainText.substring(
    constraintIndex + "Constraints".length
  );
  const sections = ["Example", "Note", "Follow"];
  let endIndex = afterConstraints.length;
  for (const section of sections) {
    const sectionIndex = afterConstraints.indexOf(section);
    if (sectionIndex !== -1 && sectionIndex < endIndex) {
      endIndex = sectionIndex;
    }
  }
  return afterConstraints.substring(0, endIndex).trim();
}
