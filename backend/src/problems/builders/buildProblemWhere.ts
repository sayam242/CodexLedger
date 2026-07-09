import { Prisma } from "@prisma/client";
import type { ProblemFiltersDto } from "../dto/problemFilters.dto";

export function buildProblemWhere(
  userId: string,
  filters: ProblemFiltersDto
): Prisma.ProblemWhereInput {

  const where: Prisma.ProblemWhereInput = {
    userId,
  };
  // search
    if (filters.search?.trim()) {

    where.OR = [

        {
        title: {
            contains: filters.search,
            mode: "insensitive",
        },
        },

        {
        problemNumber: {
            contains: filters.search,
            mode: "insensitive",
        },
        },

        {
        slug: {
            contains: filters.search,
            mode: "insensitive",
        },
        },

    ];

    }


    // difficulty
    if (filters.difficulty?.length) {

    where.difficulty = {

        in: filters.difficulty,

    };

    }


    // /platform
    if (filters.platform?.length) {

    where.platform = {

        in: filters.platform,

    };

    }


    // status
    if (filters.solved!==undefined) {

    where.solved = filters.solved

    }


    // topics
    if (filters.topics?.length) {

    where.topics = {

        some: {

        topic: {

            name: {

            in: filters.topics,

            },

        },

        },

    };

    }





    // date range — include if any submission falls within the range (inclusive)
    if (
    filters.solvedAfter ||
    filters.solvedBefore
    ) {

    where.submissions = {
        some: {
        submittedAt: {
            ...(filters.solvedAfter && {
            gte: new Date(filters.solvedAfter),
            }),
            ...(filters.solvedBefore && {
            lte: new Date(filters.solvedBefore),
            }),
        },
        },
    };

    }

  return where;
}

