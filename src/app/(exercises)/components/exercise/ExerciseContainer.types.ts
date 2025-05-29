/**
 * Type definitions for ExerciseContainer component
 */
import type { Exercise } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";

/**
 * Props for the ExerciseContainer component
 */
export type ExerciseContainerProps = {
  exerciseMetadata: Omit<Exercise, "description" | "education">;
  mdxContent: ExerciseMDXContent;
};
