import { useState, useRef, useEffect } from "react";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface MultiSelectDropdownProps {
  label: string;
  icon?: LucideIcon;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export default function MultiSelectDropdown({
  label,
  icon: Icon,
  options,
  selected,
  onToggle,
}: MultiSelectDropdownProps) {
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

  const count = selected.length;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-all",
          open || count > 0
            ? "border-ring bg-accent text-accent-foreground"
            : "border-border bg-background text-muted-foreground hover:text-foreground"
        )}
      >
        {Icon && <Icon className="h-4 w-4 opacity-70" />}
        {label}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 min-w-52 rounded-xl border border-border bg-popover p-1.5 shadow-lg">
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                onClick={() => onToggle(option)}
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
                {option}
              </button>
            );
          })}
          {options.length === 0 && (
            <p className="px-2.5 py-2 text-sm text-muted-foreground">
              No options
            </p>
          )}
        </div>
      )}
    </div>
  );
}
