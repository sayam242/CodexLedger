import { useState, useEffect, useCallback } from "react";
import { fetchExplanation } from "../services/detailedProblem.api";
import { mapExplanation } from "../mappers/detailedProblem.mapper";
import { getSocket } from "@/lib/socket";
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

  const loadExplanation = useCallback(async () => {
    try {
      const response = await fetchExplanation(problemId);
      const mapped = mapExplanation(response);

      setExplanation(mapped.status === "PROCESSING" ? null : mapped.explanation);
      setStatus(mapped.status);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Failed to load explanation");
      setLoading(false);
    }
  }, [problemId]);

  useEffect(() => {
    loadExplanation();
  }, [loadExplanation]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onExplanationCompleted = (data: { problemId: string }) => {
      if (data.problemId === problemId) {
        loadExplanation();
      }
    };

    const onExplanationFailed = (data: { problemId: string }) => {
      if (data.problemId === problemId) {
        setStatus("FAILED");
        setLoading(false);
        setError("Explanation generation failed");
      }
    };

    socket.on("explanation:completed", onExplanationCompleted);
    socket.on("explanation:failed", onExplanationFailed);

    return () => {
      socket.off("explanation:completed", onExplanationCompleted);
      socket.off("explanation:failed", onExplanationFailed);
    };
  }, [problemId, loadExplanation]);

  return { explanation, status, loading, error };
}
