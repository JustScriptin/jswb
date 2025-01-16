"use client";

import { useState } from "react";
import { type TestResult } from "./CodeEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

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
    <Card className={cn("mt-6 overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          {allPassed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          Test Results
        </CardTitle>
        <Badge 
          variant={allPassed ? "default" : "destructive"} 
          className={cn(
            "px-3 py-1 text-sm transition-all duration-300",
            allPassed && "bg-green-500 hover:bg-green-600"
          )}
        >
          {passedCount}/{totalCount} Passed
        </Badge>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
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
        "rounded-lg border transition-all duration-300",
        result.passed 
          ? "bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-300"
          : "bg-red-500/5 border-red-500/20 text-red-700 dark:text-red-300"
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 text-left font-medium flex items-center justify-between"
        aria-expanded={!!isExpanded}
      >
        <div className="flex items-center gap-3">
          {result.passed ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span>Test #{index + 1}</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant={result.passed ? "default" : "destructive"} 
            className={cn(
              "text-xs",
              result.passed && "bg-green-500 hover:bg-green-600"
            )}
          >
            {result.passed ? "Passed" : "Failed"}
          </Badge>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {result.message && (
                <div className="space-y-1.5">
                  <div className="font-medium opacity-80">Message:</div>
                  <p className="text-sm">{result.message}</p>
                </div>
              )}
              {result.error && !result.passed && (
                <div className="space-y-1.5">
                  <div className="font-medium opacity-80">Error Details:</div>
                  <pre className="text-xs font-mono bg-red-500/10 p-3 rounded overflow-x-auto">
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

