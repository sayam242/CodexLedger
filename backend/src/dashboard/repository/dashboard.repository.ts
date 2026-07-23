import prisma from "../../lib/prisma";

export async function findSubmissionsByUser(userId: string) {
    return prisma.submission.findMany({
        where: {
            userId
        },
        select: {
            problemId: true,
            submittedAt: true,
            status: true
        }
    });
}

export async function countSolvedProblemsByDifficulty(userId: string) {
    // Get distinct problemIds where user has an Accepted submission
    const acceptedProblemIds = await prisma.submission.findMany({
        where: {
            userId,
            status: "Accepted"
        },
        distinct: ["problemId"],
        select: {
            problemId: true
        }
    });

    if (acceptedProblemIds.length === 0) return [];

    // Fetch those problems to get difficulty
    const problems = await prisma.problem.findMany({
        where: {
            id: { in: acceptedProblemIds.map(p => p.problemId) }
        },
        select: {
            difficulty: true
        }
    });

    const countMap = new Map<string, number>();
    for (const p of problems) {
        countMap.set(p.difficulty, (countMap.get(p.difficulty) || 0) + 1);
    }

    return Array.from(countMap.entries()).map(([difficulty, count]) => ({
        difficulty,
        count
    }));
}

export async function countSolvedProblems(userId: string) {
    const result = await prisma.submission.findMany({
        where: {
            userId,
            status: "Accepted"
        },
        distinct: ["problemId"],
        select: {
            problemId: true
        }
    });
    return result.length;
}

export async function countTotalProblems(userId: string) {
    const result = await prisma.submission.findMany({
        where: { userId },
        distinct: ["problemId"],
        select: {
            problemId: true
        }
    });
    return result.length;
}

export async function countTotalSubmissions(userId: string) {
    return prisma.submission.count({
        where: { userId }
    });
}

export async function countAcceptedSubmissions(userId: string) {
    return prisma.submission.count({
        where: {
            userId,
            status: 'Accepted'
        }
    });
}

export async function countSolvedProblemsByTopic(userId: string) {
    // Get distinct problemIds where user has an Accepted submission
    const acceptedProblemIds = await prisma.submission.findMany({
        where: {
            userId,
            status: "Accepted"
        },
        distinct: ["problemId"],
        select: {
            problemId: true
        }
    });

    if (acceptedProblemIds.length === 0) return [];

    // Fetch those problems with their topics
    const problemsWithTopics = await prisma.problem.findMany({
        where: {
            id: { in: acceptedProblemIds.map(p => p.problemId) }
        },
        include: {
            topics: {
                include: {
                    topic: {
                        select: { id: true, name: true }
                    }
                }
            }
        }
    });

    const topicCountMap = new Map<string, { name: string; count: number }>();

    for (const problem of problemsWithTopics) {
        for (const pt of problem.topics) {
            const existing = topicCountMap.get(pt.topic.id);
            if (existing) {
                existing.count++;
            } else {
                topicCountMap.set(pt.topic.id, {
                    name: pt.topic.name,
                    count: 1
                });
            }
        }
    }

    return Array.from(topicCountMap.values()).map(t => ({
        topic: t.name,
        count: t.count
    }));
}

export async function findRecentSolvedProblems(userId: string, limit: number) {
    // Get distinct problemIds where user has an Accepted submission
    const acceptedProblemIds = await prisma.submission.findMany({
        where: {
            userId,
            status: "Accepted"
        },
        distinct: ["problemId"],
        select: {
            problemId: true
        }
    });

    if (acceptedProblemIds.length === 0) return [];

    // Fetch those problems with their submissions and topics
    return prisma.problem.findMany({
        where: {
            id: { in: acceptedProblemIds.map(p => p.problemId) }
        },
        include: {
            submissions: {
                where: { userId },
                orderBy: { submittedAt: 'desc' },
                take: 1,
                select: {
                    status: true,
                    language: true,
                    submittedAt: true
                }
            },
            topics: {
                include: {
                    topic: {
                        select: { name: true }
                    }
                }
            }
        },
        orderBy: { updatedAt: 'desc' },
        take: limit
    });
}

export async function findStrugglingProblems(userId: string, limit: number) {
    // Get distinct problemIds where user has any submission
    const userProblemIds = await prisma.submission.findMany({
        where: { userId },
        distinct: ["problemId"],
        select: {
            problemId: true
        }
    });

    if (userProblemIds.length === 0) return [];

    // Fetch those problems with ALL their submissions (for acceptance rate calc)
    const problems = await prisma.problem.findMany({
        where: {
            id: { in: userProblemIds.map(p => p.problemId) }
        },
        include: {
            submissions: {
                where: { userId },
                select: {
                    status: true
                }
            }
        }
    });

    const struggling = problems.map(problem => {
        const totalSubmissions = problem.submissions.length;
        const acceptedSubmissions = problem.submissions.filter(
            s => s.status === 'Accepted'
        ).length;
        const acceptanceRate = totalSubmissions > 0
            ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
            : 0;

        return {
            problemId: problem.id,
            problemNumber: problem.problemNumber,
            title: problem.title,
            difficulty: problem.difficulty,
            totalSubmissions,
            acceptedSubmissions,
            acceptanceRate,
            updatedAt: problem.updatedAt
        };
    });

    struggling.sort((a, b) => {
        if (a.acceptanceRate !== b.acceptanceRate) {
            return a.acceptanceRate - b.acceptanceRate;
        }
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    });

    return struggling.slice(0, limit);
}

export async function countCurrentStreak(userId: string): Promise<number> {
    const submissions = await prisma.submission.findMany({
        where: {
            userId
        },
        orderBy: { submittedAt: 'desc' }
    });

    if (submissions.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const submission of submissions) {
        const submissionDate = new Date(submission.submittedAt);
        submissionDate.setHours(0, 0, 0, 0);

        if (submissionDate.getTime() === currentDate.getTime()) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (submissionDate.getTime() < currentDate.getTime()) {
            break;
        }
    }

    return streak;
}
