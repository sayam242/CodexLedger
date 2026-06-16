import { Router } from "express";
import {syncProblem} from "../controllers/sync.controller";

const router = Router();

router.post("/", syncProblem);

export default router;