"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Download, Eraser, Palette } from "lucide-react"

const spaceImages = [
  {
    id: "rocket",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Rocket outline",
  },
  {
    id: "astronaut",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Astronaut outline",
  },
  {
    id: "planet",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Planet outline",
  },
]

const colors = [
  "#FF6B6B", // Red
  "#FF9E7D", // Orange
  "#FFDA77", // Yellow
  "#A0E7E5", // Light Blue
  "#B5EAD7", // Light Green
  "#C7CEEA", // Lavender
  "#E2F0CB", // Lime
  "#FFDAC1", // Peach
  "#FF9AA2", // Pink
  "#FFFFFF", // White
  "#000000", // Black
]

export default function SpaceColoring() {
  const { t } = useLanguage()
  const [selectedColor, setSelectedColor] = useState("#FF6B6B")
  const [selectedImage, setSelectedImage] = useState(spaceImages[0])
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)
  const [brushSize, setBrushSize] = useState(5)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Load the selected image as a template
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = selectedImage.src
    img.onload = () => {
      // Draw the image centered on the canvas
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
    }
  }, [selectedImage])

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    setIsDrawing(true)

    // Get canvas position
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Start drawing
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.strokeStyle = selectedColor
  }

  const draw = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Get canvas position
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Continue drawing
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Redraw the template
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = selectedImage.src
    img.onload = () => {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
    }
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const image = canvas.toDataURL("image/png")

    const link = document.createElement("a")
    link.href = image
    link.download = `space-coloring-${selectedImage.id}.png`
    link.click()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {spaceImages.map((image) => (
          <motion.button
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg ${selectedImage.id === image.id ? "bg-purple-700" : "bg-purple-900"}`}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-16 h-16 object-contain" />
          </motion.button>
        ))}
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-4 border-purple-700 rounded-lg cursor-crosshair bg-indigo-950"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />

        <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-2 flex-wrap">
          {colors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-8 h-8 rounded-full ${selectedColor === color ? "ring-4 ring-white" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full"
          onClick={clearCanvas}
        >
          <Eraser size={16} />
          {t("kids.clear")}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full"
          onClick={downloadImage}
        >
          <Download size={16} />
          {t("kids.download")}
        </motion.button>

        <div className="flex items-center gap-2">
          <Palette size={16} className="text-white" />
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
            className="accent-purple-500"
          />
        </div>
      </div>
    </div>
  )
}
