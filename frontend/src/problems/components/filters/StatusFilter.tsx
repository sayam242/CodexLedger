import { useState, useRef, useEffect } from "react";

import { Check, CircleCheck } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatusFilterProps {
  value?: boolean;
  onChange: (value: boolean | undefined) => void;
}

const OPTIONS = [
  { label: "All", value: undefined as boolean | undefined },
  { label: "Solved", value: true },
  { label: "Unsolved", value: false },
] as const;

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-all",
          open || value !== undefined
            ? "border-ring bg-accent text-accent-foreground"
            : "border-border bg-background text-muted-foreground hover:text-foreground"
        )}
      >
        <CircleCheck className="h-4 w-4 opacity-70" />
        Status
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 min-w-40 rounded-xl border border-border bg-popover p-1.5 shadow-lg">
          {OPTIONS.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.label}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                <div
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
