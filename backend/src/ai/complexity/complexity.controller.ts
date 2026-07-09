import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import {
  getComplexityAnalysisService,
  markQuizCompletedService,
} from "./complexity.service";

export async function getComplexityAnalysis(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user?.id;
    const submissionId = Array.isArray(req.params.submissionId)
      ? req.params.submissionId[0]
      : req.params.submissionId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!submissionId) {
      return res.status(400).json({ message: "Submission ID is required" });
    }

    const analysis = await getComplexityAnalysisService(submissionId, userId);
    return res.status(200).json(analysis);
  } catch (error) {
    console.error("Get Complexity Analysis Error:", error);

    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({ message: "Submission not found" });
      }
      if (error.message.includes("unauthorized")) {
        return res.status(403).json({ message: "Access denied" });
      }
      if (error.message.includes("already in progress")) {
        return res.status(409).json({ message: error.message });
      }
    }

    return res.status(500).json({ message: "Failed to get complexity analysis" });
  }
}

export async function markQuizCompleted(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user?.id;
    const submissionId = Array.isArray(req.params.submissionId)
      ? req.params.submissionId[0]
      : req.params.submissionId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!submissionId) {
      return res.status(400).json({ message: "Submission ID is required" });
    }

    await markQuizCompletedService(submissionId, userId);
    return res.status(200).json({ message: "Quiz marked as completed" });
  } catch (error) {
    console.error("Mark Quiz Completed Error:", error);

    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({ message: "Submission not found" });
      }
      if (error.message.includes("unauthorized")) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    return res.status(500).json({ message: "Failed to mark quiz as completed" });
  }
}
