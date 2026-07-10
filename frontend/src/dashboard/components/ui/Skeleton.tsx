import { cn } from "@/lib/utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-20" />
        </div>
    );
}

const CHART_HEIGHTS = [45, 72, 38, 85, 56, 67, 42, 90];

export function ChartSkeleton({ height = "h-[300px]" }: { height?: string }) {
    return (
        <div className="rounded-lg border bg-card p-6 space-y-4">
            <Skeleton className="h-5 w-40" />
            <div className={cn("flex items-end gap-2", height)}>
                {CHART_HEIGHTS.map((h, i) => (
                    <Skeleton
                        key={i}
                        className="flex-1 rounded-t"
                        style={{ height: `${h}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

export function DonutSkeleton() {
    return (
        <div className="rounded-lg border bg-card p-6 space-y-4">
            <Skeleton className="h-5 w-40" />
            <div className="flex items-center justify-center">
                <Skeleton className="h-48 w-48 rounded-full" />
            </div>
        </div>
    );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="rounded-lg border bg-card p-6 space-y-3">
            <Skeleton className="h-5 w-40" />
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

const HEATMAP_OPACITIES = [
    0.4, 0.7, 0.5, 0.9, 0.3, 0.8, 0.6, 0.4, 0.7, 0.5, 0.9, 0.3,
    0.8, 0.6, 0.4, 0.7, 0.5, 0.9, 0.3, 0.8, 0.6, 0.4, 0.7, 0.5
];

export function HeatmapSkeleton() {
    return (
        <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-2">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                    <div key={dayIndex} className="flex items-center gap-2">
                        <Skeleton className="w-8 h-3" />
                        <div className="flex flex-1 gap-1">
                            {HEATMAP_OPACITIES.map((opacity, hourIndex) => (
                                <Skeleton
                                    key={hourIndex}
                                    className="flex-1 aspect-square rounded-sm"
                                    style={{ opacity }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skeleton;
