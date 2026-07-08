import { Router } from "express";
import { authenticateSession } from "../../middlewares/sessionAuth.middleware";
import {
  getProblemDetail,
  getSubmissionDetail
} from "../controllers/detailedProblem.controller";

const router = Router();

/**
 * GET /api/problems/:problemId
 * Fetch problem details with paginated submissions
 * Query params: cursor (optional), limit (optional, default: 20)
 */
router.get(
  "/problems/:problemId",
  authenticateSession,
  getProblemDetail
);

/**
 * GET /api/submissions/:submissionId
 * Fetch a specific submission with full code
 */
router.get(
  "/problems/:problemId/submissions/:submissionId",
  authenticateSession,
  getSubmissionDetail
);

export default router;
