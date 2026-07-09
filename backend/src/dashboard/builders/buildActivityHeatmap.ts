import type { HeatmapData } from "../dto/Dashboard.dto";

interface SubmissionRecord {
    problemId: string;
    submittedAt: Date;
    status: string | null;
}

export function buildActivityHeatmap(
    submissions: SubmissionRecord[]
): HeatmapData {
    const heatmap: number[][] = Array.from({ length: 7 }, () =>
        Array.from({ length: 24 }, () => 0)
    );

    for (const sub of submissions) {
        const date = new Date(sub.submittedAt);
        const day = date.getDay();
        const hour = date.getHours();
        heatmap[day][hour]++;
    }

    const maxCount = Math.max(...heatmap.flat(), 1);

    return {
        data: heatmap,
        maxCount,
        totalSubmissions: submissions.length
    };
}
