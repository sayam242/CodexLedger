import { Prisma } from "@prisma/client";

import prisma from "../../lib/prisma";

/**
 * Fetch problems.
 */
export async function findProblems(
  args: Prisma.ProblemFindManyArgs,
  userId?: string
) {
  return prisma.problem.findMany({
    ...args,
    include: {
      submissions: {
        where: userId ? { userId } : undefined,
        orderBy: { submittedAt: "desc" }
      }
    }
  });
}

/**
 * Count problems.
 */
export async function countProblems(
  where: Prisma.ProblemWhereInput
) {
  return prisma.problem.count({
    where,
  });
}

/**
 * Fetch a single problem.
 */
export async function findProblem(
  args: Prisma.ProblemFindUniqueArgs
) {
  return prisma.problem.findUnique(args);
}

/**
 * Create a problem.
 */
export async function createProblem(
  data: Prisma.ProblemCreateInput
) {
  return prisma.problem.create({
    data,
  });
}

/**
 * Update a problem.
 */
export async function updateProblem(
  args: Prisma.ProblemUpdateArgs
) {
  return prisma.problem.update(args);
}

/**
 * Delete a problem.
 */
export async function deleteProblem(
  args: Prisma.ProblemDeleteArgs
) {
  return prisma.problem.delete(args);
}