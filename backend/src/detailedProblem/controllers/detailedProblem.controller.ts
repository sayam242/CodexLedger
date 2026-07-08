import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import {
  getProblemDetailService,
  getSubmissionDetailService
} from "../services/detailedProblem.service";

/**
 * GET /api/problems/:problemId
 * Fetch problem details with paginated submissions
 */
export async function getProblemDetail(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user?.id;
    const problemId = Array.isArray(req.params.problemId)
      ? req.params.problemId[0]
      : req.params.problemId;
    const cursor = req.query.cursor as string | undefined;
    const limit = req.query.limit ? Number(req.query.limit) : 20;

    // Validate inputs
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!problemId) {
      return res.status(400).json({ message: "Problem ID is required" });
    }

    // Fetch problem details
    const problemDetail = await getProblemDetailService(
      problemId,
      userId,
      cursor,
      limit
    );

    return res.status(200).json(problemDetail);
  } catch (error) {
    console.error("Get Problem Detail Error:", error);

    if (error instanceof Error) {
      if (error.message.includes('unauthorized')) {
        return res.status(403).json({ message: "Access denied" });
      }
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: "Problem not found" });
      }
    }

    return res.status(500).json({ message: "Failed to fetch problem details" });
  }
}

/**
 * GET /api/problems/:problemId/submissions/:submissionId
 * Fetch a specific submission of a problem with full code
 * Validates submission belongs to the problem
 */
export async function getSubmissionDetail(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user?.id;
    const problemId = Array.isArray(req.params.problemId)
      ? req.params.problemId[0]
      : req.params.problemId;
    const submissionId = Array.isArray(req.params.submissionId)
      ? req.params.submissionId[0]
      : req.params.submissionId;

    // Validate inputs
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!problemId) {
      return res.status(400).json({ message: "Problem ID is required" });
    }

    if (!submissionId) {
      return res.status(400).json({ message: "Submission ID is required" });
    }

    // Fetch submission detail
    const submissionDetail = await getSubmissionDetailService(
      submissionId,
      problemId,
      userId
    );

    return res.status(200).json(submissionDetail);
  } catch (error) {
    console.error("Get Submission Detail Error:", error);

    if (error instanceof Error) {
      if (error.message.includes('unauthorized')) {
        return res.status(403).json({ message: "Access denied" });
      }
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: "Submission not found" });
      }
      if (error.message.includes('does not belong')) {
        return res.status(400).json({ message: "Submission does not belong to this problem" });
      }
    }

    return res.status(500).json({ message: "Failed to fetch submission" });
  }
}
