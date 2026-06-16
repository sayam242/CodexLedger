import type {
    ProblemMeta,
    ProblemTopic,
    Submission,
} from "../entities/problem.types";

export interface DashboardProblemCard {
  problemId: string;

  platform: ProblemMeta["platform"];

  title: ProblemMeta["problemTitle"];

  difficulty: ProblemMeta["difficulty"];

  latestStatus: NonNullable<Submission["status"]>;

  latestSubmissionAt: Submission["submittedAt"];

  attempts: number;

  topics: ProblemTopic["name"][];
}

export interface DashboardFilters {
  topics?: ProblemTopic["name"][];

  statuses?: NonNullable<Submission["status"]>[];

  startDate?: number;

  endDate?: number;

  page?: number;

  pageSize?: number;
}



export interface DashboardResponse {
  totalSolved: number;

  totalPages: number;

  problems: DashboardProblemCard[];
}
