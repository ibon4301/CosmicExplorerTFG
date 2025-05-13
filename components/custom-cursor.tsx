"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; opacity: number; life: number }[]>(
    [],
  )

  useEffect(() => {
    const addParticle = (x: number, y: number) => {
      const newParticle = {
        x,
        y,
        size: Math.random() * 3 + 1,
        opacity: 1,
        life: 20,
      }

      setParticles((prev) => [...prev, newParticle])
    }

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            life: particle.life - 1,
            opacity: particle.life / 20,
          }))
          .filter((particle) => particle.life > 0),
      )
    }

    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)

      // Add particles occasionally when moving
      if (Math.random() > 0.85) {
        addParticle(e.clientX, e.clientY)
      }
    }

    const mDown = () => {
      setClicked(true)

      // Add burst of particles on click
      for (let i = 0; i < 8; i++) {
        const angle = ((Math.PI * 2) / 8) * i
        const distance = 10
        addParticle(position.x + Math.cos(angle) * distance, position.y + Math.sin(angle) * distance)
      }
    }

    const mUp = () => {
      setClicked(false)
    }

    const mLeave = () => {
      setHidden(true)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    const particleInterval = setInterval(updateParticles, 50)

    handleLinkHoverEvents()
    document.addEventListener("mousemove", mMove)
    document.addEventListener("mousedown", mDown)
    document.addEventListener("mouseup", mUp)
    document.addEventListener("mouseleave", mLeave)

    return () => {
      document.removeEventListener("mousemove", mMove)
      document.removeEventListener("mousedown", mDown)
      document.removeEventListener("mouseup", mUp)
      document.removeEventListener("mouseleave", mLeave)
      clearInterval(particleInterval)

      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", () => setLinkHovered(true))
        el.removeEventListener("mouseleave", () => setLinkHovered(false))
      })
    }
  }, [position])

  return (
    <>
      {/* Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={`p-${i}`}
          className="fixed rounded-full bg-blue-400 pointer-events-none z-50"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className={`fixed rounded-full pointer-events-none z-50 mix-blend-difference ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{
          left: position.x - (clicked ? 16 : linkHovered ? 24 : 8),
          top: position.y - (clicked ? 16 : linkHovered ? 24 : 8),
          width: clicked ? 32 : linkHovered ? 48 : 16,
          height: clicked ? 32 : linkHovered ? 48 : 16,
          backgroundColor: "#fff",
          transition: "width 0.2s, height 0.2s, left 0.2s, top 0.2s, opacity 0.2s",
        }}
      />

      {/* Outer ring */}
      <motion.div
        className={`fixed rounded-full border-2 border-white pointer-events-none z-50 ${hidden ? "opacity-0" : "opacity-60"}`}
        style={{
          left: position.x - 32,
          top: position.y - 32,
          width: 64,
          height: 64,
          transition: "opacity 0.2s",
        }}
        animate={{
          scale: clicked ? 0.5 : linkHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
