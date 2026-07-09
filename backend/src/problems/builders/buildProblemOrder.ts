import { Prisma } from "@prisma/client";

import type { ProblemFiltersDto } from "../dto/problemFilters.dto";

export function buildProblemOrder(
  filters: ProblemFiltersDto
): Prisma.ProblemOrderByWithRelationInput {

  return {
    updatedAt: filters.sortOrder ?? "desc",
  };

}