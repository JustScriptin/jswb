"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { cn } from "@/shared/lib/utils";
import type { TestCase, TestResult } from "@/shared/types/exercise";

export type TestCaseAccordionDisplayProps = {
  testCase: TestCase;
  testResult: TestResult | undefined;
  index: number;
};

export function TestCaseAccordionDisplay({
  testCase,
  testResult,
  index,
}: TestCaseAccordionDisplayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasResult = !!testResult;
  const isPassed = hasResult && testResult.passed;

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? `item-${index}` : ""}
      onValueChange={(value: string) => {
        setIsOpen(value === `item-${index}`);
      }}
      className="border rounded-md overflow-hidden"
      data-component="TestCaseAccordionDisplay"
    >
      <AccordionItem value={`item-${index}`} className="border-0">
        <AccordionTrigger
          className={cn(
            "px-4 py-3 text-sm font-medium hover:no-underline hover:bg-muted/50 group",
            hasResult && (isPassed ? "bg-success/10" : "bg-destructive/10"),
          )}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {hasResult && (
                <>
                  {isPassed ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </>
              )}
              <span>{testCase.message}</span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-3 text-sm">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Input
              </h4>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                <code>{JSON.stringify(testCase.input, null, 2)}</code>
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Expected Output
              </h4>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                <code>{JSON.stringify(testCase.expected, null, 2)}</code>
              </pre>
            </div>
            {hasResult && !isPassed && testResult.error && (
              <div>
                <h4 className="font-medium text-xs uppercase tracking-wider text-destructive mb-1">
                  Error
                </h4>
                <pre className="bg-destructive/10 p-2 rounded-md overflow-x-auto text-xs text-destructive">
                  <code>{testResult.error}</code>
                </pre>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

TestCaseAccordionDisplay.displayName = "TestCaseAccordionDisplay";
