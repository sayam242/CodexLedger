import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Percent } from "lucide-react";
import type { DashboardStats } from "../../types/dashboard.types";

interface StatsCardsProps {
    stats: DashboardStats;
}

export default function StatsCards({ stats: stats }: StatsCardsProps) {
    const easyPercent = stats.totalSolved > 0 ? (stats.easySolved / stats.totalSolved) * 100 : 0;
    const mediumPercent = stats.totalSolved > 0 ? (stats.mediumSolved / stats.totalSolved) * 100 : 0;
    const hardPercent = stats.totalSolved > 0 ? (stats.hardSolved / stats.totalSolved) * 100 : 0;

    const cards = [
        {
            title: "Total Solved",
            value: stats.totalSolved,
            icon: CheckCircle,
            iconColor: "text-emerald-500",
            bgTint: "bg-emerald-50/50 dark:bg-emerald-950/20",
            barColor: "bg-emerald-500",
            percent: null
        },
        {
            title: "Easy",
            value: stats.easySolved,
            icon: Target,
            iconColor: "text-emerald-600",
            bgTint: "bg-emerald-50 dark:bg-emerald-950/30",
            barColor: "bg-emerald-500",
            percent: easyPercent
        },
        {
            title: "Medium",
            value: stats.mediumSolved,
            icon: Target,
            iconColor: "text-amber-600",
            bgTint: "bg-amber-50 dark:bg-amber-950/30",
            barColor: "bg-amber-500",
            percent: mediumPercent
        },
        {
            title: "Hard",
            value: stats.hardSolved,
            icon: Target,
            iconColor: "text-red-600",
            bgTint: "bg-red-50 dark:bg-red-950/30",
            barColor: "bg-red-500",
            percent: hardPercent
        },
        {
            title: "Acceptance Rate",
            value: `${stats.acceptanceRate}%`,
            icon: Percent,
            iconColor: "text-blue-600",
            bgTint: "bg-blue-50 dark:bg-blue-950/30",
            barColor: "bg-blue-500",
            percent: null
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                        {card.percent !== null && (
                            <div className="mt-2">
                                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${card.barColor}`}
                                        style={{ width: `${card.percent}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    {card.percent.toFixed(1)}% of total
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
