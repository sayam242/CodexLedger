import { useNavigate } from "react-router-dom";

import type {
  SubmissionData
} from "../../types/problem.types";
import { formatDate } from "@/shared/utils/formatDate";
import { cn } from "@/lib/utils";

interface SubmissionHistoryProps {
  problemId: string;
  submissions: SubmissionData[];
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

function getLanguageColor(language: string): string {
  switch (language.toLowerCase()) {
    case "python":
    case "python3":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "javascript":
    case "js":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "java":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "c++":
    case "cpp":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "c":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "go":
      return "bg-cyan-100 text-cyan-700 border-cyan-200";
    case "rust":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function SubmissionHistory({
  problemId,
  submissions
}: SubmissionHistoryProps) {
  const navigate = useNavigate();

  return (
    <div className="relative ml-2">
      {/* Vertical timeline line */}
      <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200" />

      <div className="space-y-0">
        {submissions.map((submission, index) => (
          <div
            key={submission.submissionId}
            className="relative flex items-start gap-4 py-2 cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/problems/${problemId}?submission=${submission.submissionId}`);
            }}
          >
            {/* Timeline dot */}
            <div className="relative z-10 mt-2">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 border-white shadow-sm",
                  submission.status === "Accepted" ? "bg-emerald-500" :
                  submission.status === "Wrong Answer" ? "bg-red-500" :
                  submission.status === "TLE" ? "bg-orange-500" :
                  "bg-gray-400"
                )}
              />
            </div>

            {/* Content row */}
            <div className="flex-1 flex items-center justify-between py-1 px-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
              {/* Left: Date/Time */}
              <div className="text-sm text-gray-500 w-32 shrink-0">
                {formatDate(submission.submittedAt)}
              </div>

              {/* Middle: Status and Language Badges */}
              <div className="flex items-center gap-2 flex-1">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full border",
                    getStatusColor(submission.status)
                  )}
                >
                  {submission.status}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full border",
                    getLanguageColor(submission.language)
                  )}
                >
                  {submission.language}
                </span>
              </div>

              {/* Right: Runtime/Memory (placeholder) */}
              <div className="text-xs text-gray-400 w-24 text-right shrink-0">
                --
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
