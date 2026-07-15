import { useCallback } from "react";
import AppLayout from "@/shared/layout/AppLayout";
import LoadingPage from "@/shared/components/LoadingPage";
import { useSocketEvent } from "@/hooks/useSocketEvent";

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
    const { stats, loading: statsInitialLoad, refetch: refetchStats } = useDashboardStats();
    const { activity, loading: activityInitialLoad, refetch: refetchActivity } = useDashboardActivity();
    const { problems, loading: problemsInitialLoad, refetch: refetchProblems } = useRecentProblems(5);
    const { problems: strugglingProblems, loading: strugglingLoading, refetch: refetchStruggling } = useStrugglingProblems();

    const refetchAll = useCallback(() => {
        refetchStats();
        refetchActivity();
        refetchProblems();
        refetchStruggling();
    }, [refetchStats, refetchActivity, refetchProblems, refetchStruggling]);

    useSocketEvent("dashboard:updated", refetchAll);
    useSocketEvent("problem:synced", refetchAll);
    useSocketEvent("complexity:completed", refetchStats);
    useSocketEvent("explanation:completed", refetchStats);

    const isInitialLoad = statsInitialLoad || activityInitialLoad || problemsInitialLoad;

    if (isInitialLoad) {
        return (
            <AppLayout>
                <LoadingPage />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6 px-6 py-6">

                {/* Row 1: Main Stats */}
                {stats && <StatsCards stats={stats} />}

                {/* Row 2: Submission Stats */}
                <SubmissionStatsRow stats={stats} loading={statsInitialLoad} />

                {/* Row 3: Heatmap - Full Width */}
                {activity ? (
                    <ActivityHeatMap data={activity.heatmap} />
                ) : (
                    <HeatmapSkeleton />
                )}

                {/* Row 4: Difficulty Breakdown + Struggling Problems */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DifficultyBreakdownChart stats={stats} loading={statsInitialLoad} />
                    <StrugglingProblemsChart
                        problems={strugglingProblems}
                        loading={strugglingLoading}
                    />
                </div>

                {/* Row 5: Trends + Topic Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SolvedTrendsChart
                        data={activity?.weeklyTrends || []}
                        loading={activityInitialLoad}
                    />
                    <TopicDistributionChart
                        data={activity?.topicDistribution || []}
                        loading={activityInitialLoad}
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
