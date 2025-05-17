"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeEditor, type TestResult, type CodeEditorHandle } from "@/features/codingChallenges/components/CodeEditor";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Code,
  Beaker,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  Exercise,
  TestCase,
} from "@/features/codingChallenges/data/exercises";

type Props = {
  exercise: Exercise;
};

const KEYBOARD_SHORTCUTS = [
  { key: "⌘/Ctrl + Enter", description: "Run Tests" },
  { key: "⌘/Ctrl + F", description: "Toggle Fullscreen" },
  { key: "⌘/Ctrl + 1", description: "Switch to Instructions" },
  { key: "⌘/Ctrl + 2", description: "Switch to Test Cases" },
  { key: "Esc", description: "Exit Fullscreen" },
];

const getStorageValue = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    return (saved as unknown as T) ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

export function ExerciseClient({ exercise }: Props) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [language, setLanguage] = useState<"typescript" | "javascript">("javascript");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");
  const editorRef = useRef<CodeEditorHandle>(null);
  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = exercise.testCases.length;
  const hasRun = testResults.length > 0;

  // Load saved language preference after mount
  useEffect(() => {
    const savedLanguage = getStorageValue(`${exercise.slug}-language`, "javascript") as "typescript" | "javascript";
    setLanguage(savedLanguage);
  }, [exercise.slug]);

  const runTests = useCallback(async () => {
    if (editorRef.current) {
      await editorRef.current.runTests();
      setActiveTab("tests");
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const cmdOrCtrl = e.metaKey || e.ctrlKey;
      
      if (cmdOrCtrl && e.key === "Enter") {
        // Run tests
        e.preventDefault();
        runTests();
      } else if (cmdOrCtrl && e.key === "f") {
        // Toggle fullscreen
        e.preventDefault();
        setIsFullscreen(prev => !prev);
      } else if (cmdOrCtrl && e.key === "1") {
        // Switch to Instructions
        e.preventDefault();
        setActiveTab("instructions");
      } else if (cmdOrCtrl && e.key === "2") {
        // Switch to Test Cases
        e.preventDefault();
        setActiveTab("tests");
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, runTests]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  return (
    <motion.div
      data-component="ExerciseClient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header Section */}
      <motion.div 
        className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/exercises">
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Methods
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <Link href="/" className="flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                JavaScript Methods Learning
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Keyboard className="h-4 w-4 mr-2" />
                  Shortcuts
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Keyboard Shortcuts</DialogTitle>
                  <DialogDescription>
                    Master these shortcuts to boost your productivity
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {shortcut.key}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        {shortcut.description}
                      </span>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle fullscreen (⌘/Ctrl + F)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className={cn(
          "container mx-auto px-4 py-6 md:py-8 lg:py-12",
          isFullscreen && "max-w-none p-0"
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Title Section */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-center space-x-2 mb-4">
            <Badge variant="secondary" className="text-sm font-medium">
              {exercise.category.name}
            </Badge>
            <Badge variant="outline" className="text-sm font-medium">
              {exercise.category.method}
            </Badge>
          </div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            {exercise.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn and understand JavaScript methods through practical examples
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className={cn(
            "grid gap-6",
            isFullscreen ? "grid-cols-[1fr_2fr]" : "lg:grid-cols-2"
          )}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Left Column - Instructions & Tests */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="instructions" className="flex-1">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Instructions
                </TabsTrigger>
                <TabsTrigger value="tests" className="flex-1 relative">
                  <Beaker className="mr-2 h-4 w-4" />
                  Test Cases
                  {hasRun && (
                    <Badge 
                      variant={passedTests === totalTests ? "default" : "destructive"}
                      className={cn(
                        "ml-2 text-xs",
                        passedTests === totalTests && "bg-green-500 hover:bg-green-600"
                      )}
                    >
                      {passedTests}/{totalTests}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="instructions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Problem Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <exercise.component />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tests">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Practice Examples</span>
                      {hasRun && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={cn(
                            "text-sm px-3 py-1 rounded-full",
                            passedTests === totalTests 
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
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
                    </CardTitle>
                    <CardDescription>
                      Test your understanding with these examples
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {exercise.testCases.map((test, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <TestCaseAccordion 
                              test={test} 
                              index={index}
                              result={testResults[index]} 
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Code Editor */}
          <div className="flex flex-col min-h-[800px]">
            <Card className="flex flex-col h-full overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Solution</CardTitle>
                  <CardDescription>
                    Write your solution and run the tests
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    <Code className="mr-1 h-3 w-3" />
                    {language === "javascript" ? "JavaScript" : "TypeScript"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col min-h-0">
                <CodeEditor
                  ref={editorRef}
                  defaultLanguage={language}
                  defaultValue={exercise.starterCode}
                  slug={exercise.slug}
                  className="flex-grow min-h-0"
                  onTestResults={setTestResults}
                  onLanguageChange={setLanguage}
                />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
ExerciseClient.displayName = "ExerciseClient";

type TestCaseAccordionProps = {
  test: TestCase;
  index: number;
  result?: TestResult;
};

function TestCaseAccordion({ test, index, result }: TestCaseAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isPassed = result?.passed;
  const hasRun = result !== undefined;

  return (
    <div
      data-component="TestCaseAccordion"
      className={cn(
        "rounded-lg border",
        hasRun && (isPassed ? "bg-green-500/10 border-green-500/20" : "bg-destructive/10 border-destructive/20"),
        !hasRun && "bg-card"
      )}
    >
      <button
        className="flex w-full items-center justify-between p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {hasRun && (
            isPassed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-destructive" />
            )
          )}
          <div className="flex flex-col items-start gap-1">
            <div className="text-sm font-medium">Test Case {index + 1}</div>
            <div className="text-xs text-muted-foreground">
              {test.message}
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
                  <div className="text-sm font-medium mb-1 text-destructive">Error</div>
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
