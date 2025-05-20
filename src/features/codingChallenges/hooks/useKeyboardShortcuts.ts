import { useEffect } from "react";

export type UseKeyboardShortcutsParams = {
  runTests: () => void;
  toggleFullscreen: () => void;
  setActiveTab: (tab: string) => void;
  isFullscreen: boolean;
};

/**
 * Handles global keyboard shortcuts for the exercise page.
 */
export function useKeyboardShortcuts({
  runTests,
  toggleFullscreen,
  setActiveTab,
  isFullscreen,
}: UseKeyboardShortcutsParams) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const cmdOrCtrl = e.metaKey || e.ctrlKey;

      if (cmdOrCtrl && e.key === "Enter") {
        e.preventDefault();
        runTests();
      } else if (cmdOrCtrl && e.key === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (cmdOrCtrl && e.key === "1") {
        e.preventDefault();
        setActiveTab("instructions");
      } else if (cmdOrCtrl && e.key === "2") {
        e.preventDefault();
        setActiveTab("tests");
      } else if (e.key === "Escape" && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [runTests, toggleFullscreen, setActiveTab, isFullscreen]);
}
