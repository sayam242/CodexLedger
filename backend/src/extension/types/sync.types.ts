export interface ProblemMeta {
  problemNumber: string;
  problemTitle: string;
  slug: string;
  problemUrl: string;

  platform: string;
  difficulty: string;
}

export interface ProblemContent {
  htmlContent: string;
  plainText: string;
}

export interface ProblemTopic {
  name: string;
}

export interface Submission {
  language: string;
  code: string;

  status?: string;

  // errorMessage?: string;

  submittedAt: number;
}

export interface ActiveProblem {
  id: string;
  meta: ProblemMeta;
  topics: ProblemTopic[];
  content: ProblemContent;
  submission?: Submission;
}