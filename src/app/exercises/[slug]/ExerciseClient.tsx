"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeEditor } from "@/features/codingChallenges/components/CodeEditor";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from "react";

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
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Subtle Top Area */}
      <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Method To The Madness</span>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section / Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4">{exercise.title}</h1>
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-6">
            Master the art of JavaScript methods
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="text-sm font-medium hover:bg-secondary/80 transition-colors">
              {exercise.category.name}
            </Badge>
            <Badge variant="outline" className="text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              {exercise.category.method}
            </Badge>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Description</CardTitle>
                <CardDescription>Problem statement and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="whitespace-pre-wrap text-sm font-sans bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    {exercise.description}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Test Cases</CardTitle>
                <CardDescription>
                  Your solution will be tested against these cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {exercise.testCases.map((test, index) => (
                    <TestCaseAccordion key={index} test={test} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="relative">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-[calc(100vh-12rem)]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Solution</CardTitle>
                <CardDescription>
                  Write your solution below and use the "Run Tests" button to check your work.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-7rem)]">
                <CodeEditor
                  defaultLanguage="typescript"
                  defaultValue={exercise.starterCode}
                  slug={exercise.slug}
                  className="h-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestCaseAccordion({ test, index }: { test: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        className="w-full px-4 py-2 text-left font-medium flex justify-between items-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Test #{index + 1}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 space-y-2 text-sm bg-white dark:bg-gray-900">
          <div className="flex flex-col space-y-1">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Input:</span>
            <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono">
              {JSON.stringify(test.input)}
            </code>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Expected:</span>
            <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono">
              {JSON.stringify(test.expected)}
            </code>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{test.message}</p>
        </div>
      )}
    </div>
  );
} 