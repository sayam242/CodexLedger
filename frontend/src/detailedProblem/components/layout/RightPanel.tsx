import CodeEditor from '@/detailedProblem/components/editor/CodeEditor';
import EditorToolbar from '@/detailedProblem/components/editor/EditorToolbar';
import type { Submission, AIAnalysisStatus } from '@/detailedProblem/types/detailedProblem.types';

interface RightPanelProps {
  submission: Submission;
  complexityAnalysisStatus: AIAnalysisStatus;
  complexityQuizCompleted: boolean;
  timeComplexity?: string;
  spaceComplexity?: string;
  onOpenPopup: () => void;
  isComplexityLoading: boolean;
  hasComplexityError: boolean;
}

export default function RightPanel({
  submission,
  complexityAnalysisStatus,
  complexityQuizCompleted,
  timeComplexity,
  spaceComplexity,
  onOpenPopup,
  isComplexityLoading,
  hasComplexityError,
}: RightPanelProps) {
  return (
    <div className="w-[55%] flex flex-col bg-white overflow-x-hidden overflow-y-auto overscroll-contain scroll-smooth">
      <EditorToolbar
        submission={submission}
        complexityAnalysisStatus={complexityAnalysisStatus}
        complexityQuizCompleted={complexityQuizCompleted}
        timeComplexity={timeComplexity}
        spaceComplexity={spaceComplexity}
        onOpenPopup={onOpenPopup}
        isComplexityLoading={isComplexityLoading}
        hasComplexityError={hasComplexityError}
      />
      <CodeEditor submission={submission} />
    </div>
  );
}
