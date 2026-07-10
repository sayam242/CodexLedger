import { z } from "zod";

const DryRunStepSchema = z.object({
  step: z.number(),
  description: z.string(),
  input: z.string(),
  output: z.string(),
});

const DryRunSchema = z.object({
  title: z.string(),
  steps: z.array(DryRunStepSchema).min(1),
  finalOutput: z.string(),
});

const EdgeCaseSchema = z.object({
  name: z.string(),
  description: z.string(),
  input: z.string(),
  expectedBehavior: z.string(),
});

const CommonMisunderstandingSchema = z.object({
  misunderstanding: z.string(),
  clarification: z.string(),
});

const KeyObservationSchema = z.object({
  observation: z.string(),
  whyItMatters: z.string(),
});

const ImportantNoteSchema = z.object({
  note: z.string(),
});

export const ProblemExplanationSchema = z.object({
  overview: z.string().min(1),
  inputExplanation: z.string().min(1),
  outputExplanation: z.string().min(1),
  realWorldAnalogy: z.string().min(1),
  dryRuns: z.array(DryRunSchema).min(1).max(3),
  edgeCases: z.array(EdgeCaseSchema).min(1).max(4),
  commonMisunderstandings: z.array(CommonMisunderstandingSchema).min(1).max(4),
  keyObservations: z.array(KeyObservationSchema).min(1).max(5),
  importantNotes: z.array(ImportantNoteSchema).min(1).max(5),
});

export type ValidatedProblemExplanation = z.infer<typeof ProblemExplanationSchema>;

export function validateExplanation(data: unknown): ValidatedProblemExplanation | null {
  const result = ProblemExplanationSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  console.error("Explanation validation failed:", result.error.flatten());
  return null;
}
