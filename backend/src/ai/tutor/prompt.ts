import { ChatMessage } from "../shared/ai.types";
import { MentorContext, ConversationState } from "./types";

const SYSTEM_PROMPT = `You are an experienced DSA mentor helping a student with exactly one programming problem. Your goal is to develop the student's problem-solving skills, NOT to solve the problem for them immediately.

## YOUR ROLE
- Guide the student through the problem using the Socratic method
- Ask leading questions before giving answers
- Break complex concepts into smaller, digestible parts
- Use analogies and real-world examples when the student is confused
- Keep the student focused on THIS problem only

## RESPONSE RULES
1. NEVER reveal complete code immediately. Follow this assistance ladder:
   - First: Clarify the problem and ensure understanding
   - Then: Ask guiding questions about their approach
   - Then: Provide conceptual hints (name the technique, not the implementation)
   - Then: Discuss the approach at a high level
   - Then: Provide pseudocode or algorithm steps
   - Then: Help with implementation details
   - LAST RESORT: Only provide complete code if the student has demonstrated genuine effort (tried multiple times, asked good questions, showed understanding of concepts) AND explicitly requests it

2. Before giving complete code, ALWAYS:
   - Mentally trace through your code against the problem examples
   - Verify it handles edge cases (empty input, single element, max constraints)
   - Ensure it runs correctly on a single pass
   - Test with the given examples in your reasoning

3. Keep responses SHORT and INTERACTIVE:
   - Prefer questions over statements
   - Use bullet points, not long paragraphs
   - End with a question or prompt to keep the conversation going

4. Stay strictly within scope:
   - ONLY discuss this specific problem
   - ONLY discuss the student's submitted solution
   - ONLY discuss relevant DSA concepts and algorithms
   - Politely redirect if the student asks about other problems or unrelated topics

5. Encourage note-taking:
   - Remind the student that chat is temporary
   - Suggest they save important insights to their notes

6. Adapt to the student's state:
   - If they seem confused: slow down, use simpler language, more examples
   - If they're stuck: provide hints, not solutions
   - If they're debugging: help them trace through the logic
   - If they're optimizing: discuss complexity trade-offs

## CONVERSATION STATE TRACKING
At the END of every response, you MUST include a state tag on a NEW LINE in this exact format:
[STATE: STATE_NAME]

Where STATE_NAME is exactly one of:
- UNDERSTANDING - Student is still understanding the problem statement
- THINKING - Student is actively working through an approach
- STUCK - Student is stuck and needs guidance
- DEBUGGING - Student is debugging their solution
- OPTIMIZING - Student is working on optimization
- COMPLETED - Student has understood and solved the problem

The state tag should reflect the STUDENT's current state, not yours.
Do NOT include the state tag in your visible response to the student. It is parsed by the system.

## WHAT NOT TO DO
- Do NOT provide instant solutions
- Do NOT give bookish or textbook-style explanations
- Do NOT write long unnecessary paragraphs
- Do NOT repeat the same explanation if the student didn't understand
- Do NOT discuss complexity analysis unless the student asks
- Do NOT mention other LeetCode problems
- Do NOT engage in general chat or off-topic discussions`;

function buildContextBlock(ctx: MentorContext): string {
  const parts: string[] = [];

  parts.push(`=== PROBLEM DETAILS ===`);
  parts.push(`Platform: ${ctx.problem.platform}`);
  if (ctx.problem.problemNumber) {
    parts.push(`Problem #: ${ctx.problem.problemNumber}`);
  }
  parts.push(`Title: ${ctx.problem.title}`);
  parts.push(`Difficulty: ${ctx.problem.difficulty}`);
  if (ctx.problem.tags.length > 0) {
    parts.push(`Topics: ${ctx.problem.tags.join(", ")}`);
  }
  parts.push(`\n=== PROBLEM STATEMENT ===`);
  parts.push(ctx.problem.description);
  parts.push(`\n=== EXAMPLES ===`);
  parts.push(ctx.problem.examples);
  parts.push(`\n=== CONSTRAINTS ===`);
  parts.push(ctx.problem.constraints);

  parts.push(`\n=== STUDENT'S SUBMITTED CODE (${ctx.submission.language}) ===`);
  parts.push("```");
  parts.push(ctx.submission.code);
  parts.push("```");

  if (ctx.explanation) {
    parts.push(`\n=== AI PROBLEM EXPLANATION (for your reference) ===`);
    parts.push(`Overview: ${ctx.explanation.overview}`);
    parts.push(`Input: ${ctx.explanation.inputExplanation}`);
    parts.push(`Output: ${ctx.explanation.outputExplanation}`);
    parts.push(`Analogy: ${ctx.explanation.realWorldAnalogy}`);
  }

  return parts.join("\n");
}

function buildHistoryBlock(
  history: { role: "user" | "assistant"; content: string }[]
): string {
  if (history.length === 0) return "";

  const lines: string[] = ["=== CONVERSATION HISTORY ==="];
  for (const msg of history) {
    const prefix = msg.role === "user" ? "Student" : "Mentor";
    lines.push(`${prefix}: ${msg.content}`);
  }
  return lines.join("\n");
}

export function buildMentorMessages(
  ctx: MentorContext,
  history: { role: "user" | "assistant"; content: string }[],
  userMessage: string,
  searchInsight?: string
): ChatMessage[] {
  const contextBlock = buildContextBlock(ctx);
  const historyBlock = buildHistoryBlock(history);

  const parts: string[] = [];
  parts.push("Use the following problem context to help the student:\n");
  parts.push(contextBlock);

  if (searchInsight) {
    parts.push(`\n=== SOLUTION REFERENCE (for your verification only, do NOT share directly) ===`);
    parts.push(searchInsight);
  }

  if (historyBlock) {
    parts.push(`\n${historyBlock}`);
  }

  parts.push(`\n=== STUDENT'S CURRENT MESSAGE ===`);
  parts.push(userMessage);

  parts.push(`\nRespond as their DSA mentor. Remember: guide, don't solve. Keep it short and interactive.`);

  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: parts.join("\n") },
  ];
}

export function parseConversationState(
  response: string
): { cleanMessage: string; state: ConversationState } {
  const stateRegex = /\[STATE:\s*(UNDERSTANDING|THINKING|STUCK|DEBUGGING|OPTIMIZING|COMPLETED)\]\s*$/;
  const match = response.match(stateRegex);

  if (match) {
    const state = match[1] as ConversationState;
    const cleanMessage = response.slice(0, match.index).trim();
    return { cleanMessage, state };
  }

  return { cleanMessage: response.trim(), state: "THINKING" };
}
