"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface SpaceFact {
  id: number
  fact: {
    en: string
    es: string
  }
  source: string
  category: string
}

export default function SpaceFacts() {
  const { language } = useLanguage()
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [facts, setFacts] = useState<SpaceFact[]>([])
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Space facts data
  useEffect(() => {
    const spaceFacts: SpaceFact[] = [
      {
        id: 1,
        fact: {
          en: "If you could fold a piece of paper 42 times, it would reach the moon.",
          es: "Si pudieras doblar un papel 42 veces, llegaría hasta la luna.",
        },
        source: "NASA",
        category: "general",
      },
      {
        id: 2,
        fact: {
          en: "A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once on its axis, but only 225 Earth days to orbit the Sun.",
          es: "Un día en Venus es más largo que un año en Venus. Tarda 243 días terrestres en rotar una vez sobre su eje, pero solo 225 días terrestres en orbitar el Sol.",
        },
        source: "ESA",
        category: "planets",
      },
      {
        id: 3,
        fact: {
          en: "The footprints on the Moon will be there for at least 100 million years since there is no wind or water to erode them.",
          es: "Las huellas en la Luna permanecerán allí durante al menos 100 millones de años, ya que no hay viento ni agua que las erosione.",
        },
        source: "NASA",
        category: "moon",
      },
      {
        id: 4,
        fact: {
          en: "The largest known star, UY Scuti, is so big that if it replaced our Sun, its outer edge would reach beyond Jupiter's orbit.",
          es: "La estrella conocida más grande, UY Scuti, es tan grande que si reemplazara a nuestro Sol, su borde exterior llegaría más allá de la órbita de Júpiter.",
        },
        source: "ESO",
        category: "stars",
      },
      {
        id: 5,
        fact: {
          en: "There are more stars in the universe than grains of sand on all the beaches on Earth.",
          es: "Hay más estrellas en el universo que granos de arena en todas las playas de la Tierra.",
        },
        source: "Hubble",
        category: "universe",
      },
      {
        id: 6,
        fact: {
          en: "The Milky Way galaxy is moving through space at a rate of 2.1 million kilometers per hour.",
          es: "La galaxia Vía Láctea se mueve por el espacio a una velocidad de 2,1 millones de kilómetros por hora.",
        },
        source: "NASA",
        category: "galaxies",
      },
      {
        id: 7,
        fact: {
          en: "If you were to scream in space, no one would hear you because there is no medium for sound waves to travel through.",
          es: "Si gritaras en el espacio, nadie te escucharía porque no hay medio para que las ondas sonoras viajen.",
        },
        source: "ESA",
        category: "physics",
      },
    ]
    setFacts(spaceFacts)
  }, [])

  // Auto-rotate facts
  useEffect(() => {
    if (!isAutoPlaying || facts.length === 0) return

    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, facts.length])

  // Pause auto-rotation when user interacts
  const handleNavigation = (direction: "prev" | "next") => {
    setIsAutoPlaying(false)

    if (direction === "prev") {
      setCurrentFactIndex((prevIndex) => (prevIndex - 1 + facts.length) % facts.length)
    } else {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length)
    }

    // Resume auto-rotation after 30 seconds of inactivity
    const timer = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 30000)

    return () => clearTimeout(timer)
  }

  if (facts.length === 0) return null

  const currentFact = facts[currentFactIndex]

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with animated stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-blue-950/20 -z-10">
        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {language === "en" ? "Did You Know?" : "¿Sabías que?"}
          </motion.h2>
          <motion.p
            className="text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {language === "en"
              ? "Fascinating facts about space that will blow your mind"
              : "Datos fascinantes sobre el espacio que te sorprenderán"}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-blue-900/30">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl -mt-2 -ml-2" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-500/50 rounded-br-2xl -mb-2 -mr-2" />

            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => handleNavigation("prev")}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-900/30 hover:bg-blue-800 transition-colors text-white"
                aria-label="Previous fact"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex space-x-1">
                {facts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFactIndex ? "bg-blue-500 w-4" : "bg-blue-900/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleNavigation("next")}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-900/30 hover:bg-blue-800 transition-colors text-white"
                aria-label="Next fact"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="min-h-[200px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFactIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <Star className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>

                  <p className="text-xl md:text-2xl text-white mb-6 leading-relaxed">
                    {currentFact.fact[language as "en" | "es"]}
                  </p>

                  <div className="text-sm text-blue-400">
                    {language === "en" ? "Source" : "Fuente"}: {currentFact.source}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
