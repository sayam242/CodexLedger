export interface DashboardStats {

    totalSolved: number;

}


export interface DashboardFilters {

  topic: string;

  dateRange: string;

  status: SubmissionStatus | "All";

}
interface FilterBarProps {

  filters: DashboardFilters;

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

  problemId: number;

  title: string;

  difficulty: Difficulty;

  latestStatus: SubmissionStatus;

  latestSubmissionAt: string;

}

