import prisma from "../../lib/prisma";

import type {
  NoteResponse,
} from "../dto/notes.dto";

/**
 * Fetch user's note for a problem
 */
export async function getNoteService(
  problemId: string,
  userId: string
): Promise<NoteResponse> {

  const problem = await prisma.problem.findFirst({
    where: {
      id: problemId,
      userId,
    },
  });

  if (!problem) {
    throw new Error("Problem not found");
  }

  const note = await prisma.problemNote.findUnique({
    where: {
      problemId,

    },
  });

  if (!note) {
    return {
      content: "",
      updatedAt: null,
    };
  }

  return {
    content: note.content,
    updatedAt: note.updatedAt
  ? note.updatedAt.toISOString()
  : null,
  };
}

/**
 * Create or update note
 */
export async function saveNoteService(
  problemId: string,
  userId: string,
  content: string
): Promise<void> {

  const problem = await prisma.problem.findFirst({
    where: {
      id: problemId,
      userId,
    },
  });

  if (!problem) {
    throw new Error("Problem not found");
  } 

  await prisma.problemNote.upsert({
    where: {
      problemId,
    },

    update: {
      content,
    },

    create: {
      problemId,
      content,
    },
  });

}