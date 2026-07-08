import type {
  SaveNoteRequest,
  NoteResponse
} from "../types/notes.types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Fetch note for a problem
 */
export async function getNote(
  problemId: string
): Promise<NoteResponse> {

  const response = await fetch(
    `${API_BASE_URL}/api/problems/${problemId}/note`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch note: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Save or update note
 */
export async function saveNote(
  problemId: string,
  data: SaveNoteRequest
): Promise<void> {
  console.log("called")
  const response = await fetch(
    `${API_BASE_URL}/api/problems/${problemId}/note`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to save note: ${response.status} ${response.statusText}`
    );
  }

}