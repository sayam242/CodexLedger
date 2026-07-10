import { useEffect, useState } from "react";
import { fetchStrugglingProblems } from "../services/dashboard.api";
import type { StrugglingProblem } from "../types/dashboard.types";

export function useStrugglingProblems() {
    const [problems, setProblems] = useState<StrugglingProblem[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProblems() {
            try {
                const data = await fetchStrugglingProblems();
                setProblems(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadProblems();
    }, []);

    return { problems, loading };
}
