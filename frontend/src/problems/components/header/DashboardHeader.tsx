import { Badge } from "@/components/ui/badge";

import type {
    DashboardStats
}
from "../../types/dashboard.types";

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
                gap-3
            "
        >

            <h1
                className="
                    text-3xl
                    font-bold
                "
            >

                Recent Problems Solved

            </h1>

            <Badge
                variant="secondary"
            >

                {stats.totalSolved}
                {" "}
                Solved

            </Badge>

        </div>

    );

}