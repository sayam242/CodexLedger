import {
    countSolvedProblems,
    countTotalProblems,
    countTotalSubmissions,
    countAcceptedSubmissions,
    countSolvedProblemsByDifficulty
} from "../repository/dashboard.repository";

import type { DashboardStats } from "../dto/Dashboard.dto";

export async function getDashboardStats(
    userId: string
): Promise<DashboardStats> {
    const [
        totalSolved,
        totalProblems,
        totalSubmissions,
        acceptedSubmissions,
        difficultyCounts
    ] = await Promise.all([
        countSolvedProblems(userId),
        countTotalProblems(userId),
        countTotalSubmissions(userId),
        countAcceptedSubmissions(userId),
        countSolvedProblemsByDifficulty(userId)
    ]);

    const easySolved = difficultyCounts.find(d => d.difficulty === 'Easy')?.count ?? 0;
    const mediumSolved = difficultyCounts.find(d => d.difficulty === 'Medium')?.count ?? 0;
    const hardSolved = difficultyCounts.find(d => d.difficulty === 'Hard')?.count ?? 0;

    const acceptanceRate = totalSubmissions > 0
        ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
        : 0;

    return {
        totalSolved,
        totalProblems,
        totalSubmissions,
        acceptanceRate,
        easySolved,
        mediumSolved,
        hardSolved
    };
}
