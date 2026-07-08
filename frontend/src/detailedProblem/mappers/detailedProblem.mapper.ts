import type {

  Problem,

  Submission

} from "../types/detailedProblem.types";

import type {

  ProblemDetailResponse,

  SubmissionDetailResponse

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
            submission.memory

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
      response.errorMessage

  };

}