import { useEffect, useState, useCallback, useRef } from "react";
import { fetchDashboardStats } from "../services/dashboard.api";
import type { DashboardStats } from "../types/dashboard.types";

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);
    const hasLoaded = useRef(false);

    const loadStats = useCallback(async () => {
        if (hasLoaded.current) {
            setIsRefetching(true);
        }
        try {
            const data = await fetchDashboardStats();
            setStats(data);
            hasLoaded.current = true;
        } catch (error) {
            console.error(error);
        } finally {
            setIsInitialLoad(false);
            setIsRefetching(false);
        }
    }, []);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    return { stats, loading: isInitialLoad, isRefetching, refetch: loadStats };
}
