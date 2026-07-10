import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HeatmapData } from "../../types/dashboard.types";
import { HeatmapSkeleton } from "../ui/Skeleton";

interface ActivityHeatMapProps {
    data: HeatmapData;
    loading?: boolean;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getHeatmapColor(count: number, maxCount: number): string {
    if (count === 0) return "bg-muted";
    const ratio = count / maxCount;
    if (ratio <= 0.25) return "bg-emerald-200 dark:bg-emerald-900";
    if (ratio <= 0.5) return "bg-emerald-400 dark:bg-emerald-700";
    if (ratio <= 0.75) return "bg-emerald-600 dark:bg-emerald-500";
    return "bg-emerald-800 dark:bg-emerald-300";
}

export default function ActivityHeatMap({ data, loading = false }: ActivityHeatMapProps) {
    if (loading || !data) {
        return <HeatmapSkeleton />;
    }

    const { data: heatmap, maxCount, totalSubmissions } = data;

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Activity Heat Map</CardTitle>
                    <span className="text-sm text-muted-foreground">
                        {totalSubmissions} total submissions
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="w-full">
                    {/* Hour labels */}
                    <div className="flex mb-1 ml-10">
                        {Array.from({ length: 24 }, (_, i) => (
                            <div
                                key={i}
                                className="flex-1 text-[10px] text-muted-foreground text-center"
                            >
                                {i % 3 === 0 ? `${i}` : ""}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap grid */}
                    {DAYS.map((day, dayIndex) => (
                        <div key={day} className="flex items-center mb-1">
                            <span className="w-8 text-xs text-muted-foreground text-right shrink-0">
                                {day}
                            </span>
                            <div className="flex flex-1 gap-[2px]">
                                {heatmap[dayIndex].map((count, hourIndex) => (
                                    <div
                                        key={hourIndex}
                                        className={cn(
                                            "flex-1 aspect-square rounded-sm transition-colors min-h-[14px]",
                                            getHeatmapColor(count, maxCount)
                                        )}
                                        title={`${DAYS[dayIndex]} ${hourIndex}:00 - ${count} submissions`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Legend */}
                    <div className="flex items-center gap-2 mt-3 ml-10">
                        <span className="text-[10px] text-muted-foreground">Less</span>
                        <div className="w-4 h-4 rounded-sm bg-muted" />
                        <div className="w-4 h-4 rounded-sm bg-emerald-200 dark:bg-emerald-900" />
                        <div className="w-4 h-4 rounded-sm bg-emerald-400 dark:bg-emerald-700" />
                        <div className="w-4 h-4 rounded-sm bg-emerald-600 dark:bg-emerald-500" />
                        <div className="w-4 h-4 rounded-sm bg-emerald-800 dark:bg-emerald-300" />
                        <span className="text-[10px] text-muted-foreground">More</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
