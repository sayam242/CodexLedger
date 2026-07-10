import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import type { WeeklyTrendItem } from "../../types/dashboard.types";
import { ChartSkeleton } from "../ui/Skeleton";

interface SolvedTrendsChartProps {
    data: WeeklyTrendItem[];
    loading?: boolean;
}

const PLACEHOLDER_TRENDS = [
    { week: "Week 1", count: 3, fill: "#10b981" },
    { week: "Week 2", count: 5, fill: "#f59e0b" },
    { week: "Week 3", count: 2, fill: "#ef4444" },
    { week: "Week 4", count: 7, fill: "#10b981" }
];

export default function SolvedTrendsChart({ data, loading = false }: SolvedTrendsChartProps) {
    if (loading) {
        return <ChartSkeleton />;
    }

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Solved Problems Trend</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={PLACEHOLDER_TRENDS}>
                            <XAxis
                                dataKey="week"
                                tick={{ fontSize: 9 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                            />
                            <YAxis allowDecimals={false} />
                            <Bar
                                dataKey="count"
                                radius={[4, 4, 0, 0]}
                                opacity={0.3}
                            >
                                {PLACEHOLDER_TRENDS.map((entry, index) => (
                                    <rect key={index} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis
                                dataKey="week"
                                tick={{ fontSize: 9 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                            />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                formatter={(value: number) => [`${value} problems`, "Solved"]}
                                labelFormatter={(label) => `Week: ${label}`}
                            />
                            <Bar
                                dataKey="count"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
