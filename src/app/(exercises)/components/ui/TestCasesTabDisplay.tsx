"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { TestCaseAccordionDisplay } from "./TestCaseAccordionDisplay";
import type { TestCase, TestResult } from "@/shared/types/exercise";

export type TestCasesTabDisplayProps = {
  testCases: TestCase[];
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
};

export function TestCasesTabDisplay({
  testCases,
  testResults,
  passedTests,
  totalTests,
  hasRun,
}: TestCasesTabDisplayProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Test Results</h3>
          {hasRun && (
            <div className="text-sm">
              <span className="font-medium">{passedTests}</span>
              <span className="text-muted-foreground">
                /{totalTests} passed
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {testCases.map((testCase, index) => {
            const testResult = testResults.find(
              (result) => result.id === testCase.id,
            );

            return (
              <TestCaseAccordionDisplay
                key={testCase.id}
                testCase={testCase}
                testResult={testResult}
                index={index}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

TestCasesTabDisplay.displayName = "TestCasesTabDisplay";
