"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TestCaseAccordion } from "./TestCaseAccordion";
import { exerciseAnimations } from "../../lib/animations";
import type { TestCase, TestResult } from "../../types";

type TestCasesTabProps = {
  testCases: TestCase[];
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
};

export function TestCasesTab({
  testCases,
  testResults,
  passedTests,
  totalTests,
  hasRun,
}: TestCasesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Practice Examples</span>
          <AnimatePresence mode="wait">
            {hasRun && (
              <motion.div
                variants={exerciseAnimations.testResult}
                initial="initial"
                animate="animate"
                exit="exit"
                className={cn(
                  "text-sm px-3 py-1 rounded-full",
                  passedTests === totalTests
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500",
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
          variants={exerciseAnimations.staggeredList}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {testCases.map((test, index) => (
            <motion.div
              key={test.message}
              variants={exerciseAnimations.listItem}
            >
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

TestCasesTab.displayName = "TestCasesTab"; 
