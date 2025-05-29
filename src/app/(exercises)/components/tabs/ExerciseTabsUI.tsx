"use client";

import { GraduationCap, BookOpen, Beaker } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { LearnTabMDX } from "./LearnTabMDX";
import { InstructionsTabMDX } from "./InstructionsTabMDX";
import { TestCasesTab } from "./TestCasesTab";
import type { Exercise, TestResult } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";

export type ExerciseTabsUIProps = {
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
 * Presentational component for exercise tabs
 * Renders tab navigation and content based on active tab
 */
export function ExerciseTabsUI({
  exerciseMetadata,
  mdxContent,
  activeTab,
  onTabChange,
  testResults,
  passedTests,
  totalTests,
  hasRun,
}: ExerciseTabsUIProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full overflow-x-auto scrollbar-thin py-1 grid grid-cols-3">
        <TabsTrigger
          value="learn"
          className="flex-1 px-1 sm:px-4 h-8 sm:h-9 text-center"
        >
          <GraduationCap className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">Learn</span>
        </TabsTrigger>
        <TabsTrigger
          value="instructions"
          className="flex-1 px-1 sm:px-4 h-8 sm:h-9 text-center"
        >
          <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">Instructions</span>
        </TabsTrigger>
        <TabsTrigger
          value="tests"
          className="flex-1 px-1 sm:px-4 relative h-8 sm:h-9 text-center"
        >
          <Beaker className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">Tests</span>
          {hasRun && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {passedTests}
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="learn">
        <LearnTabMDX
          educationContent={mdxContent.educationContent}
          concept={mdxContent.educationConcept}
        />
      </TabsContent>

      <TabsContent value="instructions" className="space-y-4">
        <InstructionsTabMDX
          descriptionContent={mdxContent.descriptionContent}
        />
      </TabsContent>

      <TabsContent value="tests">
        <TestCasesTab
          testCases={exerciseMetadata.testCases}
          testResults={testResults}
          passedTests={passedTests}
          totalTests={totalTests}
          hasRun={hasRun}
        />
      </TabsContent>
    </Tabs>
  );
}

ExerciseTabsUI.displayName = "ExerciseTabsUI";
