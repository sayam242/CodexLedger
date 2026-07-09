import type { ProblemFilters } from "../../types/problem.types";

import SearchInput from "./SearchInput";
import MultiSelectDropdown from "./MultiSelectDropdown";
import StatusFilter from "./StatusFilter";
import DateRangeFilter from "./DateRangeFilter";

import ClearFilters from "./ClearFilters";
import ActiveFilterChips from "./ActiveFilterChips";

import { Tag, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  filters: ProblemFilters;
  onUpdateFilter: <K extends keyof ProblemFilters>(
    key: K,
    value: ProblemFilters[K]
  ) => void;
  onToggleArrayFilter: (
    key: "topics" | "difficulty",
    value: string
  ) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const TOPIC_OPTIONS = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Binary Search",
  "Tree",
];

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];

export default function FilterBar({
  filters,
  onUpdateFilter,
  onToggleArrayFilter,
  onClearFilters,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <SearchInput
          value={filters.search}
          onChange={(value) => onUpdateFilter("search", value)}
        />
        <MultiSelectDropdown
          label="Topic"
          icon={Tag}
          options={TOPIC_OPTIONS}
          selected={filters.topics}
          onToggle={(v) => onToggleArrayFilter("topics", v)}
        />
        <MultiSelectDropdown
          label="Difficulty"
          icon={SlidersHorizontal}
          options={DIFFICULTY_OPTIONS}
          selected={filters.difficulty}
          onToggle={(v) => onToggleArrayFilter("difficulty", v)}
        />
        <StatusFilter
          value={filters.solved}
          onChange={(value) => onUpdateFilter("solved", value)}
        />
        <DateRangeFilter
          fromDate={filters.fromDate}
          toDate={filters.toDate}
          onFromChange={(v) => onUpdateFilter("fromDate", v)}
          onToChange={(v) => onUpdateFilter("toDate", v)}
        />
        <ClearFilters
          disabled={!hasActiveFilters}
          onClick={onClearFilters}
        />
      </div>

      {/* Active Filter Chips */}
      <ActiveFilterChips
        filters={filters}
        onRemoveTopic={(v) => onToggleArrayFilter("topics", v)}
        onRemoveDifficulty={(v) => onToggleArrayFilter("difficulty", v)}
        onClearSolved={() => onUpdateFilter("solved", undefined)}
        onClearDateRange={() => {
          onUpdateFilter("fromDate", undefined);
          onUpdateFilter("toDate", undefined);
        }}
      />
    </div>
  );
}
