"use client";

import { useState } from "react";
import { type TestResult } from "./CodeEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Test Results</CardTitle>
        <Badge 
          variant={allPassed ? "default" : "destructive"} 
          className="text-sm px-3 py-1 transition-colors duration-300"
        >
          {passedCount}/{totalCount} Passed
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <TestResultItem key={index} result={result} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TestResultItem({ result, index }: { result: TestResult; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "p-4 rounded-lg text-sm transition-all duration-300",
        result.passed 
          ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
          : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">Test #{index + 1}</span>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={result.passed ? "default" : "destructive"} 
            className="text-xs px-2 py-0.5"
          >
            {result.passed ? "Passed" : "Failed"}
          </Badge>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {result.message && (
            <p className="text-sm opacity-90">{result.message}</p>
          )}
          {result.error && !result.passed && (
            <pre className="text-xs font-mono bg-red-100 dark:bg-red-900/50 p-3 rounded overflow-x-auto">
              {result.error}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

