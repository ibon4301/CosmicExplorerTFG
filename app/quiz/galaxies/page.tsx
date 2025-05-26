"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, X } from "lucide-react"
import Header from "@/components/header"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

// Reemplazar el footer existente con el componente Footer
import Footer from "@/components/footer"

// Dentro de la función del componente, añadir el estado y efecto para la animación
export default function GalaxiesQuizPage() {
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
      title: "Galaxies Quiz",
      subtitle: "Test your knowledge about galaxies and cosmic structures.",
      backToQuizzes: "Back to Quizzes",
      results: "Quiz Results",
      scored: "You scored",
      outOf: "out of 5!",
      tryAgain: "Try Again",
      backToMainQuiz: "Back to Main Quiz",
      submit: "Submit Answers",
      questions: [
        {
          question: "What is the name of our galaxy?",
          options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
          correct: "Milky Way",
          explanation: "Our galaxy is called the Milky Way, a barred spiral galaxy containing our solar system.",
        },
        {
          question: "Approximately how many galaxies are estimated to exist in the observable universe?",
          options: ["Thousands", "Millions", "Billions", "Trillions"],
          correct: "Trillions",
          explanation:
            "Recent studies suggest there may be up to 2 trillion galaxies in the observable universe, far more than previously thought.",
        },
        {
          question: "What is the most common type of galaxy in the universe?",
          options: ["Spiral", "Elliptical", "Irregular", "Lenticular"],
          correct: "Elliptical",
          explanation:
            "Elliptical galaxies are the most common type in the universe. They have a smooth, oval appearance and contain mostly older stars.",
        },
        {
          question: "What galaxy is on a collision course with the Milky Way?",
          options: ["Andromeda", "Triangulum", "Large Magellanic Cloud", "Sombrero"],
          correct: "Andromeda",
          explanation:
            "The Andromeda Galaxy is expected to collide with the Milky Way in about 4.5 billion years, forming a new galaxy sometimes called 'Milkomeda'.",
        },
        {
          question: "What is at the center of most large galaxies?",
          options: ["A neutron star", "A supermassive black hole", "A quasar", "A pulsar"],
          correct: "A supermassive black hole",
          explanation:
            "Most large galaxies, including our Milky Way, have a supermassive black hole at their center. Ours is called Sagittarius A*.",
        },
      ],
    },
    es: {
      title: "Cuestionario de Galaxias",
      subtitle: "Pon a prueba tus conocimientos sobre galaxias y estructuras cósmicas.",
      backToQuizzes: "Volver a Cuestionarios",
      results: "Resultados del Cuestionario",
      scored: "Has obtenido",
      outOf: "de 5!",
      tryAgain: "Intentar de Nuevo",
      backToMainQuiz: "Volver al Cuestionario Principal",
      submit: "Enviar Respuestas",
      questions: [
        {
          question: "¿Cuál es el nombre de nuestra galaxia?",
          options: ["Andrómeda", "Vía Láctea", "Triángulo", "Sombrero"],
          correct: "Vía Láctea",
          explanation:
            "Nuestra galaxia se llama la Vía Láctea, una galaxia espiral barrada que contiene nuestro sistema solar.",
        },
        {
          question: "¿Aproximadamente cuántas galaxias se estima que existen en el universo observable?",
          options: ["Miles", "Millones", "Billones", "Trillones"],
          correct: "Trillones",
          explanation:
            "Estudios recientes sugieren que puede haber hasta 2 trillones de galaxias en el universo observable, muchas más de lo que se pensaba anteriormente.",
        },
        {
          question: "¿Cuál es el tipo de galaxia más común en el universo?",
          options: ["Espiral", "Elíptica", "Irregular", "Lenticular"],
          correct: "Elíptica",
          explanation:
            "Las galaxias elípticas son el tipo más común en el universo. Tienen una apariencia suave y ovalada y contienen principalmente estrellas más antiguas.",
        },
        {
          question: "¿Qué galaxia está en curso de colisión con la Vía Láctea?",
          options: ["Andrómeda", "Triángulo", "Gran Nube de Magallanes", "Sombrero"],
          correct: "Andrómeda",
          explanation:
            "Se espera que la Galaxia de Andrómeda colisione con la Vía Láctea en unos 4.5 mil millones de años, formando una nueva galaxia a veces llamada 'Lactómeda'.",
        },
        {
          question: "¿Qué hay en el centro de la mayoría de las galaxias grandes?",
          options: ["Una estrella de neutrones", "Un agujero negro supermasivo", "Un quásar", "Un púlsar"],
          correct: "Un agujero negro supermasivo",
          explanation:
            "La mayoría de las galaxias grandes, incluida nuestra Vía Láctea, tienen un agujero negro supermasivo en su centro. El nuestro se llama Sagitario A*.",
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
              <div className="mx-auto max-w-3xl rounded-lg border border-purple-500 bg-purple-950/20 p-6">
                <h2 className="text-2xl font-bold text-purple-400">{quizData.results}</h2>
                <p className="mt-2 text-xl">
                  {quizData.scored} <span className="font-bold text-purple-400">{score}</span> {quizData.outOf}
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
                    className="rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
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
                <h2 className="text-2xl font-bold text-purple-400">{quizData.title}</h2>
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
                              className="h-4 w-4 text-purple-600"
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
                          <strong className="text-purple-400">{language === 'es' ? 'Explicación:' : 'Explanation:'}</strong> {explanations[`q${qIndex + 1}`]}
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
                    className="mt-8 w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
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
                <h3 className="mb-2 text-xl font-bold text-pink-400">
                  {language === "es" ? "Cuestionario de Agujeros Negros" : "Black Holes Quiz"}
                </h3>
                <p className="mb-4 text-zinc-400">
                  {language === "es"
                    ? "Sumérgete en los misterios de los agujeros negros con este desafiante cuestionario."
                    : "Dive into the mysteries of black holes with this challenging quiz."}
                </p>
                <Link
                  href="/quiz/black-holes"
                  className="inline-flex items-center text-sm font-medium text-pink-400 hover:text-pink-300"
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
      <Footer />
    </div>
  )
}
