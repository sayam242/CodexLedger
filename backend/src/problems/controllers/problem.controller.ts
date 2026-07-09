import { Response } from "express";

import { AuthRequest } from "../../types/auth.types";

import { getProblemsService } from "../services/problem.service";

import type { ProblemFiltersDto } from "../dto/problemFilters.dto";

export async function getProblems(
  req: AuthRequest,
  res: Response
): Promise<void> {

  try {

    const userId = req.user!.id;

    const filters: ProblemFiltersDto = {

      search:
        req.query.search as string,

      difficulty:
        req.query.difficulty
          ? Array.isArray(req.query.difficulty)
            ? (req.query.difficulty as string[])
            : [req.query.difficulty as string]
          : undefined,

      platform:
        req.query.platform
          ? Array.isArray(req.query.platform)
            ? (req.query.platform as string[])
            : [req.query.platform as string]
          : undefined,

      topics:
        req.query.topics
          ? Array.isArray(req.query.topics)
            ? (req.query.topics as string[])
            : [req.query.topics as string]
          : undefined,

      solved:
        req.query.solved !== undefined
          ? req.query.solved === "true"
          : undefined,

      solvedAfter: req.query.solvedAfter as string | undefined,
      solvedBefore: req.query.solvedBefore as string | undefined,

      sortOrder:
        req.query.sortOrder as
          | "asc"
          | "desc"
          | undefined,

      page:
        req.query.page
          ? Number(req.query.page)
          : 1,

      limit:
        req.query.limit
          ? Number(req.query.limit)
          : 20,

    };

    const result =
      await getProblemsService(
        userId,
        filters
      );

    res.status(200).json(result);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        "Failed to fetch problems",

    });

  }

}