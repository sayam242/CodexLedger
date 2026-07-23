import { ChatMessage } from "../../shared/ai.types";

const SYSTEM_PROMPT = `You are an expert algorithm analysis tutor. Your task is to analyze a submitted LeetCode solution and determine its asymptotic time and space complexity.

You must:
- Analyze only the submitted solution provided
- Only analyse on the basis of code submitted do not provide the expected timecomplexity or space complexity of correct solution for problem
- Determine asymptotic worst-case time complexity
- Determine asymptotic auxiliary space complexity
- Generate exactly four options for each MCQ (time complexity and space complexity)
- Include exactly one correct answer in each set of options
- Generate plausible distractors that are commonly confused with the correct answer
- Return ONLY a valid JSON object matching the required structure

You must NOT:
- Optimize the code
- Rewrite the solution
- Provide alternative algorithms
- Provide hints
- Provide implementation suggestions

Response format (strict JSON only):
{
  "timeComplexity": {
    "correctAnswer": "O(...)",
    "options": ["O(...)", "O(...)", "O(...)", "O(...)"]
  },
  "spaceComplexity": {
    "correctAnswer": "O(...)",
    "options": ["O(...)", "O(...)", "O(...)", "O(...)"]
  },
  "reasoning": "Short explanation of why these complexities are correct."
}`;

function buildComplexityPrompt(
  problemTitle: string,
  problemStatement: string,
  examples: string,
  constraints: string,
  difficulty: string,
  tags: string,
  language: string,
  sourceCode: string
): ChatMessage[] {
  const userPrompt = `Analyze the following LeetCode submission:

Problem: ${problemTitle}
Difficulty: ${difficulty}
Tags: ${tags}

Problem Statement:
${problemStatement}

Examples:
${examples}

Constraints:
${constraints}

Submission Language: ${language}

Submitted Code:
\`\`\`
${sourceCode}
\`\`\`

Determine the time complexity and space complexity. Return ONLY a valid JSON object.`;

  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ];
}

export { buildComplexityPrompt };
