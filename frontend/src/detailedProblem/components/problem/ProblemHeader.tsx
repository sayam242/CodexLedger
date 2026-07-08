import { Badge } from "@/components/ui/badge";

import { ExternalLink } from "lucide-react";

import TopicBadges from "./TopicBadges";

import type { Problem } from "../../types/detailedProblem.types";

import { getDifficultyBadgeVariant } from "@/shared/utils/getDifficultyBadgeVariant";

interface ProblemHeaderProps {

  problem: Problem;

}

export default function ProblemHeader({
  problem
}: ProblemHeaderProps) {

  return (

    <div
      className="
        space-y-3
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <span
              className="
                text-2xl
                font-bold
                text-gray-600
              "
            >

              {problem.problemNumber}.

            </span>

            <h1
              className="
                text-3xl
                font-bold
              "
            >

              {problem.title}

            </h1>

          </div>

        </div>

        <Badge
          variant={
            getDifficultyBadgeVariant(
              problem.difficulty
            )
          }
          className="whitespace-nowrap"
        >

          {problem.difficulty}

        </Badge>

      </div>

      <TopicBadges
        topics={problem.topics}
      />

      <a
        href={problem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-blue-600
          hover:text-blue-700
          hover:underline
        "
      >

        View on LeetCode

        <ExternalLink
          size={14}
        />

      </a>

    </div>

  );

}