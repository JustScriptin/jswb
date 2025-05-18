"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      // Check if the element or its parents have cursor:pointer
      let el = e.target as HTMLElement
      while (el) {
        if (el.tagName === "BUTTON" || el.tagName === "A" || window.getComputedStyle(el).cursor === "pointer") {
          setIsHovering(true)
          return
        }
        el = el.parentElement as HTMLElement
        if (!el) break
      }
      setIsHovering(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(0, 255, 255, 0.2)",
      border: "1px solid rgba(0, 255, 255, 0.5)",
      scale: 1.2,
    },
  }

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"], [type="button"], [type="submit"], [type="reset"] {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
    </>
  )
}
