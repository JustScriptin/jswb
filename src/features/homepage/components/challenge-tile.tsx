"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

type ChallengeTileProps = {
  title: string
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  tag: string
  delay: number
}

export function ChallengeTile({ title, difficulty, tag, delay }: ChallengeTileProps) {
  const difficultyColors = {
    beginner: "bg-green-500",
    intermediate: "bg-blue-500",
    advanced: "bg-purple-500",
    expert: "bg-red-500",
  }

  return (
    <motion.div
      className="group relative h-[280px] rounded-lg bg-gray-900 overflow-hidden cursor-pointer border border-gray-800"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay }}
      whileHover={{ y: -5 }}
    >
      {/* Color strip */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 group-hover:w-2 transition-all duration-300 ${difficultyColors[difficulty]}`}
      />

      {/* Content */}
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-gray-800 text-white">{tag}</span>
        </div>

        <div className="mt-auto">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center text-sm text-gray-400">
            <span className="capitalize">{difficulty}</span>
            <span className="mx-2">•</span>
            <span>5 min</span>
          </div>

          {/* Arrow indicator */}
          <div className="mt-4 flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="mr-2">Start Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
ChallengeTile.displayName = "ChallengeTile"
