export type ConversationState =
  | "UNDERSTANDING"
  | "THINKING"
  | "STUCK"
  | "DEBUGGING"
  | "OPTIMIZING"
  | "COMPLETED";

export interface MentorProblemContext {
  problemId: string;
  title: string;
  problemNumber: string | null;
  platform: string;
  difficulty: string;
  description: string;
  examples: string;
  constraints: string;
  tags: string[];
}

export interface MentorSubmissionContext {
  submissionId: string;
  language: string;
  code: string;
}

export interface MentorExplanationContext {
  overview: string;
  inputExplanation: string;
  outputExplanation: string;
  realWorldAnalogy: string;
}

export interface MentorContext {
  problem: MentorProblemContext;
  submission: MentorSubmissionContext;
  explanation: MentorExplanationContext | null;
}

export interface MentorChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface TutorChatRequest {
  submissionId: string;
  message: string;
}

export interface TutorHistoryResponseDto {
  submissionId: string;
  messages: {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
  }[];
}

export interface SearchInsight {
  approach: string;
  keyPoints: string[];
  solutionReference: string;
}
