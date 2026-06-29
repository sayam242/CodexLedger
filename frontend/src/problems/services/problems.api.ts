import { apiFetch }
from "@/shared/services/apiClient";

import type {
    DashboardStats,
    ProblemCardData
}
from "../types/problem.types";

const BASE_URL =
    "http://localhost:5000/api/dashboard";

export function fetchProblems() {

    return apiFetch<ProblemCardData[]>(

        `${BASE_URL}/problems`

    );

}

export function fetchDashboardStats() {

    return apiFetch<DashboardStats>(

        `${BASE_URL}/stats`

    );

}