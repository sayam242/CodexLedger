import { MentorChatMessage } from "./types";

const MAX_HISTORY = 12;

const chatStore = new Map<string, MentorChatMessage[]>();
const summaryStore = new Map<string, string>();

export function getHistory(
  submissionId: string
): { role: "user" | "assistant"; content: string }[] {
  const messages = chatStore.get(submissionId) || [];
  return messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));
}

export function addMessage(
  submissionId: string,
  message: MentorChatMessage
): void {
  const messages = chatStore.get(submissionId) || [];
  messages.push(message);
  chatStore.set(submissionId, messages);
}

export function clearHistory(submissionId: string): void {
  chatStore.delete(submissionId);
  summaryStore.delete(submissionId);
}

export function getTrimmedHistory(
  submissionId: string
): { role: "user" | "assistant"; content: string }[] {
  const messages = chatStore.get(submissionId) || [];
  if (messages.length <= MAX_HISTORY) {
    return messages
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));
  }

  const oldMessages = messages.slice(0, messages.length - MAX_HISTORY);
  const recentMessages = messages.slice(messages.length - MAX_HISTORY);

  const existingSummary = summaryStore.get(submissionId) || "";
  const newSummary = buildSummary(existingSummary, oldMessages);
  summaryStore.set(submissionId, newSummary);

  const result: { role: "user" | "assistant"; content: string }[] = [];
  if (newSummary) {
    result.push({
      role: "assistant",
      content: `[Previous conversation summary: ${newSummary}]`,
    });
  }
  for (const msg of recentMessages) {
    if (msg.role !== "system") {
      result.push({ role: msg.role as "user" | "assistant", content: msg.content });
    }
  }

  return result;
}

function buildSummary(
  existingSummary: string,
  messages: MentorChatMessage[]
): string {
  if (messages.length === 0) return existingSummary;

  const conversationLines = messages.map((m) => {
    const prefix = m.role === "user" ? "Student" : "Mentor";
    return `${prefix}: ${m.content}`;
  });

  const keyPoints = conversationLines.join("; ");

  if (!existingSummary) {
    return `Earlier discussion covered: ${keyPoints}`;
  }

  return `${existingSummary}. Then: ${keyPoints}`;
}
