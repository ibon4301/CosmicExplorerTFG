"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

const planets = [
  {
    id: "sun",
    name: "Sun",
    nameEs: "Sol",
    color: "bg-yellow-500",
    size: "w-24 h-24",
    orbit: "0",
  },
  {
    id: "mercury",
    name: "Mercury",
    nameEs: "Mercurio",
    color: "bg-gray-400",
    size: "w-8 h-8",
    orbit: "150px",
  },
  {
    id: "venus",
    name: "Venus",
    nameEs: "Venus",
    color: "bg-yellow-600",
    size: "w-10 h-10",
    orbit: "180px",
  },
  {
    id: "earth",
    name: "Earth",
    nameEs: "Tierra",
    color: "bg-blue-500",
    size: "w-12 h-12",
    orbit: "220px",
  },
  {
    id: "mars",
    name: "Mars",
    nameEs: "Marte",
    color: "bg-red-500",
    size: "w-10 h-10",
    orbit: "260px",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    nameEs: "Júpiter",
    color: "bg-orange-300",
    size: "w-16 h-16",
    orbit: "320px",
  },
  {
    id: "saturn",
    name: "Saturn",
    nameEs: "Saturno",
    color: "bg-yellow-200",
    size: "w-14 h-14",
    orbit: "380px",
    hasRings: true,
  },
  {
    id: "uranus",
    name: "Uranus",
    nameEs: "Urano",
    color: "bg-teal-300",
    size: "w-12 h-12",
    orbit: "430px",
  },
  {
    id: "neptune",
    name: "Neptune",
    nameEs: "Neptuno",
    color: "bg-blue-600",
    size: "w-12 h-12",
    orbit: "480px",
  },
]

export default function InteractiveSolarSystem() {
  const { t, language } = useLanguage()
  const [selectedPlanet, setSelectedPlanet] = useState(null)

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet)
    setTimeout(() => {
      setSelectedPlanet(null)
    }, 3000)
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-b from-black to-indigo-900 rounded-3xl">
      <div className="absolute inset-0">
        {/* Stars background */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Solar System */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {planets.map((planet) => (
          <div
            key={planet.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: planet.orbit === "0" ? "auto" : planet.orbit,
              height: planet.orbit === "0" ? "auto" : planet.orbit,
              animation:
                planet.orbit !== "0" ? `orbit ${10 + Number.parseInt(planet.orbit) / 30}s linear infinite` : "none",
            }}
          >
            <motion.div
              className={`absolute ${planet.size} rounded-full ${planet.color} flex items-center justify-center cursor-pointer`}
              style={{
                left: planet.orbit === "0" ? "50%" : "100%",
                top: "50%",
                transform: planet.orbit === "0" ? "translate(-50%, -50%)" : "translate(-50%, -50%)",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePlanetClick(planet)}
            >
              {planet.hasRings && (
                <div className="absolute w-[200%] h-[40%] bg-yellow-100 opacity-50 rounded-full -z-10 rotate-12"></div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Planet Info Popup */}
      {selectedPlanet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 p-4 rounded-xl shadow-lg max-w-xs"
        >
          <h3 className="text-xl font-bold text-purple-800">
            {language === "en" ? selectedPlanet.name : selectedPlanet.nameEs}
          </h3>
          <p className="text-purple-700">{t(`${selectedPlanet.id}Fact`)}</p>
        </motion.div>
      )}

      <style jsx global>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
