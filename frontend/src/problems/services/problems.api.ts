import { apiFetch }
from "@/shared/services/apiClient";

import type {
    DashboardStats,
    ProblemCardData
}
from "../types/problem.types";

export function fetchProblems() {

    return apiFetch<ProblemCardData[]>(

        `/api/dashboard/problems`

    );

}

export function fetchDashboardStats() {

    return apiFetch<DashboardStats>(

        `/api/dashboard/stats`

    );

}

interface BackendProblem {
    id: string;
    platform: string;
    problemNumber: string | null;
    title: string;
    slug: string;
    difficulty: string;
    createdAt: string;
    updatedAt: string;
    submissions: Array<{
        id: string;
        status: | "Accepted" | "Wrong Answer"| "TLE"| "Runtime Error";

        language: string;
        submittedAt: string;
    }>;
}

export interface ProblemsPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface FilteredProblemsResult {
    problems: ProblemCardData[];
    pagination: ProblemsPagination;
}

function mapToCardData(p: BackendProblem): ProblemCardData {
    const submissions = p.submissions.map(s => ({
        submissionId: s.id,
        status: s.status ?? "Unknown",
        language: s.language,
        submittedAt: s.submittedAt,
    }));

    return {
        problemId: p.id,
        problemNumber: p.problemNumber,
        title: p.title,
        difficulty: p.difficulty,
        latestStatus: submissions.length > 0
            ? submissions[0].status
            : "Unknown",
        latestSubmissionAt: submissions.length > 0
            ? submissions[0].submittedAt
            : p.updatedAt,
        submissions,
    };
}

export async function fetchFilteredProblems(
    filters: {
        search: string;
        topics: string[];
        difficulty: string[];
        solved?: boolean;
        fromDate?: string;
        toDate?: string;
        sortOrder: "asc" | "desc";
        page: number;
        limit: number;
    }
): Promise<FilteredProblemsResult> {
    const params = new URLSearchParams();

    if (filters.search) {
        params.append("search", filters.search);
    }
    filters.difficulty.forEach(d => params.append("difficulty", d));
    if (filters.topics?.length) {
        filters.topics.forEach(t => params.append("topics", t));
    }
    if (filters.solved !== undefined) {
        params.append("solved", String(filters.solved));
    }
    if (filters.fromDate) {
        const startOfDay = new Date(filters.fromDate + "T00:00:00");
        params.append("solvedAfter", startOfDay.toISOString());
    }
    if (filters.toDate) {
        const endOfDay = new Date(filters.toDate + "T23:59:59.999");
        params.append("solvedBefore", endOfDay.toISOString());
    }
    params.append("sortOrder", filters.sortOrder);
    params.append("page", String(filters.page));
    params.append("limit", String(filters.limit));

    const qs = params.toString();

    const data = await apiFetch<{
        problems: BackendProblem[];
        pagination: ProblemsPagination;
    }>(`/api/problems${qs ? `?${qs}` : ""}`);

    return {
        problems: data.problems.map(mapToCardData),
        pagination: data.pagination,
    };
}