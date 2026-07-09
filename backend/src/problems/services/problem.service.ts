import {
  buildProblemWhere,
} from "../builders/buildProblemWhere";

import {
  buildProblemOrder,
} from "../builders/buildProblemOrder";

import {
  findProblems,
  countProblems,
} from "../repository/problem.repository";

import type {
  ProblemFiltersDto,
} from "../dto/problemFilters.dto";

export async function getProblemsService(
  userId: string,
  filters: ProblemFiltersDto
) {

  const page = filters.page ?? 1;

  const limit = filters.limit ?? 20;

  const skip = (page - 1) * limit;

  const where = buildProblemWhere(
    userId,
    filters
  );

  const orderBy = buildProblemOrder(
    filters
  );

  const [problems, total] = await Promise.all([

    findProblems({

      where,

      orderBy,

      skip,

      take: limit,

    }),

    countProblems(where),

  ]);

  return {

    problems,

    pagination: {

      page,

      limit,

      total,

      totalPages: Math.ceil(
        total / limit
      ),

    },

  };

}