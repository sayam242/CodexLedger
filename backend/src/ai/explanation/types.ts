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

export interface ExplanationJobData {
  problemId: string;
}

export interface ExplanationContext {
  title: string;
  statement: string;
  examples: string;
  constraints: string;
  difficulty: string;
  tags: string;
}

export interface ExplanationResponseDto {
  problemId: string;
  explanation: ProblemExplanation | null;
  analysisStatus: string;
  version: number | null;
  generatedAt: Date | null;
}
