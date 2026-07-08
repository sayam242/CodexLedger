import { Response } from "express";

import { AuthRequest } from "../../types/auth.types";

import {
  getNoteService,
  saveNoteService,
} from "../services/notes.service";

import type {
  SaveNoteRequest,
  NoteResponse,
} from "../dto/notes.dto";

/**
 * GET /api/problems/:problemId/note
 */
export async function getNote(
  req: AuthRequest,
  res: Response<NoteResponse | { message: string }>
): Promise<void> {
  try {
    const { problemId } = req.params as { problemId: string };
    const userId = req.user!.id;

    const note = await getNoteService(
      problemId,
      userId
    );

    res.status(200).json(note);
  }

  catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch note",
    });
  }
}

/**
 * PUT /api/problems/:problemId/note
 */
export async function saveNote(
  req: AuthRequest,
  res: Response<{ message: string }>
): Promise<void> {
  try {
    const { problemId } = req.params as { problemId: string };
    const userId = req.user!.id;

    const { content } =
      req.body as SaveNoteRequest;

    await saveNoteService(
      problemId,
      userId,
      content
    );

    res.status(200).json({
      message: "Note saved successfully",
    });
  }

  catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save note",
    });
  }
}