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
      className="fixed top-0 left-0 right-0 z-40 h-16 backdrop-blur-md bg-white/70 border-black/5"
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      exit={{ y: -64 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <div className="font-bold flex items-center gap-2 text-gray-900">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          Digital Prism
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-900 hover:bg-black/5">
            Log in
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-900 hover:bg-black/5"
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
