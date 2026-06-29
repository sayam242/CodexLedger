import type {DashboardStats,ProblemCardData} from "../types/dashboard.types";
import {apiFetch} from "@/shared/services/apiClient";

const BASE_URL = "http://localhost:5000/api/dashboard";

export function fetchDashboardStats() {

  return apiFetch<DashboardStats>(
    `${BASE_URL}/stats`
  );

}

export function fetchDashboardProblems() {

  return apiFetch<ProblemCardData[]>(

    `${BASE_URL}/problems?limit=10`

  );

}