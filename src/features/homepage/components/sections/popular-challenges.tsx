"use client";

import { motion } from "framer-motion";
import { ChallengeTile } from "@/features/homepage";
import { fadeInUp } from "@/lib";

/**
 * Popular Challenges section component
 *
 * Showcases featured coding challenges
 */
export function PopularChallenges() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-gray-900/90 relative">
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center text-foreground mb-4"
          {...fadeInUp(0)}
          viewport={{ once: true, margin: "-100px" }}
        >
          Popular Challenges
        </motion.h2>
        <motion.div
          className="max-w-xl mx-auto text-center mb-16 text-muted-foreground"
          {...fadeInUp(0.1)}
          viewport={{ once: true, margin: "-100px" }}
        >
          Start with these fan favorites to build your JavaScript array
          manipulation skills.
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ChallengeTile
            title="Map Through Arrays"
            difficulty="beginner"
            tag="uses .map()"
            delay={0}
          />
          <ChallengeTile
            title="Filter Collections"
            difficulty="intermediate"
            tag="uses .filter()"
            delay={0.05}
          />
          <ChallengeTile
            title="Reduce to Values"
            difficulty="advanced"
            tag="uses .reduce()"
            delay={0.1}
          />
          <ChallengeTile
            title="Sort & Compare"
            difficulty="expert"
            tag="uses .sort()"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
PopularChallenges.displayName = "PopularChallenges";
