import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { ProblemCardData } from "../../types/dashboard.types";
import { formatDate } from "@/shared/utils/formatDate";
import { cn } from "@/lib/utils";

interface RecentProblemsProps {
    problems: ProblemCardData[];
    loading?: boolean;
}

function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
        case "Easy":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "Medium":
            return "bg-amber-100 text-amber-700 border-amber-200";
        case "Hard":
            return "bg-red-100 text-red-700 border-red-200";
        default:
            return "bg-gray-100 text-gray-700 border-gray-200";
    }
}

export default function RecentProblems({ problems, loading = false }: RecentProblemsProps) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg">Recent Solved Problems</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <div className="h-4 w-8 bg-muted rounded animate-pulse" />
                                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-14 bg-muted rounded-full animate-pulse" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full">
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
                    <div className="space-y-3">
                        {["Two Sum", "Valid Parentheses", "Merge Sorted Array"].map((title, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-3 rounded-lg border opacity-50"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-muted-foreground font-mono">
                                        #{(i + 1) * 100 + 1}
                                    </span>
                                    <span className="font-medium text-muted-foreground">{title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={cn(
                                            "text-xs font-medium px-2 py-0.5 rounded-full border",
                                            getDifficultyColor(["Easy", "Medium", "Hard"][i])
                                        )}
                                    >
                                        {["Easy", "Medium", "Hard"][i]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
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
                                    <span
                                        className={cn(
                                            "text-xs font-medium px-2 py-0.5 rounded-full border",
                                            getDifficultyColor(problem.difficulty)
                                        )}
                                    >
                                        {problem.difficulty}
                                    </span>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
