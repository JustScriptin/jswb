"use client"

import { motion } from "framer-motion"
import { Code, Users, Zap } from "lucide-react"

interface StatPebbleProps {
  icon: "code" | "users" | "zap"
  value: string
  label: string
}

export default function StatPebble({ icon, value, label }: StatPebbleProps) {
  const icons = {
    code: <Code className="w-5 h-5 text-gray-700" />,
    users: <Users className="w-5 h-5 text-gray-700" />,
    zap: <Zap className="w-5 h-5 text-gray-700" />,
  }

  return (
    <motion.div
      className="w-[160px] h-[160px] rounded-lg bg-white shadow-md flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-3 bg-white">
        {icons[icon]}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </motion.div>
  )
}
