import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Submission } from '@/detailedProblem/types/detailedProblem.types';
import { getStatusBadgeVariant } from '@/shared/utils/getStatusBadgeVarient';
import { formatDate } from '@/shared/utils/formatDate';

    


interface SubmissionTimelineItemProps {
  submission: Submission;
  isSelected: boolean;
  onClick: (submissionId: string) => void;
}


export default function SubmissionTimelineItem({
  submission,
  isSelected,
  onClick
}: SubmissionTimelineItemProps) {
  const formattedDate = formatDate(submission.submittedAt);

  return (
    <div
      onClick={() => onClick(submission.id)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-l-4 border-l-blue-600 bg-blue-50"
          : "hover:bg-gray-50"
      }`}
    >
      <div className="space-y-2">
        {/* Date and Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-gray-600">{formattedDate}</span>
          <Badge variant={getStatusBadgeVariant(submission.status)}>
            {submission.status}
          </Badge>
        </div>

        {/* Language and Stats */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-gray-50 text-xs">
              {submission.language}
            </Badge>
          </div>
          <div className="text-xs text-gray-500 text-right">
            {submission.runtime != null && <span>Runtime {submission.runtime} ms</span>}
            {submission.memory != null && <span>, Memory {submission.memory} MB</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
