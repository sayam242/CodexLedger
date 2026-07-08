import { useEffect, useState } from "react";

import { fetchProblemDetail } from "../services/detailedProblem.api";

import { mapProblemDetail } from "../mappers/detailedProblem.mapper";

import type {
  Problem,
  Submission
} from "../types/detailedProblem.types";

export function useProblem(
  problemId: string
) {

  const [
    problem,
    setProblem
  ] = useState<Problem | null>(null);

  const [
    submissions,
    setSubmissions
  ] = useState<Submission[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState<string | null>(null);

  useEffect(() => {

    if (!problemId) {

      setError(
        "Problem ID is required"
      );

      setLoading(false);

      return;

    }

    async function loadProblem() {

      try {

        setLoading(true);

        setError(null);

        const response =
          await fetchProblemDetail(
            problemId
          );

        const {

          problem,

          submissions

        } = mapProblemDetail(
          response
        );

        setProblem(
          problem
        );

        setSubmissions(
          submissions
        );

      }

      catch (error) {

        console.error(error);

        setError(

          error instanceof Error

            ? error.message

            : "Failed to load problem"

        );

      }

      finally {

        setLoading(false);

      }

    }

    loadProblem();

  }, [problemId]);

  return {

    problem,

    submissions,

    loading,

    error

  };

}