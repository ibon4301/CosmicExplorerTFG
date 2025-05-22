"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface GlassmorphismCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export default function GlassmorphismCard({ children, className = "", hoverEffect = true }: GlassmorphismCardProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              transition: { duration: 0.3 },
            }
          : {}
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 h-full transition-all duration-300">
        {children}
      </div>
    </motion.div>
  )
}
