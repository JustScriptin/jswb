"use client"

import { useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { useLoading } from "@/hooks/use-loading"
import { useMediaQuery } from "@/app/hooks/use-media-query"

import Hero from "@/components/sections/hero"
import ValueStrip from "@/components/sections/value-strip"
import HowItWorks from "@/components/sections/how-it-works"
import PopularChallenges from "@/components/sections/popular-challenges"
import FinalCta from "@/components/sections/final-cta"
import LoadingScreen from "@/components/ui/loading-screen"
import NavigationBar from "@/components/ui/navigation-bar"
import FloatingCta from "@/components/ui/floating-cta"
import NoiseTexture from "@/components/ui/noise-texture"

/**
 * Home page component
 *
 * Serves as the main container for all landing page sections
 * and manages global state like loading and scroll progress
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isLoading, setIsLoading } = useLoading(1000)
  const { showNav, scrollProgress } = useScrollProgress()
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <main ref={containerRef} className="relative overflow-x-hidden bg-background">
      <NoiseTexture opacity={0.01} />

      {/* Loading Screen */}
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Navigation Bar */}
      <AnimatePresence>{showNav && <NavigationBar scrollProgress={scrollProgress} />}</AnimatePresence>

      {/* Main Content Sections */}
      <Hero />
      <ValueStrip />
      <HowItWorks />
      <PopularChallenges />
      <FinalCta />

      {/* Floating CTA Button */}
      <FloatingCta />
    </main>
  )
}
