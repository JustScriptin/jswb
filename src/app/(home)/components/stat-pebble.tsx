"use client";

import { motion } from "framer-motion";
import { Code, Users, Zap } from "lucide-react";

type StatPebbleProps = {
  icon: "code" | "users" | "zap";
  value: string;
  label: string;
  delay?: number;
};

export function StatPebble({ icon, value, label, delay = 0 }: StatPebbleProps) {
  const icons = {
    code: <Code className="w-5 h-5 text-muted-foreground" />,
    users: <Users className="w-5 h-5 text-muted-foreground" />,
    zap: <Zap className="w-5 h-5 text-muted-foreground" />,
  };

  return (
    <motion.div
      className="w-[160px] h-[160px] rounded-[var(--radius-lg)] bg-card shadow-[var(--shadow-md)] flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      <div className="w-12 h-12 rounded-[var(--radius-full)] border border-border flex items-center justify-center mb-3 bg-card">
        {icons[icon]}
      </div>
      <div className="text-2xl font-bold text-card-foreground mb-1">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
StatPebble.displayName = "StatPebble";
