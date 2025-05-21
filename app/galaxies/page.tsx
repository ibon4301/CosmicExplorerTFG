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
      className={`flex min-h-screen flex-col bg-black text-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header */}
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-b from-black to-zinc-900 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg bg-black px-3 py-1 text-sm text-white font-space border border-white shadow hover:bg-white hover:text-black transition-colors"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {t("header.home")}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t("galaxies.title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">{t("galaxies.subtitle")}</p>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("galaxies.typesTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("galaxies.typesSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Spiral Galaxy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-blue-400">{t("galaxies.spiral")}</h3>
                  <p className="text-zinc-400">{t("galaxies.spiralDesc")}</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Elliptical Galaxy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-purple-400">{t("galaxies.elliptical")}</h3>
                  <p className="text-zinc-400">{t("galaxies.ellipticalDesc")}</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Irregular Galaxy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-pink-400">{t("galaxies.irregular")}</h3>
                  <p className="text-zinc-400">{t("galaxies.irregularDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milky Way 3D Model */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                  {t("galaxies.interactive")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("galaxies.milkyWayTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("galaxies.milkyWaySubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <GalaxyModel />
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
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {t("galaxies.milkyWayTitle")}
                  </h2>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t("galaxies.milkyWayDesc")}
                  </p>
                </div>
                <ul className="space-y-2 text-zinc-400">
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
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Milky Way Galaxy"
                    fill
                    className="object-cover"
                  />
                </div>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("galaxies.famousTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("galaxies.famousSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: t("galaxies.andromeda"),
                  description: t("galaxies.andromedaDesc"),
                  color: "yellow",
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: t("galaxies.triangulum"),
                  description: t("galaxies.triangulumDesc"),
                  color: "green",
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: t("galaxies.whirlpool"),
                  description: t("galaxies.whirlpoolDesc"),
                  color: "blue",
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: t("galaxies.sombrero"),
                  description: t("galaxies.sombreroDesc"),
                  color: "purple",
                  image: "/placeholder.svg?height=300&width=400",
                },
              ].map((galaxy, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 h-[250px] perspective-1000 cursor-pointer"
                  onMouseEnter={() => handleGalaxyHover(index, true)}
                  onMouseLeave={() => handleGalaxyHover(index, false)}
                >
                  <motion.div
                    className="w-full h-full relative"
                    initial={false}
                    animate={{ rotateY: galaxyHoverStates[index] ? 180 : 0 }}
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
                        zIndex: galaxyHoverStates[index] ? 0 : 1,
                      }}
                    >
                      <h3 className={`mb-2 text-xl font-bold text-${galaxy.color}-400`}>{galaxy.title}</h3>
                      <p className="text-zinc-400">{galaxy.description}</p>
                    </motion.div>

                    {/* Back side - Image */}
                    <motion.div
                      className="absolute w-full h-full backface-hidden flex items-center justify-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        zIndex: galaxyHoverStates[index] ? 1 : 0,
                      }}
                    >
                      <div className="w-full h-full overflow-hidden rounded-lg">
                        <img
                          src={galaxy.image || "/placeholder.svg"}
                          alt={galaxy.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("galaxies.collisionsTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("galaxies.collisionsSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      alt="Galaxy Collision"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold text-pink-400">{t("galaxies.futureTitle")}</h3>
                    <p className="text-zinc-400">{t("galaxies.futureDesc")}</p>
                    <p className="text-zinc-400">{t("galaxies.collisionEffects")}</p>
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
