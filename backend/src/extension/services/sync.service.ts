import prisma from "../../lib/prisma";
import { ActiveProblem } from "../types/sync.types";
import { triggerExplanation } from "../../ai/explanation/service";
import { emitToUser } from "../../lib/socketManager";

export async function saveProblem(
  problem: ActiveProblem,
  userId: string
) {

  const isSolved =problem.submission?.status === "Accepted";
  let savedProblemId: string = "";

  await prisma.$transaction(async(tx)=>{

    let savedProblem;

    if (problem.meta.problemNumber) {
      savedProblem = await tx.problem.upsert({

        where:{
          userId_problemNumber:{
            userId: userId,
            problemNumber: problem.meta.problemNumber
          }
        },
        update:{
          difficulty: problem.meta.difficulty,
          title: problem.meta.problemTitle,
          url: problem.meta.problemUrl,
          slug: problem.meta.slug,
          solved:problem.submission?.status=="Accepted" ? true : false,
        },
        create:{
          userId: userId,
          platform: problem.meta.platform,
          problemNumber: problem.meta.problemNumber,
          title: problem.meta.problemTitle,
          slug: problem.meta.slug,
          url: problem.meta.problemUrl,
          difficulty: problem.meta.difficulty
        }

      });
    } else {
      const existingByTitle = await tx.problem.findFirst({
        where: {
          userId,
          title: {
            equals: problem.meta.problemTitle,
            mode: "insensitive"
          }
        }
      });

      if (existingByTitle) {
        savedProblem = await tx.problem.update({
          where: { id: existingByTitle.id },
          data: {
            difficulty: problem.meta.difficulty,
            url: problem.meta.problemUrl,
            slug: problem.meta.slug,
            solved: problem.submission?.status === "Accepted" ? true : false,
          }
        });
      } else {
        savedProblem = await tx.problem.create({
          data:{
            userId: userId,
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
    
    if (problem.submission) {
      await tx.submission.upsert({
        where: {
          problemId_submittedAt: {
            problemId: savedProblem.id,
            submittedAt: new Date(problem.submission.submittedAt)
          }
        },
  
        update: {},
  
        create: {
          problemId: savedProblem.id,
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

    const existingExplanation = await prisma.problemExplanation.findUnique({
      where: { problemId: savedProblemId },
    });

    if (!existingExplanation) {
      const submissionCount = await prisma.submission.count({
        where: { problemId: savedProblemId },
      });

      if (submissionCount === 1) {
        triggerExplanation(savedProblemId).catch(console.error);
      }
    }
  }

}

