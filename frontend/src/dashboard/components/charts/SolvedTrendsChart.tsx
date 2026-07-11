import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    CartesianGrid
} from "recharts";
import type { WeeklyTrendItem } from "../../types/dashboard.types";
import { ChartSkeleton } from "../ui/Skeleton";

interface SolvedTrendsChartProps {
    data: WeeklyTrendItem[];
    loading?: boolean;
}

const PLACEHOLDER_TRENDS = [
    { week: "Apr 18 - Apr 24", count: 3 },
    { week: "Apr 25 - May 1", count: 5 },
    { week: "May 2 - May 8", count: 2 },
    { week: "May 9 - May 15", count: 7 },
    { week: "May 16 - May 22", count: 4 },
    { week: "May 23 - May 29", count: 6 }
];

const CHART_COLORS = [
    "#a7f3d0", "#93c5fd", "#fcd34d", "#c4b5fd",
    "#fca5a5", "#f9a8d4", "#99f6e4"
];

const REAL_COLORS = [
    "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6",
    "#ef4444", "#ec4899", "#14b8a6"
];

export default function SolvedTrendsChart({ data, loading = false }: SolvedTrendsChartProps) {
    if (loading) {
        return <ChartSkeleton />;
    }

    const hasRealData = data.length > 0 && data.some(item => item.count > 0);

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Solved Problems Trend</CardTitle>
            </CardHeader>
            <CardContent>
                {!hasRealData ? (
                    <div>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={PLACEHOLDER_TRENDS} margin={{ bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="week"
                                    tick={{ fontSize: 9 }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                    interval={0}
                                />
                                <YAxis allowDecimals={false} />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {PLACEHOLDER_TRENDS.map((_, index) => (
                                        <Cell
                                            key={`placeholder-${index}`}
                                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                            Solve problems to see your weekly trends
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
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
                                formatter={(value) => [`${value} problems`, "Solved"]}
                                labelFormatter={(label) => `Week: ${label}`}
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "1px solid hsl(var(--border))",
                                    backgroundColor: "hsl(var(--card))"
                                }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {data.map((_, index) => (
                                    <Cell
                                        key={`real-${index}`}
                                        fill={REAL_COLORS[index % REAL_COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
