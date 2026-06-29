import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth.types";

export function authenticateExtension(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {

    const token =
        req.headers.authorization
            ?.split(" ")[1];

    if (!token) {

        res.status(401).json({
            message: "Token missing"
        });

        return;

    }

    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as {
                uid: string;
            };

        req.user = {
            id: decoded.uid
        };

        next();

    }

    catch {

        res.status(401).json({
            message: "Invalid token"
        });

    }

}