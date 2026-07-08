import { useState } from "react";

import { Card } from "@/components/ui/card";

import type {Problem, Submission, NoteResponse} from "../../types/detailedProblem.types";

import SubmissionTimeline from "../submission/SubmissionTimeline";
import NotesEditor from "@/detailedProblem/notes/components/NotesEditor";

interface ProblemDescriptionProps {
  problem: Problem;
  submissions: Submission[];
  selectedSubmissionId: string;
  note: NoteResponse;
  onSubmissionSelect: (submissionId: string) => void;
}

const TAB_OPTIONS = [
  {
    id: "description",
    label: "Description"
  },
  {
    id: "explanation",
    label: "Explanation"
  },
  {
    id: "chatBot",
    label: "ChatBot"
  },
  {
    id: "submissions",
    label: "Submissions"
  },
  {
    id: "notes",
    label: "Notes"
  }
] as const;

function PlaceholderContent({
  message
}: {
  message: string;
}) {
  return (
    <p
      className="
        text-sm
        text-gray-500
        italic
      "
    >
      {message}
    </p>
  );
}

export default function ProblemDescription({
  problem,
  submissions,
  selectedSubmissionId,
  note,
  onSubmissionSelect
}: ProblemDescriptionProps) {

  const [
    activeTab,
    setActiveTab
  ] = useState("description");

  return (

    <div
      className="
        flex
        flex-col
        flex-1
        min-h-0
        space-y-4
      "
    >

      {/* Tabs */}

      <div
        className="
          flex
          gap-2
          border-b
          shrink-0
        "
      >

        {

          TAB_OPTIONS.map(

            tab => (

              <button

                key={tab.id}

                onClick={() =>
                  setActiveTab(tab.id)
                }

                className={`

                  px-4
                  py-2

                  text-sm
                  font-medium

                  transition-colors

                  border-b-2

                  ${

                    activeTab === tab.id

                      ? "border-blue-500 text-blue-600"

                      : "border-transparent text-gray-600 hover:text-gray-900"

                  }

                `}

              >

                {tab.label}

              </button>

            )

          )

        }

      </div>

      {/* Content */}

      <Card
        className="
          flex-1
          min-h-0
          overflow-hidden
          bg-white
        "
      >

        <div
          className="
            h-full
            overflow-y-auto
            scroll-smooth
            p-6
          "
        >

          {

            activeTab === "description" && (

              problem.htmlContent

                ? (

                  <div

                    className="
                      prose
                      prose-sm
                      max-w-none
                      wrap-break-words
                      overflow-x-hidden
                      **:max-w-full
                      text-gray-700
                    "

                    dangerouslySetInnerHTML={{

                      __html:
                        problem.htmlContent

                    }}

                  />

                )

                : (

                  <div
                    className="
                      space-y-4
                      text-sm
                      leading-relaxed
                      text-gray-700
                    "
                  >

                    {

                      (problem.plainText ?? "")

                        .split("\n")

                        .map(

                          (

                            line,

                            index

                          ) => (

                            <p

                              key={index}

                              className={

                                line.includes(":")

                                  ? "font-semibold"

                                  : ""

                              }

                            >

                              {line}

                            </p>

                          )

                        )

                    }

                  </div>

                )

            )

          }

          {

            activeTab === "submissions" && (

              <SubmissionTimeline

                submissions={submissions}

                selectedSubmissionId={selectedSubmissionId}

                onSubmissionSelect={onSubmissionSelect}

              />

            )

          }

          {

            activeTab === "notes" && (

              <div className="h-full flex flex-col ">
                  <NotesEditor 
                  problemId={problem.id}
                  initialNote={note}
               />
              </div>

            )

          }

          {

            activeTab === "chatBot" && (

              <PlaceholderContent

                message="
                  ChatBot not available
                "

              />

            )

          }

          {

            activeTab === "explanation" && (

              <PlaceholderContent

                message="
                  Detailed explanation not available
                "

              />

            )

          }

        </div>

      </Card>

    </div>

  );

}