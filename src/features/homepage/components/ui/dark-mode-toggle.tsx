"use client";

import { memo } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui";

type DarkModeToggleProps = {
  isDark: boolean;
  toggleDark: () => void;
};

/**
 * Dark Mode Toggle component
 *
 * Button that switches between light and dark themes
 */
export const DarkModeToggle = memo(function DarkModeToggle({
  isDark,
  toggleDark,
}: DarkModeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="Toggle dark mode"
      onClick={toggleDark}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
});
DarkModeToggle.displayName = "DarkModeToggle";
