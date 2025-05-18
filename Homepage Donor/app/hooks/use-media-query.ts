"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook for responsive design
 *
 * Returns whether the current viewport matches the provided media query
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Set initial value
    const media = window.matchMedia(query)
    setMatches(media.matches)

    // Set up listener for changes
    const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)

    return () => window.removeEventListener("resize", listener)
  }, [query])

  return matches
}
