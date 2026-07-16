import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { ChatMessage } from "./ai.types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
  return genAI;
}

export function getGeminiModel(model?: string): GenerativeModel {
  return getClient().getGenerativeModel({ model: model || GEMINI_MODEL });
}

export function getGeminiSearchModel(model?: string): GenerativeModel {
  return getClient().getGenerativeModel({
    model: model || GEMINI_MODEL,
    tools: [{ googleSearchRetrieval: {} }],
  });
}

export function geminiMessagesToPrompt(
  messages: ChatMessage[]
): string {
  const parts: string[] = [];
  for (const msg of messages) {
    if (msg.role === "system") {
      parts.push(`[System Instructions]\n${msg.content}\n`);
    } else if (msg.role === "user") {
      parts.push(`[User]\n${msg.content}\n`);
    } else if (msg.role === "assistant") {
      parts.push(`[Assistant]\n${msg.content}\n`);
    }
  }
  return parts.join("\n");
}

export async function* streamGeminiResponse(
  messages: ChatMessage[]
): AsyncGenerator<string, void, unknown> {
  const model = getGeminiModel();
  const prompt = geminiMessagesToPrompt(messages);

  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      yield text;
    }
  }
}

export async function geminiSearch(
  prompt: string
): Promise<string | null> {
  try {
    const model = getGeminiSearchModel();
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini search failed:", error);
    return null;
  }
}
