import { useEffect, useState } from "react";
import { fetchRecentSubmissions } from "../services/dashboard.api";
import type { SubmissionTimelineItem } from "../types/dashboard.types";

export function useRecentSubmissions(limit: number = 8) {
    const [submissions, setSubmissions] = useState<SubmissionTimelineItem[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSubmissions() {
            try {
                const data = await fetchRecentSubmissions(limit);
                setSubmissions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadSubmissions();
    }, [limit]);

    return { submissions, loading };
}
