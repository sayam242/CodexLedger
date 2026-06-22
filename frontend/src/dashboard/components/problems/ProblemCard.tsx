import {
  Card,
  CardContent
}
from "@/components/ui/card";

import {
  Badge
}
from "@/components/ui/badge";

import type { ProblemCardData } from "@/dashboard/types/dashboard.types";

interface ProblemCardProps {

  problem: ProblemCardData;

}

export default function ProblemCard(
{
  problem
}: ProblemCardProps
) {

  return (

    <Card>

      <CardContent
        className="
          flex
          items-center
          justify-between
          py-6
        "
      >

        {/* Left */}

        <div
          className="
            space-y-2
          "
        >

          <div
            className="
              text-sm
              text-muted-foreground
            "
          >

            LeetCode #{problem.problemId}

          </div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <h3
              className="
                font-semibold
              "
            >

              {problem.title}

            </h3>

            <Badge>

              {problem.difficulty}

            </Badge>

          </div>

        </div>

        {/* Right */}

        <div
          className="
            text-right
            space-y-2
          "
        >

          <Badge>

            {problem.latestStatus}

          </Badge>

          <div
            className="
              text-sm
              text-muted-foreground
            "
          >

            {problem.latestSubmissionAt}

          </div>

        </div>

      </CardContent>

    </Card>

  );

}