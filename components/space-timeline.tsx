"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Rocket, Star, Satellite, Telescope, Radio, Flag, Atom, Dog } from "lucide-react"
import Image from "next/image"

// Definimos un tipo para los estilos de las estrellas fuera del componente
interface StarStyle {
  width: string
  height: string
  top: string
  left: string
  opacity: number
  boxShadow: string
}

export default function SpaceTimeline() {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Timeline events data con Laika e imageUrl
  const timelineEvents = [
    {
      year: "1957",
      title: t("timeline.sputnik.title"),
      description: t("timeline.sputnik.description"),
      icon: <Satellite className="h-6 w-6" />,
      color: "from-blue-400 to-blue-600",
      imageUrl: "/images/timeline/sputnik.jpg",
    },
    {
      year: "1957",
      title: t("timeline.laika.title"),
      description: t("timeline.laika.description"),
      icon: <Dog className="h-6 w-6" />,
      color: "from-orange-400 to-orange-600",
      imageUrl: "/images/timeline/laika.jpg",
    },
    {
      year: "1961",
      title: t("timeline.gagarin.title"),
      description: t("timeline.gagarin.description"),
      icon: <Rocket className="h-6 w-6" />,
      color: "from-purple-400 to-purple-600",
      imageUrl: "/images/timeline/gagarin.jpg",
    },
    {
      year: "1969",
      title: t("timeline.moonLanding.title"),
      description: t("timeline.moonLanding.description"),
      icon: <Flag className="h-6 w-6" />,
      color: "from-yellow-400 to-yellow-600",
      imageUrl: "/images/timeline/apollo11.jpg",
    },
    {
      year: "1990",
      title: t("timeline.hubble.title"),
      description: t("timeline.hubble.description"),
      icon: <Telescope className="h-6 w-6" />,
      color: "from-green-400 to-green-600",
      imageUrl: "/images/timeline/hubble.jpg",
    },
    {
      year: "2015",
      title: t("timeline.pluto.title"),
      description: t("timeline.pluto.description"),
      icon: <Radio className="h-6 w-6" />,
      color: "from-red-400 to-red-600",
      imageUrl: "/images/timeline/newhorizons.jpg",
    },
    {
      year: "2019",
      title: t("timeline.blackHole.title"),
      description: t("timeline.blackHole.description"),
      icon: <Star className="h-6 w-6" />,
      color: "from-indigo-400 to-indigo-600",
      imageUrl: "/images/timeline/blackhole.jpg",
    },
    {
      year: "2023",
      title: t("timeline.jamesWebb.title"),
      description: t("timeline.jamesWebb.description"),
      icon: <Atom className="h-6 w-6" />,
      color: "from-teal-400 to-teal-600",
      imageUrl: "/images/timeline/jwst.jpg",
    },
  ]

  const [starStyles, setStarStyles] = useState<StarStyle[]>([])

  useEffect(() => {
    const generateStarStyles = () => {
      const newStarStyles: StarStyle[] = []
      for (let i = 0; i < 100; i++) {
        newStarStyles.push({
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.7 + 0.3,
          boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, 0.8)`,
        })
      }
      setStarStyles(newStarStyles)
    }
    generateStarStyles()
  }, [])

  // Ajuste de rangos de animación con el retraso solicitado
  const opacity1 = useTransform(scrollYProgress, [0.08, 0.13, 0.18], [0, 0, 1])
  const x1 = useTransform(scrollYProgress, [0.08, 0.13, 0.18], [-50, -50, 0])

  const opacityLaika = useTransform(scrollYProgress, [0.15, 0.20, 0.25], [0, 0, 1])
  const xLaika = useTransform(scrollYProgress, [0.15, 0.20, 0.25], [50, 50, 0])

  const opacity2 = useTransform(scrollYProgress, [0.22, 0.27, 0.32], [0, 0, 1])
  const x2 = useTransform(scrollYProgress, [0.22, 0.27, 0.32], [-50, -50, 0])

  const opacity3 = useTransform(scrollYProgress, [0.29, 0.34, 0.39], [0, 0, 1])
  const x3 = useTransform(scrollYProgress, [0.29, 0.34, 0.39], [50, 50, 0])

  const opacity4 = useTransform(scrollYProgress, [0.36, 0.41, 0.46], [0, 0, 1])
  const x4 = useTransform(scrollYProgress, [0.36, 0.41, 0.46], [-50, -50, 0])

  const opacity5 = useTransform(scrollYProgress, [0.43, 0.48, 0.53], [0, 0, 1])
  const x5 = useTransform(scrollYProgress, [0.43, 0.48, 0.53], [50, 50, 0])

  const opacity6 = useTransform(scrollYProgress, [0.50, 0.55, 0.60], [0, 0, 1])
  const x6 = useTransform(scrollYProgress, [0.50, 0.55, 0.60], [-50, -50, 0])

  const opacity7 = useTransform(scrollYProgress, [0.57, 0.62, 0.67], [0, 0, 1])
  const x7 = useTransform(scrollYProgress, [0.57, 0.62, 0.67], [50, 50, 0])

  const opacities = [opacity1, opacityLaika, opacity2, opacity3, opacity4, opacity5, opacity6, opacity7]
  const xs = [x1, xLaika, x2, x3, x4, x5, x6, x7]

  return (
    <section ref={containerRef} className="relative w-full py-24 overflow-hidden">
      {/* Fondo de constelaciones */}
      <div className="absolute inset-0 bg-[#050815]">
        {starStyles.length > 0 && starStyles.map((style, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={style} />
        ))}
        {/* SVGs de constelaciones y nebulosa sutil (código omitido por brevedad, pero debe estar aquí) */}
        <svg className="absolute top-[10%] left-[10%] w-[300px] h-[200px] opacity-40" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
          {/* ... puntos y líneas de la Osa Mayor ... */}
        </svg>
        <svg className="absolute bottom-[20%] right-[15%] w-[250px] h-[300px] opacity-40" viewBox="0 0 250 300" xmlns="http://www.w3.org/2000/svg">
          {/* ... puntos y líneas de Orión ... */}
        </svg>
        <svg className="absolute top-[40%] left-[60%] w-[200px] h-[100px] opacity-40" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          {/* ... puntos y líneas de Casiopea ... */}
        </svg>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 70% 30%, rgba(111, 66, 193, 0.3), transparent 60%), radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3), transparent 60%)" }}></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
            {t("timeline.subtitle")}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-space">{t("timeline.title")}</h2>
          <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("timeline.description")}
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-blue-500/10"
            style={{ height: "calc(100% + 200px)" }} // Ajusta esta altura si la sección "Quieres saber más" cambia de tamaño
          ></div>

          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={index}
                style={{
                  opacity: opacities[index],
                  x: xs[index],
                }}
                className={`relative mb-12 flex w-full items-start ${
                  isEven ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`relative w-1/2 rounded-lg border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-md ${
                    isEven ? "mr-4 lg:mr-8" : "ml-4 lg:ml-8"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r ${event.color}`}
                    >
                      {event.year}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-zinc-400">{event.description}</p>

                  {/* Contenedor de la Imagen */}
                  {event.imageUrl && (
                    <div className="mt-4 h-48 w-full overflow-hidden rounded-md border border-zinc-700 bg-zinc-800 group"> {/* Añadido 'group' para el hover de la imagen */}
                      {/* Opción 1: Usar Next/Image (recomendado si las imágenes están en /public) */}
                      {/* Necesitas importar Image from "next/image" */}
                      <Image 
                        src={event.imageUrl} 
                        alt={event.title} 
                        width={400} // Proporciona un ancho
                        height={192} // Proporciona una altura (h-48 = 192px)
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      
                      {/* Opción 2: img tag simple */}
                      {/* <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" /> */}
                    </div>
                  )}
                </div>

                {/* Icono ("bolita") y conector a la línea */}
                <div
                  className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-900 shadow-md ${
                    isEven ? "left-1/2 -translate-x-[calc(50%+1rem)] lg:-translate-x-[calc(50%+2rem)]" : "right-1/2 translate-x-[calc(50%+1rem)] lg:translate-x-[calc(50%+2rem)]"
                  } group-hover:border-blue-500`}
                >
                  {/* ESTA LÍNEA ES LA QUE SE ELIMINA */}
                  {/* <div className={`absolute h-full w-1 ${isEven ? 'left-[-1.1rem] lg:left-[-2.1rem]' : 'right-[-1.1rem] lg:right-[-2.1rem]'} bg-zinc-800 group-hover:bg-blue-500 transition-colors`}></div> */}
                  
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    {event.icon}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Sección "Quieres saber más?" */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.70, 0.75, 0.85, 0.95], [0, 1, 1, 0]),
            }}
            className="relative mt-16 mb-8 flex flex-col items-center rounded-lg border border-zinc-800 bg-zinc-900/80 p-8 text-center shadow-2xl backdrop-blur-md"
          >
            <h3 className="mb-4 text-2xl font-bold text-white">{t("timeline.wantToLearnMore")}</h3>
            <p className="mb-6 text-zinc-400">{t("timeline.learnMoreDesc")}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/solar-system"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
              >
                {t("timeline.exploreSolarSystem")}
              </a>
              <a
                href="/galaxies"
                className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-transparent px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500"
              >
                {t("timeline.discoverGalaxies")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
