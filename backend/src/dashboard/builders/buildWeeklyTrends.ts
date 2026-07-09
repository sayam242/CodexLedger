import type { WeeklyTrendItem } from "../dto/Dashboard.dto";

export function buildWeeklyTrends(
    weeklyCounts: { weekStart: Date; count: number }[]
): WeeklyTrendItem[] {
    return weeklyCounts.map(w => {
        const weekEnd = new Date(w.weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const startLabel = w.weekStart.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const endLabel = weekEnd.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        return {
            week: `${startLabel} - ${endLabel}`,
            count: w.count
        };
    });
}
