"use client";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { cn } from "@/shared/lib/utils";
import { ExerciseTabsDisplay } from "./ExerciseTabsDisplay";
import { CodeEditorPanelDisplay } from "./CodeEditorPanelDisplay";
import { MobileEditorView } from "../exercise/MobileEditorView";
import type { Exercise, TestResult, Language } from "@/shared/types/exercise";
import type { ExerciseMDXContent } from "@/shared/types/services";
import type { CodeEditorHandle } from "../CodeEditor.types";

export type ExerciseContentDisplayProps = {
  exerciseMetadata: Exercise;
  mdxContent: ExerciseMDXContent;
  isFullscreen: boolean;
  activeTab: string;
  testResults: TestResult[];
  language: Language;
  passedTests: number;
  totalTests: number;
  hasRun: boolean;
  editorRef: React.RefObject<CodeEditorHandle>;
  onTabChange: (tab: string) => void;
  onLanguageChange: (language: Language) => void;
  onTestResults: (results: TestResult[]) => void;
};

export function ExerciseContentDisplay({
  exerciseMetadata,
  mdxContent,
  isFullscreen,
  activeTab,
  testResults,
  language,
  passedTests,
  totalTests,
  hasRun,
  editorRef,
  onTabChange,
  onLanguageChange,
  onTestResults,
}: ExerciseContentDisplayProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <MobileEditorView
        exerciseMetadata={exerciseMetadata}
        mdxContent={mdxContent}
        activeTab={activeTab}
        testResults={testResults}
        language={language}
        passedTests={passedTests}
        totalTests={totalTests}
        hasRun={hasRun}
        editorRef={editorRef}
        onTabChange={onTabChange}
        onLanguageChange={onLanguageChange}
        onTestResults={onTestResults}
      />
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
        isFullscreen && "p-4",
      )}
      data-component="ExerciseContentDisplay"
    >
      <div className="flex flex-col">
        <ExerciseTabsDisplay
          exerciseMetadata={exerciseMetadata}
          mdxContent={mdxContent}
          activeTab={activeTab}
          onTabChange={onTabChange}
          testResults={testResults}
          passedTests={passedTests}
          totalTests={totalTests}
          hasRun={hasRun}
        />
      </div>

      <div className="flex flex-col h-[calc(100vh-13rem)]">
        <CodeEditorPanelDisplay
          slug={exerciseMetadata.slug}
          defaultValue={mdxContent.starterCode}
          testCasesCount={exerciseMetadata.testCases.length}
          _language={language}
          onLanguageChange={onLanguageChange}
          onTestResults={onTestResults}
        />
      </div>
    </div>
  );
}

ExerciseContentDisplay.displayName = "ExerciseContentDisplay";
