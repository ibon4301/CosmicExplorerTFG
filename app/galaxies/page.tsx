"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import GalaxyModel from "@/components/galaxy-model"
import Header from "@/components/header"
import { motion } from "framer-motion"

// Reemplazar el footer existente con el componente Footer
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

// Añadir useState y useEffect para la animación de fade in
import { useState, useEffect } from "react"

// Dentro de la función del componente, añadir el estado y efecto para la animación
export default function GalaxiesPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [galaxyHoverStates, setGalaxyHoverStates] = useState([false, false, false, false])

  const handleGalaxyHover = (index: number, isHovered: boolean) => {
    setGalaxyHoverStates((prevStates) => {
      const newStates = [...prevStates]
      newStates[index] = isHovered
      return newStates
    })
  }

  // Efecto para el fade in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white font-space transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
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
            <source src="/videos/galaxies-hero.webm" type="video/webm" />
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-orbitron px-4 py-2 rounded-lg">
                  {t("galaxies.title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-helvetica px-4 py-2 rounded-lg">{t("galaxies.subtitle")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Galaxy Types */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                  {t("galaxies.classification")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-orbitron">
                  {t("galaxies.typesTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-helvetica">
                  {t("galaxies.typesSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image
                    src="/images/galaxies/spiral.jpg"
                    alt="Spiral Galaxy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-blue-400 font-orbitron">{t("galaxies.spiral")}</h3>
                  <p className="text-zinc-400 font-helvetica">{t("galaxies.spiralDesc")}</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image
                    src="/images/galaxies/elliptical.jpg"
                    alt="Elliptical Galaxy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-purple-400 font-orbitron">{t("galaxies.elliptical")}</h3>
                  <p className="text-zinc-400 font-helvetica">{t("galaxies.ellipticalDesc")}</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image
                    src="/images/galaxies/irregular.jpg"
                    alt="Irregular Galaxy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-pink-400 font-orbitron">{t("galaxies.irregular")}</h3>
                  <p className="text-zinc-400 font-helvetica">{t("galaxies.irregularDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milky Way */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {t("galaxies.ourHome")}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-orbitron">
                    {t("galaxies.milkyWayTitle")}
                  </h2>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-helvetica">
                    {t("galaxies.milkyWayDesc")}
                  </p>
                </div>
                <ul className="space-y-2 text-zinc-400 font-helvetica">
                  <li className="flex items-center">
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
                      className="mr-2 h-5 w-5 text-blue-400"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t("galaxies.milkyWayFacts.diameter")}
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-5 w-5 text-blue-400"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t("galaxies.milkyWayFacts.age")}
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-5 w-5 text-blue-400"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t("galaxies.milkyWayFacts.blackHole")}
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-5 w-5 text-blue-400"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t("galaxies.milkyWayFacts.location")}
                  </li>
                  <li className="flex items-center">
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
                      className="mr-2 h-5 w-5 text-blue-400"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t("galaxies.milkyWayFacts.orbit")}
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/galaxies/milky-way.jpg"
                  alt="Milky Way Galaxy"
                  className="w-full h-auto rounded-lg object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Famous Galaxies */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                  {t("galaxies.exploration")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-orbitron">
                  {t("galaxies.famousTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-helvetica">
                  {t("galaxies.famousSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Andrómeda */}
              <div
                className="relative rounded-lg border border-zinc-800 bg-zinc-950 p-6 h-[250px] cursor-pointer overflow-hidden"
                onMouseEnter={() => handleGalaxyHover(0, true)}
                onMouseLeave={() => handleGalaxyHover(0, false)}
              >
                {/* Imagen al hacer hover */}
                <Image
                  src="/images/galaxies/andromeda.jpg"
                  alt={t("galaxies.andromeda")}
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${galaxyHoverStates[0] ? 'opacity-100' : 'opacity-0'}`}
                  width={400}
                  height={250}
                />
                {/* Texto por defecto */}
                <div className={`relative z-10 transition-opacity duration-500 ${galaxyHoverStates[0] ? 'opacity-0' : 'opacity-100'}`}>
                  <h3 className="mb-2 text-xl font-bold text-yellow-400 font-orbitron">{t("galaxies.andromeda")}</h3>
                  <p className="text-zinc-400 font-helvetica">{t("galaxies.andromedaDesc")}</p>
                </div>
              </div>
              {/* Triángulo */}
              <div
                className="relative rounded-lg border border-zinc-800 bg-zinc-950 p-6 h-[250px] cursor-pointer overflow-hidden"
                onMouseEnter={() => handleGalaxyHover(1, true)}
                onMouseLeave={() => handleGalaxyHover(1, false)}
              >
                <Image
                  src="/images/galaxies/triangulum.jpg"
                  alt={t("galaxies.triangulum")}
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${galaxyHoverStates[1] ? 'opacity-100' : 'opacity-0'}`}
                  width={400}
                  height={250}
                />
                <div className={`relative z-10 transition-opacity duration-500 ${galaxyHoverStates[1] ? 'opacity-0' : 'opacity-100'}`}>
                  <h3 className="mb-2 text-xl font-bold text-green-400 font-orbitron">{t("galaxies.triangulum")}</h3>
                  <p className="text-zinc-400 font-helvetica">{t("galaxies.triangulumDesc")}</p>
                </div>
              </div>
              {/* Remolino */}
              <div
                className="relative rounded-lg border border-zinc-800 bg-zinc-950 p-6 h-[250px] cursor-pointer overflow-hidden"
                onMouseEnter={() => handleGalaxyHover(2, true)}
                onMouseLeave={() => handleGalaxyHover(2, false)}
              >
                <Image
                  src="/images/galaxies/whirlpool.jpg"
                  alt={t("galaxies.whirlpool")}
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${galaxyHoverStates[2] ? 'opacity-100' : 'opacity-0'}`}
                  width={400}
                  height={250}
                />
                <div className={`relative z-10 transition-opacity duration-500 ${galaxyHoverStates[2] ? 'opacity-0' : 'opacity-100'}`}>
                  <h3 className="mb-2 text-xl font-bold text-blue-400 font-orbitron">{t("galaxies.whirlpool")}</h3>
                  <p className="text-zinc-400 font-helvetica">{t("galaxies.whirlpoolDesc")}</p>
                </div>
              </div>
              {/* Sombrero */}
              <div
                className="relative rounded-lg border border-zinc-800 bg-zinc-950 p-6 h-[250px] cursor-pointer overflow-hidden"
                onMouseEnter={() => handleGalaxyHover(3, true)}
                onMouseLeave={() => handleGalaxyHover(3, false)}
              >
                <Image
                  src="/images/galaxies/sombrero.jpg"
                  alt={t("galaxies.sombrero")}
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${galaxyHoverStates[3] ? 'opacity-100' : 'opacity-0'}`}
                  width={400}
                  height={250}
                />
                <div className={`relative z-10 transition-opacity duration-500 ${galaxyHoverStates[3] ? 'opacity-0' : 'opacity-100'}`}>
                  <h3 className="mb-2 text-xl font-bold text-purple-400 font-orbitron">{t("galaxies.sombrero")}</h3>
                  <p className="text-zinc-400 font-helvetica">{t("galaxies.sombreroDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Galaxy Collisions */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400">
                  {t("galaxies.cosmicEvents")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-orbitron">
                  {t("galaxies.collisionsTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-helvetica">
                  {t("galaxies.collisionsSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                    <iframe
                      src="https://www.youtube.com/embed/fMNlt2FnHDg"
                      title="Colisión de Galaxias"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg border-none"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold text-pink-400 font-orbitron">{t("galaxies.futureTitle")}</h3>
                    <p className="text-zinc-400 font-helvetica">
                      En unos 4.500 millones de años, las galaxias de la Vía Láctea y Andrómeda colisionarán, creando una nueva galaxia elíptica a veces llamada 'Lactómeda'. Esta colisión no será destructiva para las estrellas individuales debido a las vastas distancias entre ellas, pero remodelará dramáticamente ambas galaxias.
                    </p>
                    <p className="text-zinc-400 font-helvetica">
                      Las colisiones de galaxias desencadenan una intensa formación estelar a medida que las nubes de gas se comprimen, y también pueden activar agujeros negros dormidos, convirtiéndolos en núcleos galácticos activos.
                    </p>
                  </div>
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
