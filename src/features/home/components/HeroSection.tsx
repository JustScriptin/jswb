"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const codeSnippet = `const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);`;

export function HeroSection() {
  return (
    <section
      data-component="HeroSection"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-900 to-sky-800 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.4),transparent)]" />
      <div className="relative z-10 grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold md:text-7xl"
          >
            Master JavaScript Methods
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl text-muted-foreground"
          >
            Short, interactive challenges to sharpen your skills.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center gap-4 md:justify-start"
          >
            <Button size="lg" asChild>
              <Link href="/exercises">Start the Challenges</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
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
