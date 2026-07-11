import type { EdgeCase } from "../../types/detailedProblem.types";

interface EdgeCaseCardProps {
  edgeCase: EdgeCase;
}

export default function EdgeCaseCard({ edgeCase }: EdgeCaseCardProps) {
  return (
    <div
      className="
        border
        border-amber-200
        rounded-lg
        p-4
        bg-amber-50
      "
    >
      <h5
        className="
          text-sm
          font-medium
          text-amber-800
          mb-2
        "
      >
        {edgeCase.name}
      </h5>
      <p
        className="
          text-xs
          text-amber-700
          mb-2
        "
      >
        {edgeCase.description}
      </p>
      <div
        className="
          text-xs
          space-y-1
        "
      >
        <p>
          <span className="font-medium text-gray-700">Example Input:</span>{" "}
          <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900">
            {edgeCase.input}
          </code>
        </p>
        <p>
          <span className="font-medium text-gray-700">Expected Behavior:</span>{" "}
          <span className="text-gray-600">{edgeCase.expectedBehavior}</span>
        </p>
      </div>
    </div>
  );
}
