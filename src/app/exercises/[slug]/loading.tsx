import type { ReactElement } from "react";
import { ExercisePageSkeleton } from "@/features/codingChallenges/components/ExercisePageSkeleton";

export default function Loading(): ReactElement {
  return <ExercisePageSkeleton />;
}
Loading.displayName = "ExerciseLoading";
