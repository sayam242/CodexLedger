import type {
    DashboardStats,
    ProblemCardData,
    DashboardActivityResponse,
    RecentProblem
} from "../types/dashboard.types";
import { apiFetch } from "@/shared/services/apiClient";

export function fetchDashboardStats() {
    return apiFetch<DashboardStats>(`/api/dashboard/stats`);
}

export function fetchDashboardProblems(limit: number = 5) {
    return apiFetch<ProblemCardData[]>(`/api/dashboard/problems?limit=${limit}`);
}

export function fetchDashboardActivity() {
    return apiFetch<DashboardActivityResponse>(`/api/dashboard/activity`);
}

export function fetchRecentProblems(limit: number = 5) {
    return apiFetch<RecentProblem[]>(`/api/dashboard/problems?limit=${limit}`);
}
