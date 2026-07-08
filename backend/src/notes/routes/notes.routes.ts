import { Router } from "express";
import { getNote, saveNote } from "../controllers/notes.controller";
import { authenticateSession }from "../../middlewares/sessionAuth.middleware";


const router = Router();

router.get("/:problemId/note",authenticateSession,getNote);
router.put("/:problemId/note",authenticateSession,saveNote);

export default router;