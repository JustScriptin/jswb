"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/shared/components/ui/badge";
import { animations } from "@/shared/lib/animations";

type TestResultBadgeProps = {
  passed: number;
  total: number;
  visible: boolean;
};

export function TestResultBadge({
  passed,
  total,
  visible,
}: TestResultBadgeProps) {
  if (!visible) return null;

  const allPassed = passed === total;
  const variant = allPassed ? "success" : "warning";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={animations.fadeIn.initial}
          animate={animations.fadeIn.animate}
          exit={animations.fadeIn.exit}
          className="absolute -top-1 -right-1"
        >
          <Badge
            variant={variant}
            className="text-[10px] h-5 px-1.5 ml-1.5 font-medium"
          >
            {passed}/{total}
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

TestResultBadge.displayName = "TestResultBadge";
