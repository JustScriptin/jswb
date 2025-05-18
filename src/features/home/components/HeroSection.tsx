"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const codeSnippet = `const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);`;

const GRID_COLS = 10;
const GRID_ROWS = 5;

function ParticleBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -80]);

  return (
    <motion.div className="absolute inset-0 opacity-[0.03]" style={{ y }}>
      <div className="grid h-full w-full grid-cols-10 grid-rows-5">
        {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <div className="h-1 w-1 rounded-full bg-white" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section
      data-component="HeroSection"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-brand via-brand/80 to-brand/60 text-white"
    >
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--brand),0.3),transparent)]" />
      <div className="relative z-10 grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold md:text-6xl lg:text-7xl"
          >
            Master{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              JavaScript
            </span>{" "}
            Methods
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            Short, interactive challenges to sharpen your skills.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
          >
            <Button
              size="lg"
              className="transition-transform duration-200 hover:scale-105 focus:scale-105"
              asChild
            >
              <Link href="/exercises">Start the Challenges</Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="transition-transform duration-200 hover:scale-105 focus:scale-105"
              asChild
            >
              <Link href="/exercises">Browse Exercises</Link>
            </Button>
          </motion.div>
        </div>
        <motion.pre
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className={cn(
            "rounded-xl border border-white/20 bg-black/50 p-6 font-mono text-sm backdrop-blur-xl",
          )}
        >
          <code>{codeSnippet}</code>
        </motion.pre>
      </div>
    </section>
  );
}
HeroSection.displayName = "HeroSection";
