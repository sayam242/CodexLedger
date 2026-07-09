import AppLayout from "@/shared/layout/AppLayout";
import LoadingPage from "@/shared/components/LoadingPage";

import DashboardHeader from "../components/header/DashboardHeader";
import ProblemCard from "../components/problems/ProblemCard";
import { useDashboardProblems } from "../hooks/useDashboardProblems";
import { useDashboardStats } from "../hooks/useDashboardStats";

export default function DashboardPage() {
  const { problems, loading, error } = useDashboardProblems();
  const { stats, loading: statsLoading } = useDashboardStats();

  if (loading || statsLoading) {
    return (
      <AppLayout>
        <LoadingPage />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6 px-6 py-6">
        <DashboardHeader stats={{ totalSolved: stats?.totalSolved ?? 0 }} />

        <div className="space-y-4">
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : problems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No problems found.</p>
          ) : (
            problems.map((problem) => (
              <ProblemCard
                key={problem.problemId}
                problem={problem}
              />
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
