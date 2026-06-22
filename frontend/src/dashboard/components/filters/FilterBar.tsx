import {
  Button
} from "@/components/ui/button";
import {
  Calendar,
  CircleCheck,
  XIcon,
  Tag
  
} from "lucide-react";

export default function FilterBar() {

  return (

    <div
      className="
        flex
        items-center
        gap-3
      "
    >

      <Button
        variant="outline"
      >
        <Tag className="h-4 w-4" />
        Topic
      </Button>

      <Button
        variant="outline"
      >
        <Calendar className="h-4 w-4" />
        Date Range
      </Button>

      <Button>
        <CircleCheck className="h-4 w-4" />
        Accepted
      </Button>

      <Button
        variant="outline"
      >
        All Results
      </Button>

      <Button
        variant="ghost"
      >
        <XIcon className="h-4 w-4" />
        Clear Filters
      </Button>

    </div>

  );

}