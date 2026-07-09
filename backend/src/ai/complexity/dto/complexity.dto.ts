import { AIAnalysisStatus } from "@prisma/client";

export interface ComplexityResponseDto {
  submissionId: string;
  timeComplexity: string;
  spaceComplexity: string;
  timeComplexityOptions: string[];
  spaceComplexityOptions: string[];
  reasoning: string;
  analysisStatus: AIAnalysisStatus;
  analysisVersion: number;
  generatedAt: Date | null;
  quizCompleted: boolean;
}

export interface ComplexityQuizAnswerDto {
  timeComplexityAnswer: string;
  spaceComplexityAnswer: string;
}
