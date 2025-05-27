"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export default function NewsletterSignup() {
  const { language } = useLanguage()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error")
      setErrorMessage(
        language === "en" ? "Please enter a valid email address" : "Por favor, introduce un correo electrónico válido",
      )
      return
    }

    // Simulate API call
    setStatus("loading")

    setTimeout(() => {
      // Simulate successful subscription
      setStatus("success")
      setEmail("")

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    }, 1500)
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-black to-purple-950/30 -z-10">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
            backgroundPosition: "center",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-blue-900/30 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-3 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {language === "en"
                  ? "Stay Updated on Cosmic Discoveries"
                  : "Mantente Actualizado sobre Descubrimientos Cósmicos"}
              </motion.h2>
              <motion.p
                className="text-zinc-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {language === "en"
                  ? "Subscribe to our newsletter for the latest space news, events, and discoveries."
                  : "Suscríbete a nuestro boletín para recibir las últimas noticias, eventos y descubrimientos espaciales."}
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === "en" ? "Your email address" : "Tu correo electrónico"}
                  className="w-full px-6 py-4 pr-36 rounded-full bg-black border border-blue-900/50 text-white placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={status === "loading" || status === "success"}
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`absolute right-2 top-2 px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center justify-center ${
                    status === "loading"
                      ? "bg-blue-800 text-blue-200"
                      : status === "success"
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {status === "loading" ? (
                    <div className="animate-spin h-5 w-5 border-2 border-blue-200 border-t-transparent rounded-full" />
                  ) : status === "success" ? (
                    <>
                      <CheckCircle size={16} className="mr-1" />
                      {language === "en" ? "Subscribed" : "Suscrito"}
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-1" />
                      {language === "en" ? "Subscribe" : "Suscribirse"}
                    </>
                  )}
                </button>
              </div>

              {status === "error" && (
                <div className="mt-2 text-red-500 flex items-center text-sm">
                  <AlertCircle size={14} className="mr-1" />
                  {errorMessage}
                </div>
              )}

              {status === "success" && (
                <div className="mt-2 text-green-500 flex items-center text-sm">
                  <CheckCircle size={14} className="mr-1" />
                  {language === "en"
                    ? "Thank you for subscribing! Check your email for confirmation."
                    : "¡Gracias por suscribirte! Revisa tu correo electrónico para la confirmación."}
                </div>
              )}

              <p className="text-xs text-zinc-500 mt-4 text-center">
                {language === "en"
                  ? "We respect your privacy. Unsubscribe at any time."
                  : "Respetamos tu privacidad. Cancela tu suscripción en cualquier momento."}
              </p>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}
