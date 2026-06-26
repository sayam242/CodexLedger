import { Router } from "express";
import {syncProblem} from "../controllers/sync.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/",authenticate, syncProblem);

export default router;