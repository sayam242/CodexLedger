import prisma from "../../lib/prisma";

export async function findSubmissionsByUser(userId: string) {
    return prisma.submission.findMany({
        where: {
            problem: { userId }
        },
        select: {
            problemId: true,
            submittedAt: true,
            status: true
        }
    });
}

export async function countSolvedProblemsByDifficulty(userId: string) {
    const solvedProblems = await prisma.problem.findMany({
        where: {
            userId,
            submissions: {
                some: { status: "Accepted" }
            }
        },
        select: {
            difficulty: true
        }
    });

    const countMap = new Map<string, number>();
    for (const p of solvedProblems) {
        countMap.set(p.difficulty, (countMap.get(p.difficulty) || 0) + 1);
    }

    return Array.from(countMap.entries()).map(([difficulty, count]) => ({
        difficulty,
        count
    }));
}

export async function countSolvedProblems(userId: string) {
    return prisma.problem.count({
        where: {
            userId,
            submissions: {
                some: { status: "Accepted" }
            }
        }
    });
}

export async function countTotalProblems(userId: string) {
    return prisma.problem.count({ where: { userId } });
}

export async function countTotalSubmissions(userId: string) {
    return prisma.submission.count({
        where: { problem: { userId } }
    });
}

export async function countAcceptedSubmissions(userId: string) {
    return prisma.submission.count({
        where: {
            problem: { userId },
            status: 'Accepted'
        }
    });
}

export async function countSolvedProblemsByTopic(userId: string) {
    const problemsWithTopics = await prisma.problem.findMany({
        where: {
            userId,
            submissions: {
                some: { status: "Accepted" }
            }
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
    return prisma.problem.findMany({
        where: {
            userId,
            submissions: {
                some: { status: "Accepted" }
            }
        },
        include: {
            submissions: {
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
