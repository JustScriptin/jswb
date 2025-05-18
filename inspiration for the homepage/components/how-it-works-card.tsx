"use client"

import { motion } from "framer-motion"
import { MousePointer, Code, Trophy } from "lucide-react"

interface HowItWorksCardProps {
  step: number
  title: string
  description: string
  color: "violet" | "cyan" | "lime"
  delay: number
}

export default function HowItWorksCard({ step, title, description, color, delay }: HowItWorksCardProps) {
  const icons = {
    1: <MousePointer className="w-6 h-6 text-white" />,
    2: <Code className="w-6 h-6 text-white" />,
    3: <Trophy className="w-6 h-6 text-white" />,
  }

  const shadowColors = {
    violet: "rgba(139, 92, 246, 0.3)",
    cyan: "rgba(34, 211, 238, 0.3)",
    lime: "rgba(132, 204, 22, 0.3)",
  }

  const borderColors = {
    violet: "border-violet-500",
    cyan: "border-cyan-500",
    lime: "border-lime-500",
  }

  return (
    <motion.div
      className={`relative p-6 rounded-xl backdrop-blur-xl bg-gray-900/80 border ${borderColors[color]}`}
      style={{
        boxShadow: `0 20px 40px ${shadowColors[color]}`,
        perspective: "800px",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: delay,
      }}
      whileHover={{
        y: -10,
        boxShadow: `0 30px 60px ${shadowColors[color]}`,
        transition: { duration: 0.3 },
      }}
    >
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 text-white font-bold">
        {step}
      </div>
      <div className="mb-4 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
        {icons[step as keyof typeof icons]}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}
