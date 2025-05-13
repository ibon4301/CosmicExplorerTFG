"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, SpaceIcon as Planet, Search, Zap, Thermometer, Droplets } from "lucide-react"
import Header from "@/components/header"
import CustomCursor from "@/components/custom-cursor"
import { motion, useScroll, useTransform } from "framer-motion"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import GlassmorphismCard from "@/components/glassmorphism-card"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"

export default function ExoplanetsPage() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedPlanet, setSelectedPlanet] = useState(0)
  const containerRef = useRef(null)

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Fade in effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Translations for the exoplanets page
  const translations = {
    en: {
      title: "Exoplanets",
      subtitle: "Discover worlds beyond our solar system and the search for habitable planets.",
      overview: "Overview",
      overviewTitle: "Worlds Beyond Our Solar System",
      overviewDesc:
        "Exoplanets are planets that orbit stars outside our solar system. Since the first confirmed discovery in 1992, astronomers have found thousands of these distant worlds, ranging from gas giants to rocky planets similar to Earth.",
      discovery: "Discovery Methods",
      discoveryTitle: "How We Find Exoplanets",
      discoveryDesc: "Scientists use various techniques to detect planets that are too distant to observe directly.",
      transit: "Transit Method",
      transitDesc: "Detecting the slight dimming of a star's light as a planet passes in front of it.",
      radial: "Radial Velocity",
      radialDesc: "Measuring the slight wobble of a star caused by the gravitational pull of an orbiting planet.",
      direct: "Direct Imaging",
      directDesc: "Capturing actual images of exoplanets by blocking the light from their host stars.",
      microlensing: "Gravitational Microlensing",
      microlensingDesc: "Observing how light from a distant star bends around the gravity of a planet.",
      habitable: "Habitable Worlds",
      habitableTitle: "The Search for Life",
      habitableDesc:
        "Scientists focus on finding planets in the 'habitable zone' where conditions might support liquid water and potentially life.",
      notable: "Notable Exoplanets",
      notableTitle: "Remarkable Distant Worlds",
      notableDesc: "Explore some of the most fascinating exoplanets discovered so far.",
      models: "3D Models",
      modelsTitle: "Interactive Exoplanet Models",
      modelsDesc: "Explore 3D models of various exoplanets (coming soon).",
      modelPlaceholder: "3D models will be available in a future update.",
      exoplanets: [
        {
          name: "TRAPPIST-1e",
          type: "Rocky planet",
          distance: "39.6 light-years",
          discovery: "2017",
          description:
            "A potentially habitable Earth-sized planet in the TRAPPIST-1 system, which contains seven rocky planets in total.",
          habitability: "High potential",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Proxima Centauri b",
          type: "Rocky planet",
          distance: "4.2 light-years",
          discovery: "2016",
          description:
            "The closest known exoplanet to our solar system, orbiting our nearest stellar neighbor, Proxima Centauri.",
          habitability: "Potentially habitable",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Kepler-186f",
          type: "Rocky planet",
          distance: "582 light-years",
          discovery: "2014",
          description: "The first Earth-sized planet discovered in the habitable zone of another star.",
          habitability: "Potentially habitable",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "HD 189733 b",
          type: "Hot Jupiter",
          distance: "64.5 light-years",
          discovery: "2005",
          description:
            "A gas giant with deep blue color, likely due to silicate particles in its atmosphere that scatter blue light.",
          habitability: "Not habitable",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "55 Cancri e",
          type: "Super-Earth",
          distance: "41 light-years",
          discovery: "2004",
          description:
            "A planet that might be covered in oceans of super-critical carbon, meaning its surface could be covered in diamonds.",
          habitability: "Not habitable",
          image: "/placeholder.svg?height=400&width=600",
        },
      ],
    },
    es: {
      title: "Exoplanetas",
      subtitle: "Descubre mundos más allá de nuestro sistema solar y la búsqueda de planetas habitables.",
      overview: "Visión General",
      overviewTitle: "Mundos Más Allá de Nuestro Sistema Solar",
      overviewDesc:
        "Los exoplanetas son planetas que orbitan estrellas fuera de nuestro sistema solar. Desde el primer descubrimiento confirmado en 1992, los astrónomos han encontrado miles de estos mundos distantes, desde gigantes gaseosos hasta planetas rocosos similares a la Tierra.",
      discovery: "Métodos de Descubrimiento",
      discoveryTitle: "Cómo Encontramos Exoplanetas",
      discoveryDesc:
        "Los científicos utilizan varias técnicas para detectar planetas que están demasiado distantes para observar directamente.",
      transit: "Método de Tránsito",
      transitDesc: "Detectar el ligero oscurecimiento de la luz de una estrella cuando un planeta pasa frente a ella.",
      radial: "Velocidad Radial",
      radialDesc:
        "Medir el ligero bamboleo de una estrella causado por la atracción gravitacional de un planeta en órbita.",
      direct: "Imagen Directa",
      directDesc: "Capturar imágenes reales de exoplanetas bloqueando la luz de sus estrellas anfitrionas.",
      microlensing: "Microlente Gravitacional",
      microlensingDesc:
        "Observar cómo la luz de una estrella distante se curva alrededor de la gravedad de un planeta.",
      habitable: "Mundos Habitables",
      habitableTitle: "La Búsqueda de Vida",
      habitableDesc:
        "Los científicos se centran en encontrar planetas en la 'zona habitable' donde las condiciones podrían permitir agua líquida y potencialmente vida.",
      notable: "Exoplanetas Notables",
      notableTitle: "Mundos Distantes Extraordinarios",
      notableDesc: "Explora algunos de los exoplanetas más fascinantes descubiertos hasta ahora.",
      models: "Modelos 3D",
      modelsTitle: "Modelos Interactivos de Exoplanetas",
      modelsDesc: "Explora modelos 3D de varios exoplanetas (próximamente).",
      modelPlaceholder: "Los modelos 3D estarán disponibles en una actualización futura.",
      exoplanets: [
        {
          name: "TRAPPIST-1e",
          type: "Planeta rocoso",
          distance: "39.6 años luz",
          discovery: "2017",
          description:
            "Un planeta potencialmente habitable del tamaño de la Tierra en el sistema TRAPPIST-1, que contiene siete planetas rocosos en total.",
          habitability: "Alto potencial",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Proxima Centauri b",
          type: "Planeta rocoso",
          distance: "4.2 años luz",
          discovery: "2016",
          description:
            "El exoplaneta conocido más cercano a nuestro sistema solar, orbitando a nuestro vecino estelar más cercano, Proxima Centauri.",
          habitability: "Pot  orbitando a nuestro vecino estelar más cercano, Proxima Centauri.",
          habitability: "Potencialmente habitable",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Kepler-186f",
          type: "Planeta rocoso",
          distance: "582 años luz",
          discovery: "2014",
          description: "El primer planeta del tamaño de la Tierra descubierto en la zona habitable de otra estrella.",
          habitability: "Potencialmente habitable",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "HD 189733 b",
          type: "Júpiter caliente",
          distance: "64.5 años luz",
          discovery: "2005",
          description:
            "Un gigante gaseoso de color azul profundo, probablemente debido a partículas de silicato en su atmósfera que dispersan la luz azul.",
          habitability: "No habitable",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "55 Cancri e",
          type: "Super-Tierra",
          distance: "41 años luz",
          discovery: "2004",
          description:
            "Un planeta que podría estar cubierto de océanos de carbono supercrítico, lo que significa que su superficie podría estar cubierta de diamantes.",
          habitability: "No habitable",
          image: "/placeholder.svg?height=400&width=600",
        },
      ],
    },
  }

  const exoplanetData = translations[language] || translations.en

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Header */}
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section with Parallax */}
        <section
          ref={containerRef}
          className="relative w-full bg-gradient-to-b from-black to-zinc-900 py-12 md:py-24 overflow-hidden"
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"
            style={{ y }}
          />
          <motion.div
            className="absolute bottom-10 right-[10%] w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          />

          <div className="container relative z-10 px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <Link
                  href="/home"
                  className="inline-flex items-center rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {language === "es" ? "Inicio" : "Home"}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-space">
                  {exoplanetData.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">{exoplanetData.subtitle}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <ScrollReveal direction="left">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                      {exoplanetData.overview}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                      {exoplanetData.overviewTitle}
                    </h2>
                    <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {exoplanetData.overviewDesc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="flex items-center justify-center">
                  <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=800&width=1200"
                      alt="Exoplanets Overview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Discovery Methods */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {exoplanetData.discovery}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {exoplanetData.discoveryTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {exoplanetData.discoveryDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: exoplanetData.transit,
                  description: exoplanetData.transitDesc,
                  icon: <Search className="h-10 w-10 text-blue-400" />,
                  delay: 0.1,
                },
                {
                  title: exoplanetData.radial,
                  description: exoplanetData.radialDesc,
                  icon: <Zap className="h-10 w-10 text-yellow-400" />,
                  delay: 0.2,
                },
                {
                  title: exoplanetData.direct,
                  description: exoplanetData.directDesc,
                  icon: <Planet className="h-10 w-10 text-purple-400" />,
                  delay: 0.3,
                },
                {
                  title: exoplanetData.microlensing,
                  description: exoplanetData.microlensingDesc,
                  icon: <Search className="h-10 w-10 text-green-400" />,
                  delay: 0.4,
                },
              ].map((method, index) => (
                <ScrollReveal key={index} delay={method.delay}>
                  <GlassmorphismCard>
                    <div className="mb-4">{method.icon}</div>
                    <h3 className="mb-2 text-xl font-bold">{method.title}</h3>
                    <p className="text-zinc-400">{method.description}</p>
                  </GlassmorphismCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Notable Exoplanets */}
        <ParallaxSection speed={0.1} className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                    {exoplanetData.notable}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {exoplanetData.notableTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {exoplanetData.notableDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16">
              {/* Planet Selector */}
              <div className="mb-8 flex flex-wrap justify-center gap-4">
                {exoplanetData.exoplanets.map((planet, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPlanet(index)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedPlanet === index
                        ? "bg-cyan-600 text-white"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                    }`}
                  >
                    {planet.name}
                  </button>
                ))}
              </div>

              {/* Selected Planet Details */}
              <motion.div
                key={selectedPlanet}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative h-[300px] overflow-hidden rounded-lg">
                    <Image
                      src={exoplanetData.exoplanets[selectedPlanet].image || "/placeholder.svg"}
                      alt={exoplanetData.exoplanets[selectedPlanet].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold text-cyan-400">
                      {exoplanetData.exoplanets[selectedPlanet].name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-zinc-500">{language === "es" ? "Tipo" : "Type"}</p>
                        <p className="font-medium">{exoplanetData.exoplanets[selectedPlanet].type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">{language === "es" ? "Distancia" : "Distance"}</p>
                        <p className="font-medium">{exoplanetData.exoplanets[selectedPlanet].distance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">{language === "es" ? "Descubrimiento" : "Discovery"}</p>
                        <p className="font-medium">{exoplanetData.exoplanets[selectedPlanet].discovery}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">{language === "es" ? "Habitabilidad" : "Habitability"}</p>
                        <p className="font-medium">{exoplanetData.exoplanets[selectedPlanet].habitability}</p>
                      </div>
                    </div>
                    <p className="text-zinc-400">{exoplanetData.exoplanets[selectedPlanet].description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        {/* Habitable Zone */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <ScrollReveal direction="left">
                <div className="flex items-center justify-center">
                  <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=800&width=1200"
                      alt="Habitable Zone"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-400">
                      {exoplanetData.habitable}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                      {exoplanetData.habitableTitle}
                    </h2>
                    <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {exoplanetData.habitableDesc}
                    </p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-red-400" />
                      <span className="text-zinc-300">
                        {language === "es" ? "Temperatura adecuada" : "Suitable temperature"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-400" />
                      <span className="text-zinc-300">
                        {language === "es" ? "Potencial para agua líquida" : "Potential for liquid water"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Planet className="h-5 w-5 text-green-400" />
                      <span className="text-zinc-300">
                        {language === "es" ? "Composición rocosa" : "Rocky composition"}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3D Models Section (Placeholder) */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                    {exoplanetData.models}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {exoplanetData.modelsTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {exoplanetData.modelsDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16">
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 p-8">
                <div className="text-center">
                  <Planet className="mx-auto mb-4 h-16 w-16 text-zinc-600" />
                  <p className="text-xl font-medium text-zinc-500">{exoplanetData.modelPlaceholder}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
