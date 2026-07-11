import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";

interface ExplanationSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function ExplanationSection({
  title,
  children,
  defaultOpen = false,
}: ExplanationSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        className="
          flex
          items-center
          gap-2
          w-full
          px-3
          py-2.5
          text-left
          text-sm
          font-semibold
          text-gray-800
          bg-gray-50
          hover:bg-gray-100
          rounded-md
          transition-colors
          cursor-pointer
          group
        "
      >
        <ChevronRight
          className={`
            h-4
            w-4
            text-gray-500
            transition-transform
            duration-200
            ${open ? "rotate-90" : ""}
          `}
        />
        {title}
      </Collapsible.Trigger>
      <Collapsible.Content
        className="
          overflow-hidden
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0
          data-[state=open]:fade-in-0
        "
      >
        <div className="px-3 py-3 text-sm text-gray-700 leading-relaxed">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
