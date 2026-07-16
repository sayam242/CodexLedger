import { apiFetch, apiDelete } from "@/shared/services/apiClient";
import type { TutorHistoryResponse } from "../types/tutor.types";

export async function fetchTutorHistory(
  submissionId: string
): Promise<TutorHistoryResponse> {
  return apiFetch<TutorHistoryResponse>(
    `/api/ai/tutor/${submissionId}/history`
  );
}

export async function clearTutorHistory(
  submissionId: string
): Promise<void> {
  return apiDelete<void>(
    `/api/ai/tutor/${submissionId}/history`
  );
}
