import { apiFetch, apiPost } from '@/shared/services/apiClient';
import type{ProblemDetailResponse,SubmissionDetailResponse,ComplexityAnalysisResponse,ComplexityQuizAnswerResponse} from "../types/api.types";


/**
 * Fetch problem details with paginated submissions
 * 
 * @param problemId - The ID of the problem to fetch
 * @param cursor - Optional cursor for pagination
 * @param limit - Number of submissions to fetch (default: 20)
 * @returns Problem with submissions, metadata, and pagination info
 */
export function fetchProblemDetail(
  problemId: string,
  cursor?: string,
  limit: number = 20
): Promise<ProblemDetailResponse> {
  const params = new URLSearchParams({ limit: limit.toString() });
  if (cursor) {
    params.append('cursor', cursor);
  }
  const url = `/api/problems/${problemId}${params.toString() ? '?' + params.toString() : ''}`;
  return apiFetch<ProblemDetailResponse>(url);
}

/**
 * Fetch a specific submission with its full code
 * 
 * @param problemId - The ID of the problem
 * @param submissionId - The ID of the submission to fetch
 * @returns Complete submission data including code
 */
export  function fetchSubmissionDetail(
  problemId: string,
  submissionId: string
): Promise<SubmissionDetailResponse> {
  return apiFetch<SubmissionDetailResponse>(
    `/api/problems/${problemId}/submissions/${submissionId}`
  );
}

/**
 * Fetch or trigger complexity analysis for a submission
 * 
 * @param submissionId - The ID of the submission to analyze
 * @returns Complexity analysis result
 */
export function fetchComplexityAnalysis(
  submissionId: string
): Promise<ComplexityAnalysisResponse> {
  return apiFetch<ComplexityAnalysisResponse>(
    `/api/ai/complexity/${submissionId}`
  );
}

/**
 * Mark complexity quiz as completed for a submission
 * 
 * @param submissionId - The ID of the submission
 * @returns Success message
 */
export function markQuizCompleted(
  submissionId: string
): Promise<ComplexityQuizAnswerResponse> {
  return apiPost<ComplexityQuizAnswerResponse>(
    `/api/ai/complexity/${submissionId}/quiz-complete`
  );
}
