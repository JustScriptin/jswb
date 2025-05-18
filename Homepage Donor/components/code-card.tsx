"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function CodeCard() {
  const [testsRun, setTestsRun] = useState(false)
  const [testsPassed, setTestsPassed] = useState([false, false, false])
  const [isTyping, setIsTyping] = useState(true)
  const [typedCode, setTypedCode] = useState("")

  const codeSnippet = `function filterEvenNumbers(numbers) {
  return numbers.filter(num => num % 2 === 0)
}

// Test with sample array
const result = filterEvenNumbers([1, 2, 3, 4, 5, 6])
console.log(result) // [2, 4, 6]`

  // Typing animation - optimized
  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        if (typedCode.length < codeSnippet.length) {
          setTypedCode(codeSnippet.slice(0, typedCode.length + 1))
        } else {
          setIsTyping(false)
          // Start test animation after typing is complete
          setTimeout(() => {
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
          }, 1000)
        }
      }, 30)
      return () => clearTimeout(timeout)
    }
  }, [typedCode, isTyping, codeSnippet])

  // Syntax highlighting function
  const highlightSyntax = (code: string) => {
    return code.split("\n").map((line, lineIndex) => {
      // Replace with more sophisticated highlighting if needed
      const highlightedLine = line
        .replace(/function/g, '<span class="text-[#569cd6]">function</span>')
        .replace(/return/g, '<span class="text-[#c586c0]">return</span>')
        .replace(/const/g, '<span class="text-[#569cd6]">const</span>')
        .replace(/=>/g, '<span class="text-white">=></span>')
        .replace(/\(/g, '<span class="text-white">(</span>')
        .replace(/\)/g, '<span class="text-white">)</span>')
        .replace(/\{/g, '<span class="text-white">{</span>')
        .replace(/\}/g, '<span class="text-white">}</span>')
        .replace(/\[/g, '<span class="text-white">[</span>')
        .replace(/\]/g, '<span class="text-white">]</span>')
        .replace(/\b\d+\b/g, '<span class="text-[#b5cea8]">$&</span>')
        .replace(/filter/g, '<span class="text-[#dcdcaa]">filter</span>')
        .replace(/filterEvenNumbers/g, '<span class="text-[#dcdcaa]">filterEvenNumbers</span>')
        .replace(/numbers/g, '<span class="text-[#9cdcfe]">numbers</span>')
        .replace(/num/g, '<span class="text-[#9cdcfe]">num</span>')
        .replace(/result/g, '<span class="text-[#4fc1ff]">result</span>')
        .replace(/console/g, '<span class="text-[#9cdcfe]">console</span>')
        .replace(/log/g, '<span class="text-[#dcdcaa]">log</span>')
        .replace(/\/\/ .+/g, '<span class="text-[#6a9955]">$&</span>')

      return (
        <div key={lineIndex} className="whitespace-pre">
          <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
        </div>
      )
    })
  }

  return (
    <motion.div
      className="relative w-full max-w-[560px] h-[360px] rounded-lg bg-[#1e1e1e] border border-gray-800 shadow-lg overflow-hidden"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-2 text-xs text-white/60">array-challenge.js</div>
        </div>

        <div className="flex-1 text-white font-mono text-sm leading-relaxed">
          {/* Cursor */}
          {isTyping && (
            <motion.div
              className="absolute w-[2px] h-[14px] bg-white/70"
              style={{
                left: `${(typedCode.length % 40) * 8 + 4}px`,
                top: `${Math.floor(typedCode.length / 40) * 20 + 36}px`,
              }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
          )}

          {/* Code with syntax highlighting */}
          <div className="text-white/90">{highlightSyntax(typedCode)}</div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <div className="text-xs text-white/70 mr-2">Tests:</div>
          {testsPassed.map((passed, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full flex items-center justify-center ${passed ? "bg-green-500" : "bg-gray-700/50"}`}
            >
              {passed && <Check className="w-3 h-3 text-white" />}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
