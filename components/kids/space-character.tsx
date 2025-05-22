"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export default function SpaceCharacter() {
  const { t } = useLanguage()
  const [isTalking, setIsTalking] = useState(false)
  const [currentFact, setCurrentFact] = useState("")

  const facts = [
    t("sunFact"),
    t("mercuryFact"),
    t("venusFact"),
    t("earthFact"),
    t("marsFact"),
    t("jupiterFact"),
    t("saturnFact"),
    t("uranusFact"),
    t("neptuneFact"),
  ]

  const handleClick = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)]
    setCurrentFact(randomFact)
    setIsTalking(true)

    setTimeout(() => {
      setIsTalking(false)
    }, 3000)
  }

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="cursor-pointer"
      >
        <div className="relative w-48 h-48">
          {/* Astronaut character */}
          <div className="absolute inset-0 bg-blue-500 rounded-full overflow-hidden border-4 border-white">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-800 rounded-full">
              {/* Helmet visor */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-300 rounded-full"></div>
            </div>
            <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/4 bg-white rounded-full">{/* Oxygen tank */}</div>
            <div className="absolute top-1/6 right-1/6 w-1/6 h-1/6 bg-yellow-400 rounded-full animate-pulse">
              {/* Antenna light */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Speech bubble */}
      {isTalking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="mt-4 bg-white text-purple-800 p-4 rounded-xl relative max-w-xs"
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
          <p className="text-center font-bold">{currentFact}</p>
        </motion.div>
      )}

      {!isTalking && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-white text-center text-sm">
          {t("clickToLearn")}
        </motion.p>
      )}
    </div>
  )
}
