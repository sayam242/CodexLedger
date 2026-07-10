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

interface StrugglingProblem {
    problemId: string;
    title: string;
    difficulty: string;
    rejectionCount: number;
}

interface StrugglingProblemsChartProps {
    problems: StrugglingProblem[] | null;
    loading?: boolean;
}

const DIFFICULTY_COLORS: Record<string, string> = {
    Easy: "#10b981",
    Medium: "#f59e0b",
    Hard: "#ef4444"
};

const PLACEHOLDER_DATA = [
    { shortTitle: "Two Sum", difficulty: "Easy", rejectionCount: 3 },
    { shortTitle: "Valid Parentheses", difficulty: "Medium", rejectionCount: 2 },
    { shortTitle: "Merge K Lists", difficulty: "Hard", rejectionCount: 5 }
];

export default function StrugglingProblemsChart({
    problems,
    loading = false
}: StrugglingProblemsChartProps) {
    if (loading || !problems) {
        return (
            <Card className="h-full">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Most Struggling Problems</CardTitle>
                        <span className="text-xs text-muted-foreground">Top 10 by rejections</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[200px]">
                        <div className="animate-pulse flex flex-col items-center gap-2">
                            <div className="h-4 w-48 bg-muted rounded" />
                            <div className="h-4 w-36 bg-muted rounded" />
                            <div className="h-4 w-44 bg-muted rounded" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const chartData = problems.slice(0, 10).map((p) => ({
        ...p,
        shortTitle: p.title.length > 20 ? p.title.slice(0, 20) + "..." : p.title
    }));

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Most Struggling Problems</CardTitle>
                    <span className="text-xs text-muted-foreground">
                        Top 10 by rejections
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart
                                data={PLACEHOLDER_DATA}
                                layout="vertical"
                                margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
                            >
                                <XAxis type="number" hide />
                                <YAxis
                                    type="category"
                                    dataKey="shortTitle"
                                    width={140}
                                    tick={{ fontSize: 11 }}
                                />
                                <Bar
                                    dataKey="rejectionCount"
                                    radius={[0, 4, 4, 0]}
                                    barSize={20}
                                    opacity={0.3}
                                >
                                    {PLACEHOLDER_DATA.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={DIFFICULTY_COLORS[entry.difficulty] || "#94a3b8"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                            Keep practicing to identify your struggling areas
                        </p>
                    </div>
                ) : (
                    <>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart
                                data={chartData}
                                layout="vertical"
                                margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
                            >
                                <XAxis
                                    type="number"
                                    allowDecimals={false}
                                    tick={{ fontSize: 11 }}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="shortTitle"
                                    width={140}
                                    tick={{ fontSize: 11 }}
                                />
                                <Tooltip
                                    formatter={(value: number) => [
                                        `${value} rejections`,
                                        "Failed Submissions"
                                    ]}
                                    labelFormatter={(label) => {
                                        const problem = chartData.find(
                                            (p) => p.shortTitle === label
                                        );
                                        return problem ? problem.title : label;
                                    }}
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "1px solid hsl(var(--border))",
                                        backgroundColor: "hsl(var(--card))"
                                    }}
                                />
                                <Bar dataKey="rejectionCount" radius={[0, 4, 4, 0]} barSize={20}>
                                    {chartData.map((entry) => (
                                        <Cell
                                            key={entry.problemId}
                                            fill={
                                                DIFFICULTY_COLORS[entry.difficulty] || "#94a3b8"
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="flex items-center gap-4 mt-4 justify-center">
                            {Object.entries(DIFFICULTY_COLORS).map(([key, color]) => (
                                <div key={key} className="flex items-center gap-1.5">
                                    <div
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="text-xs text-muted-foreground">{key}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
