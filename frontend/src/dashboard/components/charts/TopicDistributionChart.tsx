import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import type { TopicDistributionItem } from "../../types/dashboard.types";
import { ChartSkeleton } from "../ui/Skeleton";

interface TopicDistributionChartProps {
    data: TopicDistributionItem[];
    loading?: boolean;
}

const TOPIC_COLORS = [
    "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6",
    "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16"
];

const PLACEHOLDER_TOPICS = [
    { topic: "Arrays", count: 8 },
    { topic: "Strings", count: 6 },
    { topic: "Trees", count: 5 },
    { topic: "Graphs", count: 4 },
    { topic: "DP", count: 3 }
];

export default function TopicDistributionChart({ data, loading = false }: TopicDistributionChartProps) {
    if (loading) {
        return <ChartSkeleton />;
    }

    const chartData = data.slice(0, 10);

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Topic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                                data={PLACEHOLDER_TOPICS}
                                layout="vertical"
                                margin={{ left: 60, right: 20 }}
                            >
                                <XAxis type="number" />
                                <YAxis
                                    type="category"
                                    dataKey="topic"
                                    width={80}
                                    tick={{ fontSize: 12 }}
                                />
                                <Bar
                                    dataKey="count"
                                    radius={[0, 4, 4, 0]}
                                    opacity={0.3}
                                >
                                    {PLACEHOLDER_TOPICS.map((_, index) => (
                                        <Cell key={index} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                            Start solving problems to see your topic distribution
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ left: 60, right: 20 }}
                        >
                            <XAxis type="number" />
                            <YAxis
                                type="category"
                                dataKey="topic"
                                width={80}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                formatter={(value) => [`${value} problems`, "Count"]}
                            />
                            <Bar
                                dataKey="count"
                                radius={[0, 4, 4, 0]}
                            >
                                {chartData.map((_, index) => (
                                    <Cell key={index} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
