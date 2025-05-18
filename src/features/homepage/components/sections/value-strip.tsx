"use client";

import { motion } from "framer-motion";
import { StatPebble } from "@/features/homepage/components/stat-pebble";
import { fadeInUp } from "@/lib/animations";

/**
 * Value Strip section component
 *
 * Displays key statistics and value propositions
 */
export function ValueStrip() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-900/90 relative">
      <motion.div
        className="container max-w-7xl mx-auto relative z-10 px-4"
        {...fadeInUp(0)}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <StatPebble icon="code" value="50+" label="Challenges" delay={0} />
          <StatPebble
            icon="users"
            value="10k+"
            label="Developers"
            delay={0.1}
          />
          <StatPebble icon="zap" value="24/7" label="Support" delay={0.2} />
        </div>
      </motion.div>
    </section>
  );
}
ValueStrip.displayName = "ValueStrip";
