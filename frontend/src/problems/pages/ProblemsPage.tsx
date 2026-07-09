import AppLayout from "@/shared/layout/AppLayout";
import LoadingPage from "@/shared/components/LoadingPage";

import DashboardHeader from "../components/header/DashboardHeader";
import FilterBar from "../components/filters/FilterBar";
import ProblemCard from "../components/problems/ProblemCard";
import { useDashboardProblems } from "../hooks/useDashboardProblems";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useProblemFilters } from "../hooks/useProblemFilters";
import SortDropdown from "../components/filters/SortDropdown";

export default function ProblemsPage() {
  const {
    filters,
    debouncedSearch,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    hasActiveFilters,
  } = useProblemFilters();

  const { problems, loading, loadingMore, error, hasMore, loadMore, total } = useDashboardProblems({
    ...filters,
    search: debouncedSearch,
  });

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

        <FilterBar
          filters={filters}
          onUpdateFilter={updateFilter}
          onToggleArrayFilter={toggleArrayFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {problems.length} of {total} Problem{total !== 1 ? "s" : ""}
          </p>
          <SortDropdown
            value={filters.sortOrder}
            onChange={(value) => updateFilter("sortOrder", value)}
          />
        </div>

        <div className="space-y-4">
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : problems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No problems found.</p>
          ) : (
            <>
              {problems.map((problem) => (
                <ProblemCard key={problem.problemId} problem={problem} />
              ))}

              {hasMore && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="rounded-full border border-border bg-background px-6 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                  >
                    {loadingMore ? "Loading..." : "Show More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
