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