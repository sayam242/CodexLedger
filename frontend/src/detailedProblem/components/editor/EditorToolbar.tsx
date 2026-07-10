import { Badge } from "@/components/ui/badge";
import type { Submission, AIAnalysisStatus } from "@/detailedProblem/types/detailedProblem.types";
import { formatDate } from "@/shared/utils/formatDate";
import { getStatusBadgeVariant } from "@/shared/utils/getStatusBadgeVarient";
import ComplexityAnalyzingButton from "../complexity/ComplexityAnalyzingButton";

interface EditorToolbarProps {
  submission: Submission;
  complexityAnalysisStatus: AIAnalysisStatus;
  complexityQuizCompleted: boolean;
  timeComplexity?: string;
  spaceComplexity?: string;
  onOpenPopup: () => void;
  isComplexityLoading: boolean;
  hasComplexityError: boolean;
}

export default function EditorToolbar({
  submission,
  complexityAnalysisStatus,
  complexityQuizCompleted,
  timeComplexity,
  spaceComplexity,
  onOpenPopup,
  isComplexityLoading,
  hasComplexityError,
}: EditorToolbarProps) {

  const renderComplexityInfo = () => {
    // Case 1: Quiz completed - show actual TC/SC
    if (complexityAnalysisStatus === "COMPLETED" && complexityQuizCompleted) {
      return (
        <>
          <span>
            TC: {timeComplexity || "_ _"}
          </span>
          <span>
            SC: {spaceComplexity || "_ _"}
          </span>
        </>
      );
    }

    // Case 2: Analysis completed but quiz not done - show Analyze button
    if (complexityAnalysisStatus === "COMPLETED" && !complexityQuizCompleted) {
      return (
        <ComplexityAnalyzingButton
          onClick={onOpenPopup}
          isLoading={false}
        />
      );
    }

    // Case 3: Analysis pending/failed
    if (complexityAnalysisStatus === "PENDING" || complexityAnalysisStatus === "FAILED") {
      if (isComplexityLoading) {
        return (
          <ComplexityAnalyzingButton
            onClick={onOpenPopup}
            isLoading={true}
          />
        );
      }

      if (hasComplexityError) {
        return <span>_ _</span>;
      }

      return (
        <ComplexityAnalyzingButton
          onClick={onOpenPopup}
          isLoading={false}
        />
      );
    }

    // Processing state
    if (complexityAnalysisStatus === "PROCESSING") {
      return (
        <ComplexityAnalyzingButton
          onClick={onOpenPopup}
          isLoading={true}
        />
      );
    }

    return <span>_ _</span>;
  };

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
          variant={getStatusBadgeVariant(submission.status)}
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
        {renderComplexityInfo()}

        <span className="text-gray-400">|</span>

        <span className="font-medium">
          {formatDate(submission.submittedAt)}
        </span>
      </div>
    </div>
  );
}