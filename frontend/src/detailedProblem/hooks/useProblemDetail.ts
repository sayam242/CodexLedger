import { useProblem } from './useProblem';
import { useSubmission } from './useSubmission';
import {useProblemNotes} from "./useProblemNotes";
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

    return {

        problem,

        submissions,

        selectedSubmission,

        selectedSubmissionId,
        
        note,

        loading,

        error,

        selectSubmission

    };

}