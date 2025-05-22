"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import LanguageSelector from "@/components/language-selector"

interface WelcomeScreenProps {
  onStart: () => void
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  connections: number[]
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)

  // Inicializar partículas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initParticles()
      }
    }

    // Inicializar partículas
    const initParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          connections: [],
        })
      }

      particlesRef.current = particles
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Manejar movimiento del mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Limpiar event listeners
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Animar partículas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar partículas
      const particles = particlesRef.current
      const mouseInfluenceRadius = 100
      const connectionDistance = 150

      // Resetear conexiones
      particles.forEach((particle) => {
        particle.connections = []
      })

      // Actualizar posiciones y encontrar conexiones
      particles.forEach((particle, index) => {
        // Mover partículas
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Influencia del mouse
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseInfluenceRadius) {
          const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius
          particle.speedX -= (dx / distance) * force * 0.2
          particle.speedY -= (dy / distance) * force * 0.2
        }

        // Limitar velocidad
        const maxSpeed = 1.5
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
        if (speed > maxSpeed) {
          particle.speedX = (particle.speedX / speed) * maxSpeed
          particle.speedY = (particle.speedY / speed) * maxSpeed
        }

        // Encontrar conexiones
        for (let j = index + 1; j < particles.length; j++) {
          const otherParticle = particles[j]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            particle.connections.push(j)
            otherParticle.connections.push(index)
          }
        }
      })

      // Dibujar conexiones
      ctx.strokeStyle = "rgba(100, 149, 237, 0.3)"
      ctx.lineWidth = 0.5

      particles.forEach((particle, index) => {
        particle.connections.forEach((connectedIndex) => {
          if (connectedIndex > index) {
            // Evitar dibujar la misma conexión dos veces
            const connectedParticle = particles[connectedIndex]
            const dx = particle.x - connectedParticle.x
            const dy = particle.y - connectedParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Opacidad basada en la distancia
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(100, 149, 237, ${opacity * 0.5})`

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(connectedParticle.x, connectedParticle.y)
            ctx.stroke()
          }
        })
      })

      // Dibujar partículas
      particles.forEach((particle) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mousePosition])

  const handleStartClick = () => {
    setIsTransitioning(true)
    setTimeout(onStart, 1000) // Esperar 1 segundo para la transición
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Canvas para la animación de constelaciones */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Overlay de transición */}
      <div
        className={`absolute inset-0 z-20 bg-black transition-opacity duration-1000 ${
          isTransitioning ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Contenido */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>

        <div className="flex flex-col items-center text-center">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl font-space">
            <span className="text-blue-400">Cosmic</span> Explorer
          </h1>
          <p className="mb-8 max-w-md text-xl text-zinc-300">{t("welcome.subtitle")}</p>

          <button
            onClick={handleStartClick}
            className="group relative inline-flex h-12 overflow-hidden rounded-lg bg-blue-600 px-8 py-3 font-space font-medium text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="absolute -end-full top-1/2 h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-full bg-white opacity-10 transition-all duration-500 group-hover:translate-x-0"></span>
            <span className="relative">{t("welcome.startButton") || "Begin Exploration"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
