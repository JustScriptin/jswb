"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import Link from "next/link";

/**
 * Floating CTA component
 *
 * A floating action button that stays visible while scrolling
 */
export function FloatingCta() {
  return (
    <div className="fixed bottom-8 right-8 z-[var(--z-floating)]">
      <Link href="/exercises">
        <motion.div
          className="w-12 h-12 rounded-[var(--radius-full)] bg-primary flex items-center justify-center shadow-[var(--shadow-lg)] cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Rocket className="w-5 h-5 text-primary-foreground" />
        </motion.div>
      </Link>
    </div>
  );
}
FloatingCta.displayName = "FloatingCta";
