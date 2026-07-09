import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Code, Percent } from "lucide-react";
import type { DashboardStats } from "../../types/dashboard.types";

interface StatsCardsProps {
    stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const cards = [
        {
            title: "Total Solved",
            value: stats.totalSolved,
            icon: CheckCircle,
            color: "text-emerald-500"
        },
        {
            title: "Easy",
            value: stats.easySolved,
            icon: Target,
            color: "text-emerald-500"
        },
        {
            title: "Medium",
            value: stats.mediumSolved,
            icon: Target,
            color: "text-amber-500"
        },
        {
            title: "Hard",
            value: stats.hardSolved,
            icon: Target,
            color: "text-red-500"
        },
        {
            title: "Acceptance Rate",
            value: `${stats.acceptanceRate}%`,
            icon: Percent,
            color: "text-blue-500"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cards.map((card) => (
                <Card key={card.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {card.title}
                        </CardTitle>
                        <card.icon className={`h-4 w-4 ${card.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
