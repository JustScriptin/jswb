import type { ReactElement } from "react";

import { ExercisePageSkeleton } from "../components";

export default function Loading(): ReactElement {
  return <ExercisePageSkeleton />;
}
Loading.displayName = "ExerciseLoading";
