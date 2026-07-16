import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchSubmissionDetail } from "../services/detailedProblem.api";

import { mapSubmission } from "../mappers/detailedProblem.mapper";

import type { Submission } from "../types/detailedProblem.types";

export function useSubmission(
  problemId: string,
  submissions: Submission[] = []
) {

  const [searchParams] = useSearchParams();

  const [
    selectedSubmissionId,
    setSelectedSubmissionId
  ] = useState(searchParams.get("submission") || "");

  const [
    selectedSubmission,
    setSelectedSubmission
  ] = useState<Submission | null>(null);

  useEffect(() => {

    if (
      submissions.length === 0
    ) {

      return;

    }

    if (
      !selectedSubmissionId
    ) {

      setSelectedSubmissionId(
        submissions[0].id
      );

    }

  }, [

    submissions,

    selectedSubmissionId

  ]);

  useEffect(() => {

    if (

      !problemId ||

      !selectedSubmissionId

    ) {

      return;

    }

    async function loadSubmission() {

      try {

        const response =
          await fetchSubmissionDetail(

            problemId,

            selectedSubmissionId

          );

        setSelectedSubmission(

          mapSubmission(
            response
          )

        );

      }

      catch (error) {

        console.error(error);

        const fallback =
          submissions.find(

            submission =>

              submission.id ===
              selectedSubmissionId

          );

        if (

          fallback

        ) {

          setSelectedSubmission({

            ...fallback,

            code:
              "Failed to load code"

          });

        }

      }

    }

    loadSubmission();

  }, [

    problemId,

    selectedSubmissionId,

    submissions

  ]);

  function selectSubmission(
    submissionId: string
  ) {

    if (

      submissionId ===
      selectedSubmissionId

    ) {

      return;

    }

    setSelectedSubmissionId(
      submissionId
    );

  }

  return {

    selectedSubmission,

    selectedSubmissionId,

    selectSubmission

  };

}