import { useState } from "react";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent
} from "@/components/ui/card";

import type {
  ProblemCardData
} from "../../types/problem.types";

import SubmissionHistory from "./SubmissionHistory";
import { formatDate } from "@/shared/utils/formatDate";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemCardProps {
  problem: ProblemCardData;
}

function getStatusColor(status: string): string {
  switch (status) {
    case "Accepted":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Wrong Answer":
      return "bg-red-100 text-red-700 border-red-200";
    case "TLE":
    case "Time Limit Exceeded":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "Runtime Error":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Compile Error":
    case "Compilation Error":
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
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

function getBorderColor(status: string): string {
  switch (status) {
    case "Accepted":
      return "border-l-emerald-500";
    case "Wrong Answer":
      return "border-l-red-500";
    case "TLE":
    case "Time Limit Exceeded":
      return "border-l-orange-500";
    case "Runtime Error":
      return "border-l-amber-500";
    case "Compile Error":
    case "Compilation Error":
      return "border-l-purple-500";
    default:
      return "border-l-gray-300";
  }
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  const [expanded, setExpanded] = useState(false);

  const latestStatus = problem.latestStatus || "Unknown";
  const borderColor = getBorderColor(latestStatus);

  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden border border-gray-200 border-l-4 transition-all hover:shadow-md",
        borderColor,
        expanded && "shadow-md"
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="py-3 px-4">
        {/* Top Row: LeetCode info and Status */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Code2 className="h-4 w-4" />
              <span className="text-sm font-medium">LeetCode</span>
            </div>
            <span className="text-sm text-gray-400">
              #{problem.problemNumber}
            </span>
          </div>
          <Badge
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full border",
              getStatusColor(latestStatus)
            )}
          >
            {latestStatus}
          </Badge>
        </div>

        {/* Bottom Row: Title, Difficulty, and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-base">
              {problem.title}
            </h3>
            <Badge
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full border",
                getDifficultyColor(problem.difficulty)
              )}
            >
              {problem.difficulty}
            </Badge>
          </div>
          <div className="text-sm text-gray-500">
            {formatDate(problem.latestSubmissionAt)}
          </div>
        </div>

        {/* Expanded Submission History */}
        {expanded && problem.submissions && problem.submissions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <SubmissionHistory
              problemId={problem.problemId}
              submissions={problem.submissions}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
