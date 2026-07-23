import { Prisma } from "@prisma/client";
import type { ProblemFiltersDto } from "../dto/problemFilters.dto";

export function buildProblemWhere(
  userId: string,
  filters: ProblemFiltersDto
): Prisma.ProblemWhereInput {

  // Base filter: only problems the user has submissions for
  const where: Prisma.ProblemWhereInput = {
    submissions: {
      some: { userId }
    },
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

  // platform
  if (filters.platform?.length) {
    where.platform = {
      in: filters.platform,
    };
  }

  // solved status — check via user's submissions
  if (filters.solved !== undefined) {
    if (filters.solved) {
      // Problems where user has at least one "Accepted" submission
      where.submissions = {
        some: {
          userId,
          status: "Accepted",
        },
      };
    } else {
      // Problems where user has submissions but NONE are "Accepted"
      // Use: has submissions from user AND none of those are Accepted
      where.AND = [
        { submissions: { some: { userId } } },
        { submissions: { none: { userId, status: "Accepted" } } },
      ];
      // Remove the base submissions filter since AND handles it
      delete where.submissions;
    }
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

  // date range — include if any of the user's submissions falls within the range
  if (filters.solvedAfter || filters.solvedBefore) {
    const dateFilter = {
      userId,
      submittedAt: {
        ...(filters.solvedAfter && {
          gte: new Date(filters.solvedAfter),
        }),
        ...(filters.solvedBefore && {
          lte: new Date(filters.solvedBefore),
        }),
      },
    };

    if (where.AND && Array.isArray(where.AND)) {
      // solved=false was set — add date range as additional AND condition
      where.AND.push({ submissions: { some: dateFilter } });
    } else {
      where.submissions = { some: dateFilter };
    }
  }

  return where;
}
