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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex h-36 w-36 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-white/80 to-white/60 text-foreground shadow-lg backdrop-blur-md dark:from-white/20 dark:to-white/10",
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
