"use client";

import { ExerciseHeaderUI } from "./ExerciseHeaderUI";

export type ExerciseHeaderContainerProps = {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

/**
 * Container component for exercise header
 * Manages state and logic for the header
 */
export function ExerciseHeaderContainer({
  isFullscreen,
  onToggleFullscreen,
}: ExerciseHeaderContainerProps) {
  return (
    <ExerciseHeaderUI
      isFullscreen={isFullscreen}
      onToggleFullscreen={onToggleFullscreen}
    />
  );
}

ExerciseHeaderContainer.displayName = "ExerciseHeaderContainer";
