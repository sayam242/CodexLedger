import type {DashboardStats,ProblemCardData} from "../types/dashboard.types";
import {apiFetch} from "@/shared/services/apiClient";

export function fetchDashboardStats() {

  return apiFetch<DashboardStats>(
    `/api/dashboard/stats`
  );

}

export function fetchDashboardProblems() {

  return apiFetch<ProblemCardData[]>(

    `/api/dashboard/problems?limit=10`

  );

}