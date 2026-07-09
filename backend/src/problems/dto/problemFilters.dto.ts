export interface ProblemFiltersDto {
    search?: string;

    difficulty?: string[];

    platform?: string[];

    topics?: string[];

    language?: string[];

    solvedAfter?: string;

    solvedBefore?: string;

    solved?: boolean;

    page?: number;

    limit?: number;

    sortOrder?: "asc" | "desc";
}


