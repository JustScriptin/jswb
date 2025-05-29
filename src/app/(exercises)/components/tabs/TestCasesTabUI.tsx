"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { TestCaseAccordion } from "./TestCaseAccordion";
import { animations } from "@/shared/lib/animations";
import type { TestCase, TestResult } from "@/shared/types/exercise";

export type TestCasesTabUIProps = {
  testCases: TestCase[];
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
};

/**
 * Presentational component for test cases tab
 * Renders test cases and results
 */
export function TestCasesTabUI({
  testCases,
  testResults,
  passedTests,
  totalTests,
  hasRun,
}: TestCasesTabUIProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Practice Examples</span>
          <AnimatePresence mode="wait">
            {hasRun && (
              <motion.div
                variants={animations.testResult}
                initial="initial"
                animate="animate"
                exit="exit"
                className={cn(
                  "text-sm px-3 py-1 rounded-full",
                  passedTests === totalTests
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive",
                )}
              >
                {passedTests === totalTests ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    All Tests Passed
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    {totalTests - passedTests} Failed
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardTitle>
        <CardDescription>
          Test your understanding with these examples
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={animations.staggered}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {testCases.map((test, index) => (
            <motion.div key={test.name} variants={animations.listItem}>
              <TestCaseAccordion
                test={test}
                index={index}
                result={testResults[index]}
              />
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}

TestCasesTabUI.displayName = "TestCasesTabUI";
