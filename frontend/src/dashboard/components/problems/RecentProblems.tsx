import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { ProblemCardData } from "../../types/dashboard.types";
import type { ProblemDifficulty } from "@/detailedProblem/types/detailedProblem.types";
import { formatDate } from "@/shared/utils/formatDate";
import { getDifficultyBadgeVariant } from "@/shared/utils/getDifficultyBadgeVariant";

interface RecentProblemsProps {
    problems: ProblemCardData[];
}

export default function RecentProblems({ problems }: RecentProblemsProps) {
    const navigate = useNavigate();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Recent Solved Problems</CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/problems")}
                    className="gap-1"
                >
                    View All
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {problems.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No problems solved yet
                    </p>
                ) : (
                    <div className="space-y-3">
                        {problems.map((problem) => (
                            <div
                                key={problem.problemId}
                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                                onClick={() => navigate(`/problems/${problem.problemId}`)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-muted-foreground font-mono">
                                        #{problem.problemNumber || "—"}
                                    </span>
                                    <span className="font-medium">{problem.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={getDifficultyBadgeVariant(problem.difficulty as ProblemDifficulty)}>
                                        {problem.difficulty}
                                    </Badge>
                                    {problem.latestSubmission && (
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(problem.latestSubmission.submittedAt)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
