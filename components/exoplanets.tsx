"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useState } from "react"
import { FaSearch, FaTimes } from "react-icons/fa"

export default function Exoplanets() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlanet, setSelectedPlanet] = useState<Exoplanet | null>(null)

  // ... resto del código del componente ...

  return (
    <div className="w-full overflow-x-hidden">
      <div className="py-12 px-2 sm:px-4 lg:px-8 max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-300 mb-6">{content[language].subtitle}</p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            {content[language].description}
          </p>
        </motion.div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder={content[language].searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExoplanets.map((planet) => (
            <motion.div
              key={planet.id}
              variants={itemVariants}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => setSelectedPlanet(planet)}
            >
              <div className="aspect-video relative">
                <img
                  src={planet.image}
                  alt={planet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  {planet.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4">{planet.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">{content[language].distance}:</span>
                    <p className="text-white">{planet.distance} {content[language].lightYears}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">{content[language].size}:</span>
                    <p className="text-white">{planet.size} {content[language].earthMasses}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredExoplanets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-12"
          >
            {content[language].noResults}
          </motion.div>
        )}

        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlanet(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 rounded-xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video relative">
                <img
                  src={selectedPlanet.image}
                  alt={selectedPlanet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {selectedPlanet.name}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6">{selectedPlanet.description}</p>
                <h4 className="text-xl font-semibold mb-4">{content[language].characteristics}</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-gray-400 block mb-1">{content[language].distance}</span>
                    <p className="text-white text-lg">{selectedPlanet.distance} {content[language].lightYears}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">{content[language].size}</span>
                    <p className="text-white text-lg">{selectedPlanet.size} {content[language].earthMasses}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">{content[language].temperature}</span>
                    <p className="text-white text-lg">{selectedPlanet.temperature} {content[language].kelvin}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">{content[language].discovery}</span>
                    <p className="text-white text-lg">{selectedPlanet.discoveryYear}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {content[language].close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 