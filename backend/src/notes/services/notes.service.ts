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

  // Verify problem exists (shared, no userId check)
  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
  });

  if (!problem) {
    throw new Error("Problem not found");
  }

  // Find note for this user + problem
  const note = await prisma.problemNote.findFirst({
    where: {
      problemId,
      userId,
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

  // Verify problem exists (shared, no userId check)
  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
  });

  if (!problem) {
    throw new Error("Problem not found");
  } 

  await prisma.problemNote.upsert({
    where: {
      problemId_userId: {
        problemId,
        userId,
      },
    },

    update: {
      content,
    },

    create: {
      problemId,
      userId,
      content,
    },
  });

}
