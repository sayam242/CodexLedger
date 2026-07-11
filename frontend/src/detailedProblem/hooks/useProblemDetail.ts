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
    } = useProblemNotes(problemId);

    const {
        explanation,
        status: explanationStatus,
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