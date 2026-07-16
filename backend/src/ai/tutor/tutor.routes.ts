import { Router } from "express";
import { authenticateSession } from "../../middlewares/sessionAuth.middleware";
import {
  getTutorHistory,
  clearTutorHistory,
} from "./tutor.controller";

const router = Router();

router.get(
  "/tutor/:submissionId/history",
  authenticateSession,
  getTutorHistory
);

router.delete(
  "/tutor/:submissionId/history",
  authenticateSession,
  clearTutorHistory
);

export default router;
