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
  Keyboard,
  GraduationCap,
  Lightbulb,
  AlertTriangle,
  Target
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

type Exercise = {
  slug: string;
  title: string;
  description: string;
  category: {
    name: string;
    method: string;
  };
  education: {
    concept: string;
    explanation: string;
    useCases: string[];
    visualExample?: string;
    commonMistakes?: string[];
    tips?: string[];
  };
  starterCode: string;
  testCases: Array<{
    input: any;
    expected: any;
    message: string;
  }>;
};

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

const getStorageValue = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    return saved ? saved : defaultValue;
  } catch (err) {
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
            <a className="flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                JavaScript Methods Learning
              </span>
            </a>
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
                <TabsTrigger value="learn" className="flex-1">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Learn
                </TabsTrigger>
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
              <TabsContent value="learn">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      {exercise.education.concept}
                    </CardTitle>
                    <CardDescription>
                      Understanding the core concept
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Explanation Section */}
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-sm font-sans bg-muted p-4 rounded-md">
                        {exercise.education.explanation}
                      </div>
                    </div>

                    {/* Visual Example Section */}
                    {exercise.education.visualExample && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Visual Example
                        </h3>
                        <pre className="font-mono text-sm bg-muted p-4 rounded-md overflow-x-auto">
                          {exercise.education.visualExample}
                        </pre>
                      </div>
                    )}

                    {/* Use Cases Section */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Common Use Cases
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {exercise.education.useCases.map((useCase, index) => (
                          <li key={index}>{useCase}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Common Mistakes Section */}
                    {exercise.education.commonMistakes && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-yellow-500">
                          <AlertTriangle className="h-4 w-4" />
                          Common Mistakes to Avoid
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {exercise.education.commonMistakes.map((mistake, index) => (
                            <li key={index}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tips Section */}
                    {exercise.education.tips && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-green-500">
                          <Lightbulb className="h-4 w-4" />
                          Pro Tips
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {exercise.education.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="instructions">
                <Card>
                  <CardHeader>
                    <CardTitle>Exercise Description</CardTitle>
                    <CardDescription>
                      Follow these steps to complete the exercise
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-sm font-sans bg-muted p-4 rounded-md">
                        {exercise.description}
                      </div>
                    </div>
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

type TestCaseAccordionProps = {
  test: any;
  index: number;
  result?: TestResult;
};

function TestCaseAccordion({ test, index, result }: TestCaseAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasRun = !!result;
  const passed = hasRun && result.passed;

  return (
    <div className={cn(
      "border rounded-lg overflow-hidden transition-colors",
      hasRun && (passed 
        ? "border-green-500/20 bg-green-500/5" 
        : "border-red-500/20 bg-red-500/5"
      )
    )}>
      <button
        className="w-full px-4 py-3 text-left font-medium flex justify-between items-center hover:bg-muted/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={!!isOpen}
      >
        <span className="flex items-center">
          <span className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3",
            !hasRun && "bg-primary/10 text-primary",
            passed && "bg-green-500/20 text-green-700 dark:text-green-500",
            hasRun && !passed && "bg-red-500/20 text-red-700 dark:text-red-500"
          )}>
            {index + 1}
          </span>
          <span className="flex items-center gap-2">
            Test Case #{index + 1}
            {hasRun && (
              <Badge 
                variant={passed ? "default" : "destructive"}
                className={cn(
                  "ml-2 text-xs",
                  passed && "bg-green-500 hover:bg-green-600"
                )}
              >
                {passed ? "Passed" : "Failed"}
              </Badge>
            )}
          </span>
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="p-4 space-y-3 text-sm bg-background">
          <div className="space-y-1.5">
            <div className="font-medium text-muted-foreground">Input:</div>
            <code className="px-2 py-1 rounded bg-muted font-mono text-xs block overflow-x-auto">
              {JSON.stringify(test.input, null, 2)}
            </code>
          </div>
          <div className="space-y-1.5">
            <div className="font-medium text-muted-foreground">Expected:</div>
            <code className="px-2 py-1 rounded bg-muted font-mono text-xs block overflow-x-auto">
              {JSON.stringify(test.expected, null, 2)}
            </code>
          </div>
          {test.message && (
            <div className="pt-2 border-t">
              <p className="text-muted-foreground">{test.message}</p>
            </div>
          )}
          {hasRun && !passed && result.error && (
            <div className="pt-2 border-t space-y-1.5">
              <div className="font-medium text-red-600 dark:text-red-400">Error Details:</div>
              <pre className="text-xs font-mono bg-red-500/10 p-3 rounded overflow-x-auto text-red-700 dark:text-red-300">
                {result.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 