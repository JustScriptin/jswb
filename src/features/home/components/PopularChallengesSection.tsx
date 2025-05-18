"use client";

import { ReactElement } from "react";
import { motion } from "framer-motion";

const CHALLENGES = [
  { title: "Map Through Arrays", difficulty: "beginner", tag: "uses .map()" },
  {
    title: "Filter Collections",
    difficulty: "intermediate",
    tag: "uses .filter()",
  },
  { title: "Reduce to Values", difficulty: "advanced", tag: "uses .reduce()" },
  { title: "Sort & Compare", difficulty: "expert", tag: "uses .sort()" },
] as const;

type Challenge = (typeof CHALLENGES)[number];

type Difficulty = Challenge["difficulty"];

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: "bg-green-500",
  intermediate: "bg-blue-500",
  advanced: "bg-purple-500",
  expert: "bg-red-500",
};

function ChallengeTile({
  title,
  difficulty,
  tag,
  delay,
}: Challenge & { delay: number }): ReactElement {
  return (
    <motion.div
      data-component="ChallengeTile"
      className="group relative h-[340px] cursor-pointer overflow-hidden rounded-xl bg-background"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -12 }}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-4 ${DIFFICULTY_COLORS[difficulty]}`}
      />
      <div className="flex h-full flex-col p-6">
        <div className="mt-4">
          <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs">
            {tag}
          </span>
        </div>
        <div className="mt-auto">
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="capitalize">{difficulty}</span>
            <span className="mx-2">•</span>
            <span>5 min</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PopularChallengesSection(): ReactElement {
  return (
    <section
      data-component="PopularChallengesSection"
      className="bg-muted py-24 -skew-y-1"
    >
      <div className="container mx-auto px-4 skew-y-1">
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground">
          Popular Challenges
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {CHALLENGES.map((c, i) => (
            <ChallengeTile key={c.title} {...c} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

PopularChallengesSection.displayName = "PopularChallengesSection";
