import {
    findSubmissionsByUser,
    countSolvedProblemsByTopic
} from "../repository/dashboard.repository";

import { buildActivityHeatmap } from "../builders/buildActivityHeatmap";
import { buildTopicDistribution } from "../builders/buildTopicDistribution";
import { buildWeeklyTrends } from "../builders/buildWeeklyTrends";

import type { DashboardActivityResponse, TopicDistributionItem } from "../dto/Dashboard.dto";

export async function getDashboardActivity(
    userId: string
): Promise<DashboardActivityResponse> {
    const submissions = await findSubmissionsByUser(userId);

    const heatmap = buildActivityHeatmap(submissions);

    const topicCounts = await countSolvedProblemsByTopic(userId);
    const topicDistribution: TopicDistributionItem[] = topicCounts
        .sort((a, b) => b.count - a.count);

    const now = new Date();
    const weeklyCounts: { weekStart: Date; count: number }[] = [];

    for (let i = 11; i >= 0; i--) {
        const weekEnd = new Date(now);
        weekEnd.setDate(weekEnd.getDate() - (i * 7));
        weekEnd.setHours(23, 59, 59, 999);

        const weekStart = new Date(weekEnd);
        weekStart.setDate(weekStart.getDate() - 6);
        weekStart.setHours(0, 0, 0, 0);

        const uniqueProblems = new Set(
            submissions
                .filter(s => {
                    if (s.status !== 'Accepted') return false;
                    const subTime = new Date(s.submittedAt).getTime();
                    return subTime >= weekStart.getTime() && subTime <= weekEnd.getTime();
                })
                .map(s => s.problemId)
        );

        weeklyCounts.push({
            weekStart: new Date(weekStart),
            count: uniqueProblems.size
        });
    }

    const weeklyTrends = buildWeeklyTrends(weeklyCounts);

    return {
        heatmap,
        topicDistribution,
        weeklyTrends
    };
}
