import { Response } from "express";
import { AuthRequest }
from "../../types/auth.types";
import { getDashboardProblems } from "../services/getDashboardProblems.service";

export async function getProblems(
    req: AuthRequest,
    res: Response
) {
    
    try {
        const userId =req.user?.id;

        if (!userId) {

            return res
                .status(401)
                .json({
                    message: "Unauthorized"
                });

        }

        const problems =
            await getDashboardProblems(
                userId
            );

        return res
            .status(200)
            .json(problems);
    } catch (error) {
        console.error("Dashboard Error:", error);
        return res
            .status(500)
            .json({
                message: "Failed to fetch problems"
            });
    }

}