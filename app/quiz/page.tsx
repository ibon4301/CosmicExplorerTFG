"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, X } from "lucide-react"
import Header from "@/components/header"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

// Reemplazar el footer existente con el componente Footer
import Footer from "@/components/footer"

export default function QuizPage() {
  const { language } = useLanguage()
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
      title: "Space Quiz Challenge",
      subtitle: "Test your knowledge of the cosmos with our interactive space quiz.",
      backToHome: "Home",
      results: "Quiz Results",
      scored: "You scored",
      outOf: "out of 5!",
      tryAgain: "Try Again",
      tryAnother: "Try Another Quiz",
      submit: "Submit Answers",
      moreQuizzes: "More Challenges",
      exploreMore: "Explore More Quizzes",
      testKnowledge: "Test your knowledge in different areas of space science.",
      solarSystem: {
        title: "Solar System Quiz",
        description: "Test your knowledge about the planets, moons, and other objects in our solar system.",
      },
      galaxies: {
        title: "Galaxies Quiz",
        description: "Challenge yourself with questions about different types of galaxies and their properties.",
      },
      blackHoles: {
        title: "Black Holes Quiz",
        description: "Dive into the mysteries of black holes with this challenging quiz.",
      },
      startQuiz: "Start Quiz",
      correctAnswers: {
        q1: "Jupiter",
        q2: "Jupiter",
        q3: "Milky Way",
        q4: "The Sun",
        q5: "Voyager 1",
      },
      explanations: {
        q1: "Jupiter has the most moons in our solar system with 79 confirmed moons. Saturn is in second place with 82 confirmed moons.",
        q2: "Jupiter is the largest planet in our solar system. It has a diameter of about 139,820 km, more than 11 times the diameter of Earth.",
        q3: "Our solar system is located in the Milky Way galaxy, a barred spiral galaxy containing over 100 billion stars.",
        q4: "The Sun is the closest star to Earth, at an average distance of about 150 million kilometers. Proxima Centauri is the next closest star at 4.2 light-years away.",
        q5: "Voyager 1 became the first human-made object to leave our solar system and enter interstellar space in 2012, although Pioneer 10 was the first to cross Neptune's orbit.",
      },
      questions: [
        {
          question: "Which planet in our solar system has the most moons?",
          options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        },
        {
          question: "What is the largest planet in our solar system?",
          options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        },
        {
          question: "What is the name of the galaxy we live in?",
          options: ["Andromeda", "Milky Way", "Triangulum", "Whirlpool"],
        },
        {
          question: "What is the closest star to Earth?",
          options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"],
        },
        {
          question: "What was the first human-made object to leave the solar system?",
          options: ["Apollo 11", "Voyager 1", "Pioneer 10", "New Horizons"],
        },
      ],
    },
    es: {
      title: "Desafío de Cuestionario Espacial",
      subtitle: "Pon a prueba tus conocimientos del cosmos con nuestro cuestionario espacial interactivo.",
      backToHome: "Inicio",
      results: "Resultados del Cuestionario",
      scored: "Has obtenido",
      outOf: "de 5!",
      tryAgain: "Intentar de Nuevo",
      tryAnother: "Probar Otro Cuestionario",
      submit: "Enviar Respuestas",
      moreQuizzes: "Más Desafíos",
      exploreMore: "Explora Más Cuestionarios",
      testKnowledge: "Pon a prueba tus conocimientos en diferentes áreas de la ciencia espacial.",
      solarSystem: {
        title: "Cuestionario del Sistema Solar",
        description:
          "Pon a prueba tus conocimientos sobre los planetas, lunas y otros objetos de nuestro sistema solar.",
      },
      galaxies: {
        title: "Cuestionario de Galaxias",
        description: "Desafíate con preguntas sobre diferentes tipos de galaxias y sus propiedades.",
      },
      blackHoles: {
        title: "Cuestionario de Agujeros Negros",
        description: "Sumérgete en los misterios de los agujeros negros con este desafiante cuestionario.",
      },
      startQuiz: "Comenzar Cuestionario",
      correctAnswers: {
        q1: "Júpiter",
        q2: "Júpiter",
        q3: "Vía Láctea",
        q4: "El Sol",
        q5: "Voyager 1",
      },
      explanations: {
        q1: "Júpiter tiene la mayor cantidad de lunas en nuestro sistema solar con 79 lunas confirmadas. Saturno está en segundo lugar con 82 lunas confirmadas.",
        q2: "Júpiter es el planeta más grande de nuestro sistema solar. Tiene un diámetro de aproximadamente 139,820 km, más de 11 veces el diámetro de la Tierra.",
        q3: "Nuestro sistema solar está ubicado en la galaxia Vía Láctea, una galaxia espiral barrada que contiene más de 100 mil millones de estrellas.",
        q4: "El Sol es la estrella más cercana a la Tierra, a una distancia promedio de unos 150 millones de kilómetros. Próxima Centauri es la siguiente estrella más cercana a 4.2 años luz de distancia.",
        q5: "Voyager 1 se convirtió en el primer objeto hecho por humanos en abandonar nuestro sistema solar y entrar en el espacio interestelar en 2012, aunque Pioneer 10 fue el primero en cruzar la órbita de Neptuno.",
      },
      questions: [
        {
          question: "¿Qué planeta de nuestro sistema solar tiene más lunas?",
          options: ["Tierra", "Júpiter", "Saturno", "Neptuno"],
        },
        {
          question: "¿Cuál es el planeta más grande de nuestro sistema solar?",
          options: ["Tierra", "Júpiter", "Saturno", "Neptuno"],
        },
        {
          question: "¿Cuál es el nombre de la galaxia en la que vivimos?",
          options: ["Andrómeda", "Vía Láctea", "Triángulo", "Remolino"],
        },
        {
          question: "¿Cuál es la estrella más cercana a la Tierra?",
          options: ["Próxima Centauri", "Alpha Centauri", "El Sol", "Sirio"],
        },
        {
          question: "¿Cuál fue el primer objeto hecho por humanos en abandonar el sistema solar?",
          options: ["Apollo 11", "Voyager 1", "Pioneer 10", "New Horizons"],
        },
      ],
    },
  }

  const quizData = translations[language] || translations.en

  const correctAnswers = quizData.correctAnswers
  const explanations = quizData.explanations

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
                  href="/home"
                  className="inline-flex items-center rounded-lg bg-black px-3 py-1 text-sm text-white font-space border border-white shadow hover:bg-white hover:text-black transition-colors"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {quizData.backToHome}
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
              <div className="mx-auto max-w-3xl rounded-lg border border-green-500 bg-green-950/20 p-6">
                <h2 className="text-2xl font-bold text-green-400">{quizData.results}</h2>
                <p className="mt-2 text-xl">
                  {quizData.scored} <span className="font-bold text-green-400">{score}</span> {quizData.outOf}
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
                    href="/quiz/solar-system"
                    className="rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
                  >
                    {quizData.tryAnother}
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
                <h2 className="text-2xl font-bold text-green-400">{quizData.title}</h2>
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
                              className="h-4 w-4 text-green-600"
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
                          <strong className="text-green-400">Explanation:</strong> {explanations[`q${qIndex + 1}`]}
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
                    className="mt-8 w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
                  >
                    {quizData.submit}
                  </motion.button>
                )}
              </form>
            </motion.div>
          </div>
        </section>

        {/* More Quizzes */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                  {quizData.moreQuizzes}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                  {quizData.exploreMore}
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {quizData.testKnowledge}
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
                <h3 className="mb-2 text-xl font-bold text-blue-400">{quizData.solarSystem.title}</h3>
                <p className="mb-4 text-zinc-400">{quizData.solarSystem.description}</p>
                <Link
                  href="/quiz/solar-system"
                  className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  {quizData.startQuiz}
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
                <h3 className="mb-2 text-xl font-bold text-purple-400">{quizData.galaxies.title}</h3>
                <p className="mb-4 text-zinc-400">{quizData.galaxies.description}</p>
                <Link
                  href="/quiz/galaxies"
                  className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300"
                >
                  {quizData.startQuiz}
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
                <h3 className="mb-2 text-xl font-bold text-pink-400">{quizData.blackHoles.title}</h3>
                <p className="mb-4 text-zinc-400">{quizData.blackHoles.description}</p>
                <Link
                  href="/quiz/black-holes"
                  className="inline-flex items-center text-sm font-medium text-pink-400 hover:text-pink-300"
                >
                  {quizData.startQuiz}
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
