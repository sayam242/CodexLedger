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

interface SolvedTrendsChartProps {
    data: WeeklyTrendItem[];
}

export default function SolvedTrendsChart({ data }: SolvedTrendsChartProps) {
    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Solved Problems Trend</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No trend data available
                    </p>
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
