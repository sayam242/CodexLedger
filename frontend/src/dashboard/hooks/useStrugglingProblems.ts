import { useEffect, useState, useCallback, useRef } from "react";
import { fetchStrugglingProblems } from "../services/dashboard.api";
import type { StrugglingProblem } from "../types/dashboard.types";

export function useStrugglingProblems() {
    const [problems, setProblems] = useState<StrugglingProblem[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);
    const hasLoaded = useRef(false);

    const loadProblems = useCallback(async () => {
        if (hasLoaded.current) {
            setIsRefetching(true);
        }
        try {
            const data = await fetchStrugglingProblems();
            setProblems(data);
            hasLoaded.current = true;
        } catch (error) {
            console.error(error);
        } finally {
            setIsInitialLoad(false);
            setIsRefetching(false);
        }
    }, []);

    useEffect(() => {
        loadProblems();
    }, [loadProblems]);

    return { problems, loading: isInitialLoad, isRefetching, refetch: loadProblems };
}
