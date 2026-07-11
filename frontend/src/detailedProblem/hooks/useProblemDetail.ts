import { useProblem } from './useProblem';
import { useSubmission } from './useSubmission';
import {useProblemNotes} from "./useProblemNotes";
import { useExplanation } from './useExplanation';
export function useProblemDetail(problemId: string) {

    const {

        problem,

        submissions,

        loading,

        error

    } = useProblem(problemId);

    const {

        selectedSubmission,

        selectedSubmissionId,

        selectSubmission

    } = useSubmission(

        problemId,

        submissions

    );


    const {
        note,
        loading: noteLoading,
        error: noteError
    } = useProblemNotes(problemId);

    const {
        explanation,
        status: explanationStatus,
        loading: explanationLoading,
        error: explanationError
    } = useExplanation(problemId);

    return {

        problem,

        submissions,

        selectedSubmission,

        selectedSubmissionId,
        
        note,

        explanation,

        explanationStatus,

        loading,

        error,

        selectSubmission

    };

}