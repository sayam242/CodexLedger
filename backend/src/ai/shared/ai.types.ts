export type AIRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: AIRole;
  content: string;
}
