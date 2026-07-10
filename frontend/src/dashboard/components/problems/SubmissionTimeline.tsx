import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/shared/utils/formatDate";
import { cn } from "@/lib/utils";
import { ListSkeleton } from "../ui/Skeleton";

interface Submission {
    submissionId: string;
    problemTitle: string;
    problemId: string;
    status: string;
    language: string;
    submittedAt: string;
}

interface SubmissionTimelineProps {
    submissions: Submission[] | null;
    loading?: boolean;
}

function getStatusStyle(status: string): string {
    switch (status) {
        case "Accepted":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "Wrong Answer":
            return "bg-red-100 text-red-700 border-red-200";
        case "TLE":
        case "Time Limit Exceeded":
            return "bg-orange-100 text-orange-700 border-orange-200";
        case "Runtime Error":
            return "bg-amber-100 text-amber-700 border-amber-200";
        case "Compile Error":
        case "Compilation Error":
            return "bg-purple-100 text-purple-700 border-purple-200";
        default:
            return "bg-gray-100 text-gray-700 border-gray-200";
    }
}

function getDotColor(status: string): string {
    switch (status) {
        case "Accepted":
            return "bg-emerald-500";
        case "Wrong Answer":
            return "bg-red-500";
        case "TLE":
        case "Time Limit Exceeded":
            return "bg-orange-500";
        case "Runtime Error":
            return "bg-amber-500";
        case "Compile Error":
        case "Compilation Error":
            return "bg-purple-500";
        default:
            return "bg-gray-400";
    }
}

const PLACEHOLDER_SUBMISSIONS = [
    { title: "Two Sum", status: "Accepted", language: "Python", time: "2 hours ago" },
    { title: "Valid Parentheses", status: "Wrong Answer", language: "Java", time: "5 hours ago" },
    { title: "Merge Sorted Array", status: "Accepted", language: "C++", time: "1 day ago" }
];

export default function SubmissionTimeline({
    submissions,
    loading = false
}: SubmissionTimelineProps) {
    const navigate = useNavigate();

    if (loading || !submissions) {
        return <ListSkeleton rows={5} />;
    }

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Recent Submissions</CardTitle>
                <span className="text-xs text-muted-foreground">
                    Last {submissions.length} submissions
                </span>
            </CardHeader>
            <CardContent>
                {submissions.length === 0 ? (
                    <div className="relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                        <div className="space-y-4">
                            {PLACEHOLDER_SUBMISSIONS.map((sub, index) => (
                                <div
                                    key={index}
                                    className="relative flex items-start gap-3 opacity-50"
                                >
                                    <div
                                        className={cn(
                                            "w-[15px] h-[15px] rounded-full border-2 border-background shrink-0 z-10",
                                            getDotColor(sub.status)
                                        )}
                                    />
                                    <div className="flex-1 min-w-0 -mt-0.5">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-medium text-sm text-muted-foreground truncate">
                                                {sub.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span
                                                className={cn(
                                                    "text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
                                                    getStatusStyle(sub.status)
                                                )}
                                            >
                                                {sub.status}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {sub.language}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {sub.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground text-center mt-4">
                            Your submissions will appear here
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                        <div className="space-y-4">
                            {submissions.map((sub) => (
                                <div
                                    key={sub.submissionId}
                                    className="relative flex items-start gap-3 cursor-pointer group"
                                    onClick={() =>
                                        navigate(`/problems/${sub.problemId}`)
                                    }
                                >
                                    {/* Timeline dot */}
                                    <div
                                        className={cn(
                                            "w-[15px] h-[15px] rounded-full border-2 border-background shrink-0 z-10 transition-transform group-hover:scale-125",
                                            getDotColor(sub.status)
                                        )}
                                    />

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 -mt-0.5">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                                {sub.problemTitle}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span
                                                className={cn(
                                                    "text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
                                                    getStatusStyle(sub.status)
                                                )}
                                            >
                                                {sub.status}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {sub.language}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {formatDate(sub.submittedAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
