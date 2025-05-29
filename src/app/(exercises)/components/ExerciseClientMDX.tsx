"use client";

import { ExerciseContainer } from "./exercise/ExerciseContainer";
import type { Exercise } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";

type Props = {
  exerciseMetadata: Omit<Exercise, "description" | "education">;
  mdxContent: ExerciseMDXContent;
};

/**
 * Client-side entry point for the exercise page
 * Delegates to the container component for state management and business logic
 */
export function ExerciseClientMDX({ exerciseMetadata, mdxContent }: Props) {
  return (
    <ExerciseContainer
      exerciseMetadata={exerciseMetadata}
      mdxContent={mdxContent}
    />
  );
}

ExerciseClientMDX.displayName = "ExerciseClientMDX";
