"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Cloud, Star, Sparkles } from "lucide-react"
import Header from "@/components/header"
import { motion, useScroll, useTransform } from "framer-motion"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import GlassmorphismCard from "@/components/glassmorphism-card"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"
import React from "react"

export default function NebulaePage() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedNebula, setSelectedNebula] = useState(0)
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

  // Translations for the nebulae page
  const translations = {
    en: {
      title: "Nebulae",
      subtitle: "Witness the beautiful interstellar clouds of gas and dust where stars are born and die.",
      overview: "Overview",
      overviewTitle: "Cosmic Clouds of Creation",
      overviewDesc:
        "Nebulae are vast clouds of gas and dust in space. Some are regions where new stars are being formed, while others are the remains of dying or exploded stars. These cosmic clouds come in various shapes, sizes, and colors, creating some of the most spectacular views in our universe.",
      types: "Types",
      typesTitle: "Types of Nebulae",
      typesDesc: "Nebulae come in different forms, each with unique characteristics and origins.",
      emission: "Emission Nebulae",
      emissionDesc: "Glowing clouds of ionized gas that emit their own light, often appearing red due to hydrogen.",
      reflection: "Reflection Nebulae",
      reflectionDesc:
        "Clouds that reflect the light of nearby stars, typically appearing blue due to the way dust scatters light.",
      dark: "Dark Nebulae",
      darkDesc:
        "Dense clouds of dust that block light from objects behind them, appearing as dark patches against brighter backgrounds.",
      planetary: "Planetary Nebulae",
      planetaryDesc: "Shells of gas ejected by dying stars, despite the name, they have nothing to do with planets.",
      supernova: "Supernova Remnants",
      supernovaDesc: "Expanding shells of gas and dust left behind after a massive star explodes as a supernova.",
      famous: "Famous Nebulae",
      famousTitle: "Iconic Cosmic Clouds",
      famousDesc: "Explore some of the most well-known and visually stunning nebulae in our galaxy.",
      models: "3D Models",
      modelsTitle: "Interactive Nebula Models",
      modelsDesc: "Explore 3D models of various nebulae (coming soon).",
      modelPlaceholder: "3D models will be available in a future update.",
      nebulae: [
        {
          name: "Orion Nebula (M42)",
          type: "Emission nebula",
          distance: "1,344 light-years",
          constellation: "Orion",
          description:
            "One of the brightest nebulae in the night sky, visible to the naked eye. It's a stellar nursery where new stars are being born.",
          size: "24 light-years across",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Eagle Nebula (M16)",
          type: "Emission nebula",
          distance: "7,000 light-years",
          constellation: "Serpens",
          description: "Famous for its 'Pillars of Creation', towering columns of gas and dust where new stars form.",
          size: "70 light-years across",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Crab Nebula (M1)",
          type: "Supernova remnant",
          distance: "6,500 light-years",
          constellation: "Taurus",
          description: "The remains of a supernova explosion observed by Chinese astronomers in 1054 CE.",
          size: "11 light-years across",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Ring Nebula (M57)",
          type: "Planetary nebula",
          distance: "2,283 light-years",
          constellation: "Lyra",
          description: "A classic example of a planetary nebula, formed when a dying star expelled its outer layers.",
          size: "1 light-year across",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Horsehead Nebula",
          type: "Dark nebula",
          distance: "1,500 light-years",
          constellation: "Orion",
          description:
            "A dark nebula silhouetted against a bright emission nebula, creating the distinctive shape of a horse's head.",
          size: "3.5 light-years across",
          image: "/placeholder.svg?height=400&width=600",
        },
      ],
    },
    es: {
      title: "Nebulosas",
      subtitle: "Observa las hermosas nubes interestelares de gas y polvo donde nacen y mueren las estrellas.",
      overview: "Visión General",
      overviewTitle: "Nubes Cósmicas de Creación",
      overviewDesc:
        "Las nebulosas son vastas nubes de gas y polvo en el espacio. Algunas son regiones donde se están formando nuevas estrellas, mientras que otras son los restos de estrellas moribundas o explotadas. Estas nubes cósmicas vienen en varias formas, tamaños y colores, creando algunas de las vistas más espectaculares en nuestro universo.",
      types: "Tipos",
      typesTitle: "Tipos de Nebulosas",
      typesDesc: "Las nebulosas vienen en diferentes formas, cada una con características y orígenes únicos.",
      emission: "Nebulosas de Emisión",
      emissionDesc:
        "Nubes brillantes de gas ionizado que emiten su propia luz, a menudo aparecen rojas debido al hidrógeno.",
      reflection: "Nebulosas de Reflexión",
      reflectionDesc:
        "Nubes que reflejan la luz de estrellas cercanas, típicamente aparecen azules debido a la forma en que el polvo dispersa la luz.",
      dark: "Nebulosas Oscuras",
      darkDesc:
        "Densas nubes de polvo que bloquean la luz de objetos detrás de ellas, apareciendo como manchas oscuras contra fondos más brillantes.",
      planetary: "Nebulosas Planetarias",
      planetaryDesc:
        "Capas de gas expulsadas por estrellas moribundas, a pesar del nombre, no tienen nada que ver con planetas.",
      supernova: "Remanentes de Supernova",
      supernovaDesc:
        "Capas expansivas de gas y polvo dejadas después de que una estrella masiva explota como supernova.",
      famous: "Nebulosas Famosas",
      famousTitle: "Nubes Cósmicas Icónicas",
      famousDesc: "Explora algunas de las nebulosas más conocidas y visualmente impresionantes de nuestra galaxia.",
      models: "Modelos 3D",
      modelsTitle: "Modelos Interactivos de Nebulosas",
      modelsDesc: "Explora modelos 3D de varias nebulosas (próximamente).",
      modelPlaceholder: "Los modelos 3D estarán disponibles en una actualización futura.",
      nebulae: [
        {
          name: "Nebulosa de Orión (M42)",
          type: "Nebulosa de emisión",
          distance: "1.344 años luz",
          constellation: "Orión",
          description:
            "Una de las nebulosas más brillantes en el cielo nocturno, visible a simple vista. Es un vivero estelar donde nacen nuevas estrellas.",
          size: "24 años luz de diámetro",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Nebulosa del Águila (M16)",
          type: "Nebulosa de emisión",
          distance: "7.000 años luz",
          constellation: "Serpens",
          description:
            "Famosa por sus 'Pilares de la Creación', columnas imponentes de gas y polvo donde se forman nuevas estrellas.",
          size: "70 años luz de diámetro",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Nebulosa del Cangrejo (M1)",
          type: "Remanente de supernova",
          distance: "6.500 años luz",
          constellation: "Tauro",
          description: "Los restos de una explosión de supernova observada por astrónomos chinos en 1054 d.C.",
          size: "11 años luz de diámetro",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Nebulosa del Anillo (M57)",
          type: "Nebulosa planetaria",
          distance: "2.283 años luz",
          constellation: "Lyra",
          description:
            "Un ejemplo clásico de nebulosa planetaria, formada cuando una estrella moribunda expulsó sus capas exteriores.",
          size: "1 año luz de diámetro",
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          name: "Nebulosa Cabeza de Caballo",
          type: "Nebulosa oscura",
          distance: "1.500 años luz",
          constellation: "Orión",
          description:
            "Una nebulosa oscura silueteada contra una brillante nebulosa de emisión, creando la forma distintiva de la cabeza de un caballo.",
          size: "3,5 años luz de diámetro",
          image: "/placeholder.svg?height=400&width=600",
        },
      ],
    },
  }

  const nebulaData = translations[language as "en" | "es"] || translations.en

  const famousNebulae = [
    {
      name: "Nebulosa de la Hélice (NGC 7293)",
      type: "Nebulosa planetaria",
      distance: "650 años luz",
      constellation: "Acuario",
      description: `Conocida como el "Ojo de Dios" por su apariencia, la Nebulosa de la Hélice es una de las nebulosas planetarias más cercanas a la Tierra. Se formó cuando una estrella similar al Sol expulsó sus capas exteriores al final de su vida.\nCuriosidad: Su estructura compleja incluye filamentos de gas y polvo que se extienden miles de millones de kilómetros.`,
      size: "2,5 años luz de diámetro",
      image: "/images/famous-nebulae/helix-nebula.jpg"
    },
    {
      name: "Nebulosa de la Mariposa (NGC 6302)",
      type: "Nebulosa planetaria bipolar",
      distance: "3.400 años luz",
      constellation: "Escorpio",
      description: `Esta nebulosa destaca por su forma de alas extendidas y su intenso colorido. En su centro hay una de las estrellas más calientes conocidas, con una temperatura superficial de unos 250.000 °C.\nDato interesante: La estrella central está oculta por un denso toro de polvo, lo que hace que la nebulosa brille intensamente en el infrarrojo.`,
      size: "3 años luz de diámetro",
      image: "/images/famous-nebulae/butterfly-nebula.jpg"
    },
    {
      name: "Nebulosa de la Tarántula (NGC 2070)",
      type: "Nebulosa de emisión",
      distance: "160.000 años luz",
      constellation: "Dorado",
      description: `Es la región de formación estelar más activa del Grupo Local de galaxias y se encuentra en la Gran Nube de Magallanes. Contiene algunas de las estrellas más masivas y luminosas conocidas.\nCuriosidad: Si estuviera tan cerca como la Nebulosa de Orión, ¡proyectaría sombras en la Tierra!`,
      size: "650 años luz de diámetro",
      image: "/images/famous-nebulae/tarantula-nebula.jpg"
    },
    {
      name: "Nebulosa de la Laguna (M8)",
      type: "Nebulosa de emisión",
      distance: "4.100 años luz",
      constellation: "Sagitario",
      description: `Famosa por su brillante región H II y su gran tamaño, la Nebulosa de la Laguna es visible a simple vista en cielos oscuros. Es un vivero estelar donde nacen nuevas estrellas.\nDato curioso: En su interior se encuentra la estructura conocida como "La Rueda de la Fortuna", una nube de gas en rotación.`,
      size: "110 años luz de diámetro",
      image: "/images/famous-nebulae/lagoon-nebula.jpg"
    },
    {
      name: "Nebulosa de la Burbuja (NGC 7635)",
      type: "Nebulosa de emisión",
      distance: "7.100 años luz",
      constellation: "Casiopea",
      description: `La forma esférica de esta nebulosa es causada por el viento estelar de una estrella masiva que empuja el gas circundante, creando una burbuja casi perfecta.\nCuriosidad: La estrella responsable de la burbuja es unas 45 veces más masiva que el Sol y su viento estelar viaja a más de 2.000 km/s.`,
      size: "7 años luz de diámetro",
      image: "/images/famous-nebulae/bubble-nebula.jpg"
    }
  ];

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header */}
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 py-0 md:py-0 overflow-hidden">
          {/* Video de fondo */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-fill object-center z-0 opacity-60 scale-150"
          >
            <source src="/videos/chaos-nebula.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg bg-black px-3 py-1 text-sm text-white font-space"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {t("header.home")}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-space px-4 py-2 rounded-lg">
                  {t("galaxies.nebulae") || "Nebulosas"}
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-helvetica px-4 py-2 rounded-lg">
                  {t("galaxies.nebulaeDesc") || "Observa las hermosas nubes interestelares de gas y polvo donde nacen y mueren las estrellas."}
                </p>
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
                    <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400">
                      {nebulaData.overview}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                      {nebulaData.overviewTitle}
                    </h2>
                    <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {nebulaData.overviewDesc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="flex items-center justify-center">
                  <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/5GJv8-cvfdo"
                      title="Nebulae Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Types of Nebulae */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                    {nebulaData.types}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {nebulaData.typesTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {nebulaData.typesDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
              {[
                {
                  title: nebulaData.emission,
                  description: nebulaData.emissionDesc,
                  icon: <Sparkles className="h-10 w-10 text-red-400" />,
                  delay: 0.1,
                  image: "/images/features/emission-nebula.jpg"
                },
                {
                  title: nebulaData.reflection,
                  description: nebulaData.reflectionDesc,
                  icon: <Star className="h-10 w-10 text-blue-400" />,
                  delay: 0.2,
                  image: "/images/features/reflection-nebula.jpg"
                },
                {
                  title: nebulaData.dark,
                  description: nebulaData.darkDesc,
                  icon: <Cloud className="h-10 w-10 text-zinc-400" />,
                  delay: 0.3,
                  image: "/images/features/dark-nebula.jpg"
                },
                {
                  title: nebulaData.planetary,
                  description: nebulaData.planetaryDesc,
                  icon: <Cloud className="h-10 w-10 text-green-400" />,
                  delay: 0.4,
                  image: "/images/features/planetary-nebula.jpg"
                },
                {
                  title: nebulaData.supernova,
                  description: nebulaData.supernovaDesc,
                  icon: <Sparkles className="h-10 w-10 text-yellow-400" />,
                  delay: 0.5,
                  image: "/images/features/supernova-nebula.jpg"
                },
              ].map((type: { title: string; description: string; icon: React.ReactNode; delay: number; image: string }, index: number) => (
                <ScrollReveal key={index} delay={type.delay}>
                  <div className="relative group h-full">
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-30 transition-all duration-500 pointer-events-none">
                      <Image
                        src={type.image}
                        alt={type.title}
                        fill
                        className="object-cover rounded-2xl shadow-2xl"
                      />
                    </div>
                    <div className="relative z-10 rounded-lg border border-zinc-800 bg-zinc-900 p-6 group-hover:opacity-40 transition-all duration-500 h-full flex flex-col">
                      <div className="mb-4">{type.icon}</div>
                      <h3 className="mb-2 text-xl font-bold">{type.title}</h3>
                      <p className="text-zinc-400 flex-1">{type.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Famous Nebulae */}
        <ParallaxSection speed={0.1} className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400">
                    {nebulaData.famous}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {nebulaData.famousTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {nebulaData.famousDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16">
              {/* Nebula Selector */}
              <div className="mb-8 flex flex-wrap justify-center gap-4">
                {famousNebulae.map((nebula: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedNebula(index)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedNebula === index
                        ? "bg-pink-600 text-white"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                    }`}
                  >
                    {nebula.name}
                  </button>
                ))}
              </div>

              {/* Selected Nebula Details */}
              <motion.div
                key={selectedNebula}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative h-[300px] overflow-hidden rounded-lg">
                    <Image
                      src={famousNebulae[selectedNebula].image}
                      alt={famousNebulae[selectedNebula].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold text-pink-400">{famousNebulae[selectedNebula].name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-zinc-500">{language === "es" ? "Tipo" : "Type"}</p>
                        <p className="font-medium">{famousNebulae[selectedNebula].type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">{language === "es" ? "Distancia" : "Distance"}</p>
                        <p className="font-medium">{famousNebulae[selectedNebula].distance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">{language === "es" ? "Constelación" : "Constellation"}</p>
                        <p className="font-medium">{famousNebulae[selectedNebula].constellation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">{language === "es" ? "Tamaño" : "Size"}</p>
                        <p className="font-medium">{famousNebulae[selectedNebula].size}</p>
                      </div>
                    </div>
                    <p className="text-zinc-400">{famousNebulae[selectedNebula].description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
