"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeEditor, type TestResult } from "@/features/codingChallenges/components/CodeEditor";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, BookOpen, Code, Beaker, CheckCircle2, XCircle, ChevronLeft } from 'lucide-react';
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Exercise = {
  slug: string;
  title: string;
  description: string;
  category: {
    name: string;
    method: string;
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

export function ExerciseClient({ exercise }: Props) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = exercise.testCases.length;
  const hasRun = testResults.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center gap-4">
            <Link href="/exercises">
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Challenges
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <a className="flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                Method To The Madness
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Title Section */}
        <div className="mb-8 text-center">
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
            Master JavaScript array methods through practical exercises
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Instructions & Tests */}
          <div className="space-y-6">
            <Tabs defaultValue="instructions" className="w-full">
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
              <TabsContent value="instructions">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Description</CardTitle>
                    <CardDescription>
                      Read the instructions carefully before starting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-sm font-sans bg-muted p-4 rounded-md">
                        {exercise.description}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tests">
                <Card>
                  <CardHeader>
                    <CardTitle>Test Cases</CardTitle>
                    <CardDescription>
                      Your solution will be tested against these cases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {exercise.testCases.map((test, index) => (
                        <TestCaseAccordion 
                          key={index} 
                          test={test} 
                          index={index}
                          result={testResults[index]} 
                        />
                      ))}
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
                    JavaScript
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col min-h-0">
                <CodeEditor
                  defaultLanguage="javascript"
                  defaultValue={exercise.starterCode}
                  slug={exercise.slug}
                  className="flex-grow min-h-0"
                  onTestResults={setTestResults}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
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