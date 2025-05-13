"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  targetX: number
  targetY: number
}

interface InteractiveStarsBackgroundProps {
  className?: string
  starCount?: number
  maxSpeed?: number
  interactionDistance?: number
  interactionStrength?: number
}

export default function InteractiveStarsBackground({
  className = "",
  starCount = 150,
  maxSpeed = 0.5,
  interactionDistance = 100,
  interactionStrength = 30,
}: InteractiveStarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)
  const isInitializedRef = useRef(false)

  // Initialize stars
  useEffect(() => {
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Initialize stars
      starsRef.current = Array.from({ length: starCount }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        speed: Math.random() * maxSpeed + 0.1,
        targetX: 0,
        targetY: 0,
      }))
    }

    // Set initial size
    handleResize()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    })

    canvas.addEventListener("mouseleave", () => {
      mouseRef.current = { x: -1000, y: -1000 }
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [starCount, maxSpeed])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - star.x
        const dy = mouseRef.current.y - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Apply mouse interaction
        if (distance < interactionDistance) {
          const force = (interactionDistance - distance) / interactionDistance
          star.targetX = dx * force * -interactionStrength * 0.01
          star.targetY = dy * force * -interactionStrength * 0.01
        } else {
          // Gradually reset to no movement
          star.targetX *= 0.95
          star.targetY *= 0.95
        }

        // Update position
        star.x += star.targetX
        star.y += star.targetY

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [interactionDistance, interactionStrength])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  )
}
