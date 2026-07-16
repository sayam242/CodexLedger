import { useRef, useEffect } from "react";
import { useTutorChat } from "../hooks/useTutorChat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatNoteBanner from "./ChatNoteBanner";

interface TutorChatProps {
  problemId: string;
  submissionId: string;
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-sm text-muted-foreground italic">
        Ask me anything about this problem
      </p>
    </div>
  );
}

export default function TutorChat({
  submissionId,
}: TutorChatProps) {
  const {
    messages,
    isStreaming,
    sendMessage,
  } = useTutorChat(submissionId);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <ChatNoteBanner />

      <div
        ref={containerRef}
        className="
          flex-1
          min-h-0
          overflow-y-auto
          px-4
          py-3  
          space-y-3
        "
      >
        {messages.length === 0 && !isStreaming && <EmptyState />}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isStreaming &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && (
            <TypingIndicator />
          )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={isStreaming} />
    </div>
  );
}
