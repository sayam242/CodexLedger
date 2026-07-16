import { Lightbulb } from "lucide-react";

export default function ChatNoteBanner() {
  return (
    <div
      className="
        shrink-0
        flex
        items-start
        gap-2.5
        px-3.5
        py-3
        mx-3
        mt-3
        rounded-lg
        bg-blue-50
        border
        border-blue-100
        text-xs
        leading-relaxed
        text-blue-700
      "
    >
      <Lightbulb className="size-4 mt-0.5 shrink-0 text-blue-500" />
      <span>
        This chat disappears when you close the session. Save your key learnings
        to the <strong>Notes</strong> section so you can revise them anytime.
        Writing things down helps concepts stick better!
      </span>
    </div>
  );
}
