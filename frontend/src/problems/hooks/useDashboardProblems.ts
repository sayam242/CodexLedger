import { useEffect, useState } from "react";

import {
  fetchProblems
} from "../services/problems.api";

import type {
  ProblemCardData
} from "../types/problem.types";

export function useDashboardProblems() {

  const [
    problems,
    setProblems
  ] = useState<
    ProblemCardData[]
  >([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState<
    string | null
  >(null);

  useEffect(() => {

    async function loadProblems() {

      try {

        const data =
          await fetchProblems();

        setProblems(
          data
        );

      }

      catch (error) {

        console.error(
          error
        );

        setError(
          "Failed to load problems"
        );

      }

      finally {

        setLoading(
          false
        );

      }

    }

    loadProblems();

  }, []);

  return {

    problems,

    loading,

    error

  };

}