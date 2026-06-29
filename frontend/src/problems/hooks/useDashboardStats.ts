import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../services/problems.api";
import { type DashboardStats } from "../types/problem.types";

export function useDashboardStats() {

    const [stats, setStats] =useState<DashboardStats | null>(null);

    const [loading, setLoading] =useState(true);

    useEffect(() => {

        async function loadStats() {

            try {

                const data =
                    await fetchDashboardStats();

                setStats(data);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        }

        loadStats();

    }, []);

    return {

        stats,
        loading

    };

}