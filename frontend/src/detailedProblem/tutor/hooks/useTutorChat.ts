import { useState, useCallback, useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import {  clearTutorHistory } from "../services/tutor.api";
import type { ChatMessage, ConversationState } from "../types/tutor.types";

const STORAGE_PREFIX = "codexledger_tutor_";

function getStorageKey(submissionId: string): string {
  return `${STORAGE_PREFIX}${submissionId}`;
}

function loadMessages(submissionId: string): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(getStorageKey(submissionId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return parsed.filter((m) => !m.isStreaming);
  } catch {
    return [];
  }
}

function saveMessages(submissionId: string, messages: ChatMessage[]): void {
  try {
    const toSave = messages.filter((m) => !m.isStreaming);
    sessionStorage.setItem(
      getStorageKey(submissionId),
      JSON.stringify(toSave)
    );
  } catch {
    // sessionStorage full or unavailable
  }
}

function clearStorage(submissionId: string): void {
  try {
    sessionStorage.removeItem(getStorageKey(submissionId));
  } catch {
    // ignore
  }
}

interface UseTutorChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  conversationState: ConversationState | null;
  sendMessage: (text: string) => void;
  clearChat: () => void;
}

export function useTutorChat(
  submissionId: string
): UseTutorChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadMessages(submissionId)
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationState, setConversationState] =
    useState<ConversationState | null>(null);

  const streamingIdRef = useRef<string | null>(null);
  const prevSubmissionIdRef = useRef(submissionId);

  useEffect(() => {
    if (prevSubmissionIdRef.current !== submissionId) {
      prevSubmissionIdRef.current = submissionId;
      setMessages(loadMessages(submissionId));
      setIsStreaming(false);
      setConversationState(null);
      streamingIdRef.current = null;
    }
  }, [submissionId]);

  useEffect(() => {
    saveMessages(submissionId, messages);
  }, [messages, submissionId]);

  const sendMessage = useCallback(
    (text: string) => {
      const socket = getSocket();
      if (!socket || !text.trim() || isStreaming) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
        timestamp: Date.now(),
      };

      const streamingMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        isStreaming: true,
      };

      streamingIdRef.current = streamingMessage.id;

      setMessages((prev) => [...prev, userMessage, streamingMessage]);
      setIsStreaming(true);

      socket.emit("tutor:chat", {
        submissionId,
        message: text.trim(),
      });
    },
    [submissionId, isStreaming]
  );

  const clearChat = useCallback(() => {
    clearStorage(submissionId);
    setMessages([]);
    setIsStreaming(false);
    setConversationState(null);
    streamingIdRef.current = null;
    clearTutorHistory(submissionId).catch(() => {});
  }, [submissionId]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onChunk = (data: { chunk: string }) => {
      const id = streamingIdRef.current;
      if (!id) return;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, content: m.content + data.chunk } : m
        )
      );
    };

    const onDone = (data: { conversationState: ConversationState }) => {
      const id = streamingIdRef.current;
      if (id) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, isStreaming: false } : m
          )
        );
      }
      streamingIdRef.current = null;
      setIsStreaming(false);
      setConversationState(data.conversationState);
    };

    const onError = (data: { message: string }) => {
      const id = streamingIdRef.current;
      if (id) {
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== id);
          return [
            ...filtered,
            {
              id: crypto.randomUUID(),
              role: "assistant" as const,
              content: `Sorry, something went wrong. ${data.message}`,
              timestamp: Date.now(),
            },
          ];
        });
      }
      streamingIdRef.current = null;
      setIsStreaming(false);
    };

    socket.on("tutor:chunk", onChunk);
    socket.on("tutor:done", onDone);
    socket.on("tutor:error", onError);

    const onDisconnect = () => {
      const id = streamingIdRef.current;
      if (id) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, isStreaming: false } : m
          )
        );
        streamingIdRef.current = null;
        setIsStreaming(false);
      }
    };
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("tutor:chunk", onChunk);
      socket.off("tutor:done", onDone);
      socket.off("tutor:error", onError);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    messages,
    isStreaming,
    conversationState,
    sendMessage,
    clearChat,
  };
}
