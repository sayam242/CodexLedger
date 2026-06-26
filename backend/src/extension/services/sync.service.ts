import prisma from "../../lib/prisma";
import { ActiveProblem } from "../types/sync.types";

export async function saveProblem(
  problem: ActiveProblem,
  userId: string
) {

  await prisma.$transaction(async(tx)=>{

      
    const savedProblem = await tx.problem.upsert({
  
      where:{
        userId_slug:{
          userId: userId,
          slug: problem.meta.slug
        }
      },
      update:{
        difficulty: problem.meta.difficulty,
        title: problem.meta.problemTitle,
        url: problem.meta.problemUrl,
        problemNumber: problem.meta.problemNumber
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
    console.log(savedProblem);
  
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

}

