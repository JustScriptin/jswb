"use client"

import { memo } from "react"

interface ParticleBackgroundProps {
  count?: number
  opacity?: number
}

/**
 * Particle Background component
 *
 * Creates a starry background effect
 */
const ParticleBackground = memo(function ParticleBackground({ count = 50, opacity = 0.02 }: ParticleBackgroundProps) {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
        />
      ))}
    </div>
  )
})

export default ParticleBackground
