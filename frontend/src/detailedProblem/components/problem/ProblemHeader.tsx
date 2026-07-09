import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TopicBadges from "./TopicBadges";
import type { Problem } from "../../types/detailedProblem.types";

interface ProblemHeaderProps {
  problem: Problem;
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Medium":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Hard":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getPlatformColor(platform: string): string {
  switch (platform.toLowerCase()) {
    case "leetcode":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function ProblemHeader({ problem }: ProblemHeaderProps) {
  return (
    <Card className="border border-gray-200 shadow-md">
      <CardContent className=" px-6 space-y-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground">
          #{problem.problemNumber} — {problem.title}
        </h1>

        {/* Difficulty and Platform badges */}
        <div className="flex items-center gap-2">
          <Badge
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${getDifficultyColor(problem.difficulty)}`}
          >
            {problem.difficulty}
          </Badge>
          {problem.platform && (
            <Badge
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${getPlatformColor(problem.platform)}`}
            >
              {problem.platform}
            </Badge>
          )}
        </div>

        {/* Topic badges */}
        <TopicBadges topics={problem.topics} />
      </CardContent>
    </Card>
  );
}
