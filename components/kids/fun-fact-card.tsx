"use client"

import { motion } from "framer-motion"
import { Star, VolumeX, Moon, Rocket, Sun, SpaceIcon as Planet } from "lucide-react"

interface FunFactCardProps {
  title: string
  description: string
  icon: string
  color: string
  delay: number
}

export default function FunFactCard({ title, description, icon, color, delay }: FunFactCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "star":
        return <Star className="h-8 w-8" />
      case "volume-x":
        return <VolumeX className="h-8 w-8" />
      case "moon":
        return <Moon className="h-8 w-8" />
      case "rocket":
        return <Rocket className="h-8 w-8" />
      case "sun":
        return <Sun className="h-8 w-8" />
      case "planet":
        return <Planet className="h-8 w-8" />
      default:
        return <Star className="h-8 w-8" />
    }
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={`${color} rounded-2xl p-6 shadow-xl text-white`}
    >
      <div className="bg-white bg-opacity-30 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        {getIcon(icon)}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg">{description}</p>
    </motion.div>
  )
}
