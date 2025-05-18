"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const codeSnippet = `const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);`;

const PARTICLES = 50;

function ParticleBackground() {
  return (
    <div className="absolute inset-0 opacity-[0.03]">
      {Array.from({ length: PARTICLES }).map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      data-component="HeroSection"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-radial from-indigo-900 via-blue-900 to-cyan-800 text-white"
    >
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.4),transparent)]" />
      <div className="relative z-10 grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold md:text-7xl"
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
