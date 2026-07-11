import { Loader2 } from "lucide-react";
import type { ProblemExplanation, AIAnalysisStatus } from "../../types/detailedProblem.types";
import ExplanationSection from "./ExplanationSection";
import DryRunCard from "./DryRunCard";
import EdgeCaseCard from "./EdgeCaseCard";

interface ExplanationContentProps {
  explanation: ProblemExplanation | null;
  status: AIAnalysisStatus;
  loading: boolean;
}

function GeneratingState() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-12
        gap-3
      "
    >
      <Loader2
        className="
          h-8
          w-8
          text-blue-500
          animate-spin
        "
      />
      <p
        className="
          text-sm
          text-gray-500
        "
      >
        Generating explanation...
      </p>
      <p
        className="
          text-xs
          text-gray-400
        "
      >
        This may take a moment. You can continue viewing other sections.
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        py-12
      "
    >
      <p className="text-sm text-red-500">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        py-12
      "
    >
      <p
        className="
          text-sm
          text-gray-500
          italic
        "
      >
        Explanation not available yet.
      </p>
    </div>
  );
}

export default function ExplanationContent({
  explanation,
  status,
  loading,
}: ExplanationContentProps) {
  if (loading && status === "PROCESSING") {
    return <GeneratingState />;
  }

  if (status === "FAILED") {
    return <ErrorState message="Explanation generation failed. Please try again later." />;
  }

  if (!explanation) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      <ExplanationSection title="Overview" defaultOpen>
        <p>{explanation.overview}</p>
      </ExplanationSection>

      <ExplanationSection title="Input Explanation">
        <p>{explanation.inputExplanation}</p>
      </ExplanationSection>

      <ExplanationSection title="Output Explanation">
        <p>{explanation.outputExplanation}</p>
      </ExplanationSection>

      <ExplanationSection title="Real-World Analogy">
        <p>{explanation.realWorldAnalogy}</p>
      </ExplanationSection>

      <ExplanationSection title="Dry Runs">
        <div className="space-y-3">
          {explanation.dryRuns.map((dryRun, idx) => (
            <DryRunCard key={idx} dryRun={dryRun} index={idx} />
          ))}
        </div>
      </ExplanationSection>

      <ExplanationSection title="Edge Cases">
        <div className="space-y-3">
          {explanation.edgeCases.map((edgeCase, idx) => (
            <EdgeCaseCard key={idx} edgeCase={edgeCase} />
          ))}
        </div>
      </ExplanationSection>

      <ExplanationSection title="Common Misunderstandings">
        <div className="space-y-3">
          {explanation.commonMisunderstandings.map((item, idx) => (
            <div
              key={idx}
              className="
                border
                border-gray-200
                rounded-lg
                p-3
                bg-gray-50
              "
            >
              <p
                className="
                  text-xs
                  font-medium
                  text-red-600
                  mb-1
                "
              >
                Misconception: {item.misunderstanding}
              </p>
              <p
                className="
                  text-xs
                  text-green-700
                "
              >
                Clarification: {item.clarification}
              </p>
            </div>
          ))}
        </div>
      </ExplanationSection>

      <ExplanationSection title="Key Observations">
        <div className="space-y-2">
          {explanation.keyObservations.map((item, idx) => (
            <div key={idx} className="text-xs">
              <p className="font-medium text-gray-800">{item.observation}</p>
              <p className="text-gray-600 mt-0.5">{item.whyItMatters}</p>
            </div>
          ))}
        </div>
      </ExplanationSection>

      <ExplanationSection title="Important Notes">
        <ul className="list-disc list-inside space-y-1">
          {explanation.importantNotes.map((item, idx) => (
            <li key={idx} className="text-xs text-gray-700">
              {item.note}
            </li>
          ))}
        </ul>
      </ExplanationSection>
    </div>
  );
}
