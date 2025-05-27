"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Copy,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { TestCase, TestResult } from "@/features/codingChallenges/types";

// types
export type TestCaseAccordionProps = {
  test: TestCase;
  index: number;
  result: TestResult | undefined;
};

// helper component for code display
function CodeBlock({
  title,
  content,
  variant = "default",
}: {
  title: string;
  content: string;
  variant?: "default" | "error";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "text-sm font-medium",
            variant === "error" && "text-destructive",
          )}
        >
          {title}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted"
          title="Copy to clipboard"
        >
          <Copy className="h-3 w-3" />
        </button>
      </div>
      <div className="relative group">
        <pre
          className={cn(
            "text-xs p-3 rounded-lg overflow-x-auto font-mono border transition-all duration-200",
            "hover:shadow-sm",
            variant === "default" &&
              "bg-gradient-to-br from-muted to-muted/80 text-foreground border-border/50",
            variant === "error" &&
              "bg-gradient-to-br from-destructive/5 to-destructive/10 text-destructive border-destructive/20",
          )}
        >
          {content}
        </pre>
        {copied && (
          <div className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded-md">
            Copied!
          </div>
        )}
      </div>
    </div>
  );
}

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
        "rounded-xl border transition-all duration-200 hover:shadow-sm",
        hasRun &&
          (isPassed
            ? "bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/60 hover:border-green-300/60"
            : "bg-gradient-to-br from-red-50 to-red-50/50 border-red-200/60 hover:border-red-300/60"),
        !hasRun &&
          "bg-gradient-to-br from-card to-card/80 hover:border-border/80",
      )}
    >
      <button
        className="flex w-full items-center justify-between p-4 hover:bg-black/[0.02] transition-colors rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {hasRun &&
            (isPassed ? (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 border border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 border border-red-200">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            ))}
          <div className="flex flex-col items-start gap-1">
            <div className="text-sm font-semibold">Test Case {index + 1}</div>
            <div className="text-xs text-muted-foreground">{test.message}</div>
          </div>
        </div>
        <div
          className={cn(
            "p-1 rounded-md transition-colors",
            isOpen ? "bg-muted" : "hover:bg-muted/50",
          )}
        >
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 p-4 space-y-4 bg-gradient-to-br from-muted/20 to-transparent">
              <CodeBlock
                title="Input"
                content={JSON.stringify(test.input, null, 2)}
              />
              <CodeBlock
                title="Expected Output"
                content={JSON.stringify(test.expected, null, 2)}
              />
              {result && !result.passed && result.error && (
                <CodeBlock
                  title="Error"
                  content={result.error}
                  variant="error"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
TestCaseAccordion.displayName = "TestCaseAccordion";
