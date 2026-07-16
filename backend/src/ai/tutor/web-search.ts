import OpenAI from "openai";
import { geminiSearch } from "../shared/geminiClient";
import { MentorContext, SearchInsight } from "./types";

function buildSearchPrompt(ctx: MentorContext): string {
  return `You are verifying the correct approach for this programming problem. Search the web for the standard solution approach.

Problem: ${ctx.problem.title} (${ctx.problem.platform} ${ctx.problem.problemNumber || ""})
Difficulty: ${ctx.problem.difficulty}
Topics: ${ctx.problem.tags.join(", ")}

Problem Statement:
${ctx.problem.description}

Examples:
${ctx.problem.examples}

Constraints:
${ctx.problem.constraints}

Search the web and provide:
1. The standard approach/algorithm used to solve this problem
2. Key points about the approach (2-3 bullet points)
3. A brief description of the solution logic

Return your response in this EXACT JSON format (no markdown fences):
{
  "approach": "brief name of the approach",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "solutionReference": "brief description of how the solution works"
}`;
}

function parseSearchResult(text: string): SearchInsight | null {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    return JSON.parse(jsonMatch[0]) as SearchInsight;
  } catch {
    return null;
  }
}

async function searchWithGemini(
  prompt: string
): Promise<SearchInsight | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const result = await geminiSearch(prompt);
    if (!result) return null;
    return parseSearchResult(result);
  } catch (error) {
    console.error("Gemini search failed:", error);
    return null;
  }
}

async function searchWithOpenAI(
  prompt: string
): Promise<SearchInsight | null> {
  if (!process.env.OPENAI_API_KEY) return null;

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-4o",
      tools: [{ type: "web_search" }],
      input: prompt,
    });

    const output = response.output;
    if (!output || output.length === 0) return null;

    const textBlock = output.find(
      (block): block is Extract<typeof block, { type: "message" }> =>
        block.type === "message"
    );
    if (!textBlock || !("content" in textBlock)) return null;

    const content = textBlock.content;
    if (!Array.isArray(content)) return null;

    const textItem = content.find(
      (item): item is Extract<typeof item, { type: "output_text" }> =>
        item.type === "output_text"
    );
    if (!textItem || !textItem.text) return null;

    return parseSearchResult(textItem.text);
  } catch (error) {
    console.error("OpenAI search failed:", error);
    return null;
  }
}

export async function searchForSolution(
  ctx: MentorContext
): Promise<SearchInsight | null> {
  const prompt = buildSearchPrompt(ctx);

  const geminiResult = await searchWithGemini(prompt);
  if (geminiResult) return geminiResult;

  const openaiResult = await searchWithOpenAI(prompt);
  if (openaiResult) return openaiResult;

  return null;
}
