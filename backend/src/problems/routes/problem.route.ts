import { Router } from "express";

import { authenticateSession } from "../../middlewares/sessionAuth.middleware";

import { getProblems } from "../controllers/problem.controller";

const router = Router();

router.get(
  "/",
  authenticateSession,
  getProblems
);

export default router;