"use client";

import { GraduationCap, BookOpen, Beaker } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearnTab } from "./LearnTab";
import { InstructionsTab } from "./InstructionsTab";
import { TestCasesTab } from "./TestCasesTab";
import { TestResultBadge } from "./TestResultBadge";
import type { Exercise, TestResult } from "@/features/codingChallenges/types";

type ExerciseTabsProps = {
  exercise: Exercise;
  activeTab: string;
  onTabChange: (tab: string) => void;
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
};

export function ExerciseTabs({
  exercise,
  activeTab,
  onTabChange,
  testResults,
  passedTests,
  totalTests,
  hasRun,
}: ExerciseTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="learn" className="flex-1">
          <GraduationCap className="mr-2 h-4 w-4" />
          Learn
        </TabsTrigger>
        <TabsTrigger value="instructions" className="flex-1">
          <BookOpen className="mr-2 h-4 w-4" />
          Instructions
        </TabsTrigger>
        <TabsTrigger value="tests" className="flex-1 relative">
          <Beaker className="mr-2 h-4 w-4" />
          Test Cases
          <TestResultBadge
            passed={passedTests}
            total={totalTests}
            visible={hasRun}
          />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="learn">
        <LearnTab education={exercise.education} />
      </TabsContent>

      <TabsContent value="instructions" className="space-y-4">
        <InstructionsTab description={exercise.description} />
      </TabsContent>

      <TabsContent value="tests">
        <TestCasesTab
          testCases={exercise.testCases}
          testResults={testResults}
          passedTests={passedTests}
          totalTests={totalTests}
          hasRun={hasRun}
        />
      </TabsContent>
    </Tabs>
  );
}

ExerciseTabs.displayName = "ExerciseTabs";
