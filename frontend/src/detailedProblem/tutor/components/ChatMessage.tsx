import Markdown from "react-markdown";
import type { ChatMessage as ChatMessageType } from "../types/tutor.types";

function StreamingCursor() {
  return (
    <span className="inline-block w-2 h-4 ml-0.5 bg-foreground/70 animate-pulse rounded-sm" />
  );
}

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`
        flex
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          max-w-[85%]
          rounded-2xl
          px-3.5
          py-2.5
          text-sm
          leading-relaxed
          ${isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
          }
        `}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none">
            <Markdown>{message.content}</Markdown>
            {message.isStreaming && <StreamingCursor />}
          </div>
        )}
      </div>
    </div>
  );
}
