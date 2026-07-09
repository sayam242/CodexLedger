import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SortDropdownProps {
  value: "asc" | "desc";
  onChange: (value: "asc" | "desc") => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        Sort:
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(value === "desc" ? "asc" : "desc")}
        className="rounded-full"
      >
        {value === "desc" ? (
          <ArrowDownWideNarrow className="h-4 w-4" />
        ) : (
          <ArrowUpWideNarrow className="h-4 w-4" />
        )}
        {value === "desc" ? "Newest First" : "Oldest First"}
      </Button>
    </div>
  );
}
