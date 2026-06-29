import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth.types";
import { getCurrentUser } from "../auth/services/auth.service";

export async function authenticateSession(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {

    const sessionToken =
        req.cookies.codexLedger_session;

    if (!sessionToken) {

        res.status(401).json({
            message: "Unauthorized"
        });

        return;

    }

    const user =
        await getCurrentUser(
            sessionToken
        );

    if (!user) {

        res.status(401).json({
            message: "Invalid session"
        });

        return;

    }

    req.user = {
        id: user.id
    };

    next();

}