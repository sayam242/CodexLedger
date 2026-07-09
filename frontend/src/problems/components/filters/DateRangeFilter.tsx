import { useState, useRef, useEffect } from "react";

import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  fromDate?: string;
  toDate?: string;
  onFromChange: (value: string | undefined) => void;
  onToChange: (value: string | undefined) => void;
}

export default function DateRangeFilter({
  fromDate,
  toDate,
  onFromChange,
  onToChange,
}: DateRangeFilterProps) {
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

  const hasValue = !!fromDate || !!toDate;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-all",
          open || hasValue
            ? "border-ring bg-accent text-accent-foreground"
            : "border-border bg-background text-muted-foreground hover:text-foreground"
        )}
      >
        <Calendar className="h-4 w-4 opacity-70" />
        Date Range
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-xl border border-border bg-popover p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Start Date
              </label>
              <input
                type="date"
                value={fromDate ?? ""}
                onChange={(e) => onFromChange(e.target.value || undefined)}
                className="h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                End Date
              </label>
              <input
                type="date"
                value={toDate ?? ""}
                onChange={(e) => onToChange(e.target.value || undefined)}
                className="h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
