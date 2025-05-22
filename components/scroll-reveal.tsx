"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `start ${1 - threshold}`],
  })

  // Define initial and animate values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 }
      case "down":
        return { y: -50, opacity: 0 }
      case "left":
        return { x: 50, opacity: 0 }
      case "right":
        return { x: -50, opacity: 0 }
      default:
        return { y: 50, opacity: 0 }
    }
  }

  const getFinalValues = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 }
      case "left":
      case "right":
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [50, 0] : direction === "right" ? [-50, 0] : [0, 0],
  )
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [50, 0] : direction === "down" ? [-50, 0] : [0, 0],
  )

  return (
    <motion.div
      ref={ref}
      initial={getInitialValues()}
      animate={scrollYProgress.get() > 0 ? getFinalValues() : getInitialValues()}
      transition={{ duration, delay }}
      style={{ opacity, x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
