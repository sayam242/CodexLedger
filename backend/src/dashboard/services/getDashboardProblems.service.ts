import prisma from "../../lib/prisma";

export async function getDashboardProblems(
    userId: string,
    limit?: number,
){
    const problems =
    await prisma.problem.findMany({

        where: {

            userId

        },

        include: {

            submissions: {

                orderBy: {

                    submittedAt: "desc"

                }

            }

        },

        orderBy: {

            updatedAt: "desc"

        },
        take: limit

    });

    return problems.map(

        problem => ({

            problemId:
                problem.id,

            problemNumber:
                problem.problemNumber,

            title:
                problem.title,

            difficulty:
                problem.difficulty,

            latestStatus:
                problem.submissions[0]?.status
                ?? "Unknown",

            latestSubmissionAt:
                problem.submissions[0]?.submittedAt,

            submissions:

                problem.submissions.map(

                    submission => ({

                        submissionId:
                            submission.id,

                        status:
                            submission.status
                            ?? "Unknown",

                        language:
                            submission.language,

                        submittedAt:
                            submission.submittedAt

                    })

                )

        })

);
}