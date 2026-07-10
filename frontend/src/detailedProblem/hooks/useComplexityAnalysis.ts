import { useState, useEffect, useCallback } from "react";
import { fetchComplexityAnalysis, markQuizCompleted } from "../services/detailedProblem.api";
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

  useEffect(() => {
    if (!submission) {
      return;
    }

    // Update local state from submission data
    setComplexityStatus(submission.complexityAnalysisStatus);
    setQuizCompleted(submission.complexityQuizCompleted);
    setTimeComplexity(submission.timeComplexity);
    setSpaceComplexity(submission.spaceComplexity);

    // Case 1: Already completed with quiz done - no popup needed
    if (submission.complexityAnalysisStatus === "COMPLETED" && submission.complexityQuizCompleted) {
      return;
    }

    // Case 2: Completed but quiz not done - prepare data for popup
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

    // Case 3: Not completed - trigger analysis
    if (submission.complexityAnalysisStatus === "PENDING" || submission.complexityAnalysisStatus === "FAILED") {
      let retryCount = 0;
      const maxRetries = 10;
      const pollInterval = 2000;

      const pollAnalysis = async () => {
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
            setIsLoading(false);
            return;
          }

          if (response.analysisStatus === "FAILED") {
            setError("AI analysis failed");
            setIsLoading(false);
            return;
          }

          // Still processing - retry
          retryCount++;
          if (retryCount < maxRetries) {
            setTimeout(pollAnalysis, pollInterval);
          } else {
            setError("Analysis timed out");
            setIsLoading(false);
          }
        } catch (err) {
          console.error("Failed to fetch complexity analysis:", err);
          setError("Failed to load analysis");
          setIsLoading(false);
        }
      };

      pollAnalysis();
    }
  }, [submission]);

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
