/**
 * Data Transfer Objects for Problem Detail API
 */

export interface ProblemDetailDto {
  id: string;
  problemNumber: number;
  title: string;
  difficulty: string;
  url: string;
  topics: string[];
  htmlContent?: string;
  plainText?: string;
  platform: string;
}

export interface SubmissionDto {
  id: string;
  status: string;
  language: string;
  submittedAt: Date;
}

export interface SubmissionDetailDto {
  id: string;
  problemId: string;
  code: string;
  language: string;
  status: string;
  submittedAt: Date;
  errorMessage?: string;
}

export interface ProblemDetailResponseDto {
  problem: ProblemDetailDto;
  submissions: SubmissionDto[];
  totalCount: number;
  hasMore: boolean;
}
