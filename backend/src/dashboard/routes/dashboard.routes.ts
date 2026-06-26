import { Router } from "express";

import { authenticate }
from "../../middlewares/auth.middleware";

import {
  getProblems
}
from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/problems",
  authenticate,
  getProblems
);

export default router;