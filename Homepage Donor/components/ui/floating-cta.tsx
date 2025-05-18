"use client"

import { motion } from "framer-motion"
import { Rocket } from "lucide-react"

/**
 * Floating CTA component
 *
 * A floating action button that stays visible while scrolling
 */
export default function FloatingCta() {
  return (
    <div className="fixed bottom-8 right-8 z-30">
      <motion.div
        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Rocket className="w-5 h-5 text-white" />
      </motion.div>
    </div>
  )
}
