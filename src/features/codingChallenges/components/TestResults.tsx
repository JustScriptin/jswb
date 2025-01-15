"use client";

import { type TestResult } from "./CodeEditor";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TestResultsProps = {
  results: TestResult[];
  className?: string;
};

export function TestResults({ results, className }: TestResultsProps) {
  if (!results.length) return null;

  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  const allPassed = passedCount === totalCount;

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Test Results</h3>
        <Badge variant={allPassed ? "default" : "destructive"}>
          {passedCount}/{totalCount} Passed
        </Badge>
      </div>
      <div className="space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className={cn(
              "p-3 rounded-lg text-sm",
              result.passed 
                ? "bg-green-500/10 text-green-700 dark:text-green-400"
                : "bg-red-500/10 text-red-700 dark:text-red-400"
            )}
          >
            <div className="flex items-center justify-between">
              <span>Test #{index + 1}</span>
              <Badge variant={result.passed ? "default" : "destructive"}>
                {result.passed ? "Passed" : "Failed"}
              </Badge>
            </div>
            {result.message && (
              <p className="mt-1 text-sm opacity-90">{result.message}</p>
            )}
            {result.error && !result.passed && (
              <p className="mt-1 text-sm font-mono bg-red-500/5 p-2 rounded">
                {result.error}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
} 