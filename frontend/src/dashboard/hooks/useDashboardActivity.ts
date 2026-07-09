import { useEffect, useState } from "react";
import { fetchDashboardActivity } from "../services/dashboard.api";
import type { DashboardActivityResponse } from "../types/dashboard.types";

export function useDashboardActivity() {
    const [activity, setActivity] = useState<DashboardActivityResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadActivity() {
            try {
                const data = await fetchDashboardActivity();
                setActivity(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadActivity();
    }, []);

    return { activity, loading };
}
