"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type StatsPebbleProps = {
  icon: ReactNode;
  label: string;
  value: number | string;
  className?: string;
};

export function StatsPebble({
  icon,
  label,
  value,
  className,
}: StatsPebbleProps) {
  return (
    <motion.div
      data-component="StatsPebble"
      whileHover={{ y: -4 }}
      className={cn(
        "flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-muted text-foreground shadow-inner",
        className,
      )}
    >
      <div className="mb-2 text-primary">{icon}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}
StatsPebble.displayName = "StatsPebble";
