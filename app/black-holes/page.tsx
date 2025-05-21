"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import BlackHoleModel from "@/components/black-hole-model"
import Header from "@/components/header"
import CustomCursor from "@/components/custom-cursor"
import { motion } from "framer-motion"
// Reemplazar el footer existente con el componente Footer
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

// Añadir useState y useEffect para la animación de fade in
import { useState, useEffect } from "react"

// Dentro de la función del componente, añadir el estado y efecto para la animación
export default function BlackHolesPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  // Efecto para el fade in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.add('blackhole-cursor');
    return () => {
      document.body.classList.remove('blackhole-cursor');
    };
  }, []);

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white font-space transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Custom Cursor */}
      {/* <CustomCursor /> */}

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
            <source src="/videos/black-hole-sun-moewalls-com.webm" type="video/webm" />
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
                  {t("blackHoles.title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-space px-4 py-2 rounded-lg">
                  {t("blackHoles.subtitle")}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Black Hole Model */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400">
                  {t("blackHoles.interactive")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("blackHoles.exploreTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("blackHoles.exploreSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <BlackHoleModel />
            </div>
          </div>
        </section>

        {/* What are Black Holes */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400">
                    {t("blackHoles.fundamentals")}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {t("blackHoles.whatAreTitle")}
                  </h2>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t("blackHoles.whatAreDesc1")}
                  </p>
                </div>
                <p className="text-zinc-400">{t("blackHoles.whatAreDesc2")}</p>
                <p className="text-zinc-400">{t("blackHoles.whatAreDesc3")}</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/features/bllackholem87.jpg"
                    alt="Black Hole Illustration"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                  {t("blackHoles.video")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("blackHoles.videoTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("blackHoles.videoSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src="https://www.youtube.com/embed/nJ4d4QEDOYM"
                title="Black Holes Explained"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </section>

        {/* Types of Black Holes */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                  {t("blackHoles.classification")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("blackHoles.typesTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("blackHoles.typesSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Stellar Black Hole */}
              <div className="relative group">
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-30 transition-all duration-500 pointer-events-none">
                  <Image
                    src="/images/features/stellarblackhole.jpg"
                    alt="Stellar Black Hole"
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="relative z-10 rounded-lg border border-zinc-800 bg-zinc-900 p-6 group-hover:opacity-40 transition-all duration-500">
                  <h3 className="mb-2 text-xl font-bold text-blue-400">{t("blackHoles.stellar")}</h3>
                  <p className="text-zinc-400">{t("blackHoles.stellarDesc")}</p>
                </div>
              </div>
              {/* Intermediate Black Hole */}
              <div className="relative group">
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-30 transition-all duration-500 pointer-events-none">
                  <Image
                    src="/images/features/intermediateblackhole.jpg"
                    alt="Intermediate Black Hole"
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="relative z-10 rounded-lg border border-zinc-800 bg-zinc-900 p-6 group-hover:opacity-40 transition-all duration-500">
                  <h3 className="mb-2 text-xl font-bold text-purple-400">{t("blackHoles.intermediate")}</h3>
                  <p className="text-zinc-400">{t("blackHoles.intermediateDesc")}</p>
                </div>
              </div>
              {/* Supermassive Black Hole */}
              <div className="relative group">
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-30 transition-all duration-500 pointer-events-none">
                  <Image
                    src="/images/features/massiveblackhole.jpg"
                    alt="Supermassive Black Hole"
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="relative z-10 rounded-lg border border-zinc-800 bg-zinc-900 p-6 group-hover:opacity-40 transition-all duration-500">
                  <h3 className="mb-2 text-xl font-bold text-pink-400">{t("blackHoles.supermassive")}</h3>
                  <p className="text-zinc-400">{t("blackHoles.supermassiveDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Horizon and Singularity */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                  {t("blackHoles.structure")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("blackHoles.horizonTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("blackHoles.horizonSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-4 text-xl font-bold text-yellow-400">{t("blackHoles.eventHorizon")}</h3>
                <p className="mb-4 text-zinc-400">{t("blackHoles.eventHorizonDesc1")}</p>
                <p className="text-zinc-400">{t("blackHoles.eventHorizonDesc2")}</p>
                <div className="my-4 rounded-md bg-zinc-900 p-4 text-center text-lg">
                  {t("blackHoles.eventHorizonFormula")}
                </div>
                <p className="text-zinc-400">{t("blackHoles.eventHorizonDesc3")}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-4 text-xl font-bold text-red-400">{t("blackHoles.singularity")}</h3>
                <p className="mb-4 text-zinc-400">{t("blackHoles.singularityDesc1")}</p>
                <p className="mb-4 text-zinc-400">{t("blackHoles.singularityDesc2")}</p>
                <p className="text-zinc-400">{t("blackHoles.singularityDesc3")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Black Hole Discoveries */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-400">
                  {t("blackHoles.discoveries")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("blackHoles.landmarkTitle")}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("blackHoles.landmarkSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-16 space-y-8">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                  <div className="relative h-[200px] w-full overflow-hidden rounded-2xl md:h-full">
                    <Image
                      src="/images/features/m87firstimage.jpg"
                      alt="First Black Hole Image"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-400">{t("blackHoles.firstImage")}</h3>
                    <p className="text-zinc-400">{t("blackHoles.firstImageDesc1")}</p>
                    <p className="text-zinc-400">{t("blackHoles.firstImageDesc2")}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                  <div className="relative h-[200px] w-full overflow-hidden rounded-2xl md:h-full">
                    <Image
                      src="/images/features/wavesblackhole.jpg"
                      alt="Gravitational Waves"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-400">{t("blackHoles.gravitationalWaves")}</h3>
                    <p className="text-zinc-400">{t("blackHoles.gravitationalWavesDesc1")}</p>
                    <p className="text-zinc-400">{t("blackHoles.gravitationalWavesDesc2")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        body.blackhole-cursor {
          cursor: url('/images/features/planet-cursor.png'), auto;
        }
      `}</style>
    </div>
  )
}
