import type {

  Problem,

  Submission,

  ProblemExplanation

} from "../types/detailedProblem.types";

import type {

  ProblemDetailResponse,

  SubmissionDetailResponse,

  ComplexityAnalysisResponse,

  ExplanationApiResponse

} from "../types/api.types";

export function mapProblemDetail(

  response: ProblemDetailResponse

): {

  problem: Problem;

  submissions: Submission[];

} {

  return {

    problem: {

      id:
        response.problem.id,

      problemNumber:
        response.problem.problemNumber,

      title:
        response.problem.title,

      difficulty:
        response.problem.difficulty,

      topics:
        response.problem.topics,

      url:
        response.problem.url,

      platform:
        response.problem.platform,

      plainText:
        response.problem.plainText,

      htmlContent:
        response.problem.htmlContent

    },

    submissions:

      response.submissions.map(

        submission => ({

          id:
            submission.id,

          problemId:
            response.problem.id,

          code: "",

          language:
            submission.language,

          status:
            submission.status,

          submittedAt:
            submission.submittedAt,

          runtime:
            submission.runtime,

          memory:
            submission.memory,

          timeComplexity: undefined,

          spaceComplexity: undefined,

          timeComplexityOptions: undefined,

          spaceComplexityOptions: undefined,

          complexityReasoning: undefined,

          complexityAnalysisStatus: "PENDING" as const,

          complexityQuizCompleted: false

        })

      )

  };

}

export function mapSubmission(

  response: SubmissionDetailResponse

): Submission {

  return {

    id:
      response.id,

    problemId:
      response.problemId,

    code:
      response.code,

    language:
      response.language,

    status:
      response.status,

    submittedAt:
      response.submittedAt,

    runtime:
      response.runtime,

    memory:
      response.memory,

    errorMessage:
      response.errorMessage,

    timeComplexity: undefined,

    spaceComplexity: undefined,

    timeComplexityOptions: undefined,

    spaceComplexityOptions: undefined,

    complexityReasoning: undefined,

    complexityAnalysisStatus: "PENDING",

    complexityQuizCompleted: false

  };

}

export function mapComplexityAnalysis(
  response: ComplexityAnalysisResponse
): Partial<Submission> {
  return {
    timeComplexity: response.timeComplexity,
    spaceComplexity: response.spaceComplexity,
    timeComplexityOptions: response.timeComplexityOptions,
    spaceComplexityOptions: response.spaceComplexityOptions,
    complexityReasoning: response.reasoning,
    complexityAnalysisStatus: response.analysisStatus,
    complexityQuizCompleted: response.quizCompleted,
  };
}

export function mapExplanation(
  response: ExplanationApiResponse
): {
  explanation: ProblemExplanation | null;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
} {
  return {
    explanation: response.data.explanation as ProblemExplanation | null,
    status: response.data.analysisStatus,
  };
}