"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type Token = {
  text: string;
  className: string;
  index: number;
};

const CODE_SNIPPET = `function filterEvenNumbers(numbers) {
  return numbers.filter(num => num % 2 === 0)
}

// Test with sample array
const result = filterEvenNumbers([1, 2, 3, 4, 5, 6])
console.log(result) // [2, 4, 6]`;

const TESTS_COUNT = 3;
// Order in which test indicators should light up: middle (1), right (2), left (0)
const TESTS_DISPLAY_ORDER = [1, 2, 0];

const KEYWORD_STYLES: Record<string, string> = {
  function: "text-code-function",
  return: "text-code-keyword",
  const: "text-code-keyword",
  filter: "text-code-method",
  filterEvenNumbers: "text-code-method",
  numbers: "text-code-variable",
  num: "text-code-variable",
  result: "text-code-variable",
  console: "text-code-object",
  log: "text-code-method",
};

const SYMBOL_STYLES = {
  "(": "text-code-punctuation",
  ")": "text-code-punctuation",
  "{": "text-code-punctuation",
  "}": "text-code-punctuation",
  "[": "text-code-punctuation",
  "]": "text-code-punctuation",
  "=>": "text-code-punctuation",
} as const;

function highlightLine(line: string): Token[] {
  const tokens: Token[] = [];
  let current = 0;

  const pushText = (end: number) => {
    if (end > current) {
      tokens.push({
        text: line.slice(current, end),
        className: "text-code-text",
        index: current,
      });
      current = end;
    }
  };

  const processRegex = (regex: RegExp, className: string) => {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(line))) {
      const start = match.index;
      const end = start + match[0].length;
      if (start >= current) {
        pushText(start);
        tokens.push({ text: match[0], className, index: start });
        current = end;
      }
    }
  };

  Object.entries(KEYWORD_STYLES).forEach(([keyword, className]) => {
    processRegex(new RegExp(`\\b${keyword}\\b`, "g"), className);
    return void 0;
  });

  const commentStart = line.indexOf("//");
  if (commentStart >= current) {
    pushText(commentStart);
    tokens.push({
      text: line.slice(commentStart),
      className: "text-code-comment",
      index: commentStart,
    });
    current = line.length;
  }

  processRegex(/\b\d+\b/g, "text-code-number");

  Object.entries(SYMBOL_STYLES).forEach(([symbol, className]) => {
    processRegex(
      new RegExp(symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      className,
    );
    return void 0;
  });

  pushText(line.length);
  tokens.sort((a, b) => a.index - b.index);
  return tokens;
}

/**
 * Code Card component
 *
 * Displays an interactive code editor with typing animation and test results
 */

export const CodeCard = memo(function CodeCard() {
  const [testsRun, setTestsRun] = useState(false);
  const [passedCount, setPassedCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typedCode, setTypedCode] = useState("");
  const testIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lines = typedCode.split("\n");
  const cursorLine = lines.length - 1;

  // Typing animation
  useEffect(() => {
    if (!isTyping) return;

    const typingTimeout = setTimeout(() => {
      if (typedCode.length < CODE_SNIPPET.length) {
        setTypedCode(CODE_SNIPPET.slice(0, typedCode.length + 1));
      } else {
        setIsTyping(false);
      }
    }, 30);

    return () => {
      clearTimeout(typingTimeout);
      return void 0;
    };
  }, [typedCode, isTyping]);

  // Run tests after typing completes
  useEffect(() => {
    if (isTyping) return;

    let currentTest = 0;
    const startTestsTimeout = setTimeout(() => {
      setTestsRun(true);
      setPassedCount(0);
      testIntervalRef.current = setInterval(() => {
        if (currentTest >= TESTS_COUNT) {
          if (testIntervalRef.current) {
            clearInterval(testIntervalRef.current);
          }
          setTestsRun(false);
          return;
        }

        setPassedCount((prev) => prev + 1);

        currentTest += 1;
      }, 400);
    }, 1000);

    return () => {
      clearTimeout(startTestsTimeout);
      if (testIntervalRef.current) clearInterval(testIntervalRef.current);
      return void 0;
    };
  }, [isTyping]);

  return (
    <motion.div
      className="relative w-full max-w-[560px] h-[360px] rounded-[var(--radius-lg)] bg-code-bg border border-code-border shadow-[var(--shadow-lg)] overflow-hidden"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-[var(--radius-full)] bg-destructive"></div>
          <div className="w-3 h-3 rounded-[var(--radius-full)] bg-warning"></div>
          <div className="w-3 h-3 rounded-[var(--radius-full)] bg-success"></div>
          <div className="ml-2 text-xs text-muted-foreground">
            array-challenge.js
          </div>
        </div>

        <div className="flex-1 text-code-text font-mono text-sm leading-relaxed">
          <SyntaxHighlighter
            code={typedCode}
            showCursor={isTyping}
            cursorLine={cursorLine}
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <div className="text-xs text-muted-foreground mr-2">Tests:</div>
          {Array.from({ length: TESTS_COUNT }).map((_, i) => {
            const orderIndex = TESTS_DISPLAY_ORDER.indexOf(i);
            const isPassed = orderIndex !== -1 && passedCount > orderIndex;
            return (
              <TestIndicator key={i} passed={isPassed} isRunning={testsRun} />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
});

/**
 * Test Indicator component
 *
 * Shows the status of a test (passed/not run)
 */
function TestIndicator({
  passed,
  isRunning,
}: {
  passed: boolean;
  isRunning: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "w-6 h-6 rounded-[var(--radius-full)] flex items-center justify-center",
        passed ? "bg-success" : "bg-muted/30",
      )}
      animate={
        isRunning && passed
          ? {
              scale: [1, 1.2, 1],
            }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      {passed && <Check className="w-3 h-3 text-success-foreground" />}
    </motion.div>
  );
}

/**
 * Syntax Highlighter component
 *
 * Applies syntax highlighting to code
 */
type SyntaxHighlighterProps = {
  code: string;
  showCursor?: boolean;
  cursorLine?: number;
};

function SyntaxHighlighter({
  code,
  showCursor,
  cursorLine,
}: SyntaxHighlighterProps) {
  return (
    <>
      {code.split("\n").map((line, lineIndex) => {
        const tokens = highlightLine(line);
        const isCursor = showCursor && lineIndex === cursorLine;

        return (
          <div key={lineIndex} className="whitespace-pre">
            {tokens.map((token, i) => (
              <span key={i} className={token.className}>
                {token.text}
              </span>
            ))}
            {isCursor && (
              <motion.span
                className="inline-block w-[2px] h-[1em] bg-code-cursor align-bottom"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

CodeCard.displayName = "CodeCard";
