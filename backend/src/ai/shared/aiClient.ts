import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENCODE_API_KEY,
  baseURL: "https://opencode.ai/zen/v1",
});

const AI_MODEL = "deepseek-v4-flash-free";

export { openai, AI_MODEL };
