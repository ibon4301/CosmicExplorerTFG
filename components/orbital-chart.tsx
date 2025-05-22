"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface Planet {
  name: string
  distance: number
  color: string
}

interface OrbitalChartProps {
  planets: Planet[]
  highlightPlanet?: string
}

export default function OrbitalChart({ planets, highlightPlanet }: OrbitalChartProps) {
  const { language } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = 400
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Draw the orbital chart
    const drawOrbitalChart = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set center point
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw sun
      ctx.beginPath()
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2)
      ctx.fillStyle = "#FFD700"
      ctx.fill()

      // Find max distance to scale orbits
      const maxDistance = Math.max(...planets.map((p) => p.distance))
      const orbitScale = (Math.min(canvas.width, canvas.height) / 2 - 30) / maxDistance

      // Draw orbits and planets
      planets.forEach((planet) => {
        const orbitRadius = planet.distance * orbitScale

        // Draw orbit
        ctx.beginPath()
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.stroke()

        // Calculate planet position (random angle for demonstration)
        const angle = planet.name.charCodeAt(0) / 10 // Use first letter ASCII code for a consistent but different angle
        const planetX = centerX + orbitRadius * Math.cos(angle)
        const planetY = centerY + orbitRadius * Math.sin(angle)

        // Draw planet
        ctx.beginPath()
        const planetSize = planet.name === highlightPlanet ? 10 : 6
        ctx.arc(planetX, planetY, planetSize, 0, Math.PI * 2)
        ctx.fillStyle = planet.color

        // Highlight the selected planet
        if (planet.name === highlightPlanet) {
          ctx.shadowColor = planet.color
          ctx.shadowBlur = 15
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fill()
        ctx.shadowBlur = 0

        // Add planet name
        ctx.fillStyle = "#fff"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(planet.name, planetX, planetY - planetSize - 5)
      })
    }

    // Initial draw
    drawOrbitalChart()

    // Animation frame for potential future animations
    let animationFrameId: number

    const animate = () => {
      drawOrbitalChart()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [planets, highlightPlanet])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{language === "es" ? "Órbitas Planetarias" : "Planetary Orbits"}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Visualización de las órbitas de los planetas alrededor del Sol"
            : "Visualization of planet orbits around the Sun"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px]">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  )
}
