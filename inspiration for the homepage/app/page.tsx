"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { ChevronRight, Github, Menu, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import CodeCard from "@/components/code-card"
import StatPebble from "@/components/stat-pebble"
import HowItWorksCard from "@/components/how-it-works-card"
import ChallengeTile from "@/components/challenge-tile"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showNav, setShowNav] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Handle loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Handle scroll progress for sticky nav
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowNav(latest > 64)
      setScrollProgress(Math.min(latest / (document.body.scrollHeight - window.innerHeight), 1))
    })
  }, [scrollY])

  return (
    <main className="relative overflow-x-hidden">
      {/* Loading Veil */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1117] bg-opacity-90"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="h-[2px] w-0 bg-[#0ff]"
              initial={{ width: 0 }}
              animate={{ width: "240px" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Micro-Nav */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-40 h-12 backdrop-blur-xl bg-white/5"
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container flex items-center justify-between h-full max-w-7xl">
              <div className="text-white font-bold">Digital Prism</div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-white">
                  Log in
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#5ef] via-[#19f] to-[#34d399]"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-gradient-radial from-indigo-900 via-blue-900 to-cyan-800"
      >
        <div className="absolute inset-0 opacity-[0.01]">
          <ParticleBackground />
        </div>
        <div className="container relative grid items-center h-screen max-w-7xl grid-cols-1 px-4 mx-auto lg:grid-cols-12 gap-y-12">
          <div className="lg:col-span-7 z-10">
            <motion.h1
              className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Master{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5ef] via-[#19f] to-[#34d399] font-bold">
                Arrays
              </span>{" "}
              in{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5ef] via-[#19f] to-[#34d399] font-bold">
                JavaScript
              </span>
            </motion.h1>
            <motion.p
              className="max-w-xl mt-6 text-lg text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Interactive challenges to build your skills through practice. Learn array methods through hands-on coding
              exercises.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8"
            >
              <Button className="h-16 px-10 text-lg font-medium transition-all duration-300 border rounded-full shadow-lg bg-white/10 backdrop-blur-xl border-white/20 hover:shadow-cyan-500/20 hover:shadow-xl group">
                Start the Challenges
                <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
          <div className="lg:col-span-5 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <CodeCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Strip */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            <StatPebble icon="code" value="50+" label="Challenges" />
            <StatPebble icon="users" value="10k+" label="Developers" />
            <StatPebble icon="zap" value="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-[#0d1117]">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <HowItWorksCard
              step={1}
              title="Choose a Challenge"
              description="Select from our library of array-focused coding challenges."
              color="violet"
              delay={0}
            />
            <HowItWorksCard
              step={2}
              title="Write Your Solution"
              description="Use our interactive editor to solve the challenge with JavaScript."
              color="cyan"
              delay={0.2}
            />
            <HowItWorksCard
              step={3}
              title="Test & Learn"
              description="Run tests to verify your solution and learn from the results."
              color="lime"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Popular Challenges Preview */}
      <section className="py-24 bg-gray-100 transform -skew-y-1">
        <div className="container max-w-7xl mx-auto px-4 transform skew-y-1">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Popular Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ChallengeTile title="Map Through Arrays" difficulty="beginner" tag="uses .map()" delay={0} />
            <ChallengeTile title="Filter Collections" difficulty="intermediate" tag="uses .filter()" delay={0.1} />
            <ChallengeTile title="Reduce to Values" difficulty="advanced" tag="uses .reduce()" delay={0.2} />
            <ChallengeTile title="Sort & Compare" difficulty="expert" tag="uses .sort()" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Floating Mini-CTA */}
      <div className="fixed bottom-6 right-6 z-30">
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center shadow-lg cursor-pointer"
          whileHover={{ scale: 1.1 }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Rocket className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      {/* Final Persuasion Banner */}
      <section className="min-h-[480px] bg-gradient-to-r from-teal-500 to-indigo-600 flex items-center justify-center">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-semibold text-white mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to build muscle memory?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              className="h-[72px] w-[320px] text-xl font-medium bg-white/90 backdrop-blur-xl text-gray-900 hover:bg-white/100 border border-white/20 rounded-full"
              whileHover={{
                boxShadow: "0 0 20px 0 rgba(0, 255, 255, 0.3)",
              }}
            >
              Start the Challenges
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-16 bg-black flex items-center justify-center">
        <div className="text-white/60 flex items-center gap-4">
          <span>© {new Date().getFullYear()}</span>
          <a href="#" className="hover:text-white/80 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white/80 transition-colors">
            Privacy
          </a>
        </div>
      </footer>
    </main>
  )
}

// Particle Background Component
function ParticleBackground() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
    </div>
  )
}
