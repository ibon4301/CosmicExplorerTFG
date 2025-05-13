"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"

interface AstronomicalEvent {
  id: number
  title: {
    en: string
    es: string
  }
  date: string
  time?: string
  description: {
    en: string
    es: string
  }
  type: "meteor" | "eclipse" | "planet" | "moon" | "other"
  visibility: {
    en: string
    es: string
  }
}

export default function UpcomingEvents() {
  const { language } = useLanguage()

  // Sample astronomical events data
  const events: AstronomicalEvent[] = [
    {
      id: 1,
      title: {
        en: "Perseid Meteor Shower",
        es: "Lluvia de Meteoros Perseidas",
      },
      date: "2023-08-12",
      time: "22:00-04:00",
      description: {
        en: "One of the most popular meteor showers, producing up to 60 meteors per hour at its peak.",
        es: "Una de las lluvias de meteoros más populares, produciendo hasta 60 meteoros por hora en su pico.",
      },
      type: "meteor",
      visibility: {
        en: "Best viewed from Northern Hemisphere",
        es: "Mejor visto desde el Hemisferio Norte",
      },
    },
    {
      id: 2,
      title: {
        en: "Total Solar Eclipse",
        es: "Eclipse Solar Total",
      },
      date: "2023-10-14",
      time: "15:30-18:45",
      description: {
        en: "A total solar eclipse visible from parts of North America, with partial visibility in South America.",
        es: "Un eclipse solar total visible desde partes de América del Norte, con visibilidad parcial en América del Sur.",
      },
      type: "eclipse",
      visibility: {
        en: "North and South America",
        es: "América del Norte y del Sur",
      },
    },
    {
      id: 3,
      title: {
        en: "Mars at Opposition",
        es: "Marte en Oposición",
      },
      date: "2023-12-08",
      description: {
        en: "Mars will be at its closest approach to Earth, making it appear brighter than usual.",
        es: "Marte estará en su aproximación más cercana a la Tierra, haciéndolo aparecer más brillante de lo habitual.",
      },
      type: "planet",
      visibility: {
        en: "Visible throughout the night worldwide",
        es: "Visible durante toda la noche en todo el mundo",
      },
    },
    {
      id: 4,
      title: {
        en: "Super Blue Moon",
        es: "Súper Luna Azul",
      },
      date: "2023-08-30",
      description: {
        en: "A rare combination of a supermoon (when the Moon is at its closest to Earth) and a blue moon (the second full moon in a calendar month).",
        es: "Una rara combinación de una superluna (cuando la Luna está en su punto más cercano a la Tierra) y una luna azul (la segunda luna llena en un mes calendario).",
      },
      type: "moon",
      visibility: {
        en: "Visible worldwide",
        es: "Visible en todo el mundo",
      },
    },
  ]

  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return language === "en"
      ? date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  }

  // Get event type icon
  const getEventIcon = (type: string) => {
    switch (type) {
      case "meteor":
        return "✨"
      case "eclipse":
        return "🌑"
      case "planet":
        return "🪐"
      case "moon":
        return "🌕"
      default:
        return "🔭"
    }
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black -z-10">
        {/* Animated stars */}
        {[...Array(30)].map((_, i) => (
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
            {language === "en" ? "Upcoming Astronomical Events" : "Próximos Eventos Astronómicos"}
          </motion.h2>
          <motion.p
            className="text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {language === "en"
              ? "Mark your calendar for these celestial phenomena visible from Earth"
              : "Marca tu calendario para estos fenómenos celestes visibles desde la Tierra"}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl" role="img" aria-label={event.type}>
                    {getEventIcon(event.type)}
                  </span>
                  <div className="bg-blue-900/30 px-3 py-1 rounded-full text-xs text-blue-300">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {event.title[language as "en" | "es"]}
                </h3>

                <div className="flex items-center text-sm text-blue-400 mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>{formatDate(event.date)}</span>
                </div>

                {event.time && (
                  <div className="flex items-center text-sm text-blue-400 mb-2">
                    <Clock size={14} className="mr-1" />
                    <span>{event.time}</span>
                  </div>
                )}

                <div className="flex items-center text-sm text-blue-400 mb-4">
                  <MapPin size={14} className="mr-1" />
                  <span>{event.visibility[language as "en" | "es"]}</span>
                </div>

                <p className="text-zinc-400 text-sm">{event.description[language as "en" | "es"]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            {language === "en" ? "View Full Calendar" : "Ver Calendario Completo"}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
