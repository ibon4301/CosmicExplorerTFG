"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PlanetDetails from "@/components/planet-details"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import SolarSystemView from "@/components/SolarSystemView"

// Add these styles to your globals.css or use inline styles
const styles = {
  perspective: {
    perspective: "1000px",
  },
  backfaceHidden: {
    backfaceVisibility: "hidden",
  },
}

// Hook para saber si estamos en cliente
function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}

// Hook para detectar móvil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

export default function SolarSystemPage() {
  const { language, t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [factHoverStates, setFactHoverStates] = useState([false, false, false, false, false, false])
  const controlsRef = useRef<any>(null)
  const isClient = useIsClient();
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Refs for scroll animations
  const [explorerRef, explorerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [detailsRef, detailsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [factsRef, factsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleFactHover = (index: number, isHovered: boolean) => {
    setFactHoverStates((prevStates) => {
      const newStates = [...prevStates]
      newStates[index] = isHovered
      return newStates
    })
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white font-helvetica transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
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
            <source src="/videos/solar-system-hero.webm" type="video/webm" />
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
                  href="/home"
                  className="inline-flex items-center rounded-lg bg-black px-3 py-1 text-sm text-white font-helvetica"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {t("header.home")}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-orbitron drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] px-4 py-2 rounded-lg">
                  {t("solarSystem.title")}
                </h1>
                
                <p className="mx-auto max-w-[700px] text-white md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] px-4 py-2 rounded-lg font-helvetica">{t("solarSystem.subtitle")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Planet Explorer */}
        <section ref={explorerRef} className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={explorerInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400 font-orbitron">
                  {t("solarSystem.interactive")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-orbitron">
                  {t("solarSystem.exploreTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-helvetica">
                  {t("solarSystem.exploreSubtitle")}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={explorerInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 h-[600px] w-full rounded-lg border border-zinc-800 bg-zinc-950"
            >
              {/* Mostrar el modelo 3D solo en cliente y no móvil */}
              {isClient && !isMobile && (
                <SolarSystemView ref={controlsRef} modelUrl="/models/solar_system.glb" />
              )}
              {/* Mostrar mensaje alternativo en móvil */}
              {isClient && isMobile && (
                <div className="flex items-center justify-center h-full text-zinc-400 text-lg font-helvetica p-8">
                  {t("solarSystem.no3dMobile")}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Planet Details */}
        <section ref={detailsRef} className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={detailsInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-orbitron">
                  {t("solarSystem.planetDetails")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-helvetica">
                  {t("solarSystem.planetDetailsSubtitle")}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={detailsInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
            >
              <PlanetDetails language={language} />
            </motion.div>
          </div>
        </section>

        {/* Solar System Facts */}
        <section ref={factsRef} className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={factsInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400 font-orbitron">
                  {t("solarSystem.facts.title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-orbitron">
                  {t("solarSystem.facts.title")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-helvetica">
                  {t("solarSystem.facts.subtitle")}
                </p>
              </div>
            </motion.div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: t("solarSystem.facts.sun"),
                  description: t("solarSystem.facts.sunDesc"),
                  color: "yellow",
                  delay: 0,
                  image: "/images/facts/sun_fact.jpg",
                },
                {
                  title: t("solarSystem.facts.rings"),
                  description: t("solarSystem.facts.ringsDesc"),
                  color: "amber",
                  delay: 0.1,
                  image: "/images/facts/rings_fact.jpg",
                },
                {
                  title: t("solarSystem.facts.dwarfPlanets"),
                  description: t("solarSystem.facts.dwarfPlanetsDesc"),
                  color: "pink",
                  delay: 0.2,
                  image: "/images/facts/dwarf_planets_fact.jpg",
                },
                {
                  title: t("solarSystem.facts.asteroidBelt"),
                  description: t("solarSystem.facts.asteroidBeltDesc"),
                  color: "gray",
                  delay: 0.3,
                  image: "/images/facts/asteroid_belt_fact.jpg",
                },
                {
                  title: t("solarSystem.facts.kuiperBelt"),
                  description: t("solarSystem.facts.kuiperBeltDesc"),
                  color: "indigo",
                  delay: 0.4,
                  image: "/images/facts/kuiper_belt_fact.jpg",
                },
                {
                  title: t("solarSystem.facts.moons"),
                  description: t("solarSystem.facts.moonsDesc"),
                  color: "blue",
                  delay: 0.5,
                  image: "/images/facts/moons_fact.jpg",
                },
              ].map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={factsInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 0.6, delay: fact.delay }}
                  className={`rounded-lg border border-zinc-800 bg-zinc-950 p-6 h-[250px] perspective-1000 overflow-hidden`}
                  onMouseEnter={() => handleFactHover(index, true)}
                  onMouseLeave={() => handleFactHover(index, false)}
                >
                  <motion.div
                    className="w-full h-full relative"
                    initial={false}
                    animate={{ rotateY: factHoverStates[index] ? 180 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: 0.5,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front side - Facts */}
                    <motion.div
                      className="absolute w-full h-full backface-hidden flex flex-col justify-center"
                      style={{
                        backfaceVisibility: "hidden",
                        zIndex: factHoverStates[index] ? 0 : 1,
                      }}
                    >
                      <h3 className={`mb-2 text-xl font-bold text-${fact.color}-400 font-orbitron`}>{fact.title}</h3>
                      <p className="text-zinc-400 font-helvetica">{fact.description}</p>
                    </motion.div>

                    {/* Back side - Image */}
                    <motion.div
                      className="absolute w-full h-full backface-hidden flex items-center justify-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        zIndex: factHoverStates[index] ? 1 : 0,
                      }}
                    >
                      <div className="w-full h-full overflow-hidden rounded-lg">
                        <img
                          src={fact.image || "/placeholder.svg"}
                          alt={fact.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                          <h3 className="text-white text-lg font-bold font-orbitron">{fact.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
