import { useEffect, useState, useCallback, useRef } from "react";
import {
  fetchFilteredProblems,
} from "../services/problems.api";
import type {
  ProblemCardData
} from "../types/problem.types";
import type { ProblemsPagination } from "../services/problems.api";

export function useDashboardProblems(
  filters: {
    search: string;
    topics: string[];
    difficulty: string[];
    solved?: boolean;
    fromDate?: string;
    toDate?: string;
    sortOrder: "asc" | "desc";
    page: number;
    limit: number;
  }
) {
  const [problems, setProblems] = useState<ProblemCardData[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ProblemsPagination | null>(null);
  const hasLoaded = useRef(false);

  const filtersKey = JSON.stringify(filters);

  const loadProblems = useCallback(async () => {
    if (hasLoaded.current) {
      setIsRefetching(true);
    }
    setError(null);

    try {
      const result = await fetchFilteredProblems({
        search: filters.search,
        topics: filters.topics,
        difficulty: filters.difficulty,
        solved: filters.solved,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
        sortOrder: filters.sortOrder,
        page: filters.page,
        limit: filters.limit,
      });

      setProblems(result.problems);
      setPagination(result.pagination);
      hasLoaded.current = true;
    } catch (error) {
      console.error(error);
      setError("Failed to load problems");
    } finally {
      setIsInitialLoad(false);
      setIsRefetching(false);
    }
  }, [filters]);

  useEffect(() => {
    loadProblems();
  }, [filtersKey]);

  const loadMore = useCallback(async () => {
    if (!pagination || loadingMore) return;

    const nextPage = pagination.page + 1;
    if (nextPage > pagination.totalPages) return;

    setLoadingMore(true);
    setError(null);

    try {
      const result = await fetchFilteredProblems({
        search: filters.search,
        topics: filters.topics,
        difficulty: filters.difficulty,
        solved: filters.solved,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
        sortOrder: filters.sortOrder,
        page: nextPage,
        limit: filters.limit,
      });

      setProblems((prev) => [...prev, ...result.problems]);
      setPagination(result.pagination);
    } catch (error) {
      console.error(error);
      setError("Failed to load more problems");
    } finally {
      setLoadingMore(false);
    }
  }, [filters, pagination, loadingMore]);

  const hasMore = pagination
    ? pagination.page < pagination.totalPages
    : false;

  const total = pagination?.total ?? 0;

  return {
    problems,
    loading: isInitialLoad,
    isRefetching,
    loadingMore,
    error,
    hasMore,
    loadMore,
    total,
    refetch: loadProblems,
  };
}
