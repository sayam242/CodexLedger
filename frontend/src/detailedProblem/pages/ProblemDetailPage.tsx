import { useParams } from 'react-router-dom';
import AppLayout from "@/shared/layout/AppLayout";
import LoadingPage from "@/shared/components/LoadingPage";
import LeftPanel from "../components/layout/LeftPanel";
import RightPanel from "../components/layout/RightPanel";
import ComplexityPopup from "../components/complexity/ComplexityPopup";
import { useProblemDetail } from "../hooks/useProblemDetail";
import { useComplexityAnalysis } from "../hooks/useComplexityAnalysis";

export default function ProblemDetailPage() {
  const { problemId } = useParams<{
    problemId: string;
  }>();

  if (!problemId) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-screen">
          Invalid problem ID
        </div>
      </AppLayout>
    );
  }

  const {
    problem,
    submissions,
    selectedSubmission,
    selectedSubmissionId,
    note,
    loading,
    error,
    selectSubmission
  } = useProblemDetail(problemId);

  const {
    showPopup,
    complexityData,
    isLoading: isComplexityLoading,
    error: complexityError,
    openPopup,
    closePopup,
    submitQuiz,
    complexityStatus,
    quizCompleted,
    timeComplexity,
    spaceComplexity,
  } = useComplexityAnalysis(selectedSubmission);

  if (loading) return (
    <AppLayout>
      <LoadingPage
        message="Loading problem"
        subtitle="Fetching problem details and submissions"
      />
    </AppLayout>
  );

  if (error) return (
    <div>Error</div>
  );

  if (!problem || !selectedSubmission) return (
    <div>Not Found</div>
  );

  return (
    <AppLayout>
      <div className="h-full flex overflow-hidden">
        <LeftPanel
          problem={problem}
          submissions={submissions}
          selectedSubmissionId={selectedSubmissionId}
          onSubmissionSelect={selectSubmission}
          note={note}
        />

        <RightPanel
          submission={selectedSubmission}
          complexityAnalysisStatus={complexityStatus}
          complexityQuizCompleted={quizCompleted}
          timeComplexity={timeComplexity}
          spaceComplexity={spaceComplexity}
          onOpenPopup={openPopup}
          isComplexityLoading={isComplexityLoading}
          hasComplexityError={!!complexityError}
        />

        {complexityData && (
          <ComplexityPopup
            isOpen={showPopup}
            timeComplexityOptions={complexityData.timeComplexityOptions}
            spaceComplexityOptions={complexityData.spaceComplexityOptions}
            correctTimeComplexity={complexityData.correctTimeComplexity}
            correctSpaceComplexity={complexityData.correctSpaceComplexity}
            reasoning={complexityData.reasoning}
            onSubmit={submitQuiz}
            onClose={closePopup}
          />
        )}
      </div>
    </AppLayout>
  );
}