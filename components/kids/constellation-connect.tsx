"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

const constellations = [
  {
    id: "bigDipper",
    name: {
      en: "Big Dipper",
      es: "Osa Mayor",
    },
    stars: [
      { x: 50, y: 50 },
      { x: 100, y: 60 },
      { x: 150, y: 70 },
      { x: 200, y: 90 },
      { x: 220, y: 140 },
      { x: 180, y: 180 },
      { x: 130, y: 160 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  {
    id: "orion",
    name: {
      en: "Orion",
      es: "Orión",
    },
    stars: [
      { x: 150, y: 30 },
      { x: 180, y: 70 },
      { x: 120, y: 70 },
      { x: 150, y: 100 },
      { x: 100, y: 150 },
      { x: 200, y: 150 },
      { x: 80, y: 200 },
      { x: 220, y: 200 },
    ],
    connections: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 6],
      [5, 7],
    ],
  },
  {
    id: "cassiopeia",
    name: {
      en: "Cassiopeia",
      es: "Casiopea",
    },
    stars: [
      { x: 50, y: 100 },
      { x: 100, y: 50 },
      { x: 150, y: 70 },
      { x: 200, y: 50 },
      { x: 250, y: 100 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
]

export default function ConstellationConnect() {
  const { t, language } = useLanguage()
  const [currentConstellation, setCurrentConstellation] = useState(constellations[0])
  const [userConnections, setUserConnections] = useState([])
  const [selectedStar, setSelectedStar] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const canvasRef = useRef(null)

  // Reset game when constellation changes
  useEffect(() => {
    setUserConnections([])
    setSelectedStar(null)
    setCompleted(false)
    setShowHint(false)
  }, [currentConstellation])

  // Draw the constellation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw starry background
    ctx.fillStyle = "#0a0a2a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw small background stars
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 1.5

      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw constellation stars
    currentConstellation.stars.forEach((star, index) => {
      // Glow effect
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 15)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(star.x, star.y, 15, 0, Math.PI * 2)
      ctx.fill()

      // Star
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(star.x, star.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw user connections
    ctx.strokeStyle = "#4da6ff"
    ctx.lineWidth = 2

    userConnections.forEach(([starA, starB]) => {
      const a = currentConstellation.stars[starA]
      const b = currentConstellation.stars[starB]

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    })

    // Draw hint connections if showHint is true
    if (showHint) {
      ctx.strokeStyle = "rgba(255, 215, 0, 0.5)" // Gold color with transparency
      ctx.lineWidth = 3

      currentConstellation.connections.forEach(([starA, starB]) => {
        const a = currentConstellation.stars[starA]
        const b = currentConstellation.stars[starB]

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      })
    }

    // Draw line from selected star to cursor if any
    if (selectedStar !== null) {
      const star = currentConstellation.stars[selectedStar]

      ctx.strokeStyle = "#4da6ff"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])

      ctx.beginPath()
      ctx.moveTo(star.x, star.y)
      ctx.lineTo(canvas.mouseX || star.x, canvas.mouseY || star.y)
      ctx.stroke()

      ctx.setLineDash([])
    }

    // Check if completed
    const isCompleted = currentConstellation.connections.every((connection) =>
      userConnections.some(
        (userConn) =>
          (userConn[0] === connection[0] && userConn[1] === connection[1]) ||
          (userConn[0] === connection[1] && userConn[1] === connection[0]),
      ),
    )

    if (isCompleted && userConnections.length === currentConstellation.connections.length) {
      setCompleted(true)
    }
  }, [currentConstellation, userConnections, selectedStar, showHint])

  const handleCanvasClick = (e) => {
    if (completed) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find if clicked on a star
    const clickedStarIndex = currentConstellation.stars.findIndex(
      (star) => Math.sqrt(Math.pow(star.x - x, 2) + Math.pow(star.y - y, 2)) < 15,
    )

    if (clickedStarIndex !== -1) {
      if (selectedStar === null) {
        // First star selected
        setSelectedStar(clickedStarIndex)
      } else if (selectedStar !== clickedStarIndex) {
        // Second star selected, create connection
        const newConnection = [selectedStar, clickedStarIndex].sort((a, b) => a - b)

        // Check if connection already exists
        const connectionExists = userConnections.some(
          (conn) => conn[0] === newConnection[0] && conn[1] === newConnection[1],
        )

        if (!connectionExists) {
          setUserConnections([...userConnections, newConnection])
        }

        setSelectedStar(null)
      }
    } else {
      // Clicked on empty space, deselect
      setSelectedStar(null)
    }
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    canvas.mouseX = e.clientX - rect.left
    canvas.mouseY = e.clientY - rect.top
  }

  const resetConstellation = () => {
    setUserConnections([])
    setSelectedStar(null)
    setCompleted(false)
    setShowHint(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {constellations.map((constellation) => (
          <motion.button
            key={constellation.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg ${currentConstellation.id === constellation.id ? "bg-indigo-600" : "bg-indigo-800"}`}
            onClick={() => setCurrentConstellation(constellation)}
          >
            {language === "en" ? constellation.name.en : constellation.name.es}
          </motion.button>
        ))}
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="border-4 border-indigo-700 rounded-lg cursor-pointer"
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
        />

        {completed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-indigo-800 p-4 rounded-lg text-center"
            >
              <h3 className="text-xl font-bold text-yellow-300 mb-2">{t("kids.constellationComplete")}</h3>
              <p className="text-white mb-4">
                {language === "en" ? currentConstellation.name.en : currentConstellation.name.es}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full"
                onClick={resetConstellation}
              >
                {t("kids.tryAnother")}
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full"
          onClick={() => setShowHint(!showHint)}
        >
          {showHint ? t("kids.hideHint") : t("kids.showHint")}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white px-4 py-2 rounded-full"
          onClick={resetConstellation}
        >
          {t("kids.reset")}
        </motion.button>
      </div>

      <p className="mt-4 text-center text-white">{t("kids.constellationsInstructions")}</p>
    </div>
  )
}
