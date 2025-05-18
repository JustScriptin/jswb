"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/utils";
import type { TestCase, TestResult } from "@/features/codingChallenges/types";

// types
export type TestCaseAccordionProps = {
  test: TestCase;
  index: number;
  result: TestResult | undefined;
};

// main component
export function TestCaseAccordion({
  test,
  index,
  result,
}: TestCaseAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isPassed = result?.passed;
  const hasRun = result !== undefined;

  return (
    <div
      data-component="TestCaseAccordion"
      className={cn(
        "rounded-lg border",
        hasRun &&
          (isPassed
            ? "bg-green-500/10 border-green-500/20"
            : "bg-destructive/10 border-destructive/20"),
        !hasRun && "bg-card",
      )}
    >
      <button
        className="flex w-full items-center justify-between p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {hasRun &&
            (isPassed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-destructive" />
            ))}
          <div className="flex flex-col items-start gap-1">
            <div className="text-sm font-medium">Test Case {index + 1}</div>
            <div className="text-xs text-muted-foreground">
              <Markdown content={test.message} className="inline-block" />
            </div>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t p-4 space-y-3">
              <div>
                <div className="text-sm font-medium mb-1">Input</div>
                <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                  {JSON.stringify(test.input, null, 2)}
                </pre>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Expected Output</div>
                <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                  {JSON.stringify(test.expected, null, 2)}
                </pre>
              </div>
              {result && !result.passed && result.error && (
                <div>
                  <div className="text-sm font-medium mb-1 text-destructive">
                    Error
                  </div>
                  <pre className="text-xs bg-destructive/10 p-2 rounded-md overflow-x-auto">
                    {result.error}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
TestCaseAccordion.displayName = "TestCaseAccordion";
