import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Hash, Flame } from "lucide-react";
import type { DashboardStats } from "../../types/dashboard.types";
import { CardSkeleton } from "../ui/Skeleton";

interface SubmissionStatsRowProps {
    stats: DashboardStats | null;
    loading?: boolean;
}

export default function SubmissionStatsRow({ stats, loading = false }: SubmissionStatsRowProps) {
    if (loading || !stats) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        );
    }

    const avgSubmissions = stats.totalSolved > 0
        ? (stats.totalSubmissions / stats.totalSolved).toFixed(1)
        : "0";

    const cards = [
        {
            title: "Total Submissions",
            value: stats.totalSubmissions.toLocaleString(),
            icon: Activity,
            iconColor: "text-blue-600",
            bgTint: "bg-blue-50 dark:bg-blue-950/30"
        },
        {
            title: "Avg. Submissions/Problem",
            value: avgSubmissions,
            icon: Hash,
            iconColor: "text-purple-600",
            bgTint: "bg-purple-50 dark:bg-purple-950/30"
        },
        {
            title: "Current Streak",
            value: "12 days",
            icon: Flame,
            iconColor: "text-orange-600",
            bgTint: "bg-orange-50 dark:bg-orange-950/30"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card) => (
                <Card key={card.title} className={card.bgTint}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {card.title}
                        </CardTitle>
                        <card.icon className={`h-4 w-4 ${card.iconColor}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
