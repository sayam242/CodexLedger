import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { getChatHistory, clearChatHistory } from "./service";

export async function getTutorHistory(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user?.id;
    const submissionId = Array.isArray(req.params.submissionId)
      ? req.params.submissionId[0]
      : req.params.submissionId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!submissionId) {
      return res.status(400).json({ message: "Submission ID is required" });
    }

    const history = await getChatHistory(submissionId, userId);
    return res.status(200).json(history);
  } catch (error) {
    console.error("Get Tutor History Error:", error);
    return res.status(500).json({ message: "Failed to get chat history" });
  }
}

export async function clearTutorHistory(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user?.id;
    const submissionId = Array.isArray(req.params.submissionId)
      ? req.params.submissionId[0]
      : req.params.submissionId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!submissionId) {
      return res.status(400).json({ message: "Submission ID is required" });
    }

    await clearChatHistory(submissionId, userId);
    return res.status(200).json({ message: "Chat history cleared" });
  } catch (error) {
    console.error("Clear Tutor History Error:", error);
    return res.status(500).json({ message: "Failed to clear chat history" });
  }
}
