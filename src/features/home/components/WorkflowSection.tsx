"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";
import { MousePointer, Code2, Trophy } from "lucide-react";

const STEPS = [
  {
    icon: <MousePointer className="h-6 w-6 text-white" strokeWidth={1.5} />,
    title: "Pick a Challenge",
    description: "Choose from curated exercises.",
    color: "violet",
  },
  {
    icon: <Code2 className="h-6 w-6 text-white" strokeWidth={1.5} />,
    title: "Craft Your Solution",
    description: "Write code directly in the editor.",
    color: "cyan",
  },
  {
    icon: <Trophy className="h-6 w-6 text-white" strokeWidth={1.5} />,
    title: "Run the Tests",
    description: "Instantly check your work and iterate.",
    color: "lime",
  },
] as const;

type Step = (typeof STEPS)[number];

function StepCard({ icon, title, description, color }: Step): ReactElement {
  const shadow: Record<Step["color"], string> = {
    violet: "rgba(139,92,246,0.3)",
    cyan: "rgba(34,211,238,0.3)",
    lime: "rgba(132,204,22,0.3)",
  };

  const border: Record<Step["color"], string> = {
    violet: "border-violet-500",
    cyan: "border-cyan-500",
    lime: "border-lime-500",
  };

  return (
    <motion.div
      data-component="StepCard"
      className={`relative rounded-xl border bg-background/80 p-6 backdrop-blur-xl ${border[color]}`}
      style={{ boxShadow: `0 20px 40px ${shadow[color]}` }}
      whileHover={{ y: -10 }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export function WorkflowSection(): ReactElement {
  return (
    <section data-component="WorkflowSection" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-bold">Your Workflow</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <StepCard key={step.title} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
WorkflowSection.displayName = "WorkflowSection";
