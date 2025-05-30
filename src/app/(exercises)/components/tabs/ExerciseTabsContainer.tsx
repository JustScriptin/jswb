"use client";

import { useState } from "react";
import { ExerciseTabsDisplay } from "../ui/ExerciseTabsDisplay";
import type { Exercise, TestResult } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";

export type ExerciseTabsContainerProps = {
  exerciseMetadata: Omit<Exercise, "description" | "education">;
  mdxContent: ExerciseMDXContent;
  initialTab?: string;
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
  onTabChange?: (tab: string) => void;
};

/**
 * Container component for exercise tabs
 * Manages tab state and delegates rendering to the UI component
 */
export function ExerciseTabsContainer({
  exerciseMetadata,
  mdxContent,
  initialTab = "instructions",
  testResults,
  passedTests,
  totalTests,
  hasRun,
  onTabChange,
}: ExerciseTabsContainerProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <ExerciseTabsDisplay
      exerciseMetadata={exerciseMetadata}
      mdxContent={mdxContent}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      testResults={testResults}
      passedTests={passedTests}
      totalTests={totalTests}
      hasRun={hasRun}
    />
  );
}

ExerciseTabsContainer.displayName = "ExerciseTabsContainer";
