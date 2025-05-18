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
      className="w-[140px] h-[140px] rounded-xl bg-white shadow-md flex flex-col items-center justify-center p-4"
      style={{
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08), 0 1px 2px rgba(255,255,255,0.5)",
      }}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0.5 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center mb-2">
        {icons[icon]}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </motion.div>
  )
}
