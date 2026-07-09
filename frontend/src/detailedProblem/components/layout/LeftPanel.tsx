import ProblemDescription from "@/detailedProblem/components/problem/ProblemDescription";
import ProblemHeader from "@/detailedProblem/components/problem/ProblemHeader";
import SubmissionTimeline from "@/detailedProblem/components/submission/SubmissionTimeline";
import type{ Problem, Submission,NoteResponse} from "@/detailedProblem/types/detailedProblem.types";




interface LeftPanelProps {
  problem: Problem;
  submissions: Submission[];
  selectedSubmissionId: string;
  note: NoteResponse;
  onSubmissionSelect: (submissionId: string) => void;
}

export default function LeftPanel({
  problem,
  submissions,
  selectedSubmissionId,
  note,
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
          onSubmissionSelect={onSubmissionSelect}
        />
      </div>

    </aside>
  );
}