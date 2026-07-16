export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface TutorHistoryMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface TutorHistoryResponse {
  submissionId: string;
  messages: TutorHistoryMessage[];
}

export type ConversationState =
  | "UNDERSTANDING"
  | "THINKING"
  | "STUCK"
  | "DEBUGGING"
  | "OPTIMIZING"
  | "COMPLETED";
