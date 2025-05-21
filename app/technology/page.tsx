"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Rocket, Satellite, Cpu, Atom, Globe, Shield } from "lucide-react"
import Header from "@/components/header"
import { motion, useScroll, useTransform } from "framer-motion"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import GlassmorphismCard from "@/components/glassmorphism-card"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"

export default function TechnologyPage() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("propulsion")
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

  // Translations for the technology page
  const translations = {
    en: {
      title: "Space Technology",
      subtitle: "Discover the cutting-edge technologies that make space exploration possible.",
      overview: "Overview",
      overviewTitle: "Pushing the Boundaries of Innovation",
      overviewDesc:
        "Space technology encompasses the wide range of equipment, devices, and systems designed for use in space exploration, satellite communications, and scientific research beyond Earth's atmosphere.",
      categories: "Categories",
      categoriesTitle: "Key Space Technologies",
      categoriesDesc: "Explore the various technologies that enable humanity to venture into the cosmos.",
      propulsion: "Propulsion Systems",
      propulsionDesc:
        "Technologies that enable spacecraft to move through space, from chemical rockets to ion thrusters and experimental drives.",
      communication: "Communication Systems",
      communicationDesc:
        "Advanced technologies that allow data transmission across the vast distances of space, connecting Earth with spacecraft and space stations.",
      computing: "Space Computing",
      computingDesc:
        "Radiation-hardened computers and specialized software designed to operate reliably in the harsh environment of space.",
      lifesupport: "Life Support Systems",
      lifesupportDesc:
        "Technologies that create habitable environments for astronauts, including air, water, and waste management systems.",
      navigation: "Navigation & Guidance",
      navigationDesc:
        "Systems that help spacecraft determine their position, orientation, and navigate through space with precision.",
      protection: "Protective Technologies",
      protectionDesc:
        "Shields and materials that protect spacecraft and astronauts from radiation, micrometeoroids, and extreme temperatures.",
      future: "Future",
      futureTitle: "The Future of Space Technology",
      futureDesc: "Emerging technologies that will shape the next generation of space exploration and colonization.",
      models: "3D Models",
      modelsTitle: "Interactive Technology Models",
      modelsDesc: "Explore 3D models of various space technologies (coming soon).",
      modelPlaceholder: "3D models will be available in a future update.",
      innovations: {
        title: "Recent Innovations",
        subtitle: "Breakthrough technologies changing the future of space exploration",
        reusable: {
          title: "Reusable Rockets",
          desc: "Spacecraft designed to return to Earth intact and be used for multiple missions, dramatically reducing the cost of space access.",
        },
        solar: {
          title: "Solar Sails",
          desc: "Propulsion systems that use the pressure of sunlight to push large ultra-thin mirrors through space without fuel.",
        },
        nuclear: {
          title: "Nuclear Propulsion",
          desc: "Advanced systems using nuclear reactions to achieve higher efficiency and faster travel times for deep space missions.",
        },
        quantum: {
          title: "Quantum Communication",
          desc: "Utilizing quantum entanglement for instantaneous and secure communication across vast distances in space.",
        },
      },
    },
    es: {
      title: "Tecnología Espacial",
      subtitle: "Descubre las tecnologías de vanguardia que hacen posible la exploración espacial.",
      overview: "Visión General",
      overviewTitle: "Empujando los Límites de la Innovación",
      overviewDesc:
        "La tecnología espacial abarca la amplia gama de equipos, dispositivos y sistemas diseñados para su uso en la exploración espacial, comunicaciones por satélite e investigación científica más allá de la atmósfera terrestre.",
      categories: "Categorías",
      categoriesTitle: "Tecnologías Espaciales Clave",
      categoriesDesc: "Explora las diversas tecnologías que permiten a la humanidad aventurarse en el cosmos.",
      propulsion: "Sistemas de Propulsión",
      propulsionDesc:
        "Tecnologías que permiten a las naves espaciales moverse a través del espacio, desde cohetes químicos hasta propulsores iónicos y motores experimentales.",
      communication: "Sistemas de Comunicación",
      communicationDesc:
        "Tecnologías avanzadas que permiten la transmisión de datos a través de las vastas distancias del espacio, conectando la Tierra con naves espaciales y estaciones espaciales.",
      computing: "Computación Espacial",
      computingDesc:
        "Computadoras endurecidas contra la radiación y software especializado diseñado para operar de manera confiable en el duro entorno del espacio.",
      lifesupport: "Sistemas de Soporte Vital",
      lifesupportDesc:
        "Tecnologías que crean entornos habitables para los astronautas, incluidos sistemas de gestión de aire, agua y residuos.",
      navigation: "Navegación y Orientación",
      navigationDesc:
        "Sistemas que ayudan a las naves espaciales a determinar su posición, orientación y navegar por el espacio con precisión.",
      protection: "Tecnologías de Protección",
      protectionDesc:
        "Escudos y materiales que protegen a las naves espaciales y astronautas de la radiación, micrometeoritos y temperaturas extremas.",
      future: "Futuro",
      futureTitle: "El Futuro de la Tecnología Espacial",
      futureDesc:
        "Tecnologías emergentes que darán forma a la próxima generación de exploración y colonización espacial.",
      models: "Modelos 3D",
      modelsTitle: "Modelos Interactivos de Tecnología",
      modelsDesc: "Explora modelos 3D de varias tecnologías espaciales (próximamente).",
      modelPlaceholder: "Los modelos 3D estarán disponibles en una actualización futura.",
      innovations: {
        title: "Innovaciones Recientes",
        subtitle: "Tecnologías revolucionarias que cambian el futuro de la exploración espacial",
        reusable: {
          title: "Cohetes Reutilizables",
          desc: "Naves espaciales diseñadas para regresar a la Tierra intactas y ser utilizadas para múltiples misiones, reduciendo drásticamente el costo del acceso al espacio.",
        },
        solar: {
          title: "Velas Solares",
          desc: "Sistemas de propulsión que utilizan la presión de la luz solar para empujar grandes espejos ultradelgados a través del espacio sin combustible.",
        },
        nuclear: {
          title: "Propulsión Nuclear",
          desc: "Sistemas avanzados que utilizan reacciones nucleares para lograr mayor eficiencia y tiempos de viaje más rápidos para misiones de espacio profundo.",
        },
        quantum: {
          title: "Comunicación Cuántica",
          desc: "Utilización del entrelazamiento cuántico para la comunicación instantánea y segura a través de vastas distancias en el espacio.",
        },
      },
    },
  }

  const techData = translations[language] || translations.en

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
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
            className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
            style={{ y }}
          />
          <motion.div
            className="absolute bottom-10 right-[10%] w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
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
                  className="inline-flex items-center rounded-lg bg-black px-3 py-1 text-sm text-white font-space border border-white shadow hover:bg-white hover:text-black transition-colors"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {language === "es" ? "Inicio" : "Home"}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-space">
                  {techData.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">{techData.subtitle}</p>
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
                    <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-400">
                      {techData.overview}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                      {techData.overviewTitle}
                    </h2>
                    <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {techData.overviewDesc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="flex items-center justify-center">
                  <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=800&width=1200"
                      alt="Space Technology Overview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Technology Categories with Interactive Tabs */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {techData.categories}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {techData.categoriesTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {techData.categoriesDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Tabs Navigation */}
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {[
                { id: "propulsion", icon: <Rocket className="h-4 w-4" />, label: techData.propulsion },
                { id: "communication", icon: <Satellite className="h-4 w-4" />, label: techData.communication },
                { id: "computing", icon: <Cpu className="h-4 w-4" />, label: techData.computing },
                { id: "lifesupport", icon: <Atom className="h-4 w-4" />, label: techData.lifesupport },
                { id: "navigation", icon: <Globe className="h-4 w-4" />, label: techData.navigation },
                { id: "protection", icon: <Shield className="h-4 w-4" />, label: techData.protection },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative h-[300px] overflow-hidden rounded-lg">
                    <Image src="/placeholder.svg?height=600&width=800" alt={activeTab} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold text-blue-400">
                      {
                        {
                          propulsion: techData.propulsion,
                          communication: techData.communication,
                          computing: techData.computing,
                          lifesupport: techData.lifesupport,
                          navigation: techData.navigation,
                          protection: techData.protection,
                        }[activeTab]
                      }
                    </h3>
                    <p className="text-zinc-400">
                      {
                        {
                          propulsion: techData.propulsionDesc,
                          communication: techData.communicationDesc,
                          computing: techData.computingDesc,
                          lifesupport: techData.lifesupportDesc,
                          navigation: techData.navigationDesc,
                          protection: techData.protectionDesc,
                        }[activeTab]
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Recent Innovations with Glassmorphism Cards */}
        <ParallaxSection speed={0.1} className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                    {techData.future}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {techData.innovations.title}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {techData.innovations.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: techData.innovations.reusable.title,
                  description: techData.innovations.reusable.desc,
                  icon: <Rocket className="h-10 w-10 text-blue-400" />,
                  delay: 0.1,
                },
                {
                  title: techData.innovations.solar.title,
                  description: techData.innovations.solar.desc,
                  icon: <Atom className="h-10 w-10 text-yellow-400" />,
                  delay: 0.2,
                },
                {
                  title: techData.innovations.nuclear.title,
                  description: techData.innovations.nuclear.desc,
                  icon: <Atom className="h-10 w-10 text-red-400" />,
                  delay: 0.3,
                },
                {
                  title: techData.innovations.quantum.title,
                  description: techData.innovations.quantum.desc,
                  icon: <Cpu className="h-10 w-10 text-purple-400" />,
                  delay: 0.4,
                },
              ].map((innovation, index) => (
                <ScrollReveal key={index} delay={innovation.delay}>
                  <GlassmorphismCard>
                    <div className="mb-4">{innovation.icon}</div>
                    <h3 className="mb-2 text-xl font-bold">{innovation.title}</h3>
                    <p className="text-zinc-400">{innovation.description}</p>
                  </GlassmorphismCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* 3D Models Section (Placeholder) */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                    {techData.models}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {techData.modelsTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {techData.modelsDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16">
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 p-8">
                <div className="text-center">
                  <Rocket className="mx-auto mb-4 h-16 w-16 text-zinc-600" />
                  <p className="text-xl font-medium text-zinc-500">{techData.modelPlaceholder}</p>
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
