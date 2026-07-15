import { useEffect, useState, useCallback, useRef } from "react";
import { fetchDashboardProblems } from "../services/dashboard.api";
import type { ProblemCardData } from "../types/dashboard.types";

export function useRecentProblems(limit: number = 5) {
    const [problems, setProblems] = useState<ProblemCardData[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);
    const hasLoaded = useRef(false);

    const loadProblems = useCallback(async () => {
        if (hasLoaded.current) {
            setIsRefetching(true);
        }
        try {
            const data = await fetchDashboardProblems(limit);
            setProblems(data);
            hasLoaded.current = true;
        } catch (error) {
            console.error(error);
        } finally {
            setIsInitialLoad(false);
            setIsRefetching(false);
        }
    }, [limit]);

    useEffect(() => {
        loadProblems();
    }, [loadProblems]);

    return { problems, loading: isInitialLoad, isRefetching, refetch: loadProblems };
}
