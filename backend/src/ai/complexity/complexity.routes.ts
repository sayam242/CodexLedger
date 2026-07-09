import { Router } from "express";
import { authenticateSession } from "../../middlewares/sessionAuth.middleware";
import {
  getComplexityAnalysis,
  markQuizCompleted,
} from "./complexity.controller";

const router = Router();

router.get(
  "/complexity/:submissionId",
  authenticateSession,
  getComplexityAnalysis
);

router.post(
  "/complexity/:submissionId/quiz-complete",
  authenticateSession,
  markQuizCompleted
);

export default router;
