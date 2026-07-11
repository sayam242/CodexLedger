import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { DashboardStats } from "../../types/dashboard.types";

interface DifficultyBreakdownChartProps {
    stats: DashboardStats | null;
    loading?: boolean;
}

const COLORS = {
    Easy: "#10b981",
    Medium: "#f59e0b",
    Hard: "#ef4444"
};

const PLACEHOLDER_DATA = [
    { name: "Easy", value: 1 },
    { name: "Medium", value: 1 },
    { name: "Hard", value: 1 }
];

export default function DifficultyBreakdownChart({
    stats,
    loading = false
}: DifficultyBreakdownChartProps) {
    if (loading || !stats) {
        return (
            <Card className="h-full">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Difficulty Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <ResponsiveContainer width={180} height={180}>
                                <PieChart>
                                    <Pie
                                        data={PLACEHOLDER_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                        animationDuration={0}
                                    >
                                        {PLACEHOLDER_DATA.map((entry) => (
                                            <Cell
                                                key={entry.name}
                                                fill={COLORS[entry.name as keyof typeof COLORS]}
                                                opacity={0.4}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-muted-foreground">—</div>
                                    <div className="text-[10px] text-muted-foreground">Total</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            {PLACEHOLDER_DATA.map((item) => (
                                <div key={item.name} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full opacity-40"
                                                style={{
                                                    backgroundColor:
                                                        COLORS[item.name as keyof typeof COLORS]
                                                }}
                                            />
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">—</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                                        <div
                                            className="h-full rounded-full opacity-30"
                                            style={{
                                                width: "33%",
                                                backgroundColor:
                                                    COLORS[item.name as keyof typeof COLORS]
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const chartData = [
        { name: "Easy", value: stats.easySolved },
        { name: "Medium", value: stats.mediumSolved },
        { name: "Hard", value: stats.hardSolved }
    ].filter((item) => item.value > 0);

    const total = stats.easySolved + stats.mediumSolved + stats.hardSolved;

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Difficulty Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                {total === 0 ? (
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <ResponsiveContainer width={180} height={180}>
                                <PieChart>
                                    <Pie
                                        data={PLACEHOLDER_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                        animationDuration={0}
                                    >
                                        {PLACEHOLDER_DATA.map((entry) => (
                                            <Cell
                                                key={entry.name}
                                                fill={COLORS[entry.name as keyof typeof COLORS]}
                                                opacity={0.4}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">0</div>
                                    <div className="text-[10px] text-muted-foreground">Total</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            {PLACEHOLDER_DATA.map((item) => (
                                <div key={item.name} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full opacity-40"
                                                style={{
                                                    backgroundColor:
                                                        COLORS[item.name as keyof typeof COLORS]
                                                }}
                                            />
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">0 (0%)</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <ResponsiveContainer width={180} height={180}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {chartData.map((entry) => (
                                            <Cell
                                                key={entry.name}
                                                fill={COLORS[entry.name as keyof typeof COLORS]}
                                                className="transition-all hover:opacity-80 cursor-pointer"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [
                                            `${value} problems`,
                                            ""
                                        ]}
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid hsl(var(--border))",
                                            backgroundColor: "hsl(var(--card))"
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{total}</div>
                                    <div className="text-[10px] text-muted-foreground">Total</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            {chartData.map((item) => {
                                const percent = total > 0 ? (item.value / total) * 100 : 0;
                                return (
                                    <div key={item.name} className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            COLORS[item.name as keyof typeof COLORS]
                                                    }}
                                                />
                                                <span className="text-sm font-medium">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {item.value} ({percent.toFixed(0)}%)
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${percent}%`,
                                                    backgroundColor:
                                                        COLORS[item.name as keyof typeof COLORS]
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
