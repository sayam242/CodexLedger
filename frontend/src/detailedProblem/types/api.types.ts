import type {
  ProblemDifficulty,
  SubmissionStatus
} from "./detailedProblem.types";

export type AIAnalysisStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface ComplexityAnalysisResponse {
  submissionId: string;
  timeComplexity: string;
  spaceComplexity: string;
  timeComplexityOptions: string[];
  spaceComplexityOptions: string[];
  reasoning: string;
  analysisStatus: AIAnalysisStatus;
  analysisVersion: number;
  generatedAt: string | null;
  quizCompleted: boolean;
}

export interface ComplexityQuizAnswerResponse {
  message: string;
}

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

export interface ExplanationApiResponse {
  success: boolean;
  data: {
    problemId: string;
    explanation: {
      overview: string;
      inputExplanation: string;
      outputExplanation: string;
      realWorldAnalogy: string;
      dryRuns: Array<{
        title: string;
        steps: Array<{
          step: number;
          description: string;
          input: string;
          output: string;
        }>;
        finalOutput: string;
      }>;
      edgeCases: Array<{
        name: string;
        description: string;
        input: string;
        expectedBehavior: string;
      }>;
      commonMisunderstandings: Array<{
        misunderstanding: string;
        clarification: string;
      }>;
      keyObservations: Array<{
        observation: string;
        whyItMatters: string;
      }>;
      importantNotes: Array<{
        note: string;
      }>;
    } | null;
    analysisStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    version: number | null;
    generatedAt: string | null;
  };
}