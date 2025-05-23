"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShortcutsDialog } from "./ShortcutsDialog";
import { exerciseAnimations } from "../../lib/animations";

type ExerciseHeaderProps = {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

export function ExerciseHeader({ isFullscreen, onToggleFullscreen }: ExerciseHeaderProps) {
  return (
    <motion.div
      variants={exerciseAnimations.header}
      className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/exercises">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Methods
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              JavaScript Methods Learning
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ShortcutsDialog />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle fullscreen (⌘/Ctrl + F)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
}

ExerciseHeader.displayName = "ExerciseHeader"; 
