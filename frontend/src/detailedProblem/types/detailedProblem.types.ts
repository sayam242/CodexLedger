export type SubmissionStatus = 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type AIAnalysisStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

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
  timeComplexity?: string;
  spaceComplexity?: string;
  timeComplexityOptions?: string[];
  spaceComplexityOptions?: string[];
  complexityReasoning?: string;
  complexityAnalysisStatus: AIAnalysisStatus;
  complexityQuizCompleted: boolean;
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

export interface DryRunStep {
  step: number;
  description: string;
  input: string;
  output: string;
}

export interface DryRun {
  title: string;
  steps: DryRunStep[];
  finalOutput: string;
}

export interface EdgeCase {
  name: string;
  description: string;
  input: string;
  expectedBehavior: string;
}

export interface CommonMisunderstanding {
  misunderstanding: string;
  clarification: string;
}

export interface KeyObservation {
  observation: string;
  whyItMatters: string;
}

export interface ImportantNote {
  note: string;
}

export interface ProblemExplanation {
  overview: string;
  inputExplanation: string;
  outputExplanation: string;
  realWorldAnalogy: string;
  dryRuns: DryRun[];
  edgeCases: EdgeCase[];
  commonMisunderstandings: CommonMisunderstanding[];
  keyObservations: KeyObservation[];
  importantNotes: ImportantNote[];
}

