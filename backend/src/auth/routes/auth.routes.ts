import {Router} from "express";
import {login,getMe,refreshToken} from "../controllers/auth.controller";
const router = Router();

router.post("/login", login);
router.get("/me", getMe);
router.get("/refresh", refreshToken );
export default router;