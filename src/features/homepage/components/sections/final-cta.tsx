"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { TestimonialBubble } from "@/features/homepage";
import { fadeInUp } from "@/lib";

/**
 * Final CTA section component
 *
 * The closing call-to-action section with testimonials
 */
export function FinalCta() {
  return (
    <section className="py-24 bg-linear-to-r from-cyan-600 to-blue-700 flex items-center justify-center relative">
      <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
        <motion.h2
          className="text-4xl font-semibold text-white mb-6"
          {...fadeInUp(0)}
          viewport={{ once: true }}
        >
          Ready to build muscle memory?
        </motion.h2>
        <motion.div
          className="max-w-xl mx-auto text-center mb-10 text-white/90"
          {...fadeInUp(0.1)}
          viewport={{ once: true }}
        >
          Join thousands of developers who have mastered JavaScript arrays
          through our interactive challenges.
        </motion.div>
        <motion.div {...fadeInUp(0.2)} viewport={{ once: true }}>
          <Link href="/exercises">
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-medium bg-white text-blue-700 hover:bg-white/90 rounded-lg"
            >
              Start the Challenges
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          {...fadeInUp(0.3)}
          viewport={{ once: true }}
        >
          <TestimonialBubble
            name="Sarah L."
            role="Frontend Developer"
            text="These challenges helped me ace my technical interviews!"
          />
          <TestimonialBubble
            name="Michael T."
            role="JavaScript Instructor"
            text="I recommend Digital Prism to all my students."
          />
          <TestimonialBubble
            name="Priya K."
            role="Senior Engineer"
            text="The best way to master array methods, hands down."
          />
        </motion.div>
      </div>
    </section>
  );
}
FinalCta.displayName = "FinalCta";
