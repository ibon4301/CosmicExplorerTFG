"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Rocket, Flag, Clock, Users, Target, Star } from "lucide-react"
import Header from "@/components/header"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"

export default function MissionsPage() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  // Fade in effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Translations for the missions page
  const translations = {
    en: {
      title: "Space Missions",
      subtitle: "Discover the most ambitious journeys of humanity through space exploration.",
      overview: "Overview",
      overviewTitle: "Historic Space Achievements",
      overviewDesc:
        "From the first steps on the Moon to the exploration of Mars, space missions have pushed the boundaries of human achievement and scientific discovery. Each mission represents a milestone in our understanding of the cosmos.",
    },
    es: {
      title: "Misiones Espaciales",
      subtitle: "Descubre los viajes más ambiciosos de la humanidad a través de la exploración espacial.",
      overview: "Visión General",
      overviewTitle: "Logros Espaciales Históricos",
      overviewDesc:
        "Desde los primeros pasos en la Luna hasta la exploración de Marte, las misiones espaciales han expandido los límites del logro humano y el descubrimiento científico. Cada misión representa un hito en nuestra comprensión del cosmos.",
    },
  }

  const missionsData = translations[language as keyof typeof translations]

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
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          >
            <source src="/videos/missions-hero.mp4" type="video/mp4" />
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
                  {language === "es" ? "Inicio" : "Home"}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-space px-4 py-2 rounded-lg">
                  {missionsData.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-helvetica px-4 py-2 rounded-lg">
                  {missionsData.subtitle}
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
                    <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                      {missionsData.overview}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                      {missionsData.overviewTitle}
                    </h2>
                    <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {missionsData.overviewDesc}
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
                      src="https://www.youtube.com/embed/yfUnkkKRZpk"
                      title="Historic Space Achievements"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Historic Missions */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                  {t("missions.history")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("missions.historicTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("missions.historicSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image 
                    src="/images/missions/apollo11.jpg" 
                    alt="Apollo 11 - First Moon Landing" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 text-sm text-zinc-500">{t("missions.apollo11Date")}</div>
                  <h3 className="mb-2 text-xl font-bold text-blue-400">{t("missions.apollo11")}</h3>
                  <p className="text-zinc-400">{t("missions.apollo11Desc")}</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image
                    src="/images/missions/voyager.jpg"
                    alt="Voyager Missions - Interstellar Exploration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 text-sm text-zinc-500">{t("missions.voyagerDate")}</div>
                  <h3 className="mb-2 text-xl font-bold text-purple-400">{t("missions.voyager")}</h3>
                  <p className="text-zinc-400">{t("missions.voyagerDesc")}</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image
                    src="/images/missions/hubble.jpg"
                    alt="Hubble Space Telescope - Deep Space Observations"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 text-sm text-zinc-500">{t("missions.hubbleDate")}</div>
                  <h3 className="mb-2 text-xl font-bold text-green-400">{t("missions.hubble")}</h3>
                  <p className="text-zinc-400">{t("missions.hubbleDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mars Exploration */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-red-500/10 px-3 py-1 text-sm text-red-400">
                  {t("missions.mars")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("missions.marsTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("missions.marsSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <h3 className="mb-2 text-xl font-bold text-red-400">{t("missions.rovers")}</h3>
                    <p className="mb-4 text-zinc-400">{t("missions.roversDesc")}</p>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-red-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>{t("missions.sojourner")}</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-red-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>{t("missions.spirit")}</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-red-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>{t("missions.curiosity")}</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-red-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>{t("missions.perseverance")}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <h3 className="mb-2 text-xl font-bold text-orange-400">Mars Helicopters</h3>
                    <p className="mb-4 text-zinc-400">
                      Una serie de logros históricos en la exploración aérea de Marte:
                    </p>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-orange-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>Primer Vuelo (2021): El 19 de abril, Ingenuity realizó el primer vuelo controlado en otro planeta.</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-orange-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>Tecnología Pionera: Diseñado específicamente para volar en la delgada atmósfera marciana, con una densidad del 1% respecto a la Tierra.</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-orange-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>Misión Extendida: Ha superado todas las expectativas, completando múltiples vuelos y proporcionando vistas aéreas únicas de Marte.</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-orange-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>Capacidades Técnicas: Equipado con cámaras de navegación, altímetros, sensores de inclinación y un sistema de control autónomo para adaptarse a las condiciones marcianas.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid gap-8">
                  <div className="relative h-[400px] overflow-hidden rounded-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/7zpojhD4hpI"
                      title="Mars Rovers Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="relative h-[400px] overflow-hidden rounded-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/20vUNgRdB4o"
                      title="Mars Helicopter Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current and Future Missions */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                  {t("missions.future")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("missions.currentFutureTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("missions.currentFutureSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:bg-zinc-900/50 transition-colors">
                <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/missions/jwst.jpg"
                    alt="James Webb Space Telescope"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-cyan-400 group-hover:text-cyan-300">{t("missions.jwst")}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300">{t("missions.jwstDesc")}</p>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:bg-zinc-900/50 transition-colors">
                <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/missions/artemis.jpg"
                    alt="Artemis Mission"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-blue-400 group-hover:text-blue-300">{t("missions.artemis")}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300">{t("missions.artemisDesc")}</p>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:bg-zinc-900/50 transition-colors">
                <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/missions/europa-clipper.jpg"
                    alt="Europa Clipper Mission"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-purple-400 group-hover:text-purple-300">{t("missions.europaClipper")}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300">{t("missions.europaClipperDesc")}</p>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:bg-zinc-900/50 transition-colors">
                <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/missions/mars-sample.jpg"
                    alt="Mars Sample Return"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-red-400 group-hover:text-red-300">{t("missions.marsSampleReturn")}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300">{t("missions.marsSampleReturnDesc")}</p>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:bg-zinc-900/50 transition-colors">
                <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/missions/davinci.jpg"
                    alt="DAVINCI Mission"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-green-400 group-hover:text-green-300">{t("missions.davinci")}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300">{t("missions.davinciDesc")}</p>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 hover:bg-zinc-900/50 transition-colors">
                <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/missions/dragonfly.jpg"
                    alt="Dragonfly Mission"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-yellow-400 group-hover:text-yellow-300">{t("missions.dragonfly")}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300">{t("missions.dragonflyDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Private Space Companies */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-500/10 px-3 py-1 text-sm text-orange-400">
                  {t("missions.commercial")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("missions.privateTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("missions.privateSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="absolute inset-0 z-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <Image
                    src="/images/missions/spacex.jpg"
                    alt="SpaceX Missions"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="mb-4 text-xl font-bold text-orange-400 group-hover:text-orange-300">{t("missions.spacex")}</h3>
                  <p className="mb-4 text-zinc-400 group-hover:text-zinc-200">{t("missions.spacexDesc1")}</p>
                  <p className="text-zinc-400 group-hover:text-zinc-200">{t("missions.spacexDesc2")}</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="absolute inset-0 z-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <Image
                    src="/images/missions/blue-origin.jpg"
                    alt="Blue Origin Missions"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="mb-4 text-xl font-bold text-blue-400 group-hover:text-blue-300">{t("missions.blueOrigin")}</h3>
                  <p className="mb-4 text-zinc-400 group-hover:text-zinc-200">{t("missions.blueOriginDesc1")}</p>
                  <p className="text-zinc-400 group-hover:text-zinc-200">{t("missions.blueOriginDesc2")}</p>
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
