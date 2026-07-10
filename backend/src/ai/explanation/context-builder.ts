import { ExplanationContext } from "./types";

interface ProblemRecord {
  title: string;
  difficulty: string;
  content: {
    plainText: string;
    htmlContent: string;
  } | null;
  topics: {
    topic: {
      name: string;
    };
  }[];
}

export function buildExplanationContext(
  problem: ProblemRecord
): ExplanationContext {
  const plainText = problem.content?.plainText || "";

  const examples = extractExamples(plainText);
  const constraints = extractConstraints(plainText);
  const statement = extractStatement(plainText);
  const tags = problem.topics.map((pt) => pt.topic.name).join(", ");

  return {
    title: problem.title,
    statement,
    examples,
    constraints,
    difficulty: problem.difficulty,
    tags,
  };
}

function extractExamples(plainText: string): string {
  const exampleRegex = /Example\s*\d*[:\s]*(.*?)(?=Example\s*\d*[:\s]*|Constraints[:\s]|$)/gis;
  const matches: string[] = [];
  let match;

  while ((match = exampleRegex.exec(plainText)) !== null) {
    const example = match[1]?.trim();
    if (example) {
      matches.push(example);
    }
  }

  if (matches.length === 0) {
    const constraintStart = plainText.indexOf("Constraints");
    if (constraintStart > 0) {
      return plainText.substring(0, constraintStart).trim();
    }
    return plainText;
  }

  return matches.join("\n\n");
}

function extractConstraints(plainText: string): string {
  const constraintIndex = plainText.indexOf("Constraints");
  if (constraintIndex === -1) return "";

  const afterConstraints = plainText.substring(constraintIndex + "Constraints".length);

  const sections = ["Example", "Note", "Follow"];
  let endIndex = afterConstraints.length;

  for (const section of sections) {
    const sectionIndex = afterConstraints.indexOf(section);
    if (sectionIndex !== -1 && sectionIndex < endIndex) {
      endIndex = sectionIndex;
    }
  }

  return afterConstraints.substring(0, endIndex).trim();
}

function extractStatement(plainText: string): string {
  const exampleIndex = plainText.indexOf("Example");
  const constraintIndex = plainText.indexOf("Constraints");

  let endIndex = plainText.length;

  if (exampleIndex !== -1 && exampleIndex < endIndex) {
    endIndex = exampleIndex;
  }
  if (constraintIndex !== -1 && constraintIndex < endIndex) {
    endIndex = constraintIndex;
  }

  return plainText.substring(0, endIndex).trim();
}
