"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export default function SpaceGame() {
  const { t } = useLanguage()
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const canvasRef = useRef(null)
  const [gameSize, setGameSize] = useState({ width: 300, height: 400 })

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 40, 600)
      const height = Math.min(400, width * 0.75)
      setGameSize({ width, height })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Game variables
    let rocketX = gameSize.width / 2
    const rocketY = gameSize.height - 50
    const rocketWidth = 30
    const rocketHeight = 40
    const rocketSpeed = 5
    let rightPressed = false
    let leftPressed = false

    // Stars
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push({
        x: Math.random() * gameSize.width,
        y: Math.random() * gameSize.height * 0.5,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
      })
    }

    // Handle keyboard controls
    const keyDownHandler = (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true
      }
    }

    const keyUpHandler = (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false
      }
    }

    document.addEventListener("keydown", keyDownHandler)
    document.addEventListener("keyup", keyUpHandler)

    // Touch controls
    const leftButton = document.getElementById("left-button")
    const rightButton = document.getElementById("right-button")

    if (leftButton) {
      leftButton.addEventListener("touchstart", () => {
        leftPressed = true
      })
      leftButton.addEventListener("touchend", () => {
        leftPressed = false
      })
      leftButton.addEventListener("mousedown", () => {
        leftPressed = true
      })
      leftButton.addEventListener("mouseup", () => {
        leftPressed = false
      })
    }

    if (rightButton) {
      rightButton.addEventListener("touchstart", () => {
        rightPressed = true
      })
      rightButton.addEventListener("touchend", () => {
        rightPressed = false
      })
      rightButton.addEventListener("mousedown", () => {
        rightPressed = true
      })
      rightButton.addEventListener("mouseup", () => {
        rightPressed = false
      })
    }

    // Draw functions
    function drawRocket() {
      ctx.fillStyle = "#FF6B6B"
      ctx.beginPath()
      ctx.moveTo(rocketX, rocketY)
      ctx.lineTo(rocketX - rocketWidth / 2, rocketY + rocketHeight)
      ctx.lineTo(rocketX + rocketWidth / 2, rocketY + rocketHeight)
      ctx.closePath()
      ctx.fill()

      // Rocket body
      ctx.fillStyle = "#4ECDC4"
      ctx.fillRect(rocketX - rocketWidth / 4, rocketY + rocketHeight / 2, rocketWidth / 2, rocketHeight / 2)

      // Rocket flames
      ctx.fillStyle = "#FFD166"
      ctx.beginPath()
      ctx.moveTo(rocketX - rocketWidth / 4, rocketY + rocketHeight)
      ctx.lineTo(rocketX, rocketY + rocketHeight + 10 + Math.random() * 5)
      ctx.lineTo(rocketX + rocketWidth / 4, rocketY + rocketHeight)
      ctx.closePath()
      ctx.fill()
    }

    function drawStars() {
      stars.forEach((star) => {
        ctx.fillStyle = "#FFD700"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2)
        ctx.fill()

        // Move star down
        star.y += star.speed

        // Reset star if it goes off screen
        if (star.y > gameSize.height) {
          star.y = -star.size
          star.x = Math.random() * gameSize.width
        }

        // Check collision with rocket
        const dx = star.x - rocketX
        const dy = star.y - rocketY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < star.size / 2 + rocketWidth / 2) {
          // Collision detected
          setScore((prevScore) => prevScore + 1)
          star.y = -star.size
          star.x = Math.random() * gameSize.width
        }
      })
    }

    function drawScore() {
      ctx.font = "20px Arial"
      ctx.fillStyle = "#FFFFFF"
      ctx.fillText(`${t("score")}: ${score}`, 10, 30)
    }

    // Game loop
    function gameLoop() {
      if (!gameStarted) return

      // Clear canvas
      ctx.clearRect(0, 0, gameSize.width, gameSize.height)

      // Draw space background
      ctx.fillStyle = "#0A0E29"
      ctx.fillRect(0, 0, gameSize.width, gameSize.height)

      // Move rocket
      if (rightPressed && rocketX < gameSize.width - rocketWidth / 2) {
        rocketX += rocketSpeed
      } else if (leftPressed && rocketX > rocketWidth / 2) {
        rocketX -= rocketSpeed
      }

      drawStars()
      drawRocket()
      drawScore()

      requestAnimationFrame(gameLoop)
    }

    gameLoop()

    // Cleanup
    return () => {
      document.removeEventListener("keydown", keyDownHandler)
      document.removeEventListener("keyup", keyUpHandler)

      if (leftButton) {
        leftButton.removeEventListener("touchstart", () => {
          leftPressed = true
        })
        leftButton.removeEventListener("touchend", () => {
          leftPressed = false
        })
        leftButton.removeEventListener("mousedown", () => {
          leftPressed = true
        })
        leftButton.removeEventListener("mouseup", () => {
          leftPressed = false
        })
      }

      if (rightButton) {
        rightButton.removeEventListener("touchstart", () => {
          rightPressed = true
        })
        rightButton.removeEventListener("touchend", () => {
          rightPressed = false
        })
        rightButton.removeEventListener("mousedown", () => {
          rightPressed = true
        })
        rightButton.removeEventListener("mouseup", () => {
          rightPressed = false
        })
      }
    }
  }, [gameStarted, gameSize, score, t])

  return (
    <div className="flex flex-col items-center">
      {!gameStarted ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setGameStarted(true)}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl font-bold py-3 px-6 rounded-full shadow-lg"
        >
          {t("startGame")}
        </motion.button>
      ) : (
        <div className="relative">
          <canvas ref={canvasRef} width={gameSize.width} height={gameSize.height} className="rounded-lg shadow-lg" />

          {/* Touch controls */}
          <div className="flex justify-between w-full mt-4">
            <button id="left-button" className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
              ←
            </button>
            <button id="right-button" className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
