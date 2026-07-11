import { useState, useEffect } from "react";
import { fetchExplanation } from "../services/detailedProblem.api";
import { mapExplanation } from "../mappers/detailedProblem.mapper";
import type { ProblemExplanation, AIAnalysisStatus } from "../types/detailedProblem.types";

interface UseExplanationReturn {
  explanation: ProblemExplanation | null;
  status: AIAnalysisStatus;
  loading: boolean;
  error: string | null;
}

export function useExplanation(problemId: string): UseExplanationReturn {
  const [explanation, setExplanation] = useState<ProblemExplanation | null>(null);
  const [status, setStatus] = useState<AIAnalysisStatus>("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const pollInterval = 3000;
    const maxPollTime = 180000;
    const startTime = Date.now();

    const fetchAndTrack = async () => {
      try {
        const response = await fetchExplanation(problemId);
        const mapped = mapExplanation(response);

        setExplanation(mapped.status === "PROCESSING" ? null : mapped.explanation);
        setStatus(mapped.status);
        setLoading(false);
        setError(null);

        if (mapped.status === "PROCESSING" && Date.now() - startTime < maxPollTime) {
          timeoutId = setTimeout(fetchAndTrack, pollInterval);
        }
      } catch (err) {
        if (Date.now() - startTime < maxPollTime) {
          timeoutId = setTimeout(fetchAndTrack, pollInterval);
        } else {
          setError("Failed to load explanation");
          setLoading(false);
        }
      }
    };

    fetchAndTrack();

    return () => clearTimeout(timeoutId);
  }, [problemId]);

  return { explanation, status, loading, error };
}
