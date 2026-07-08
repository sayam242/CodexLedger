/**
 * Problem Detail Page Type Definitions
 */

export type SubmissionStatus = 
  | 'Accepted' 
  | 'Wrong Answer' 
  | 'Time Limit Exceeded' 
  | 'Runtime Error' 
  | 'Compilation Error';

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface ProblemDetail {
  id: string;
  problemNumber: number;
  title: string;
  difficulty: ProblemDifficulty;
  url: string;
  topics: string[];
  htmlContent?: string;
  plainText?: string;
  platform: string;
}

export interface SubmissionDetail {
  id: string;
  problemId: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  runtime?: number;
  memory?: number;
  submittedAt: Date;
  errorMessage?: string;
}

export interface PaginatedSubmission {
  id: string;
  status: SubmissionStatus;
  language: string;
  runtime?: number;
  memory?: number;
  submittedAt: Date;
}

export interface ProblemDetailResponse {
  problem: ProblemDetail;
  submissions: PaginatedSubmission[];
  totalCount: number;
  hasMore: boolean;
}
