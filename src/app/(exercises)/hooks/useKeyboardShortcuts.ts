import { useEffect } from "react";

export type KeyboardShortcut = {
  key: string;
  action: () => void;
  description: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
};

/**
 * Handles global keyboard shortcuts for the exercise page.
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const cmdOrCtrl = event.metaKey || event.ctrlKey;

      for (const shortcut of shortcuts) {
        const keyMatch = event.key === shortcut.key;
        const ctrlMatch = shortcut.ctrlKey ? cmdOrCtrl : true;
        const altMatch = shortcut.altKey ? event.altKey : true;
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : true;

        if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
          event.preventDefault();
          shortcut.action();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
}
