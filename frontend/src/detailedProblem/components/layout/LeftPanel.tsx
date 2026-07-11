import ProblemDescription from "@/detailedProblem/components/problem/ProblemDescription";
import ProblemHeader from "@/detailedProblem/components/problem/ProblemHeader";

import type{ Problem, Submission, NoteResponse, ProblemExplanation, AIAnalysisStatus} from "@/detailedProblem/types/detailedProblem.types";




interface LeftPanelProps {
  problem: Problem;
  submissions: Submission[];
  selectedSubmissionId: string;
  note: NoteResponse;
  explanation: ProblemExplanation | null;
  explanationStatus: AIAnalysisStatus;
  explanationLoading: boolean;
  onSubmissionSelect: (submissionId: string) => void;
}

export default function LeftPanel({
  problem,
  submissions,
  selectedSubmissionId,
  note,
  explanation,
  explanationStatus,
  explanationLoading,
  onSubmissionSelect
}: LeftPanelProps) {
  return (
    <aside
      className="
        basis-[45%]
        min-w-0
        flex
        flex-col
        overflow-hidden
        bg-white
        px-6
        pt-6
        pb-1
        gap-6
      "
    >
      <div className="flex
        flex-col
        flex-1
        min-h-0
        w-full
        min-w-0">
        <ProblemHeader problem={problem} />

        <ProblemDescription
          problem={problem}
          submissions={submissions}
          selectedSubmissionId={selectedSubmissionId}
          note={note}
          explanation={explanation}
          explanationStatus={explanationStatus}
          explanationLoading={explanationLoading}
          onSubmissionSelect={onSubmissionSelect}
        />
      </div>

    </aside>
  );
}