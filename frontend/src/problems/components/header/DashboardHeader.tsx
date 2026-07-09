import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import type {
    DashboardStats
}
from "../../types/problem.types";

interface DashboardHeaderProps {

    stats: DashboardStats;

}

export default function DashboardHeader(
{
    stats
}: DashboardHeaderProps
) {

    return (

        <div
            className="
                flex
                items-center
                gap-2
                text-sm
                text-muted-foreground
            "
        >

            <Link
                to="/dashboard"
                className="
                    hover:text-foreground
                    transition-colors
                "
            >

                Dashboard

            </Link>

            <ChevronRight
                className="
                    h-4
                    w-4
                "
            />

            <span>
                Recent Problems Solved
            </span>

            <ChevronRight
                className="
                    h-4
                    w-4
                "
            />

            <span
                className="
                    font-bold
                    text-foreground
                "
            >

                {stats.totalSolved}
                {" "}
                Solved

            </span>

        </div>

    );

}
