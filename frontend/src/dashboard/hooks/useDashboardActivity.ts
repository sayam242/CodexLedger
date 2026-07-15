import { useEffect, useState, useCallback, useRef } from "react";
import { fetchDashboardActivity } from "../services/dashboard.api";
import type { DashboardActivityResponse } from "../types/dashboard.types";

export function useDashboardActivity() {
    const [activity, setActivity] = useState<DashboardActivityResponse | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);
    const hasLoaded = useRef(false);

    const loadActivity = useCallback(async () => {
        if (hasLoaded.current) {
            setIsRefetching(true);
        }
        try {
            const data = await fetchDashboardActivity();
            setActivity(data);
            hasLoaded.current = true;
        } catch (error) {
            console.error(error);
        } finally {
            setIsInitialLoad(false);
            setIsRefetching(false);
        }
    }, []);

    useEffect(() => {
        loadActivity();
    }, [loadActivity]);

    return { activity, loading: isInitialLoad, isRefetching, refetch: loadActivity };
}
