import AppLayout from "@/shared/layout/AppLayout";
import LoadingPage from "@/shared/components/LoadingPage";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { useDashboardActivity } from "../hooks/useDashboardActivity";
import { useRecentProblems } from "../hooks/useRecentProblems";
import { useStrugglingProblems } from "../hooks/useStrugglingProblems";

import StatsCards from "../components/stats/StatsCards";
import SubmissionStatsRow from "../components/stats/SubmissionStatsRow";
import ActivityHeatMap from "../components/charts/ActivityHeatMap";
import DifficultyBreakdownChart from "../components/charts/DifficultyBreakdownChart";
import StrugglingProblemsChart from "../components/charts/StrugglingProblemsChart";
import SolvedTrendsChart from "../components/charts/SolvedTrendsChart";
import TopicDistributionChart from "../components/charts/TopicDistributionChart";
import RecentProblems from "../components/problems/RecentProblems";
import { HeatmapSkeleton } from "../components/ui/Skeleton";

export default function DashboardPage() {
    const { stats, loading: statsLoading } = useDashboardStats();
    const { activity, loading: activityLoading } = useDashboardActivity();
    const { problems, loading: problemsLoading } = useRecentProblems(5);
    const { problems: strugglingProblems, loading: strugglingLoading } = useStrugglingProblems();

    const isLoading = statsLoading || activityLoading || problemsLoading;

    if (isLoading) {
        return (
            <AppLayout>
                <LoadingPage />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6 px-6 py-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                {/* Row 1: Main Stats */}
                {stats && <StatsCards stats={stats} />}

                {/* Row 2: Submission Stats */}
                <SubmissionStatsRow stats={stats} loading={statsLoading} />

                {/* Row 3: Heatmap - Full Width */}
                {activity ? (
                    <ActivityHeatMap data={activity.heatmap} />
                ) : (
                    <HeatmapSkeleton />
                )}

                {/* Row 4: Difficulty Breakdown + Struggling Problems */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DifficultyBreakdownChart stats={stats} loading={statsLoading} />
                    <StrugglingProblemsChart
                        problems={strugglingProblems}
                        loading={strugglingLoading}
                    />
                </div>

                {/* Row 5: Trends + Topic Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SolvedTrendsChart
                        data={activity?.weeklyTrends || []}
                        loading={activityLoading}
                    />
                    <TopicDistributionChart
                        data={activity?.topicDistribution || []}
                        loading={activityLoading}
                    />
                </div>

                {/* Row 6: Submission Timeline + Recent Problems */}
                <div>
                    <RecentProblems problems={problems} />
                </div>
            </div>
        </AppLayout>
    );
}
