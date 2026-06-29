import { useNavigate } from "react-router-dom";

import type {
  SubmissionData
} from "@/dashboard/types/dashboard.types";
import { formatDate } from "@/shared/utils/formatDate";

interface SubmissionHistoryProps {

  problemId: string;

  submissions: SubmissionData[];

}

export default function SubmissionHistory(
  {
    problemId,
    submissions
  }: SubmissionHistoryProps
) {

  const navigate =
    useNavigate();

  return (

    <div
      className="
        mt-6
        ml-4
        relative
      "
    >

      {/* Timeline Line */}

      <div
        className="
          absolute
          left-[7px]
          top-2
          bottom-2
          w-[2px]
          bg-muted
        "
      />

      {

        submissions.map(
          (
            submission
          ) => (

            <div
              key={
                submission.submissionId
              }
              className="
                relative
                flex
                gap-4
                pb-6
                cursor-pointer
              "
              onClick={(e) => {

                e.stopPropagation();

                navigate(

                  `/problems/${problemId}?submission=${submission.submissionId}`

                );

              }}
            >

              {/* Timeline Dot */}

              <div
                className="
                  h-4
                  w-4
                  rounded-full
                  bg-primary
                  mt-1
                  z-10
                "
              />

              {/* Content */}

              <div
                className="
                  flex-1
                  rounded-lg
                  border
                  p-3
                  hover:bg-muted/50
                  transition
                "
              >

                <div
                  className="
                    font-medium
                  "
                >

                  {submission.status}

                </div>

                <div
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >

                  {submission.language}

                </div>

                <div
                  className="
                    text-xs
                    text-muted-foreground
                    mt-1
                  "
                >

                  {
                  formatDate(submission.submittedAt)
                  }

                </div>

              </div>

            </div>

          )
        )

      }

    </div>

  );

}