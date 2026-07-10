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

export interface DashboardFilters {
    topic: string;
    dateRange: string;
    status: SubmissionStatus | "All";
}

export type SubmissionStatus =
    | "Accepted"
    | "Wrong Answer"
    | "TLE"
    | "Runtime Error";

export type Difficulty =
    | "Easy"
    | "Medium"
    | "Hard";

export interface ProblemCardData {
    problemId: string;
    problemNumber: string | null;
    title: string;
    difficulty: string;
    latestStatus: string;
    latestSubmissionAt: string;
    submissions: SubmissionData[];
}

export interface SubmissionData {
    submissionId: string;
    status: SubmissionStatus;
    language: string;
    submittedAt: string;
}

export interface RecentProblem {
    problemId: string;
    problemNumber: string | null;
    title: string;
    difficulty: string;
    platform: string;
    url: string;
    topics: string[];
    latestSubmission: {
        status: string;
        language: string;
        submittedAt: string;
    } | null;
}

export interface StrugglingProblem {
    problemId: string;
    title: string;
    difficulty: string;
    rejectionCount: number;
}

export interface SubmissionTimelineItem {
    submissionId: string;
    problemTitle: string;
    problemId: string;
    status: string;
    language: string;
    submittedAt: string;
}

export interface DashboardStrugglingResponse {
    strugglingProblems: StrugglingProblem[];
    recentSubmissions: SubmissionTimelineItem[];
}
