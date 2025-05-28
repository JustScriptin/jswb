"use client";

import { motion } from "framer-motion";

/**
 * Loading Screen component
 *
 * Displays a loading animation when the site is initializing
 */
export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 240 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="h-0.5 bg-primary"
      />
    </motion.div>
  );
}
LoadingScreen.displayName = "LoadingScreen";
