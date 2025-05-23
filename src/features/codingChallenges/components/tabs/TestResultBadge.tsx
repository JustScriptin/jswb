"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { exerciseAnimations } from "@/features/codingChallenges/lib/animations";

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
          variants={exerciseAnimations.testResult}
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
