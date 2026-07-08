import type { Submission } from "@/detailedProblem/types/detailedProblem.types";

import { getLanguageClass } from "@/shared/utils/getLanguageClass";

interface CodeEditorProps {

  submission: Submission;

}

export default function CodeEditor({
  submission
}: CodeEditorProps) {

  return (

    <div
      className="
        h-full
        flex
        flex-col
        bg-gray-900
        rounded-b-lg
        overflow-hidden
      "
    >

      <div
        className="
          flex-1
          overflow-y-auto
        "
      >

        <pre
          className="
            p-4
            text-sm
            font-mono
            text-gray-100
            whitespace-pre-wrap
            break-words
          "
        >

          <code
            className={
              getLanguageClass(
                submission.language
              )
            }
          >

            {submission.code}

          </code>

        </pre>

      </div>

      <div
        className="
          px-4
          py-2
          bg-gray-800
          border-t
          border-gray-700
          text-xs
          text-gray-400
          flex
          items-center
          justify-between
        "
      >

      </div>

    </div>

  );

}