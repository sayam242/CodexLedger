import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { getExplanationService } from "./service";

export async function getExplanationController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const problemId = req.params.problemId as string;
    const userId = req.user.id;

    const result = await getExplanationService(problemId, userId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Get explanation error:", error);

    if (error.message === "Problem not found or unauthorized") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
