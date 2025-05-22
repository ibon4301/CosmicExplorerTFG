"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, X } from "lucide-react"
import Header from "@/components/header"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
// Reemplazar el footer existente con el componente Footer
import Footer from "@/components/footer"

export default function BlackHolesQuizPage() {
  const { t, language } = useLanguage()
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Efecto para el fade in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const translations = {
    en: {
      title: "Black Holes Quiz",
      subtitle: "Test your knowledge about these mysterious cosmic phenomena.",
      backToQuizzes: "Back to Quizzes",
      results: "Quiz Results",
      scored: "You scored",
      outOf: "out of 5!",
      tryAgain: "Try Again",
      backToMainQuiz: "Back to Main Quiz",
      submit: "Submit Answers",
      questions: [
        {
          question: "What is a black hole?",
          options: [
            "A star that appears black",
            "A region of space where gravity is so strong that nothing can escape",
            "A hole in the fabric of the universe",
            "A theoretical concept with no real evidence",
          ],
          correct: "A region of space where gravity is so strong that nothing can escape",
          explanation:
            "A black hole is a region of spacetime where gravity is so strong that nothing, no particles or even electromagnetic radiation such as light, can escape from it.",
        },
        {
          question: "What is at the center of a black hole?",
          options: ["A neutron star", "A singularity", "A wormhole", "A quasar"],
          correct: "A singularity",
          explanation:
            "According to general relativity, a black hole contains a singularity at its center, a point where matter is infinitely dense and space-time curves infinitely.",
        },
        {
          question: "What is the 'event horizon' of a black hole?",
          options: [
            "The boundary beyond which nothing can escape",
            "The center of the black hole",
            "The outer edge of the accretion disk",
            "The point where time stops",
          ],
          correct: "The boundary beyond which nothing can escape",
          explanation:
            "The event horizon is the boundary defining the region of space around a black hole from which nothing (including light) can escape. Once something crosses the event horizon, it will inevitably be drawn into the black hole.",
        },
        {
          question: "Which scientist is most associated with the modern theory of black holes?",
          options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Carl Sagan"],
          correct: "Stephen Hawking",
          explanation:
            "While Einstein's theory of general relativity predicted black holes, Stephen Hawking made groundbreaking contributions to our understanding of black holes, including the discovery of Hawking radiation, which suggests that black holes can emit radiation and eventually evaporate.",
        },
        {
          question: "What was the name of the first black hole ever imaged?",
          options: ["Sagittarius A*", "M87*", "Cygnus X-1", "TON 618"],
          correct: "M87*",
          explanation:
            "In 2019, the Event Horizon Telescope collaboration released the first direct image of a black hole, specifically the supermassive black hole at the center of galaxy M87, called M87*.",
        },
      ],
    },
    es: {
      title: "Cuestionario de Agujeros Negros",
      subtitle: "Pon a prueba tus conocimientos sobre estos misteriosos fenómenos cósmicos.",
      backToQuizzes: "Volver a Cuestionarios",
      results: "Resultados del Cuestionario",
      scored: "Has obtenido",
      outOf: "de 5!",
      tryAgain: "Intentar de Nuevo",
      backToMainQuiz: "Volver al Cuestionario Principal",
      submit: "Enviar Respuestas",
      questions: [
        {
          question: "¿Qué es un agujero negro?",
          options: [
            "Una estrella que parece negra",
            "Una región del espacio donde la gravedad es tan fuerte que nada puede escapar",
            "Un agujero en el tejido del universo",
            "Un concepto teórico sin evidencia real",
          ],
          correct: "Una región del espacio donde la gravedad es tan fuerte que nada puede escapar",
          explanation:
            "Un agujero negro es una región del espacio-tiempo donde la gravedad es tan fuerte que nada, ni partículas ni radiación electromagnética como la luz, puede escapar de él.",
        },
        {
          question: "¿Qué hay en el centro de un agujero negro?",
          options: ["Una estrella de neutrones", "Una singularidad", "Un agujero de gusano", "Un quásar"],
          correct: "Una singularidad",
          explanation:
            "Según la relatividad general, un agujero negro contiene una singularidad en su centro, un punto donde la materia es infinitamente densa y el espacio-tiempo se curva infinitamente.",
        },
        {
          question: "¿Qué es el 'horizonte de eventos' de un agujero negro?",
          options: [
            "El límite más allá del cual nada puede escapar",
            "El centro del agujero negro",
            "El borde exterior del disco de acreción",
            "El punto donde el tiempo se detiene",
          ],
          correct: "El límite más allá del cual nada puede escapar",
          explanation:
            "El horizonte de eventos es el límite que define la región del espacio alrededor de un agujero negro desde la cual nada (incluida la luz) puede escapar. Una vez que algo cruza el horizonte de eventos, inevitablemente será atraído hacia el agujero negro.",
        },
        {
          question: "¿Qué científico está más asociado con la teoría moderna de los agujeros negros?",
          options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Carl Sagan"],
          correct: "Stephen Hawking",
          explanation:
            "Aunque la teoría de la relatividad general de Einstein predijo los agujeros negros, Stephen Hawking hizo contribuciones revolucionarias a nuestra comprensión de los agujeros negros, incluido el descubrimiento de la radiación de Hawking, que sugiere que los agujeros negros pueden emitir radiación y eventualmente evaporarse.",
        },
        {
          question: "¿Cuál fue el nombre del primer agujero negro jamás fotografiado?",
          options: ["Sagitario A*", "M87*", "Cygnus X-1", "TON 618"],
          correct: "M87*",
          explanation:
            "En 2019, la colaboración del Telescopio del Horizonte de Eventos publicó la primera imagen directa de un agujero negro, específicamente el agujero negro supermasivo en el centro de la galaxia M87, llamado M87*.",
        },
      ],
    },
  }

  const quizData = translations[language] || translations.en

  const correctAnswers = quizData.questions.reduce((acc, q, index) => {
    acc[`q${index + 1}`] = q.correct
    return acc
  }, {})

  const explanations = quizData.questions.reduce((acc, q, index) => {
    acc[`q${index + 1}`] = q.explanation
    return acc
  }, {})

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let newScore = 0
    Object.keys(correctAnswers).forEach((question) => {
      if (answers[question] === correctAnswers[question]) {
        newScore++
      }
    })

    setScore(newScore)
    setSubmitted(true)

    // Scroll to top to see results
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getResultClass = (question, option) => {
    if (!submitted) return ""

    if (correctAnswers[question] === option) {
      return "bg-green-900/30 border-green-500"
    }

    if (answers[question] === option && correctAnswers[question] !== option) {
      return "bg-red-900/30 border-red-500"
    }

    return ""
  }

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
                  href="/quiz"
                  className="inline-flex items-center rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {quizData.backToQuizzes}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-space">
                  {quizData.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">{quizData.subtitle}</p>
              </div>
            </motion.div>
          </div>

          {submitted && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="container mt-8 px-4 md:px-6"
            >
              <div className="mx-auto max-w-3xl rounded-lg border border-pink-500 bg-pink-950/20 p-6">
                <h2 className="text-2xl font-bold text-pink-400">{quizData.results}</h2>
                <p className="mt-2 text-xl">
                  {quizData.scored} <span className="font-bold text-pink-400">{score}</span> {quizData.outOf}
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setAnswers({ q1: "", q2: "", q3: "", q4: "", q5: "" })
                      setScore(0)
                    }}
                    className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    {quizData.tryAgain}
                  </button>
                  <Link
                    href="/quiz"
                    className="rounded-md bg-pink-600 px-4 py-2 font-medium text-white transition-colors hover:bg-pink-700"
                  >
                    {quizData.backToMainQuiz}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* Quiz Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto max-w-3xl rounded-lg border border-zinc-800 bg-zinc-950 p-8"
            >
              <div className="mb-8 space-y-2">
                <h2 className="text-2xl font-bold text-pink-400">{quizData.title}</h2>
                <p className="text-zinc-400">{quizData.subtitle}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {quizData.questions.map((q, qIndex) => (
                  <motion.div
                    key={qIndex}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + qIndex * 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-medium">{`${qIndex + 1}. ${q.question}`}</h3>
                    <div className="grid gap-2">
                      {q.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={`rounded-md border border-zinc-800 p-3 transition-colors hover:bg-zinc-900 ${getResultClass(`q${qIndex + 1}`, option)}`}
                        >
                          <label className="flex cursor-pointer items-center">
                            <input
                              type="radio"
                              name={`q${qIndex + 1}`}
                              value={option}
                              checked={answers[`q${qIndex + 1}`] === option}
                              onChange={() => handleAnswerChange(`q${qIndex + 1}`, option)}
                              className="h-4 w-4 text-pink-600"
                              disabled={submitted}
                            />
                            <span className="ml-2">{option}</span>
                            {submitted && correctAnswers[`q${qIndex + 1}`] === option && (
                              <Check className="ml-auto h-5 w-5 text-green-500" />
                            )}
                            {submitted &&
                              answers[`q${qIndex + 1}`] === option &&
                              correctAnswers[`q${qIndex + 1}`] !== option && (
                                <X className="ml-auto h-5 w-5 text-red-500" />
                              )}
                          </label>
                        </div>
                      ))}
                      {submitted && (
                        <div className="mt-2 rounded-md bg-zinc-900 p-3 text-sm text-zinc-300">
                          <strong className="text-pink-400">Explanation:</strong> {explanations[`q${qIndex + 1}`]}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {!submitted && (
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    type="submit"
                    className="mt-8 w-full rounded-md bg-pink-600 px-4 py-2 font-medium text-white transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
                  >
                    {quizData.submit}
                  </motion.button>
                )}
              </form>
            </motion.div>
          </div>
        </section>

        {/* Other Quizzes */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                  {language === "es" ? "Más Cuestionarios" : "More Quizzes"}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                  {language === "es" ? "Explora Más Cuestionarios" : "Explore More Quizzes"}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {language === "es"
                    ? "Pon a prueba tus conocimientos en diferentes áreas de la ciencia espacial."
                    : "Test your knowledge in different areas of space science."}
                </p>
              </div>
            </motion.div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="mb-2 text-xl font-bold text-blue-400">
                  {language === "es" ? "Cuestionario del Sistema Solar" : "Solar System Quiz"}
                </h3>
                <p className="mb-4 text-zinc-400">
                  {language === "es"
                    ? "Pon a prueba tus conocimientos sobre los planetas, lunas y otros objetos de nuestro sistema solar."
                    : "Test your knowledge about the planets, moons, and other objects in our solar system."}
                </p>
                <Link
                  href="/quiz/solar-system"
                  className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  {language === "es" ? "Comenzar Cuestionario" : "Start Quiz"}
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
                    className="ml-1 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="mb-2 text-xl font-bold text-purple-400">
                  {language === "es" ? "Cuestionario de Galaxias" : "Galaxies Quiz"}
                </h3>
                <p className="mb-4 text-zinc-400">
                  {language === "es"
                    ? "Desafíate con preguntas sobre diferentes tipos de galaxias y sus propiedades."
                    : "Challenge yourself with questions about different types of galaxies and their properties."}
                </p>
                <Link
                  href="/quiz/galaxies"
                  className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300"
                >
                  {language === "es" ? "Comenzar Cuestionario" : "Start Quiz"}
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
                    className="ml-1 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="mb-2 text-xl font-bold text-green-400">
                  {language === "es" ? "Cuestionario General" : "General Space Quiz"}
                </h3>
                <p className="mb-4 text-zinc-400">
                  {language === "es"
                    ? "Pon a prueba tus conocimientos generales sobre el espacio y la astronomía."
                    : "Test your general knowledge about space and astronomy."}
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300"
                >
                  {language === "es" ? "Comenzar Cuestionario" : "Start Quiz"}
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
                    className="ml-1 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* Reemplazar el footer existente con el componente Footer */}
      <Footer />
    </div>
  )
}
