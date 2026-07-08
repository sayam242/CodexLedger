import {useState, useEffect} from "react";
import { getNote } from "@/detailedProblem/notes/services/notes.api";
import type { NoteResponse } from "../types/detailedProblem.types";


export function useProblemNotes(
  problemId: string
) {

const [note, setNote] = useState<NoteResponse>({
  content: "",
  updatedAt: null,
});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    let cancelled = false;

    async function fetchNote() {

      setLoading(true);

      try {

        const response =
          await getNote(problemId);

        if (!cancelled) {

          setNote(response);

        }

      }

      catch {

        if (!cancelled) {

          setError("Failed to load note");

        }

      }

      finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    }

    fetchNote();

    return () => {

      cancelled = true;

    };

  }, [problemId]);

  return {

    note,

    loading,

    error

  };

}