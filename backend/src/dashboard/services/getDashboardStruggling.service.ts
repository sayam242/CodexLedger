import { findStrugglingProblems } from "../repository/dashboard.repository";
import type { StrugglingProblem } from "../dto/Dashboard.dto";

export async function getDashboardStruggling(
    userId: string
): Promise<StrugglingProblem[]> {
    return findStrugglingProblems(userId, 3);
}
