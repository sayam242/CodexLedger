import { Router } from "express";
import {syncProblem} from "../controllers/sync.controller";
import { authenticateExtension } from "../../middlewares/extenssionAuth.middleware";

const router = Router();

router.post("/",authenticateExtension, syncProblem);

export default router;