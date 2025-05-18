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
        "flex h-36 w-36 flex-col items-center justify-center rounded-xl bg-white/90 text-foreground shadow-md backdrop-blur-md",
        className,
      )}
    >
      <div className="mb-2 text-primary">{icon}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
StatsPebble.displayName = "StatsPebble";
