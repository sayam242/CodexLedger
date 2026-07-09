import { Badge } from "@/components/ui/badge";

import type { Submission } from "@/detailedProblem/types/detailedProblem.types";

import { formatDate } from "@/shared/utils/formatDate";

import { getStatusBadgeVariant } from "@/shared/utils/getStatusBadgeVarient";

interface EditorToolbarProps {

  submission: Submission;

}

export default function EditorToolbar({
  submission
}: EditorToolbarProps) {

  return (

    <div
      className="
        flex
        items-center
        justify-between
        gap-3
        px-4
        py-3
        bg-gray-50
        border-b
        rounded-t-lg
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <Badge
          variant="outline"
          className="bg-white text-xs"
        >

          {submission.language}

        </Badge>

        <Badge
          variant={
            getStatusBadgeVariant(
              submission.status
            )
          }
          className="text-xs"
        >

          {submission.status}

        </Badge>

      </div>

      <div
        className="
          flex
          items-center
          gap-4
          text-xs
          text-gray-600
        "
      >

        {submission.runtime !== undefined ? (

          <span>

            Runtime: {submission.runtime} ms

          </span>

        ) : <span>_</span>}

        {submission.memory !== undefined ? (

          <span>

            Memory: {submission.memory} MB

          </span>

        ) : <span>_</span>}

        <span className="text-gray-400">

          |

        </span>

        <span className="font-medium">

          {formatDate(
            submission.submittedAt
          )}

        </span>

      </div>

    </div>

  );

}