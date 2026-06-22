import AppLayout from "@/shared/layout/AppLayout";

import DashboardHeader from "../components/header/DashboardHeader";
import FilterBar from "../components/filters/FilterBar";
import ProblemCard from "../components/problems/ProblemCard";
import { problems } from "../components/problems/ProblemList";
const stats=142;


export default function DashboardPage() {

  return (

    <AppLayout>

      <div className="space-y-6">

        <DashboardHeader stats={{ totalSolved: stats }} />

        <FilterBar />

        <div
    className="
      space-y-4
    "
  >

    {

      problems.map(

          problem =>

            <ProblemCard

              key={
                problem.problemId
              }

              problem={
                problem
              }

            />

        )

      }

    </div>

      </div>

    </AppLayout>

  );

}