import SubmissionTimelineItem from "./SubmissionTimelineItem";

import type {
  Submission
} from "../../types/detailedProblem.types";

interface SubmissionTimelineProps {

  submissions: Submission[];

  selectedSubmissionId: string;

  onSubmissionSelect: (
    submissionId: string
  ) => void;

}

export default function SubmissionTimeline({

  submissions,

  selectedSubmissionId,

  onSubmissionSelect

}: SubmissionTimelineProps) {

  const sortedSubmissions =

    [...submissions].sort(

      (a, b) =>

        new Date(
          b.submittedAt
        ).getTime()

        -

        new Date(
          a.submittedAt
        ).getTime()

    );

  return (

    <div
      className="
        flex
        flex-col
        h-full
        space-y-4
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <h3
          className="
            text-lg
            font-semibold
          "
        >

          Submission History

        </h3>

        <span
          className="
            text-sm
            text-muted-foreground
          "
        >

          {submissions.length} attempts

        </span>

      </div>

      <div
        className="
          border-b
        "
      />

      <div
        className="
          flex-1
          overflow-y-auto
          space-y-3
          pr-2
        "
      >

        {

          sortedSubmissions.map(

            submission => (

              <SubmissionTimelineItem

                key={
                  submission.id
                }

                submission={
                  submission
                }

                isSelected={
                  submission.id ===
                  selectedSubmissionId
                }

                onClick={
                  onSubmissionSelect
                }

              />

            )

          )

        }

      </div>

    </div>

  );

}