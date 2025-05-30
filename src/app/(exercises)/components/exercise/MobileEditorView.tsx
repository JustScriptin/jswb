"use client";

import { useState } from "react";
import { MobileEditorViewDisplay } from "../ui/MobileEditorViewDisplay";
import type { MobileEditorViewContainerProps } from "./MobileEditorView.types";

/**
 * Mobile editor view component
 * Manages state and delegates rendering to the display component
 */
export function MobileEditorView(props: MobileEditorViewContainerProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [lastTestRun, setLastTestRun] = useState<{
    passed: number;
    total: number;
  } | null>(null);

  if (props.hasRun && props.testResults.length > 0 && !lastTestRun) {
    setLastTestRun({
      passed: props.passedTests,
      total: props.totalTests,
    });
  }

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleHideInstructions = () => {
    setShowInstructions(false);
  };

  const handleTestFeedbackClick = () => {
    props.onTabChange("test-cases");
    handleShowInstructions();
  };

  return (
    <MobileEditorViewDisplay
      {...props}
      showInstructions={showInstructions}
      lastTestRun={lastTestRun}
      onShowInstructions={handleShowInstructions}
      onHideInstructions={handleHideInstructions}
      onTestFeedbackClick={handleTestFeedbackClick}
    />
  );
}

MobileEditorView.displayName = "MobileEditorView";
