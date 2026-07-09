import { X } from "lucide-react";

import type { ProblemFilters } from "../../types/problem.types";

interface ActiveFilterChipsProps {
  filters: ProblemFilters;
  onRemoveTopic: (value: string) => void;
  onRemoveDifficulty: (value: string) => void;
  onClearSolved: () => void;
  onClearDateRange: () => void;
}

export default function ActiveFilterChips({
  filters,
  onRemoveTopic,
  onRemoveDifficulty,
  onClearSolved,
  onClearDateRange,
}: ActiveFilterChipsProps) {
  const chips: { label: string; onRemove: () => void }[] = [];

  filters.topics.forEach((t) =>
    chips.push({ label: `Topic: ${t}`, onRemove: () => onRemoveTopic(t) })
  );
  filters.difficulty.forEach((d) =>
    chips.push({
      label: `Difficulty: ${d}`,
      onRemove: () => onRemoveDifficulty(d),
    })
  );
  if (filters.solved !== undefined) {
    chips.push({
      label: filters.solved ? "Solved" : "Unsolved",
      onRemove: onClearSolved,
    });
  }
  if (filters.fromDate || filters.toDate) {
    chips.push({
      label: `Date: ${filters.fromDate ?? "..."} – ${filters.toDate ?? "..."}`,
      onRemove: onClearDateRange,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="inline-flex h-7 items-center gap-1 rounded-full border border-border bg-secondary px-3 text-xs font-medium text-secondary-foreground"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="ml-0.5 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
    </div>
  );
}
