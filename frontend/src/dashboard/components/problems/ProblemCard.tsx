import { useState } from "react";

import {
  Card,
  CardContent
} from "@/components/ui/card";

import {
  Badge
} from "@/components/ui/badge";

import type {
  ProblemCardData
} from "@/dashboard/types/dashboard.types";

import SubmissionHistory from "./SubmissionHistory";

interface ProblemCardProps {

  problem: ProblemCardData;

}

export default function ProblemCard(
  {
    problem
  }: ProblemCardProps
) {

  const [
    expanded,
    setExpanded
  ] = useState(false);

  return (

    <Card
      className="
        cursor-pointer
        overflow-hidden
      "
      onClick={() =>
        setExpanded(
          !expanded
        )
      }
    >

      <CardContent
        className="
          py-6
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
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

              LeetCode #
              {problem.problemId}

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

        </div>

        {

          expanded && (

            <SubmissionHistory

              problemId={
                problem.problemId
              }

              submissions={
                problem.submissions
              }

            />

          )

        }

      </CardContent>

    </Card>

  );

}