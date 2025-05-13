"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

const rocketParts = {
  nose: [
    { id: "nose1", src: "/placeholder.svg?height=100&width=100", alt: "Pointy nose" },
    { id: "nose2", src: "/placeholder.svg?height=100&width=100", alt: "Round nose" },
    { id: "nose3", src: "/placeholder.svg?height=100&width=100", alt: "Flat nose" },
  ],
  body: [
    { id: "body1", src: "/placeholder.svg?height=150&width=100", alt: "Slim body" },
    { id: "body2", src: "/placeholder.svg?height=150&width=100", alt: "Wide body" },
    { id: "body3", src: "/placeholder.svg?height=150&width=100", alt: "Striped body" },
  ],
  fins: [
    { id: "fins1", src: "/placeholder.svg?height=100&width=150", alt: "Small fins" },
    { id: "fins2", src: "/placeholder.svg?height=100&width=150", alt: "Large fins" },
    { id: "fins3", src: "/placeholder.svg?height=100&width=150", alt: "Triangle fins" },
  ],
  engines: [
    { id: "engines1", src: "/placeholder.svg?height=100&width=100", alt: "Single engine" },
    { id: "engines2", src: "/placeholder.svg?height=100&width=100", alt: "Double engines" },
    { id: "engines3", src: "/placeholder.svg?height=100&width=100", alt: "Triple engines" },
  ],
}

const rocketColors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#FFE66D", // Yellow
  "#6A0572", // Purple
  "#FF9E7D", // Orange
  "#1A535C", // Dark Teal
]

export default function BuildRocket() {
  const { t } = useLanguage()
  const [selectedParts, setSelectedParts] = useState({
    nose: rocketParts.nose[0],
    body: rocketParts.body[0],
    fins: rocketParts.fins[0],
    engines: rocketParts.engines[0],
  })
  const [rocketColor, setRocketColor] = useState(rocketColors[0])
  const [rocketName, setRocketName] = useState("")
  const [isLaunching, setIsLaunching] = useState(false)

  const selectPart = (category, part) => {
    setSelectedParts({
      ...selectedParts,
      [category]: part,
    })
  }

  const launchRocket = () => {
    setIsLaunching(true)
    setTimeout(() => {
      setIsLaunching(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 relative">
        <motion.div
          className="relative"
          animate={isLaunching ? { y: [-10, -300], opacity: [1, 0] } : { y: [-10, 0, -10], opacity: 1 }}
          transition={
            isLaunching
              ? { duration: 2, ease: "easeOut" }
              : {
                  y: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                  opacity: { duration: 0 },
                }
          }
        >
          {/* Rocket assembly */}
          <div className="flex flex-col items-center" style={{ filter: `drop-shadow(0 0 10px ${rocketColor})` }}>
            <img
              src={selectedParts.nose.src || "/placeholder.svg"}
              alt={selectedParts.nose.alt}
              className="w-20 h-20 object-contain"
              style={{ filter: `hue-rotate(${rocketColors.indexOf(rocketColor) * 60}deg)` }}
            />
            <img
              src={selectedParts.body.src || "/placeholder.svg"}
              alt={selectedParts.body.alt}
              className="w-20 h-32 object-contain"
              style={{ filter: `hue-rotate(${rocketColors.indexOf(rocketColor) * 60}deg)` }}
            />
            <div className="relative">
              <img
                src={selectedParts.fins.src || "/placeholder.svg"}
                alt={selectedParts.fins.alt}
                className="w-40 h-20 object-contain"
                style={{ filter: `hue-rotate(${rocketColors.indexOf(rocketColor) * 60}deg)` }}
              />
              <img
                src={selectedParts.engines.src || "/placeholder.svg"}
                alt={selectedParts.engines.alt}
                className="w-20 h-20 object-contain absolute top-0 left-1/2 transform -translate-x-1/2"
                style={{ filter: `hue-rotate(${rocketColors.indexOf(rocketColor) * 60}deg)` }}
              />
            </div>
          </div>

          {/* Rocket flames when launching */}
          {isLaunching && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              initial={{ height: 0 }}
              animate={{ height: [0, 100, 50, 80, 60] }}
              transition={{ duration: 2, times: [0, 0.2, 0.4, 0.6, 1] }}
            >
              <div className="w-10 h-full bg-gradient-to-t from-yellow-500 via-orange-500 to-transparent rounded-b-full" />
            </motion.div>
          )}
        </motion.div>

        {/* Launch platform */}
        <div className="w-60 h-4 bg-gray-700 rounded-lg absolute bottom-0 left-1/2 transform -translate-x-1/2" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-2">{t("kids.rocketParts")}</h3>

          <div className="space-y-4">
            {Object.entries(rocketParts).map(([category, parts]) => (
              <div key={category} className="bg-indigo-900 p-2 rounded-lg">
                <h4 className="text-sm font-bold text-white mb-2 capitalize">{category}</h4>
                <div className="flex gap-2">
                  {parts.map((part) => (
                    <motion.button
                      key={part.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-1 rounded ${selectedParts[category].id === part.id ? "bg-indigo-600" : "bg-indigo-800"}`}
                      onClick={() => selectPart(category, part)}
                    >
                      <img src={part.src || "/placeholder.svg"} alt={part.alt} className="w-10 h-10 object-contain" />
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-2">{t("kids.rocketColor")}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {rocketColors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-8 h-8 rounded-full ${rocketColor === color ? "ring-2 ring-white" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setRocketColor(color)}
              />
            ))}
          </div>

          <h3 className="text-lg font-bold text-purple-300 mb-2">{t("kids.nameYourRocket")}</h3>
          <input
            type="text"
            value={rocketName}
            onChange={(e) => setRocketName(e.target.value)}
            placeholder={t("kids.rocketNamePlaceholder")}
            className="w-full p-2 rounded-lg bg-indigo-900 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={20}
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full text-lg font-bold"
        onClick={launchRocket}
        disabled={isLaunching}
      >
        {isLaunching ? t("kids.launching") : t("kids.launchRocket")}
      </motion.button>

      {rocketName && (
        <p className="mt-4 text-lg text-center text-white">{t("kids.rocketNameDisplay", { name: rocketName })}</p>
      )}
    </div>
  )
}
