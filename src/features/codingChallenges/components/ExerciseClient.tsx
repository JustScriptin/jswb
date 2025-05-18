"use client";

import { ReactNode, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CodeEditor,
  type CodeEditorHandle,
} from "@/features/codingChallenges/components/CodeEditor";
import type { Language, TestResult } from "@/features/codingChallenges/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
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
  Target,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getLocalStorageValue } from "@/lib/storage";
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
import { Markdown } from "@/components/ui/markdown";
import type { Exercise } from "@/features/codingChallenges/types";
import { TestCaseAccordion } from "./TestCaseAccordion";

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

// subcomponents
type Shortcut = (typeof KEYBOARD_SHORTCUTS)[number];

type ShortcutItemProps = {
  shortcut: Shortcut;
};

function ShortcutItem({ shortcut }: ShortcutItemProps) {
  return (
    <div
      data-component="ShortcutItem"
      className="flex items-center justify-between"
    >
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {shortcut.key}
      </code>
      <span className="text-sm text-muted-foreground">
        {shortcut.description}
      </span>
    </div>
  );
}

type SectionHeadingProps = {
  icon: ReactNode;
  title: string;
  className?: string;
};

function SectionHeading({ icon, title, className }: SectionHeadingProps) {
  return (
    <h3 className={cn("font-semibold mb-2 flex items-center gap-2", className)}>
      {icon}
      {title}
    </h3>
  );
}

type MarkdownListProps = {
  items: string[];
};

function MarkdownList({ items }: MarkdownListProps) {
  return (
    <ul className="list-disc pl-4 space-y-1">
      {items.map((item) => (
        <li key={item}>
          <Markdown content={item} />
        </li>
      ))}
    </ul>
  );
}

export function ExerciseClient({ exercise }: Props) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [language, setLanguage] = useState<Language>("javascript");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");
  const editorRef = useRef<CodeEditorHandle>(null);
  const passedTests = testResults.filter((r) => r.passed).length;
  const totalTests = exercise.testCases.length;
  const hasRun = testResults.length > 0;

  // Load saved language preference after mount
  useEffect(() => {
    const savedLanguage = getLocalStorageValue(
      `${exercise.slug}-language`,
      "javascript",
    ) as Language;
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
        setIsFullscreen((prev) => !prev);
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

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

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
                  {KEYBOARD_SHORTCUTS.map((shortcut) => (
                    <ShortcutItem key={shortcut.key} shortcut={shortcut} />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
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
          isFullscreen && "max-w-none p-0",
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
            isFullscreen ? "grid-cols-[1fr_2fr]" : "lg:grid-cols-2",
          )}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Left Column - Instructions & Tests */}
          <div className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
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
                      variant={
                        passedTests === totalTests ? "default" : "destructive"
                      }
                      className={cn(
                        "ml-2 text-xs",
                        passedTests === totalTests &&
                          "bg-green-500 hover:bg-green-600",
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
                    <div>
                      <SectionHeading
                        icon={<Lightbulb className="h-4 w-4" />}
                        title="Explanation"
                      />
                      <Markdown content={exercise.education.explanation} />
                    </div>

                    {/* Visual Example Section */}
                    {exercise.education.visualExample && (
                      <div>
                        <SectionHeading
                          icon={<Code className="h-4 w-4" />}
                          title="Visual Example"
                        />
                        <Markdown content={exercise.education.visualExample} />
                      </div>
                    )}

                    {/* Use Cases Section */}
                    <div>
                      <SectionHeading
                        icon={<Target className="h-4 w-4" />}
                        title="Common Use Cases"
                      />
                      <MarkdownList items={exercise.education.useCases} />
                    </div>

                    {/* Common Mistakes Section */}
                    {exercise.education.commonMistakes && (
                      <div>
                        <SectionHeading
                          icon={<AlertTriangle className="h-4 w-4" />}
                          title="Common Mistakes to Avoid"
                          className="text-yellow-500"
                        />
                        <MarkdownList
                          items={exercise.education.commonMistakes}
                        />
                      </div>
                    )}

                    {/* Tips Section */}
                    {exercise.education.tips && (
                      <div>
                        <SectionHeading
                          icon={<Lightbulb className="h-4 w-4" />}
                          title="Pro Tips"
                          className="text-green-500"
                        />
                        <MarkdownList items={exercise.education.tips} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="instructions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Problem Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Markdown content={exercise.description} />
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
                              : "bg-red-500/20 text-red-500",
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
                            key={test.message}
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
