"use client"

import { motion } from "framer-motion"
import { HowItWorksCard } from "@/features/homepage/components/how-it-works-card"
import { fadeInUp } from "@/lib/animations"

/**
 * How It Works section component
 *
 * Explains the platform's process through a three-step guide
 */
export function HowItWorks() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center text-white mb-4"
          {...fadeInUp(0)}
          viewport={{ once: true, margin: "-100px" }}
        >
          How It Works
        </motion.h2>
        <motion.div
          className="max-w-xl mx-auto text-center mb-16 text-white/70"
          {...fadeInUp(0.1)}
          viewport={{ once: true, margin: "-100px" }}
        >
          Our platform makes learning JavaScript array methods intuitive and engaging through a simple three-step
          process.
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
          <HowItWorksCard
            step={1}
            title="Choose a Challenge"
            description="Select from our library of array-focused coding challenges."
            color="violet"
            delay={0}
          />
          <HowItWorksCard
            step={2}
            title="Write Your Solution"
            description="Use our interactive editor to solve the challenge with JavaScript."
            color="cyan"
            delay={0.1}
          />
          <HowItWorksCard
            step={3}
            title="Test & Learn"
            description="Run tests to verify your solution and learn from the results."
            color="lime"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}
HowItWorks.displayName = "HowItWorks"
