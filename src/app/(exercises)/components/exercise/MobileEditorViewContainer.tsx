"use client";

import { useState, useEffect } from "react";
import { MobileEditorViewUI } from "./MobileEditorViewUI";
import type { MobileEditorViewContainerProps } from "./MobileEditorView.types";

/**
 * Container component for mobile editor view
 * Manages state and delegates rendering to the UI component
 */
export function MobileEditorViewContainer({
  exerciseMetadata,
  mdxContent,
  activeTab,
  onTabChange,
  testResults,
  language,
  onLanguageChange,
  onTestResults,
  editorRef,
  passedTests,
  totalTests,
  hasRun,
  exercise,
}: MobileEditorViewContainerProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [lastTestRun, setLastTestRun] = useState<{
    passed: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    if (hasRun) {
      setLastTestRun({ passed: passedTests, total: totalTests });
    }
  }, [hasRun, passedTests, totalTests]);

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleHideInstructions = () => {
    setShowInstructions(false);
  };

  const handleTestFeedbackClick = () => {
    onTabChange("tests");
    setShowInstructions(true);
  };

  return (
    <MobileEditorViewUI
      exerciseMetadata={exerciseMetadata}
      mdxContent={mdxContent}
      activeTab={activeTab}
      onTabChange={onTabChange}
      testResults={testResults}
      language={language}
      onLanguageChange={onLanguageChange}
      onTestResults={onTestResults}
      editorRef={editorRef}
      passedTests={passedTests}
      totalTests={totalTests}
      hasRun={hasRun}
      exercise={exercise}
      showInstructions={showInstructions}
      lastTestRun={lastTestRun}
      onShowInstructions={handleShowInstructions}
      onHideInstructions={handleHideInstructions}
      onTestFeedbackClick={handleTestFeedbackClick}
    />
  );
}

MobileEditorViewContainer.displayName = "MobileEditorViewContainer";
