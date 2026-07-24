import { Socket } from "socket.io";
import { openai, AI_MODEL } from "../shared/aiClient";
import { ChatMessage } from "../shared/ai.types";
import { buildMentorContext } from "./context-builder";
import { buildMentorMessages, parseConversationState } from "./prompt";
import {
  getHistory,
  getTrimmedHistory,
  addMessage,
  clearHistory,
} from "./store";
import { searchForSolution } from "./web-search";
import { MentorContext, ConversationState, TutorHistoryResponseDto } from "./types";

const contextCache = new Map<string, MentorContext>();

const CODE_REQUEST_KEYWORDS = [
  "give me the code",
  "show me the code",
  "write the code",
  "complete code",
  "full code",
  "solution code",
  "provide code",
  "implement it",
  "write the solution",
  "show solution",
  "code dedo",
  "code do",
  "pura code",
  "complete solution",
];

function shouldSearchWeb(userMessage: string): boolean {
  const lower = userMessage.toLowerCase();
  return CODE_REQUEST_KEYWORDS.some((kw) => lower.includes(kw));
}

async function streamResponse(
  messages: ChatMessage[],
  socket: Socket
): Promise<string> {
  const stream = await openai.chat.completions.create({
    model: AI_MODEL,
    messages,
    stream: true,
    temperature: 0.3,
  });

  let fullResponse = "";
  let truncated = false;
  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content;
    if (token) {
      fullResponse += token;
      socket.emit("tutor:chunk", { chunk: token });
    }
    if (chunk.choices[0]?.finish_reason === "length") {
      truncated = true;
    }
  }
  if (truncated) {
    fullResponse += "\n\n[Response was truncated due to length limit]";
  }
  return fullResponse;
}

export async function handleTutorChat(
  submissionId: string,
  userId: string,
  message: string,
  socket: Socket
): Promise<void> {
  try {
    let ctx = contextCache.get(submissionId);
    if (!ctx) {
      ctx = await buildMentorContext(submissionId, userId);
      contextCache.set(submissionId, ctx);
    }

    addMessage(submissionId, {
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    const trimmedHistory = getTrimmedHistory(submissionId);
    const historyWithoutCurrent = trimmedHistory.slice(0, -1);

    let searchInsight: string | undefined;
    if (shouldSearchWeb(message)) {
      try {
        const insight = await searchForSolution(ctx);
        if (insight) {
          searchInsight = JSON.stringify(insight);
        }
      } catch {
        // Web search failed — continue without it, AI self-verifies
      }
    }

    const messages = buildMentorMessages(
      ctx,
      historyWithoutCurrent,
      message,
      searchInsight
    );

    const fullResponse = await streamResponse(messages, socket);

    if (!fullResponse.trim()) {
      socket.emit("tutor:error", {
        message: "The AI returned an empty response. Please try again.",
      });
      return;
    }

    const { cleanMessage, state } = parseConversationState(fullResponse);

    addMessage(submissionId, {
      role: "assistant",
      content: cleanMessage,
      timestamp: new Date(),
    });

    socket.emit("tutor:done", { conversationState: state });
  } catch (error) {
    console.error("Tutor chat error:", error);
    socket.emit("tutor:error", {
      message: "Failed to process your message. Please try again.",
    });
  }
}

export function getChatHistory(
  submissionId: string,
  userId: string
): Promise<TutorHistoryResponseDto> {
  const messages = getHistory(submissionId);
  const formatted = messages.map((m) => ({
    ...m,
    timestamp: new Date().toISOString(),
  }));
  return Promise.resolve({
    submissionId,
    messages: formatted,
  });
}

export function clearChatHistory(
  submissionId: string,
  userId: string
): Promise<void> {
  clearHistory(submissionId);
  contextCache.delete(submissionId);
  return Promise.resolve();
}
