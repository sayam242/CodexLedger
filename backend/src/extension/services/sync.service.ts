import prisma from "../../lib/prisma";
import { ActiveProblem } from "../types/sync.types";
import { triggerExplanation } from "../../ai/explanation/service";
import { emitToUser } from "../../lib/socketManager";

export async function saveProblem(
  problem: ActiveProblem,
  userId: string
) {

  let savedProblemId: string = "";

  await prisma.$transaction(async(tx)=>{

    let savedProblem;

    // Find or create shared problem (no userId on Problem)
    if (problem.meta.problemNumber) {
      // Try finding by problemNumber first
      savedProblem = await tx.problem.findUnique({
        where: { problemNumber: problem.meta.problemNumber }
      });

      if (savedProblem) {
        // Update existing shared problem
        savedProblem = await tx.problem.update({
          where: { id: savedProblem.id },
          data: {
            difficulty: problem.meta.difficulty,
            title: problem.meta.problemTitle,
            url: problem.meta.problemUrl,
            slug: problem.meta.slug,
          }
        });
      } else {
        // Create new shared problem
        savedProblem = await tx.problem.create({
          data: {
            platform: problem.meta.platform,
            problemNumber: problem.meta.problemNumber,
            title: problem.meta.problemTitle,
            slug: problem.meta.slug,
            url: problem.meta.problemUrl,
            difficulty: problem.meta.difficulty
          }
        });
      }
    } else {
      // No problemNumber — try finding by title (case-insensitive)
      savedProblem = await tx.problem.findFirst({
        where: {
          title: {
            equals: problem.meta.problemTitle,
            mode: "insensitive"
          }
        }
      });

      if (savedProblem) {
        savedProblem = await tx.problem.update({
          where: { id: savedProblem.id },
          data: {
            difficulty: problem.meta.difficulty,
            url: problem.meta.problemUrl,
            slug: problem.meta.slug,
          }
        });
      } else {
        savedProblem = await tx.problem.create({
          data: {
            platform: problem.meta.platform,
            problemNumber: problem.meta.problemNumber,
            title: problem.meta.problemTitle,
            slug: problem.meta.slug,
            url: problem.meta.problemUrl,
            difficulty: problem.meta.difficulty
          }
        });
      }
    }

    savedProblemId = savedProblem.id;
  
    // Upsert ProblemContent (shared, no userId)
    await tx.problemContent.upsert({
      where:{
        problemId: savedProblem.id
      },
      update:{
        htmlContent: problem.content.htmlContent,
        plainText: problem.content.plainText
      },
      create:{
        problemId: savedProblem.id,
        htmlContent: problem.content.htmlContent,
        plainText: problem.content.plainText
      }
    });
  
    // Upsert topics (shared, no userId)
    for (const topic of problem.topics) {
      const savedTopic = await tx.topic.upsert({
  
        where: {
            name: topic.name
        },
  
        update: {},
  
        create: {
            name: topic.name
        }
  
      });
  
      
      await tx.problemTopic.upsert({
  
        where: {
            problemId_topicId: {
                problemId: savedProblem.id,
                topicId: savedTopic.id
            }
        },
  
        update: {},
  
        create: {
            problemId: savedProblem.id,
            topicId: savedTopic.id
        }
      });
    }
    
    // Create submission with userId
    if (problem.submission) {
      await tx.submission.upsert({
        where: {
          problemId_userId_submittedAt: {
            problemId: savedProblem.id,
            userId: userId,
            submittedAt: new Date(problem.submission.submittedAt)
          }
        },
  
        update: {},
  
        create: {
          problemId: savedProblem.id,
          userId: userId,
          language: problem.submission.language,
          code: problem.submission.code,
          status: problem.submission.status,
          submittedAt: new Date(problem.submission.submittedAt)
        }
      });
    }
  },
  {
    timeout: 20000
  }
);

  if (savedProblemId && problem.submission) {
    emitToUser(userId, "problem:synced", {
      problemId: savedProblemId,
      slug: problem.meta.slug,
      title: problem.meta.problemTitle,
    });
    emitToUser(userId, "dashboard:updated");

    // Check if explanation exists for this shared problem
    const existingExplanation = await prisma.problemExplanation.findUnique({
      where: { problemId: savedProblemId },
    });

    if (!existingExplanation) {
      const submissionCount = await prisma.submission.count({
        where: { problemId: savedProblemId },
      });

      if (submissionCount === 1) {
        triggerExplanation(savedProblemId, userId).catch(console.error);
      }
    }
  }

}
