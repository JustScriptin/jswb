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
export function ExerciseTabsMDX({
  activeTab,
  onTabChange,
  ...rest
}: ExerciseTabsMDXProps) {
  const forceTestsTab = activeTab === "tests" ? "tests" : activeTab;

  return (
    <ExerciseTabsContainer
      initialTab={forceTestsTab}
      onTabChange={onTabChange}
      {...rest}
    />
  );
}

ExerciseTabsMDX.displayName = "ExerciseTabsMDX";
