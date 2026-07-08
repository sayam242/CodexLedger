import type { ProblemDifficulty } from "@/detailedProblem/types/detailedProblem.types";

export function getDifficultyBadgeVariant(
  difficulty: ProblemDifficulty
){

  switch (difficulty) {

    case "Easy":
      return "default";

    case "Medium":
      return "secondary";

    case "Hard":
      return "destructive";

  }

}