import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth.types";

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  console.log ("Authenticate middleware hit");
  const token =
    req.headers.authorization
      ?.split(" ")[1];

  if (!token) {
    console.log("Token missing");
    return res
      .status(401)
      .json({
        message: "Token missing"
      });

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

    console.log("Invalid token");
    return res
      .status(401)
      .json({
        message: "Invalid token"
      });

  }

}