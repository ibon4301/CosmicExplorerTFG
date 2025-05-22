"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const quizQuestions = {
  en: [
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correctAnswer: "Mercury",
    },
    {
      question: "What is the name of our galaxy?",
      options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
      correctAnswer: "Milky Way",
    },
    {
      question: "How many planets are in our Solar System?",
      options: ["7", "8", "9", "10"],
      correctAnswer: "8",
    },
    {
      question: "What is a shooting star?",
      options: ["A star moving fast", "A meteor", "A planet", "A satellite"],
      correctAnswer: "A meteor",
    },
    {
      question: "Which planet has a big red spot?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter",
    },
  ],
  es: [
    {
      question: "¿Qué planeta está más cerca del Sol?",
      options: ["Venus", "Mercurio", "Tierra", "Marte"],
      correctAnswer: "Mercurio",
    },
    {
      question: "¿Cómo se llama nuestra galaxia?",
      options: ["Andrómeda", "Vía Láctea", "Triángulo", "Sombrero"],
      correctAnswer: "Vía Láctea",
    },
    {
      question: "¿Cuántos planetas hay en nuestro Sistema Solar?",
      options: ["7", "8", "9", "10"],
      correctAnswer: "8",
    },
    {
      question: "¿Qué es una estrella fugaz?",
      options: ["Una estrella moviéndose rápido", "Un meteoro", "Un planeta", "Un satélite"],
      correctAnswer: "Un meteoro",
    },
    {
      question: "¿Qué planeta tiene una gran mancha roja?",
      options: ["Marte", "Venus", "Júpiter", "Saturno"],
      correctAnswer: "Júpiter",
    },
  ],
}

export default function MiniQuiz() {
  const { t, language } = useLanguage()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions = language === "en" ? quizQuestions.en : quizQuestions.es
  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answer) => {
    if (showResult) return

    setSelectedAnswer(answer)
    setShowResult(true)

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  return (
    <div className="bg-indigo-900 rounded-xl p-6 max-w-md mx-auto">
      {!quizCompleted ? (
        <>
          <div className="mb-4 flex justify-between items-center">
            <span className="text-yellow-300 font-bold">
              {t("kids.questionNumber", { current: currentQuestionIndex + 1, total: questions.length })}
            </span>
            <span className="text-white font-bold">
              {t("kids.score")}: {score}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-6">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-3 rounded-lg text-left ${
                  selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-indigo-700 text-white hover:bg-indigo-600"
                } ${showResult && option === currentQuestion.correctAnswer ? "bg-green-500 text-white" : ""}`}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {showResult && option === currentQuestion.correctAnswer && <Check className="text-white" size={20} />}
                  {showResult && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                    <X className="text-white" size={20} />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">{t("kids.quizComplete")}</h3>
          <p className="text-xl text-white mb-6">
            {t("kids.yourScore")}: {score}/{questions.length}
          </p>

          {score === questions.length ? (
            <p className="text-green-400 mb-6">{t("kids.perfectScore")}</p>
          ) : score >= questions.length / 2 ? (
            <p className="text-blue-400 mb-6">{t("kids.goodScore")}</p>
          ) : (
            <p className="text-orange-400 mb-6">{t("kids.tryAgainMessage")}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-6 py-3 rounded-full"
            onClick={restartQuiz}
          >
            {t("kids.playAgain")}
          </motion.button>
        </div>
      )}
    </div>
  )
}
