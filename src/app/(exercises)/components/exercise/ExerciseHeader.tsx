"use client";

import { ExerciseHeaderContainer } from "./ExerciseHeaderContainer";
import type { ExerciseHeaderContainerProps } from "./ExerciseHeaderContainer";

export type { ExerciseHeaderContainerProps };

type ExerciseHeaderProps = {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

/**
 * Exercise header component
 * Delegates to the container component for state management and business logic
 */
export function ExerciseHeader(props: ExerciseHeaderProps) {
  return <ExerciseHeaderContainer {...props} />;
}

ExerciseHeader.displayName = "ExerciseHeader";
