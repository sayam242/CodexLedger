import type { DryRun } from "../../types/detailedProblem.types";

interface DryRunCardProps {
  dryRun: DryRun;
  index: number;
}

export default function DryRunCard({ dryRun, index }: DryRunCardProps) {
  return (
    <div
      className="
        border
        border-gray-200
        rounded-lg
        p-4
        bg-white
      "
    >
      <h5
        className="
          text-sm
          font-medium
          text-gray-800
          mb-3
        "
      >
        Dry Run {index + 1}: {dryRun.title}
      </h5>

      <div className="space-y-2">
        {dryRun.steps.map((step) => (
          <div
            key={step.step}
            className="
              flex
              items-start
              gap-3
              text-xs
            "
          >
            <span
              className="
                flex-shrink-0
                w-5
                h-5
                flex
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-blue-700
                font-medium
              "
            >
              {step.step}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-700">{step.description}</p>
              <div
                className="
                  flex
                  gap-4
                  mt-1
                  text-xs
                  text-gray-500
                "
              >
                <span>
                  <span className="font-medium">Input:</span> {step.input}
                </span>
                <span>
                  <span className="font-medium">Output:</span> {step.output}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="
          mt-3
          pt-3
          border-t
          border-gray-100
          text-xs
          font-medium
          text-gray-800
        "
      >
        Final Output: {dryRun.finalOutput}
      </div>
    </div>
  );
}
