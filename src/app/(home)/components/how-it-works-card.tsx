"use client";

import { motion } from "framer-motion";
import { MousePointer, Code, Trophy } from "lucide-react";

type HowItWorksCardProps = {
  step: number;
  title: string;
  description: string;
  color: "violet" | "cyan" | "lime";
  delay: number;
};

export function HowItWorksCard({
  step,
  title,
  description,
  color,
  delay,
}: HowItWorksCardProps) {
  const icons = {
    1: <MousePointer className="w-5 h-5 text-card-foreground" />,
    2: <Code className="w-5 h-5 text-card-foreground" />,
    3: <Trophy className="w-5 h-5 text-card-foreground" />,
  };

  const borderColors = {
    violet: "border-accent",
    cyan: "border-primary",
    lime: "border-success",
  };

  const gradientColors = {
    violet: "from-accent/10 to-transparent",
    cyan: "from-primary/10 to-transparent",
    lime: "from-success/10 to-transparent",
  };

  return (
    <motion.div
      className={`relative p-6 rounded-[var(--radius-lg)] bg-card border ${borderColors[color]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
      whileHover={{ y: -5 }}
    >
      {/* Background gradient - subtle */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientColors[color]} opacity-50 rounded-[var(--radius-lg)]`}
      ></div>

      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-[var(--radius-full)] bg-muted flex items-center justify-center border border-border text-foreground font-bold z-10">
        {step}
      </div>

      <div className="mb-5 w-12 h-12 rounded-[var(--radius-full)] bg-muted flex items-center justify-center relative z-10">
        {icons[step as keyof typeof icons]}
      </div>

      <h3 className="text-xl font-bold text-card-foreground mb-3 relative z-10">
        {title}
      </h3>

      <p className="text-muted-foreground relative z-10 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
HowItWorksCard.displayName = "HowItWorksCard";
