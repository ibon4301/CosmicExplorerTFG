"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: number
  title: string
  summary: string
  imageUrl: string
  publishDate: string
  source: string
  url: string
}

export default function SpaceNews() {
  const { t, language } = useLanguage()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  // Simulated news data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const mockNews: NewsItem[] = [
        {
          id: 1,
          title:
            language === "en"
              ? "NASA's Perseverance Rover Discovers Organic Material on Mars"
              : "El rover Perseverance de la NASA descubre material orgánico en Marte",
          summary:
            language === "en"
              ? "The rover has found complex organic molecules that could indicate past life on the Red Planet."
              : "El rover ha encontrado moléculas orgánicas complejas que podrían indicar vida pasada en el Planeta Rojo.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          publishDate: "2023-05-15",
          source: "NASA",
          url: "#",
        },
        {
          id: 2,
          title:
            language === "en"
              ? "SpaceX Successfully Launches 60 More Starlink Satellites"
              : "SpaceX lanza con éxito 60 satélites Starlink más",
          summary:
            language === "en"
              ? "The latest launch brings the total number of Starlink satellites in orbit to over 1,500."
              : "El último lanzamiento eleva el número total de satélites Starlink en órbita a más de 1.500.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          publishDate: "2023-05-10",
          source: "SpaceX",
          url: "#",
        },
        {
          id: 3,
          title:
            language === "en"
              ? "Astronomers Detect Mysterious Radio Signals from Distant Galaxy"
              : "Astrónomos detectan misteriosas señales de radio de una galaxia distante",
          summary:
            language === "en"
              ? "The fast radio bursts have puzzled scientists who are trying to determine their origin."
              : "Las ráfagas rápidas de radio han desconcertado a los científicos que intentan determinar su origen.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          publishDate: "2023-05-05",
          source: "ESO",
          url: "#",
        },
      ]
      setNews(mockNews)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [language])

  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return language === "en"
      ? date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background with animated stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {language === "en" ? "Latest Space News" : "Últimas Noticias Espaciales"}
          </motion.h2>
          <motion.p
            className="text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {language === "en"
              ? "Stay updated with the most recent discoveries and achievements in space exploration."
              : "Mantente actualizado con los descubrimientos y logros más recientes en la exploración espacial."}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-blue-400 mb-2">
                    <Clock size={14} className="mr-1" />
                    <span>{formatDate(item.publishDate)}</span>
                    <span className="mx-2">•</span>
                    <span>{item.source}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 mb-4 line-clamp-2">{item.summary}</p>
                  <Link
                    href={item.url}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {language === "en" ? "Read more" : "Leer más"}
                    <ExternalLink size={14} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="#"
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {language === "en" ? "View all news" : "Ver todas las noticias"}
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
