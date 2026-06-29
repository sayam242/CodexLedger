import { Router } from "express";

import { authenticateSession }from "../../middlewares/sessionAuth.middleware";

import {getProblems,getStats}from "../controllers/dashboard.controller";

const router = Router();

router.get("/problems",authenticateSession,getProblems);
router.get("/stats",authenticateSession,getStats);

export default router;