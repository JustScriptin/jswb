"use client";

import { ExerciseTabsContainer } from "./ExerciseTabsContainer";
import type { Exercise, TestResult } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";

export type { ExerciseTabsContainerProps } from "./ExerciseTabsContainer";

type ExerciseTabsMDXProps = {
  exerciseMetadata: Omit<Exercise, "description" | "education">;
  mdxContent: ExerciseMDXContent;
  activeTab: string;
  onTabChange: (tab: string) => void;
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
};

/**
 * Exercise tabs component
 * Delegates to the container component for state management and business logic
 */
export function ExerciseTabsMDX(props: ExerciseTabsMDXProps) {
  return <ExerciseTabsContainer {...props} />;
}

ExerciseTabsMDX.displayName = "ExerciseTabsMDX";
