"use client"

import { motion } from "framer-motion"

interface ChallengeTileProps {
  title: string
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  tag: string
  delay: number
}

export default function ChallengeTile({ title, difficulty, tag, delay }: ChallengeTileProps) {
  const difficultyColors = {
    beginner: "bg-green-500",
    intermediate: "bg-blue-500",
    advanced: "bg-purple-500",
    expert: "bg-red-500",
  }

  return (
    <motion.div
      className="group relative h-[340px] rounded-xl bg-gray-900 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -12, transition: { duration: 0.2 } }}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 group-hover:w-4 transition-all duration-300 ${difficultyColors[difficulty]}`}
      />
      <div className="p-6 h-full flex flex-col">
        <div className="mt-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-gray-800 text-white">{tag}</span>
        </div>
        <div className="mt-auto">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <div className="flex items-center text-sm text-gray-400">
            <span className="capitalize">{difficulty}</span>
            <span className="mx-2">•</span>
            <span>5 min</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
