import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { getDashboardProblems } from "../services/getDashboardProblems.service";
import { getDashboardStats } from "../services/getDashboardStats";
import { getDashboardActivity } from "../services/getDashboardActivity.service";
import { getDashboardStruggling } from "../services/getDashboardStruggling.service";

export async function getProblems(
    req: AuthRequest,
    res: Response
) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const problems = await getDashboardProblems(userId, limit);

        return res.status(200).json(problems);
    } catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).json({
            message: "Failed to fetch problems"
        });
    }
}

export async function getStats(
    req: AuthRequest,
    res: Response
) {
    try {
        const stats = await getDashboardStats(req.user!.id);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch stats"
        });
    }
}

export async function getActivity(
    req: AuthRequest,
    res: Response
) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const activity = await getDashboardActivity(userId);
        res.status(200).json(activity);
    } catch (error) {
        console.error("Dashboard Activity Error:", error);
        res.status(500).json({
            message: "Failed to fetch activity data"
        });
    }
}

export async function getStruggling(
    req: AuthRequest,
    res: Response
) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const struggling = await getDashboardStruggling(userId);
        res.status(200).json(struggling);
    } catch (error) {
        console.error("Dashboard Struggling Error:", error);
        res.status(500).json({
            message: "Failed to fetch struggling problems"
        });
    }
}
