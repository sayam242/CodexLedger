import type {
  ProblemDifficulty,
  SubmissionStatus
} from "./detailedProblem.types";

export interface ProblemDetailResponse {

  problem: {

    id: string;

    problemNumber: number;

    title: string;

    difficulty: ProblemDifficulty;

    url: string;

    platform?: string;

    topics: string[];

    plainText?: string;

    htmlContent?: string;

  };

  submissions: SubmissionSummaryResponse[];

  totalCount: number;

  hasMore: boolean;

}

export interface SubmissionSummaryResponse {

  id: string;

  language: string;

  status: SubmissionStatus;

  submittedAt: string;

  runtime?: number;

  memory?: number;

}

export interface SubmissionDetailResponse {

  id: string;

  problemId: string;

  language: string;

  code: string;

  status: SubmissionStatus;

  submittedAt: string;

  runtime?: number;

  memory?: number;

  errorMessage?: string;

}