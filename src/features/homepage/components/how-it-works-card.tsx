"use client"

import { motion } from "framer-motion"
import { MousePointer, Code, Trophy } from "lucide-react"

type HowItWorksCardProps = {
  step: number
  title: string
  description: string
  color: "violet" | "cyan" | "lime"
  delay: number
}

export function HowItWorksCard({ step, title, description, color, delay }: HowItWorksCardProps) {
  const icons = {
    1: <MousePointer className="w-5 h-5 text-white" />,
    2: <Code className="w-5 h-5 text-white" />,
    3: <Trophy className="w-5 h-5 text-white" />,
  }

  const borderColors = {
    violet: "border-violet-500",
    cyan: "border-cyan-500",
    lime: "border-lime-500",
  }

  const gradientColors = {
    violet: "from-violet-500/5 to-transparent",
    cyan: "from-cyan-500/5 to-transparent",
    lime: "from-lime-500/5 to-transparent",
  }

  return (
    <motion.div
      className={`relative p-6 rounded-lg bg-gray-900 border ${borderColors[color]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
      whileHover={{ y: -5 }}
    >
      {/* Background gradient - subtle */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[color]} opacity-50 rounded-lg`}></div>

      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 text-white font-bold z-10">
        {step}
      </div>

      <div className="mb-5 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center relative z-10">
        {icons[step as keyof typeof icons]}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 relative z-10">{title}</h3>

      <p className="text-gray-300 relative z-10 leading-relaxed">{description}</p>
    </motion.div>
  )
}
HowItWorksCard.displayName = "HowItWorksCard"
