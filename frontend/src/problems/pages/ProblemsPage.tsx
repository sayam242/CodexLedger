import AppLayout from "@/shared/layout/AppLayout";

import DashboardHeader from "../components/header/DashboardHeader";
import FilterBar from "../components/filters/FilterBar";
import ProblemCard from "../components/problems/ProblemCard";
import { useDashboardProblems } from "../hooks/useDashboardProblems";
import { useDashboardStats } from "../hooks/useDashboardStats";



export default function DashboardPage() {
  
  const {problems,loading,error} = useDashboardProblems();
  const {stats, loading: statsLoading} = useDashboardStats();
  return (

    <AppLayout>

      <div className="space-y-6">

        <DashboardHeader stats={{ totalSolved: stats?.totalSolved ?? 0 }} />

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