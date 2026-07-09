import { useEffect, useState } from "react";
import { fetchDashboardProblems } from "../services/dashboard.api";
import type { ProblemCardData } from "../types/dashboard.types";

export function useRecentProblems(limit: number = 5) {
    const [problems, setProblems] = useState<ProblemCardData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProblems() {
            try {
                const data = await fetchDashboardProblems(limit);
                setProblems(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadProblems();
    }, [limit]);

    return { problems, loading };
}
