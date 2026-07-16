export interface TutorHistoryResponseDto {
  submissionId: string;
  messages: {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
  }[];
}
