"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/features/homepage/components/ui/dark-mode-toggle";

type NavigationBarProps = {
  scrollProgress: number;
  isDark: boolean;
  toggleDark: () => void;
};

/**
 * Navigation Bar component
 *
 * Sticky navigation that appears after scrolling
 */
export const NavigationBar = memo(function NavigationBar({
  scrollProgress,
  isDark,
  toggleDark,
}: NavigationBarProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 h-16 backdrop-blur-md bg-black/30 border-b border-white/5"
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      exit={{ y: -64 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <div className="text-white font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          Digital Prism
        </div>
        <div className="flex items-center gap-4">
          <DarkModeToggle isDark={isDark} toggleDark={toggleDark} />
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Log in
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </motion.div>
  );
});
NavigationBar.displayName = "NavigationBar";
