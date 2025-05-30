"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { CodeCard } from "../ui/code-card";
import { ParticleBackground } from "../ui/particle-background";
import { fadeInUp } from "@/shared/lib/animations";

/**
 * Hero section component
 *
 * The main landing section with headline, description, CTA button,
 * and interactive code card
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects - subtle and performant
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-primary/20 to-secondary/30 pointer-events-none z-0"
        style={{
          y: heroY,
          opacity: heroOpacity,
        }}
      >
        <ParticleBackground count={50} opacity={1} />
      </motion.div>

      <div className="container relative grid items-center min-h-[90vh] md:h-screen max-w-7xl grid-cols-1 px-4 py-8 md:py-0 mx-auto lg:grid-cols-12 gap-y-8 md:gap-y-12">
        <div className="lg:col-span-7 z-10">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
            {...fadeInUp(0)}
          >
            Master Arrays in JavaScript
          </motion.h1>
          <motion.p
            className="max-w-xl mt-4 md:mt-6 text-base md:text-lg leading-relaxed text-muted-foreground"
            {...fadeInUp(0.1)}
          >
            Interactive challenges to build your skills through practice. Learn
            array methods through hands-on coding exercises.
          </motion.p>
          <motion.div className="mt-6 md:mt-10" {...fadeInUp(0.2)}>
            <Link href="/exercises">
              <Button
                variant="default"
                size="lg"
                shape="soft"
                weight="medium"
                animation="default"
                elevation="md"
                className="text-base md:text-lg w-full sm:w-auto"
              >
                Start the Challenges
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="lg:col-span-5 z-10 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <motion.div
            className="w-full max-w-md lg:max-w-none"
            {...fadeInUp(0.3)}
          >
            <CodeCard />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
Hero.displayName = "Hero";

/**
 * Scroll indicator component
 *
 * Shows an animated scroll indicator at the bottom of the hero section
 */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <motion.div
        className="w-6 h-10 border-2 border-foreground/30 rounded-[var(--radius-full)] flex justify-center"
        animate={{ y: [0, 5, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="w-1 h-2 bg-foreground/60 rounded-[var(--radius-full)] mt-2"
          animate={{ opacity: [0, 1, 0], y: [0, 5, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
