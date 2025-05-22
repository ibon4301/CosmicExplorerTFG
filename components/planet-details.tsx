"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Importamos el componente de modelo 3D de forma dinámica para evitar problemas de SSR
const PlanetModel = dynamic(() => import("./PlanetModel"), { ssr: false, loading: () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
  </div>
)})

export default function PlanetDetails({ language = "en" }) {
  const { t } = useLanguage()
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})

  const toggleFlip = (planetId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [planetId]: !prev[planetId]
    }))
  }
  
  // Función para volver a la imagen desde el modelo 3D
  const backToImage = (planetId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [planetId]: false
    }))
  }

  // Mapeo de color a clase Tailwind para el borde
  const getBorderColorClass = (color: string) => {
    switch (color) {
      case "gray": return "border-gray-400";
      case "yellow": return "border-yellow-400";
      case "blue": return "border-blue-400";
      case "red": return "border-red-400";
      case "orange": return "border-orange-400";
      case "amber": return "border-amber-400";
      case "cyan": return "border-cyan-400";
      case "indigo": return "border-indigo-400";
      default: return "border-gray-400";
    }
  };

  // Datos de los planetas - ordenados por distancia al sol
  const planets = [
    {
      id: "mercury",
      name: t("planets.mercury"),
      color: "gray",
      distance: language === "es" ? "57,9 millones de km" : "57.9 million km",
      orbitalPeriod: language === "es" ? "88 días terrestres" : "88 Earth days",
      diameter: "4,880 km",
      temperature: language === "es" ? "-173°C a 427°C" : "-173°C to 427°C",
      description:
        language === "es"
          ? "Mercurio es el planeta más pequeño y más interno del Sistema Solar. No tiene atmósfera para retener el calor, lo que resulta en variaciones extremas de temperatura entre el día y la noche. La superficie está muy craterizada, similar a nuestra Luna."
          : "Mercury is the smallest and innermost planet in the Solar System. It has no atmosphere to retain heat, resulting in extreme temperature variations between day and night. The surface is heavily cratered, similar to our Moon.",
      image: "/images/planet_details/mercury_detail.jpg",
      modelUrl: "/models/planets/mercury.glb"
    },
    {
      id: "venus",
      name: t("planets.venus"),
      color: "yellow",
      distance: language === "es" ? "108,2 millones de km" : "108.2 million km",
      orbitalPeriod: language === "es" ? "225 días terrestres" : "225 Earth days",
      diameter: "12,104 km",
      temperature: language === "es" ? "462°C (promedio)" : "462°C (average)",
      description:
        language === "es"
          ? "Venus a menudo se llama el planeta hermano de la Tierra debido a su tamaño similar y proximidad. Sin embargo, tiene una atmósfera tóxica espesa que atrapa el calor, lo que lo convierte en el planeta más caliente de nuestro sistema solar. La superficie está dominada por características volcánicas y regiones montañosas."
          : "Venus is often called Earth's sister planet due to its similar size and proximity. However, it has a thick toxic atmosphere that traps heat, making it the hottest planet in our solar system. The surface is dominated by volcanic features and highland regions.",
      image: "/images/planet_details/venus_detail.jpg",
      modelUrl: "/models/planets/venus.glb"
    },
    {
      id: "earth",
      name: t("planets.earth"),
      color: "blue",
      distance: language === "es" ? "149,6 millones de km" : "149.6 million km",
      orbitalPeriod: language === "es" ? "365,25 días" : "365.25 days",
      diameter: "12,742 km",
      temperature: language === "es" ? "-88°C a 58°C" : "-88°C to 58°C",
      description:
        language === "es"
          ? "La Tierra es el único planeta conocido que alberga vida. Tiene una atmósfera de nitrógeno-oxígeno y es el único planeta con agua líquida en su superficie. El campo magnético de la Tierra nos protege de la dañina radiación solar."
          : "Earth is the only known planet to support life. It has a nitrogen-oxygen atmosphere and is the only planet with liquid water on its surface. The Earth's magnetic field protects us from harmful solar radiation.",
      image: "/images/planet_details/earth_detail.jpg",
      modelUrl: "/models/planets/earth.glb"
    },
    {
      id: "mars",
      name: t("planets.mars"),
      color: "red",
      distance: language === "es" ? "227,9 millones de km" : "227.9 million km",
      orbitalPeriod: language === "es" ? "687 días terrestres" : "687 Earth days",
      diameter: "6,779 km",
      temperature: language === "es" ? "-153°C a 20°C" : "-153°C to 20°C",
      description:
        language === "es"
          ? "Marte es conocido como el Planeta Rojo debido al óxido de hierro (óxido) en su superficie. Tiene el volcán más grande y el cañón más profundo del sistema solar. La evidencia sugiere que Marte alguna vez tuvo agua fluyendo y podría haber albergado vida."
          : "Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has the largest volcano and the deepest canyon in the solar system. Evidence suggests Mars once had flowing water and could have supported life.",
      image: "/images/planet_details/mars_detail.jpg",
      modelUrl: "/models/planets/mars.glb"
    },
    {
      id: "jupiter",
      name: t("planets.jupiter"),
      color: "orange",
      distance: language === "es" ? "778,5 millones de km" : "778.5 million km",
      orbitalPeriod: language === "es" ? "11,86 años terrestres" : "11.86 Earth years",
      diameter: "139,820 km",
      moons: language === "es" ? "79 confirmadas" : "79 confirmed",
      description:
        language === "es"
          ? "Júpiter es el planeta más grande de nuestro sistema solar y es un gigante gaseoso compuesto principalmente de hidrógeno y helio. Su característica más distintiva es la Gran Mancha Roja, una gigantesca tormenta que ha estado rugiendo durante cientos de años."
          : "Jupiter is the largest planet in our solar system and is a gas giant composed mainly of hydrogen and helium. Its most distinctive feature is the Great Red Spot, a giant storm that has been raging for hundreds of years.",
      image: "/images/planet_details/jupiter_detail.jpg",
      modelUrl: "/models/planets/jupiter.glb"
    },
    {
      id: "saturn",
      name: t("planets.saturn"),
      color: "amber",
      distance: language === "es" ? "1.434 millones de km" : "1,434 million km",
      orbitalPeriod: language === "es" ? "29,45 años terrestres" : "29.45 Earth years",
      diameter: "116,460 km",
      moons: language === "es" ? "82 confirmadas" : "82 confirmed",
      description:
        language === "es"
          ? "Saturno es conocido por sus impresionantes anillos, compuestos principalmente de partículas de hielo y roca. Es un gigante gaseoso como Júpiter, pero con una densidad tan baja que flotaría en agua. Saturno tiene un sistema complejo de lunas, con Titán siendo la más grande y la única luna en el sistema solar con una atmósfera densa."
          : "Saturn is known for its stunning rings, which are made mostly of ice particles and rock. It's a gas giant like Jupiter, but with such low density that it would float in water. Saturn has a complex system of moons, with Titan being the largest and the only moon in the solar system with a dense atmosphere.",
      image: "/images/planet_details/saturn_detail.jpg",
      modelUrl: "/models/planets/saturn.glb"
    },
    {
      id: "uranus",
      name: t("planets.uranus"),
      color: "cyan",
      distance: language === "es" ? "2.871 millones de km" : "2,871 million km",
      orbitalPeriod: language === "es" ? "84 años terrestres" : "84 Earth years",
      diameter: "50,724 km",
      moons: language === "es" ? "27 confirmadas" : "27 confirmed",
      description:
        language === "es"
          ? "Urano es único porque gira de lado, con su eje de rotación casi paralelo a su órbita. Es un gigante de hielo compuesto principalmente de agua, metano y amoníaco en forma de hielo. Sus anillos y lunas orbitan alrededor de su ecuador, que está inclinado casi 90 grados respecto a su órbita."
          : "Uranus is unique because it rotates on its side, with its rotational axis nearly parallel to its orbit. It's an ice giant composed primarily of water, methane, and ammonia in ice form. Its rings and moons orbit around its equator, which is tilted almost 90 degrees to its orbit.",
      image: "/images/planet_details/uranus_detail.jpg",
      modelUrl: "/models/planets/uranus.glb"
    },
    {
      id: "neptune",
      name: t("planets.neptune"),
      color: "indigo",
      distance: language === "es" ? "4.495 millones de km" : "4,495 million km",
      orbitalPeriod: language === "es" ? "164,8 años terrestres" : "164.8 Earth years",
      diameter: "49,244 km",
      moons: language === "es" ? "14 confirmadas" : "14 confirmed",
      description:
        language === "es"
          ? "Neptuno es el planeta más distante del sistema solar y otro gigante de hielo similar a Urano. Tiene los vientos más fuertes de cualquier planeta, con velocidades de hasta 2.100 km/h. Su atmósfera contiene metano, que le da su característico color azul profundo. Neptuno tiene un sistema de anillos delgados y 14 lunas conocidas."
          : "Neptune is the most distant planet in the solar system and another ice giant similar to Uranus. It has the strongest winds of any planet, with speeds up to 2,100 km/h. Its atmosphere contains methane, which gives it its characteristic deep blue color. Neptune has a system of thin rings and 14 known moons.",
      image: "/images/planet_details/neptune_detail.jpg",
      modelUrl: "/models/planets/neptune.glb"
    }
  ]

  return (
    <div className="space-y-16">
      {planets.map((planet, index) => (
        <div key={planet.id} className="grid gap-8 md:grid-cols-2">
          {/* Alternamos la posición de la imagen para crear un diseño más interesante */}
          {index % 2 === 0 ? (
            <>
              <div 
                className="relative h-[300px] rounded-2xl overflow-hidden perspective-1000"
                onClick={() => !flippedCards[planet.id] && toggleFlip(planet.id)} // Solo permitir clic si no está volteada
                style={{ cursor: flippedCards[planet.id] ? 'default' : 'pointer' }} // Cambiar el cursor según el estado
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: flippedCards[planet.id] ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Frente - Imagen */}
                  <div 
                    className="absolute w-full h-full backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image 
                      src={planet.image} 
                      alt={planet.name} 
                      fill 
                      className="object-cover rounded-2xl" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 rounded-2xl">
                      <p className="text-white text-sm">
                        {language === "es" ? "Haz clic para ver modelo 3D" : "Click to see 3D model"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Reverso - Modelo 3D GLB */}
                  <div 
                    className={`absolute w-full h-full backface-hidden bg-zinc-900 rounded-2xl flex items-center justify-center border-2 ${getBorderColorClass(planet.color)}`}
                    style={{ 
                      backfaceVisibility: "hidden", 
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {planet.modelUrl ? (
                      <PlanetModel 
                        modelUrl={planet.modelUrl} 
                        planetColor={planet.color} 
                        onBackToImage={() => backToImage(planet.id)}
                      />
                    ) : (
                      <div className="text-center p-6">
                        <h4 className={`text-xl font-bold text-${planet.color}-400 mb-2 font-orbitron`}>{planet.name}</h4>
                        <p className="text-zinc-400 font-helvetica">
                          {language === "es" 
                            ? "Modelo 3D próximamente" 
                            : "3D model coming soon"}
                        </p>
                        <div className={`mt-4 w-16 h-16 rounded-full border-4 border-${planet.color}-400 border-t-transparent animate-spin mx-auto`}></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
              <div className="space-y-4">
                <h3 className={`text-2xl font-bold text-${planet.color}-400 font-orbitron`}>{planet.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                    <p className="font-medium">{planet.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                    <p className="font-medium">{planet.orbitalPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                    <p className="font-medium">{planet.diameter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">
                      {planet.moons ? (language === "es" ? "Lunas" : "Moons") : (language === "es" ? "Temperatura" : "Temperature")}
                    </p>
                    <p className="font-medium">{planet.moons || planet.temperature}</p>
                  </div>
                </div>
                <p className="text-zinc-400 font-helvetica">{planet.description}</p>
              </div>
            </>
          ) : (
            <>
              <div className="order-2 md:order-1 space-y-4">
                <h3 className={`text-2xl font-bold text-${planet.color}-400 font-orbitron`}>{planet.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                    <p className="font-medium">{planet.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                    <p className="font-medium">{planet.orbitalPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                    <p className="font-medium">{planet.diameter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">
                      {planet.moons ? (language === "es" ? "Lunas" : "Moons") : (language === "es" ? "Temperatura" : "Temperature")}
                    </p>
                    <p className="font-medium">{planet.moons || planet.temperature}</p>
                  </div>
                </div>
                <p className="text-zinc-400 font-helvetica">{planet.description}</p>
              </div>
              <div 
                className="relative order-1 md:order-2 h-[300px] rounded-2xl overflow-hidden perspective-1000"
                onClick={() => !flippedCards[planet.id] && toggleFlip(planet.id)} // Solo permitir clic si no está volteada
                style={{ cursor: flippedCards[planet.id] ? 'default' : 'pointer' }} // Cambiar el cursor según el estado
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: flippedCards[planet.id] ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Frente - Imagen */}
                  <div 
                    className="absolute w-full h-full backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image 
                      src={planet.image} 
                      alt={planet.name} 
                      fill 
                      className="object-cover rounded-2xl" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 rounded-2xl">
                      <p className="text-white text-sm">
                        {language === "es" ? "Haz clic para ver modelo 3D" : "Click to see 3D model"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Reverso - Modelo 3D GLB */}
                  <div 
                    className={`absolute w-full h-full backface-hidden bg-zinc-900 rounded-2xl flex items-center justify-center border-2 ${getBorderColorClass(planet.color)}`}
                    style={{ 
                      backfaceVisibility: "hidden", 
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {planet.modelUrl ? (
                      <PlanetModel 
                        modelUrl={planet.modelUrl} 
                        planetColor={planet.color} 
                        onBackToImage={() => backToImage(planet.id)}
                      />
                    ) : (
                      <div className="text-center p-6">
                        <h4 className={`text-xl font-bold text-${planet.color}-400 mb-2 font-orbitron`}>{planet.name}</h4>
                        <p className="text-zinc-400 font-helvetica">
                          {language === "es" 
                            ? "Modelo 3D próximamente" 
                            : "3D model coming soon"}
                        </p>
                        <div className={`mt-4 w-16 h-16 rounded-full border-4 border-${planet.color}-400 border-t-transparent animate-spin mx-auto`}></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
