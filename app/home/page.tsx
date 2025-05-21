"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCcw, Rocket } from "lucide-react"
import SpaceHero from "@/components/space-hero"
import FeatureCard from "@/components/feature-card"
import PlanetExplorer from "@/components/planet-explorer"
import MainHeader from "@/components/main-header"
import { useLanguage } from "@/contexts/language-context"
import CustomCursor from "@/components/custom-cursor"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import SpaceTimeline from "@/components/space-timeline"
import SpaceshipModel from "@/components/SpaceShipModel"

export default function HomePage() {
  const { language, t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  // Efecto de fade in al cargar la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Refs for scroll animations
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [planetExplorerRef, planetExplorerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // ----- MODIFICADO: Array de objetos para las naves -----
  const spaceshipModels = [
    { name: "Module Command of Apollo 11", url: "/models/apollo11.glb" },
    { name: "ISS", url: "/models/iss.glb" },
    { name: "Ingenuity Helicopter", url: "/models/Ingenuity.glb" },
    { name: "Perseverance", url: "/models/Perseverance.glb" },
    { name: "Shuttle", url: "/models/shuttle.glb" },
    { name: "Cassini Huygens", url: "/models/cassini.glb" },
    
   
  ]

  const [currentModelIndex, setCurrentModelIndex] = useState(0)

  const handlePreviousModel = () => {
    setCurrentModelIndex((prevIndex) =>
      prevIndex === 0 ? spaceshipModels.length - 1 : prevIndex - 1
    )
  }

  const handleNextModel = () => {
    setCurrentModelIndex((prevIndex) =>
      prevIndex === spaceshipModels.length - 1 ? 0 : prevIndex + 1
    )
  }

  const currentModel = spaceshipModels[currentModelIndex]
  // ----- FIN MODIFICADO -----

  const controlsRef = useRef<any>(null)

  // ----- NUEVO: Estado para la rotación del cohete -----
  const [rocketRotation, setRocketRotation] = useState(0)
  // ----- FIN NUEVO -----

  const handleResetCamera = () => {
    if (controlsRef.current && controlsRef.current.reset) {
      controlsRef.current.reset();
    }
    setRocketRotation((prevRotation) => prevRotation + 360);
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Header */}
      <MainHeader />

      {/* Hero Section with 3D Space Scene */}
      <section className="relative h-screen w-full pt-16">
        <SpaceHero />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 text-center md:px-6">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none font-space"
            >
              {t("home.hero.title")
                .split(" ")
                .map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className="text-blue-400">
                      {word}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  ),
                )}
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-4 max-w-[700px] text-lg text-zinc-400 md:text-xl"
            >
              {t("home.hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/solar-system"
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
              >
                {t("home.hero.startExploring")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Spaceship Section */}
      <section ref={planetExplorerRef} className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={planetExplorerInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                {t("home.spaceshipExplorer.badge")}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-space">
                {t("home.spaceshipExplorer.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {currentModel ? currentModel.name : t("home.spaceshipExplorer.subtitle")}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={planetExplorerInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-16 h-[500px] w-full"
          >
            {currentModel && currentModel.url && !currentModel.url.includes("placeholder_nave") ? (
              <SpaceshipModel ref={controlsRef} key={currentModel.url} modelExternalUrl={currentModel.url} />
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 text-center text-zinc-500">
                <p>
                  Modelo 3D no disponible. <br />
                  {currentModel && currentModel.url && currentModel.url.includes("placeholder_nave") ? "Por favor, configura las URLs reales de los modelos GLB." : "Verifica la URL del modelo."}
                </p>
              </div>
            )}

            {spaceshipModels.length > 1 && (
              <>
                <button
                  onClick={handlePreviousModel}
                  className="absolute left-1 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:bg-blue-600/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 md:left-3"
                  aria-label={t("home.spaceshipExplorer.prev")}
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={handleNextModel}
                  className="absolute right-1 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:bg-blue-600/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 md:right-3"
                  aria-label={t("home.spaceshipExplorer.next")}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </motion.div>

          {/* Botón de Reseteo */}
          {currentModel && currentModel.url && !currentModel.url.includes("placeholder_nave") && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleResetCamera}
                className="z-30 flex items-center rounded-lg bg-blue-600/80 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 ease-in-out hover:bg-blue-500/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                title={t("buttons.resetViewText") ?? "Resetear Vista"}
                aria-label={t("buttons.resetViewText") ?? "Resetear vista de la cámara"}
              >
                <motion.div
                  animate={{ rotate: rocketRotation }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="mr-2"
                  style={{ display: 'inline-block' }}
                >
                  <Rocket className="h-5 w-5" />
                </motion.div>
                {t("buttons.resetViewText")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="w-full bg-zinc-950 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={featuresInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                {t("home.features.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.features.subtitle")}
              </p>
            </div>
          </motion.div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            {[
              {
                title: t("home.features.blackHoles"),
                description: t("home.features.blackHolesDesc"),
                icon: "hole",
                href: "/black-holes",
                delay: 0,
              },
              {
                title: t("home.features.galaxies"),
                description: t("home.features.galaxiesDesc"),
                icon: "sparkles",
                href: "/galaxies",
                delay: 0.1,
              },
              {
                title: t("home.features.nebulae"),
                description: t("home.features.nebulaeDesc"),
                icon: "cloud",
                href: "/nebulae",
                delay: 0.2,
              },
              {
                title: t("home.features.exoplanets"),
                description: t("home.features.exoplanetsDesc"),
                icon: "globe",
                href: "/exoplanets",
                delay: 0.3,
              },
              {
                title: t("home.features.missions"),
                description: t("home.features.missionsDesc"),
                icon: "rocket",
                href: "/missions",
                delay: 0.4,
              },
              {
                title: t("home.features.technology"),
                description: t("home.features.technologyDesc"),
                icon: "cpu",
                href: "/technology",
                delay: 0.5,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={featuresInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  href={feature.href}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Timeline Section */}
      <SpaceTimeline />

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800 bg-black py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-blue-400 font-space">
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
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              Cosmic Explorer
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="/about" className="text-xs hover:underline hover:underline-offset-4">
                {t("footer.about")}
              </Link>
              <Link href="/contact" className="text-xs hover:underline hover:underline-offset-4">
                {t("footer.contact")}
              </Link>
              <Link href="/terms" className="text-xs hover:underline hover:underline-offset-4">
                {t("footer.terms")}
              </Link>
              <Link href="/privacy" className="text-xs hover:underline hover:underline-offset-4">
                {t("footer.privacy")}
              </Link>
            </nav>
          </div>
          <p className="text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Cosmic Explorer. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  )
}
