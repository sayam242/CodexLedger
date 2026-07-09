export interface DashboardSubmissionDto {
    submissionId: string;
    status: string;
    language: string;
    submittedAt: Date;
}

export interface DashboardProblemDto {
    problemId: string;
    problemNumber?: string;
    title: string;
    difficulty: string;
    latestStatus: string;
    latestSubmissionAt: Date;
    submissions: DashboardSubmissionDto[];
}

export interface DashboardStats {
    totalSolved: number;
    totalProblems: number;
    totalSubmissions: number;
    acceptanceRate: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
}

export interface HeatmapData {
    data: number[][];
    maxCount: number;
    totalSubmissions: number;
}

export interface TopicDistributionItem {
    topic: string;
    count: number;
}

export interface WeeklyTrendItem {
    week: string;
    count: number;
}

export interface DashboardActivityResponse {
    heatmap: HeatmapData;
    topicDistribution: TopicDistributionItem[];
    weeklyTrends: WeeklyTrendItem[];
}
