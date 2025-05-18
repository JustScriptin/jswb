"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// types
export type StatsCardProps = {
  icon: ReactNode;
  value: number;
  label: string;
  highlight?: boolean;
};

// main component
export function StatsCard({
  icon,
  value,
  label,
  highlight = false,
}: StatsCardProps) {
  return (
    <motion.div
      data-component="StatsCard"
      whileHover={{ scale: 1.05 }}
      className={cn(
        "rounded-lg p-4 text-center space-y-2 bg-card border shadow-sm",
        highlight && "bg-primary/5 border-primary/20",
      )}
    >
      <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
StatsCard.displayName = "StatsCard";
