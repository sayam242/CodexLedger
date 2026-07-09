export interface DashboardStats {

    totalSolved: number;

}


export interface DashboardFilters {

  topic: string;

  dateRange: string;

  status: SubmissionStatus | "All";

}
export interface ProblemFilters {
  search: string;
  topics: string[];
  difficulty: string[];
  solved?: boolean;
  fromDate?: string;
  toDate?: string;
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

export type SubmissionStatus =
  | "Accepted"
  | "Wrong Answer"
  | "TLE"
  | "Runtime Error";

export type Difficulty =
  | "Easy"
  | "Medium"
  | "Hard";
export interface ProblemCardData {

    problemId: string;

    problemNumber: string | null;

    title: string;

    difficulty: string;

    latestStatus: string;

    latestSubmissionAt: string;

    submissions: SubmissionData[];

}
export interface SubmissionData {

    submissionId: string;

    status: SubmissionStatus;

    language: string;

    submittedAt: string;

}

