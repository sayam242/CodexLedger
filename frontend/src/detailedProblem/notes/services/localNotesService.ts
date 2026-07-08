import type { CachedNote } from "../types/notes.types";

const STORAGE_KEY = "codexledger_notes_cache";

/**
 * Get all cached notes
 */
export function getAllCachedNotes(): CachedNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch {

    return [];

  }
}

/**
 * Get cache for a specific problem
 */
export function getCachedNote(
  problemId: string
): CachedNote | undefined {

  return getAllCachedNotes().find(
    note => note.problemId === problemId
  );

}

/**
 * Persist all cached notes
 */
function persistAll(
  notes: CachedNote[]
): void {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notes)
  );

}

/**
 * Create or update cache
 */
export function upsertCachedNote(
  note: CachedNote
): void {

  const notes = getAllCachedNotes();

  const index = notes.findIndex(
    cached =>
      cached.problemId === note.problemId
  );

  if (index >= 0) {

    notes[index] = note;

  }

  else {

    notes.push(note);

  }

  persistAll(notes);

}

/**
 * Mark cache as synced after successful API save
 */
export function markNoteSynced(
  problemId: string
): void {

  const notes = getAllCachedNotes();

  const note = notes.find(
    cached =>
      cached.problemId === problemId
  );

  if (!note) {

    return;

  }

  note.syncStatus = "synced";

  note.lastSyncedAt = new Date().toISOString();

  persistAll(notes);

}

/**
 * Mark cache as dirty whenever user edits
 */
export function markNoteUnsynced(
  problemId: string
): void {

  const notes = getAllCachedNotes();

  const note = notes.find(
    cached =>
      cached.problemId === problemId
  );

  if (!note) {

    return;

  }

  note.syncStatus = "unsynced";

  note.updatedAt = new Date().toISOString();

  persistAll(notes);

}

/**
 * Replace cache with backend data.
 * Used only during the initial fetch.
 */
export function initializeCachedNote(
  problemId: string,
  content: string,
  updatedAt: string | null
): void {

  upsertCachedNote({

    problemId,

    content,

    updatedAt:
      updatedAt ??
      new Date().toISOString(),

    lastSyncedAt:
      updatedAt,

    syncStatus: "synced"

  });

}