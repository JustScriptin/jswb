"use client";

import { GraduationCap, BookOpen, Beaker } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { LearnTabContent } from "./LearnTabContent";
import { InstructionsTabContent } from "./InstructionsTabContent";
import { TestCasesTabDisplay } from "./TestCasesTabDisplay";
import { TestResultBadge } from "./TestResultBadge";
import type { Exercise, TestResult } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";

export type ExerciseTabsDisplayProps = {
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
export function ExerciseTabsDisplay({
  exerciseMetadata,
  mdxContent,
  activeTab,
  onTabChange,
  testResults,
  passedTests,
  totalTests,
  hasRun,
}: ExerciseTabsDisplayProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full overflow-x-auto overflow-y-hidden">
        <TabsTrigger value="learn" className="flex-1 min-w-[80px] px-2 sm:px-4">
          <GraduationCap className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">Learn</span>
        </TabsTrigger>
        <TabsTrigger
          value="instructions"
          className="flex-1 min-w-[100px] px-2 sm:px-4"
        >
          <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">Instructions</span>
        </TabsTrigger>
        <TabsTrigger
          value="tests"
          className="flex-1 min-w-[100px] px-2 sm:px-4 relative"
        >
          <Beaker className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">Test Cases</span>
          <TestResultBadge
            passed={passedTests}
            total={totalTests}
            visible={hasRun}
          />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="learn">
        <LearnTabContent
          educationContent={mdxContent.educationContent}
          _concept={mdxContent.educationConcept}
        />
      </TabsContent>

      <TabsContent value="instructions" className="space-y-4">
        <InstructionsTabContent
          descriptionContent={mdxContent.descriptionContent}
        />
      </TabsContent>

      <TabsContent value="tests">
        <TestCasesTabDisplay
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

ExerciseTabsDisplay.displayName = "ExerciseTabsDisplay";
