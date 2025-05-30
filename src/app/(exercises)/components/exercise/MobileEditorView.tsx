"use client";

import { MobileEditorViewContainer } from "./MobileEditorViewContainer";
import type { MobileEditorViewContainerProps } from "./MobileEditorView.types";

/**
 * Mobile editor view component
 * Delegates to the container component for state management and business logic
 */
export function MobileEditorView(props: MobileEditorViewContainerProps) {
  return <MobileEditorViewContainer {...props} />;
}

MobileEditorView.displayName = "MobileEditorView";
