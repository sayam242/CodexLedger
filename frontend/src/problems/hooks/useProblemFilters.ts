import { useState, useCallback, useEffect, useRef } from "react";

import type { ProblemFilters } from "../types/problem.types";

const DEFAULT_FILTERS: ProblemFilters = {
  search: "",
  topics: [],
  difficulty: [],
  solved: undefined,
  fromDate: undefined,
  toDate: undefined,
  sortOrder: "desc",
  page: 1,
  limit: 20,
};

export function useProblemFilters() {
  const [filters, setFilters] = useState<ProblemFilters>(DEFAULT_FILTERS);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [filters.search]);

  const updateFilter = useCallback(<K extends keyof ProblemFilters>(
    key: K,
    value: ProblemFilters[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  }, []);

  const toggleArrayFilter = useCallback(
    (key: "topics" | "difficulty", value: string) => {
      setFilters((prev) => {
        const arr = prev[key];
        const next = arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value];
        return { ...prev, [key]: next, page: 1 };
      });
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.topics.length > 0 ||
    filters.difficulty.length > 0 ||
    filters.solved !== undefined ||
    filters.fromDate !== undefined ||
    filters.toDate !== undefined;

  return {
    filters,
    debouncedSearch,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    hasActiveFilters,
  };
}
