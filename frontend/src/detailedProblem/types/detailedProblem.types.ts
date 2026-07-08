export type SubmissionStatus = 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: string;
  problemNumber: number;
  title: string;
  difficulty: ProblemDifficulty;
  topics: string[];
  url: string;
  platform?: string;
  plainText?: string;
  htmlContent?: string;
}

export interface Submission {
  id: string;
  problemId: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  runtime?: number;
  memory?: number;
  submittedAt: string;
  errorMessage?: string;

}

export interface ProblemDetailPageData {
  problem: Problem;
  submissions: Submission[];
  selectedSubmissionId: string;
}

export interface NoteResponse {
  content: string;
  updatedAt: string | null;
}

