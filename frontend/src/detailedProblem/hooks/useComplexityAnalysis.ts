import { useState, useEffect, useCallback } from "react";
import { fetchComplexityAnalysis, markQuizCompleted } from "../services/detailedProblem.api";
import { getSocket } from "@/lib/socket";
import type { Submission, AIAnalysisStatus } from "../types/detailedProblem.types";

interface UseComplexityAnalysisReturn {
  showPopup: boolean;
  complexityData: {
    timeComplexityOptions: string[];
    spaceComplexityOptions: string[];
    reasoning: string;
    correctTimeComplexity: string;
    correctSpaceComplexity: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  openPopup: () => void;
  closePopup: () => void;
  submitQuiz: () => Promise<void>;
  complexityStatus: AIAnalysisStatus;
  quizCompleted: boolean;
  timeComplexity: string | undefined;
  spaceComplexity: string | undefined;
}

export function useComplexityAnalysis(submission: Submission | null): UseComplexityAnalysisReturn {
  const [showPopup, setShowPopup] = useState(false);
  const [complexityData, setComplexityData] = useState<{
    timeComplexityOptions: string[];
    spaceComplexityOptions: string[];
    reasoning: string;
    correctTimeComplexity: string;
    correctSpaceComplexity: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [complexityStatus, setComplexityStatus] = useState<AIAnalysisStatus>("PENDING");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeComplexity, setTimeComplexity] = useState<string | undefined>(undefined);
  const [spaceComplexity, setSpaceComplexity] = useState<string | undefined>(undefined);

  const openPopup = useCallback(() => {
    if (complexityData) {
      setShowPopup(true);
    }
  }, [complexityData]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const submitQuiz = useCallback(async () => {
    if (!submission) return;

    try {
      await markQuizCompleted(submission.id);
      setQuizCompleted(true);
    } catch (err) {
      console.error("Failed to mark quiz as completed:", err);
      throw err;
    }
  }, [submission]);

  const loadAnalysis = useCallback(async () => {
    if (!submission) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchComplexityAnalysis(submission.id);

      setComplexityStatus(response.analysisStatus);
      setQuizCompleted(response.quizCompleted);
      setTimeComplexity(response.timeComplexity);
      setSpaceComplexity(response.spaceComplexity);

      if (response.analysisStatus === "COMPLETED") {
        setComplexityData({
          timeComplexityOptions: response.timeComplexityOptions,
          spaceComplexityOptions: response.spaceComplexityOptions,
          reasoning: response.reasoning,
          correctTimeComplexity: response.timeComplexity,
          correctSpaceComplexity: response.spaceComplexity,
        });

        if (!response.quizCompleted) {
          setShowPopup(true);
        }
      }

      if (response.analysisStatus === "FAILED") {
        setError("AI analysis failed");
      }
    } catch (err) {
      setError("Failed to fetch complexity analysis");
    } finally {
      setIsLoading(false);
    }
  }, [submission]);

  useEffect(() => {
    if (!submission) return;

    setComplexityStatus(submission.complexityAnalysisStatus);
    setQuizCompleted(submission.complexityQuizCompleted);
    setTimeComplexity(submission.timeComplexity);
    setSpaceComplexity(submission.spaceComplexity);

    if (submission.complexityAnalysisStatus === "COMPLETED" && submission.complexityQuizCompleted) {
      return;
    }

    if (submission.complexityAnalysisStatus === "COMPLETED" && !submission.complexityQuizCompleted) {
      if (submission.timeComplexityOptions && submission.spaceComplexityOptions) {
        setComplexityData({
          timeComplexityOptions: submission.timeComplexityOptions,
          spaceComplexityOptions: submission.spaceComplexityOptions,
          reasoning: submission.complexityReasoning || "",
          correctTimeComplexity: submission.timeComplexity || "",
          correctSpaceComplexity: submission.spaceComplexity || "",
        });
      }
      return;
    }

    if (submission.complexityAnalysisStatus === "PENDING" || submission.complexityAnalysisStatus === "FAILED") {
      loadAnalysis();
    }
  }, [submission, loadAnalysis]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !submission) return;

    const onComplexityCompleted = (data: { submissionId: string }) => {
      if (data.submissionId === submission.id) {
        loadAnalysis();
      }
    };

    const onComplexityFailed = (data: { submissionId: string }) => {
      if (data.submissionId === submission.id) {
        setComplexityStatus("FAILED");
        setIsLoading(false);
        setError("AI analysis failed");
      }
    };

    socket.on("complexity:completed", onComplexityCompleted);
    socket.on("complexity:failed", onComplexityFailed);

    return () => {
      socket.off("complexity:completed", onComplexityCompleted);
      socket.off("complexity:failed", onComplexityFailed);
    };
  }, [submission, loadAnalysis]);

  return {
    showPopup,
    complexityData,
    isLoading,
    error,
    openPopup,
    closePopup,
    submitQuiz,
    complexityStatus,
    quizCompleted,
    timeComplexity,
    spaceComplexity,
  };
}
