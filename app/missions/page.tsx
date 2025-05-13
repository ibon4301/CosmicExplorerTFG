"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import CustomCursor from "@/components/custom-cursor"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
// Añadir useState y useEffect para la animación de fade in
import { useState, useEffect } from "react"

// Dentro de la función del componente, añadir el estado y efecto para la animación
export default function MissionsPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

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
      {/* Custom Cursor */}
      <CustomCursor />

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
                  className="inline-flex items-center rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {t("header.home")}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t("missions.title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">{t("missions.subtitle")}</p>
              </div>
            </motion.div>
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
                  <Image src="/placeholder.svg?height=400&width=600" alt="Apollo 11" fill className="object-cover" />
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
                    src="/placeholder.svg?height=400&width=600"
                    alt="Voyager Missions"
                    fill
                    className="object-cover"
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
                    src="/placeholder.svg?height=400&width=600"
                    alt="Hubble Space Telescope"
                    fill
                    className="object-cover"
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
                    <h3 className="mb-2 text-xl font-bold text-orange-400">{t("missions.helicopters")}</h3>
                    <p className="text-zinc-400">{t("missions.ingenuity")}</p>
                  </div>
                </div>
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Mars Exploration"
                    fill
                    className="object-cover"
                  />
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
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-2 text-xl font-bold text-cyan-400">{t("missions.jwst")}</h3>
                <p className="text-zinc-400">{t("missions.jwstDesc")}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-2 text-xl font-bold text-blue-400">{t("missions.artemis")}</h3>
                <p className="text-zinc-400">{t("missions.artemisDesc")}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-2 text-xl font-bold text-purple-400">{t("missions.europaClipper")}</h3>
                <p className="text-zinc-400">{t("missions.europaClipperDesc")}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-2 text-xl font-bold text-red-400">{t("missions.marsSampleReturn")}</h3>
                <p className="text-zinc-400">{t("missions.marsSampleReturnDesc")}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-2 text-xl font-bold text-green-400">{t("missions.davinci")}</h3>
                <p className="text-zinc-400">{t("missions.davinciDesc")}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-2 text-xl font-bold text-yellow-400">{t("missions.dragonfly")}</h3>
                <p className="text-zinc-400">{t("missions.dragonflyDesc")}</p>
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
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-orange-400">{t("missions.spacex")}</h3>
                <p className="mb-4 text-zinc-400">{t("missions.spacexDesc1")}</p>
                <p className="text-zinc-400">{t("missions.spacexDesc2")}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="mb-4 text-xl font-bold text-blue-400">{t("missions.blueOrigin")}</h3>
                <p className="mb-4 text-zinc-400">{t("missions.blueOriginDesc1")}</p>
                <p className="text-zinc-400">{t("missions.blueOriginDesc2")}</p>
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
