import { useParams } from 'react-router-dom';
import AppLayout from "@/shared/layout/AppLayout";
import LeftPanel from "../components/layout/LeftPanel";
import RightPanel from "../components/layout/RightPanel";
import { useProblemDetail } from "../hooks/useProblemDetail";



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

    if (loading) return (
      <div>Loading...</div>
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

                />

            </div>

        </AppLayout>

    );

}