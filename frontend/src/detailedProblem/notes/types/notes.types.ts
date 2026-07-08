export interface CachedNote {
  problemId: string;

  content: string;

  updatedAt: string;

  lastSyncedAt: string | null;

  syncStatus: "synced" | "unsynced";
}

export interface SaveNoteRequest {
  content: string;
}

export interface NoteResponse {
  content: string;
  updatedAt: string | null;
}
export type SavingStatus = "saving" | "saved" | "unsynced" | "idle";
