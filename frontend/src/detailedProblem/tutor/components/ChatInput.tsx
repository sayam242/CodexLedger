import { useState, useRef, type KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }

  return (
    <div
      className="
        shrink-0
        flex
        items-end
        gap-2
        p-3
        border-t
        border-border
        bg-background
      "
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={disabled ? "Mentor is responding..." : "Ask your mentor..."}
        disabled={disabled}
        rows={1}
        className="
          flex-1
          resize-none
          rounded-lg
          border
          border-border
          bg-background
          px-3
          py-2
          text-sm
          leading-relaxed
          placeholder:text-muted-foreground
          focus:outline-none
          focus:ring-1
          focus:ring-ring
          disabled:opacity-50
          disabled:cursor-not-allowed
          min-h-[38px]
          max-h-[120px]
        "
      />
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="
          shrink-0
          size-9
          flex
          items-center
          justify-center
          rounded-lg
          bg-primary
          text-primary-foreground
          hover:bg-primary/90
          transition-colors
          disabled:opacity-40
          disabled:cursor-not-allowed
          cursor-pointer
        "
      >
        <Send className="size-4" />
      </button>
    </div>
  );
}
