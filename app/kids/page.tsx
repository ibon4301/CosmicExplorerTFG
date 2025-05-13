"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import SpaceCharacter from "@/components/kids/space-character"
import InteractiveSolarSystem from "@/components/kids/interactive-solar-system"
import FunFactCard from "@/components/kids/fun-fact-card"
import SpaceGame from "@/components/kids/space-game"
import SpaceColoring from "@/components/kids/space-coloring"
import ConstellationConnect from "@/components/kids/constellation-connect"
import BuildRocket from "@/components/kids/build-rocket"
import MiniQuiz from "@/components/kids/mini-quiz"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rocket, Palette, Stars, Brain, Gamepad2 } from "lucide-react"
import Header from "@/components/header"

export default function KidsPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      {/* Header */}
      <Header />

      <motion.div
        className={`transition-opacity duration-1000 pt-16 ${isVisible ? "opacity-100" : "opacity-0"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section with animated stars */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-300 mb-4 font-orbitron tracking-wider">
                {t("kids.title")}
              </h1>
              <p className="text-2xl md:text-3xl text-blue-200 mb-8">{t("kids.subtitle")}</p>
            </motion.div>
          </div>
        </div>

        {/* Meet Astro Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-700 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8"
          >
            <SpaceCharacter />
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold text-yellow-300 mb-4">{t("kids.meetAstro")}</h2>
              <p className="text-2xl text-white">{t("kids.astroIntro")}</p>
            </div>
          </motion.div>
        </section>

        {/* Interactive Solar System */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-yellow-300 mb-4"
            >
              {t("kids.planetsTitle")}
            </motion.h2>
            <motion.p
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-blue-200"
            >
              {t("kids.planetsDesc")}
            </motion.p>
          </div>
          <InteractiveSolarSystem />
        </section>

        {/* Fun Facts Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-yellow-300 mb-12 text-center"
          >
            {t("kids.funFactsTitle")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FunFactCard
              title={t("kids.fact1Title")}
              description={t("kids.fact1Desc")}
              icon="star"
              color="bg-yellow-500"
              delay={0}
            />
            <FunFactCard
              title={t("kids.fact2Title")}
              description={t("kids.fact2Desc")}
              icon="volume-x"
              color="bg-purple-500"
              delay={0.2}
            />
            <FunFactCard
              title={t("kids.fact3Title")}
              description={t("kids.fact3Desc")}
              icon="moon"
              color="bg-blue-500"
              delay={0.4}
            />
          </div>
        </section>

        {/* Interactive Activities Tabs */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-yellow-300 mb-8 text-center"
          >
            {t("kids.interactiveActivities")}
          </motion.h2>

          <Tabs defaultValue="game" className="w-full">
            <TabsList className="grid grid-cols-5 max-w-3xl mx-auto mb-8 bg-indigo-800">
              <TabsTrigger value="game" className="data-[state=active]:bg-indigo-600">
                <Gamepad2 className="mr-2 h-4 w-4" />
                {t("kids.spaceGameTitle")}
              </TabsTrigger>
              <TabsTrigger value="coloring" className="data-[state=active]:bg-indigo-600">
                <Palette className="mr-2 h-4 w-4" />
                {t("kids.coloringTitle")}
              </TabsTrigger>
              <TabsTrigger value="constellations" className="data-[state=active]:bg-indigo-600">
                <Stars className="mr-2 h-4 w-4" />
                {t("kids.constellationsTitle")}
              </TabsTrigger>
              <TabsTrigger value="rocket" className="data-[state=active]:bg-indigo-600">
                <Rocket className="mr-2 h-4 w-4" />
                {t("kids.rocketTitle")}
              </TabsTrigger>
              <TabsTrigger value="quiz" className="data-[state=active]:bg-indigo-600">
                <Brain className="mr-2 h-4 w-4" />
                {t("kids.quizTitle")}
              </TabsTrigger>
            </TabsList>

            <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-3xl p-8 shadow-2xl">
              <TabsContent value="game" className="mt-0">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">{t("kids.spaceGameTitle")}</h3>
                <p className="text-lg text-blue-200 mb-6 text-center">{t("kids.spaceGameDesc")}</p>
                <SpaceGame />
              </TabsContent>

              <TabsContent value="coloring" className="mt-0">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">{t("kids.coloringTitle")}</h3>
                <p className="text-lg text-blue-200 mb-6 text-center">{t("kids.coloringDesc")}</p>
                <SpaceColoring />
              </TabsContent>

              <TabsContent value="constellations" className="mt-0">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">{t("kids.constellationsTitle")}</h3>
                <p className="text-lg text-blue-200 mb-6 text-center">{t("kids.constellationsDesc")}</p>
                <ConstellationConnect />
              </TabsContent>

              <TabsContent value="rocket" className="mt-0">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">{t("kids.rocketTitle")}</h3>
                <p className="text-lg text-blue-200 mb-6 text-center">{t("kids.rocketDesc")}</p>
                <BuildRocket />
              </TabsContent>

              <TabsContent value="quiz" className="mt-0">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">{t("kids.quizTitle")}</h3>
                <p className="text-lg text-blue-200 mb-6 text-center">{t("kids.quizDesc")}</p>
                <MiniQuiz />
              </TabsContent>
            </div>
          </Tabs>
        </section>

        {/* Call to Action Buttons */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <motion.a
              href="https://www.nasa.gov/kidsclub/index.html"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg text-center"
            >
              {t("kids.playMore")}
            </motion.a>
            <motion.a
              href="https://spaceplace.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg text-center"
            >
              {t("kids.learnMore")}
            </motion.a>
          </div>
        </section>
      </motion.div>

      <style jsx global>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  )
}
