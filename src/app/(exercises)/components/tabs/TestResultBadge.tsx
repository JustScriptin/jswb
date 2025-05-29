"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/shared/components/ui/badge";
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
            variant={allPassed ? "success" : "destructive"}
            className="ml-2 text-xs"
          >
            {passed}/{total}
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

TestResultBadge.displayName = "TestResultBadge";
