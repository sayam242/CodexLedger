import CodeEditor from '@/detailedProblem/components/editor/CodeEditor';
import EditorToolbar from '@/detailedProblem/components/editor/EditorToolbar';
import type { Submission } from '@/detailedProblem/types/detailedProblem.types';

interface RightPanelProps {

  submission: Submission;

}

export default function RightPanel({ submission }: RightPanelProps) {
  return (
    <div className="w-[55%] flex flex-col bg-white overflow-x-hidden overflow-y-auto overscroll-contain scroll-smooth">
      <EditorToolbar submission={submission} />
      <CodeEditor submission={submission} />
    </div>
  );
}
