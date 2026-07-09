export interface MCQOption {
  correctAnswer: string;
  options: [string, string, string, string];
}

export interface ComplexityAnalysisResult {
  timeComplexity: MCQOption;
  spaceComplexity: MCQOption;
  reasoning: string;
}
