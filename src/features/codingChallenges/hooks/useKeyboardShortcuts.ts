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
    const handleKeyDown = (event: KeyboardEvent) => {
      const cmdOrCtrl = event.metaKey || event.ctrlKey;

      if (cmdOrCtrl && event.key === "Enter") {
        event.preventDefault();
        runTests();
      } else if (cmdOrCtrl && event.key === "f") {
        event.preventDefault();
        toggleFullscreen();
      } else if (cmdOrCtrl && event.key === "1") {
        event.preventDefault();
        setActiveTab("instructions");
      } else if (cmdOrCtrl && event.key === "2") {
        event.preventDefault();
        setActiveTab("tests");
      } else if (event.key === "Escape" && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [runTests, toggleFullscreen, setActiveTab, isFullscreen]);
}
