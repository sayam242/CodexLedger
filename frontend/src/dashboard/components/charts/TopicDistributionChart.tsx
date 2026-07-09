import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import type { TopicDistributionItem } from "../../types/dashboard.types";

interface TopicDistributionChartProps {
    data: TopicDistributionItem[];
}

export default function TopicDistributionChart({ data }: TopicDistributionChartProps) {
    const chartData = data.slice(0, 10);

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Topic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No topic data available
                    </p>
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
                                formatter={(value: number) => [`${value} problems`, "Count"]}
                            />
                            <Bar
                                dataKey="count"
                                fill="hsl(var(--primary))"
                                radius={[0, 4, 4, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
