import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ClearFiltersProps {
  disabled: boolean;
  onClick: () => void;
}

export default function ClearFilters({ disabled, onClick }: ClearFiltersProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={disabled}
      onClick={onClick}
      className="rounded-full text-muted-foreground"
    >
      <RotateCcw className="h-4 w-4" />
      Clear
    </Button>
  );
}
