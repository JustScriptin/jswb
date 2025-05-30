"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { ShortcutsDialog } from "../exercise/ShortcutsDialog";

export type ExerciseHeaderDisplayProps = {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

export function ExerciseHeaderDisplay({
  isFullscreen,
  onToggleFullscreen,
}: ExerciseHeaderDisplayProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm",
        isFullscreen ? "px-4" : "",
      )}
      data-component="ExerciseHeaderDisplay"
    >
      <div
        className={cn(
          "flex h-14 items-center justify-between",
          !isFullscreen && "container mx-auto px-4",
        )}
      >
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/exercises">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back to exercises</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Back to exercises</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-2">
          <ShortcutsDialog />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={onToggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Separator />
    </motion.header>
  );
}

ExerciseHeaderDisplay.displayName = "ExerciseHeaderDisplay";
