import { useState, useEffect, useCallback, useRef } from "react";

import type {
  SavingStatus,
  NoteResponse,
} from "../types/notes.types";

import {
  getCachedNote,
  upsertCachedNote,
  markNoteSynced,
  getAllCachedNotes,
} from "../services/localNotesService";

import { saveNote } from "../services/notes.api";

export function useNotes(
  problemId: string,
  initialNote: NoteResponse
) {

  

  const [content, setContent] = useState("");

  const [status, setStatus] =
    useState<SavingStatus>("idle");

  const [initialized, setInitialized] =
    useState(false);

  const [dirty, setDirty] =
    useState(false);


  const contentRef = useRef(content);
  const dirtyRef = useRef(dirty);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    dirtyRef.current = dirty;
  }, [dirty]);

  
  const debounceRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Initialize note
   * Cache always wins.
   */
  useEffect(() => {

    setInitialized(false);
    setDirty(false);
    setStatus("idle");

    const cached =
      getCachedNote(problemId);

    if (cached) {

      setContent(cached.content);

      if (cached.syncStatus === "unsynced") {

        setStatus("unsynced");

      }

    }

    else {

      setContent(initialNote.content);

      upsertCachedNote({

        problemId,

        content: initialNote.content,

        updatedAt:
          initialNote.updatedAt ??
          new Date().toISOString(),

        lastSyncedAt:
          initialNote.updatedAt,

        syncStatus: "synced",

      });

    }

    setInitialized(true);

  }, [

    problemId,

    initialNote

  ]);

  /**
   * User typing
   */
  const handleChange = useCallback(

    (value: string) => {

      setContent(value);

      setDirty(true);

      setStatus("unsynced");

      const cached =
        getCachedNote(problemId);

      upsertCachedNote({

        problemId,

        content: value,

        updatedAt:
          new Date().toISOString(),

        lastSyncedAt:
          cached?.lastSyncedAt ?? null,

        syncStatus: "unsynced",

      });

    },

    [problemId]

  );

  /**
   * Debounced save
   */
  useEffect(() => {

    if (

      !initialized ||

      !dirty

    ) {

      return;

    }

    if (debounceRef.current) {

      clearTimeout(debounceRef.current);

    }

    debounceRef.current = setTimeout(

      async () => {

        setStatus("saving");

        try {

          await saveNote(

            problemId,

            {

              content,

            }

          );

          markNoteSynced(problemId);

          setDirty(false);

          setStatus("saved");

        }

        catch {

          setStatus("unsynced");

        }

      },

      30000

    );

    return () => {

      if (debounceRef.current) {

        clearTimeout(debounceRef.current);

      }

    };

  }, [

    content,

    dirty,

    initialized,

    problemId,

  ]);

  /**
   * Save immediately when leaving the problem.
   */
useEffect(() => {

  return () => {

    if (
      !dirtyRef.current ||
      !contentRef.current
    ) {
      return;
    }

    void saveNote(
      problemId,
      {
        content: contentRef.current,
      }
    );

  };

}, [problemId]);


// to save the content when the user closes the tab or refreshes the page

useEffect(() => {

  function handleBeforeUnload() {

    if (
      dirtyRef.current &&
      contentRef.current
    ) {

      void saveNote(problemId, {
        content: contentRef.current,
      });

    }

  }

  window.addEventListener(
    "beforeunload",
    handleBeforeUnload
  );

  return () => {
    window.removeEventListener(
      "beforeunload",
      handleBeforeUnload
    );
  };

}, [problemId]);

  return {

    content,

    status,

    handleChange,

  };

}





/**
 * Sync all cached notes that are still unsynced.
 */
export async function syncCachedNotes() {

  const notes =
    getAllCachedNotes();

  for (const note of notes) {

    if (

      note.syncStatus ===
      "synced"

    ) {

      continue;

    }

    try {

      await saveNote(

        note.problemId,

        {

          content:
            note.content,

        }

      );

      markNoteSynced(
        note.problemId
      );

    }

    catch {

      break;

    }

  }

}