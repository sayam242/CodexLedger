import { Code } from "lucide-react";

interface LoadingPageProps {
  message?: string;
  subtitle?: string;
}

export default function LoadingPage({
  message = "Loading workspace",
  subtitle = "Preparing your coding environment",
}: LoadingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
            <Code className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {message}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {/* Skeleton Card */}
      <div className="w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm">
        {/* Top bar skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-200" />
            <div className="h-6 w-6 rounded-full bg-gray-200" />
            <div className="h-6 w-6 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Lines skeleton */}
        <div className="space-y-3 mb-6">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
          <div className="h-3 w-4/6 rounded bg-gray-200" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 rounded-lg bg-gray-200" />
          <div className="h-16 rounded-lg bg-gray-200" />
          <div className="h-16 rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Status Tags */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Optimizing editor
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Syncing submissions
        </div>
      </div>
    </div>
  );
}
