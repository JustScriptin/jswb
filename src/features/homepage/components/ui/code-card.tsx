"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib";

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
  function: "text-[#569cd6]",
  return: "text-[#c586c0]",
  const: "text-[#569cd6]",
  filter: "text-[#dcdcaa]",
  filterEvenNumbers: "text-[#dcdcaa]",
  numbers: "text-[#9cdcfe]",
  num: "text-[#9cdcfe]",
  result: "text-[#4fc1ff]",
  console: "text-[#9cdcfe]",
  log: "text-[#dcdcaa]",
};

const SYMBOL_STYLES = {
  "(": "text-white",
  ")": "text-white",
  "{": "text-white",
  "}": "text-white",
  "[": "text-white",
  "]": "text-white",
  "=>": "text-white",
} as const;

function highlightLine(line: string): Token[] {
  const tokens: Token[] = [];
  let current = 0;

  const pushText = (end: number) => {
    if (end > current) {
      tokens.push({
        text: line.slice(current, end),
        className: "text-white/90",
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

  Object.entries(KEYWORD_STYLES).forEach(([keyword, className]) =>
    processRegex(new RegExp(`\\b${keyword}\\b`, "g"), className),
  );

  const commentStart = line.indexOf("//");
  if (commentStart >= current) {
    pushText(commentStart);
    tokens.push({
      text: line.slice(commentStart),
      className: "text-[#6a9955]",
      index: commentStart,
    });
    current = line.length;
  }

  processRegex(/\b\d+\b/g, "text-[#b5cea8]");

  Object.entries(SYMBOL_STYLES).forEach(([symbol, className]) =>
    processRegex(
      new RegExp(symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      className,
    ),
  );

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
    };
  }, [isTyping]);

  return (
    <motion.div
      className="relative w-full max-w-[560px] h-[360px] rounded-lg bg-[#1e1e1e] border border-gray-800 shadow-lg overflow-hidden"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-2 text-xs text-white/60">array-challenge.js</div>
        </div>

        <div className="flex-1 text-white font-mono text-sm leading-relaxed">
          <SyntaxHighlighter
            code={typedCode}
            showCursor={isTyping}
            cursorLine={cursorLine}
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <div className="text-xs text-white/70 mr-2">Tests:</div>
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
        "w-6 h-6 rounded-full flex items-center justify-center",
        passed ? "bg-green-500" : "bg-gray-700/50",
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
      {passed && <Check className="w-3 h-3 text-white" />}
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
                className="inline-block w-[2px] h-[1em] bg-white/70 align-bottom"
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
