import AppLayout from "@/shared/layout/AppLayout";
import LoadingPage from "@/shared/components/LoadingPage";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { useDashboardActivity } from "../hooks/useDashboardActivity";
import { useRecentProblems } from "../hooks/useRecentProblems";

import StatsCards from "../components/stats/StatsCards";
import ActivityHeatMap from "../components/charts/ActivityHeatMap";
import SolvedTrendsChart from "../components/charts/SolvedTrendsChart";
import TopicDistributionChart from "../components/charts/TopicDistributionChart";
import RecentProblems from "../components/problems/RecentProblems";

export default function DashboardPage() {
    const { stats, loading: statsLoading } = useDashboardStats();
    const { activity, loading: activityLoading } = useDashboardActivity();
    const { problems, loading: problemsLoading } = useRecentProblems(5);

    if (statsLoading || activityLoading || problemsLoading) {
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

                {stats && <StatsCards stats={stats} />}

                {activity && <ActivityHeatMap data={activity.heatmap} />}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activity && (
                        <SolvedTrendsChart data={activity.weeklyTrends} />
                    )}
                    {activity && (
                        <TopicDistributionChart
                            data={activity.topicDistribution}
                        />
                    )}
                </div>

                <RecentProblems problems={problems} />
            </div>
        </AppLayout>
    );
}
