"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function CodeCard() {
  const [testsRun, setTestsRun] = useState(false)
  const [testsPassed, setTestsPassed] = useState([false, false, false])

  useEffect(() => {
    const timer = setTimeout(() => {
      setTestsRun(true)
      const testPassTimer = setInterval(() => {
        setTestsPassed((prev) => {
          const newState = [...prev]
          const nextIndex = newState.findIndex((passed) => !passed)
          if (nextIndex !== -1) {
            newState[nextIndex] = true
            return newState
          }
          clearInterval(testPassTimer)
          return prev
        })
      }, 400)

      return () => clearInterval(testPassTimer)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="relative w-full max-w-[560px] h-[360px] rounded-xl backdrop-blur-xl bg-black/30 border border-white/20 shadow-2xl"
      initial={{ y: 20 }}
      animate={{
        y: 0,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.28)",
      }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-2 text-xs text-white/60">array-challenge.js</div>
        </div>

        <div className="flex-1 overflow-hidden rounded-lg bg-[#1e1e1e] text-white font-mono text-sm p-4 shadow-inner border border-black/50">
          <div className="text-[#9cdcfe]">{"// Challenge: Filter even numbers"}</div>
          <div className="mt-2">
            <span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">filterEvenNumbers</span>
            <span className="text-white">(</span>
            <span className="text-[#9cdcfe]">numbers</span>
            <span className="text-white">) {"{"}</span>
          </div>
          <div className="ml-4">
            <span className="text-[#c586c0]">return</span> <span className="text-[#9cdcfe]">numbers</span>
            <span className="text-white">.</span>
            <span className="text-[#dcdcaa]">filter</span>
            <span className="text-white">(</span>
            <span className="text-[#9cdcfe]">num</span>
            <span className="text-white"> =&gt; </span>
            <span className="text-[#9cdcfe]">num</span>
            <span className="text-[#d4d4d4]"> % </span>
            <span className="text-[#b5cea8]">2</span>
            <span className="text-[#d4d4d4]"> === </span>
            <span className="text-[#b5cea8]">0</span>
            <span className="text-white">)</span>
          </div>
          <div className="text-white">{"}"}</div>

          <div className="mt-4 text-[#6a9955]">{"// Test with sample array"}</div>
          <div>
            <span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">result</span>
            <span className="text-white"> = </span>
            <span className="text-[#dcdcaa]">filterEvenNumbers</span>
            <span className="text-white">([</span>
            <span className="text-[#b5cea8]">1, 2, 3, 4, 5, 6</span>
            <span className="text-white">])</span>
          </div>
          <div>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-white">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-white">(</span>
            <span className="text-[#4fc1ff]">result</span>
            <span className="text-white">)</span>
            <span className="text-[#6a9955]">{"// [2, 4, 6]"}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <div className="text-xs text-white/60 mr-2">Tests:</div>
          {testsPassed.map((passed, i) => (
            <motion.div
              key={i}
              className={`w-5 h-5 rounded-full flex items-center justify-center ${passed ? "bg-green-500" : "bg-gray-700"}`}
              animate={testsRun && passed ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {passed && <Check className="w-3 h-3 text-white" />}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
