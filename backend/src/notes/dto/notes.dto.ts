export interface SaveNoteRequest {
  content: string; 
}

export interface NoteResponse {
  content: string;
  updatedAt: string | null;
}