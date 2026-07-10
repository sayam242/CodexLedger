import { Router } from "express";
import { authenticateSession } from "../../middlewares/sessionAuth.middleware";
import { getExplanationController } from "./explanation.controller";

const router = Router();

router.get(
  "/explanation/:problemId",
  authenticateSession,
  getExplanationController
);

export default router;
