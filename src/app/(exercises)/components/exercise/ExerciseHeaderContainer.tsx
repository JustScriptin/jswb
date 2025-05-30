"use client";

import { ExerciseHeaderDisplay } from "../ui/ExerciseHeaderDisplay";

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
    <ExerciseHeaderDisplay
      isFullscreen={isFullscreen}
      onToggleFullscreen={onToggleFullscreen}
    />
  );
}

ExerciseHeaderContainer.displayName = "ExerciseHeaderContainer";
