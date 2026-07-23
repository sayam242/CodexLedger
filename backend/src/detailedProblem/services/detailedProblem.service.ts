import prisma from "../../lib/prisma";
import { ProblemDetailResponseDto, SubmissionDetailDto } from "../dto/detailedProblem.dto";

/**
 * Fetch problem details with paginated submissions
 * 
 * @param problemId - The ID of the problem to fetch
 * @param userId - The ID of the user (for authorization via submissions)
 * @param cursor - Optional cursor for pagination (submissionId or timestamp)
 * @param limit - Number of submissions to fetch (default: 20, max: 100)
 * @returns Problem with paginated submissions and metadata
 */
export async function getProblemDetailService(
  problemId: string,
  userId: string,
  cursor?: string,
  limit: number = 20
): Promise<ProblemDetailResponseDto> {
  // Validate limit
  const finalLimit = Math.min(Math.max(limit, 1), 100);

  // Fetch shared problem (no userId on Problem anymore)
  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
    include: {
      content: true,
      topics: {
        include: {
          topic: true
        }
      }
    }
  });

  if (!problem) {
    throw new Error('Problem not found');
  }

  // Auth check: verify user has at least one submission for this problem
  const userSubmissionExists = await prisma.submission.findFirst({
    where: {
      problemId,
      userId
    },
    select: { id: true }
  });

  if (!userSubmissionExists) {
    throw new Error('Problem not found or unauthorized');
  }

  // Build submission query - only user's submissions
  const submissionQuery: any = {
    where: {
      problemId,
      userId
    },
    orderBy: {
      submittedAt: 'desc' as const
    },
    take: finalLimit + 1
  };

  // Apply cursor if provided (for pagination)
  if (cursor) {
    submissionQuery.where.submittedAt = {
      lt: new Date(cursor)
    };
  }

  // Fetch submissions
  const submissions = await prisma.submission.findMany(submissionQuery);

  // Determine if there are more submissions
  const hasMore = submissions.length > finalLimit;
  const paginatedSubmissions = submissions.slice(0, finalLimit);

  // Count total submissions (user's only)
  const totalCount = await prisma.submission.count({
    where: { problemId, userId }
  });

  // Format response
    return {
      problem: {
        id: problem.id,
        problemNumber: Number(problem.problemNumber) || 0,
        title: problem.title,
        difficulty: problem.difficulty,
      url: problem.url,
      platform: problem.platform,
      topics: problem.topics.map(pt => pt.topic.name),
      htmlContent: problem.content?.htmlContent,
      plainText: problem.content?.plainText
    },
    submissions: paginatedSubmissions.map(sub => ({
      id: sub.id,
      status: sub.status || 'Unknown',
      language: sub.language,
      submittedAt: sub.submittedAt
    })),
    totalCount,
    hasMore
  };
}

/**
 * Fetch a specific submission with full code
 * Validates submission belongs to the specific problem and user
 * 
 * @param submissionId - The ID of the submission to fetch
 * @param problemId - The ID of the problem (must match submission's problemId)
 * @param userId - The ID of the user (for authorization)
 * @returns Complete submission data including code
 */
export async function getSubmissionDetailService(
  submissionId: string,
  problemId: string,
  userId: string
): Promise<SubmissionDetailDto> {
  // Fetch submission with userId check directly
  const submission = await prisma.submission.findFirst({
    where: {
      id: submissionId,
      problemId: problemId,
      userId
    },
    include: {
      problem: true
    }
  });

  if (!submission) {
    // Check if submission doesn't belong to the problem vs doesn't exist
    const submissionExists = await prisma.submission.findUnique({
      where: { id: submissionId }
    });

    if (submissionExists && submissionExists.problemId !== problemId) {
      throw new Error('Submission does not belong to this problem');
    }

    throw new Error('Submission not found or unauthorized');
  }

  return {
    id: submission.id,
    problemId: submission.problemId,
    code: submission.code,
    language: submission.language,
    status: submission.status || 'Unknown',
    submittedAt: submission.submittedAt,
    errorMessage: submission.errorMessage || undefined
  };
}

/**
 * Count submissions for a problem (user's submissions only)
 */
export async function getSubmissionCountService(
  problemId: string,
  userId: string
): Promise<number> {
  // Verify problem exists
  const problem = await prisma.problem.findUnique({
    where: { id: problemId }
  });

  if (!problem) {
    throw new Error('Problem not found');
  }

  return prisma.submission.count({
    where: { problemId, userId }
  });
}
