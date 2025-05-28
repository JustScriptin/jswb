"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { animations } from "@/shared/lib/animations";

type TestResultBadgeProps = {
  passed: number;
  total: number;
  visible?: boolean;
};

export function TestResultBadge({
  passed,
  total,
  visible = true,
}: TestResultBadgeProps) {
  const allPassed = passed === total;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          variants={animations.scale}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Badge
            variant={allPassed ? "default" : "destructive"}
            className={cn(
              "ml-2 text-xs",
              allPassed && "bg-green-500 hover:bg-green-600",
            )}
          >
            {passed}/{total}
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

TestResultBadge.displayName = "TestResultBadge";
