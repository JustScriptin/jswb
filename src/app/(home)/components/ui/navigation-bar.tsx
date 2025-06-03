"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/shared/components/ui";

type NavigationBarProps = {
  scrollProgress: number;
};

/**
 * Navigation Bar component
 *
 * Sticky navigation that appears after scrolling
 */
export const NavigationBar = memo(function NavigationBar({
  scrollProgress,
}: NavigationBarProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[var(--z-navbar)] h-16 backdrop-blur-xl backdrop-saturate-150 bg-background/60 border-b border-border/20 shadow-sm"
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      exit={{ y: -64 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <div className="font-bold flex items-center gap-2 text-foreground">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          Digital Prism
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            animation="fast"
            className="text-foreground"
          >
            Log in
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            animation="fast"
            elevation="none"
            className="text-foreground"
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
