"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import WelcomeScreen from "@/components/welcome-screen"
import Hero from "@/components/hero"
import Features from "@/components/features"
import AboutUs from "@/components/about-us"
import PlanetExplorer from "@/components/planet-explorer"
import ContactForm from "@/components/contact-form"

export default function HomePage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null)

  useEffect(() => {
    setIsClient(true)
    // Solo verificamos localStorage después de confirmar que estamos en el cliente
    const welcomeSeen = localStorage.getItem("hasSeenWelcome") === "true"
    setHasSeenWelcome(welcomeSeen)
  }, [])

  useEffect(() => {
    if (isClient && hasSeenWelcome) {
      router.push("/home")
    }
  }, [isClient, hasSeenWelcome, router])

  const handleStart = () => {
    // Marcar que el usuario ha visto la pantalla de bienvenida
    if (isClient) {
      localStorage.setItem("hasSeenWelcome", "true")
    }
    // Redirigir a la página principal
    router.push("/home")
  }

  // No renderizamos nada hasta que sepamos si el usuario ha visto la pantalla de bienvenida
  if (!isClient || hasSeenWelcome === null) {
    return <div className="h-screen w-screen bg-black"></div> // Pantalla de carga
  }

  // Si el usuario ya ha visto la pantalla de bienvenida, mostrar pantalla de carga mientras redirige
  if (hasSeenWelcome) {
    return <div className="h-screen w-screen bg-black"></div>
  }

  // Si el usuario no ha visto la pantalla de bienvenida, mostrarla
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Features />
      <AboutUs />
      <PlanetExplorer />
      <ContactForm />
    </main>
  )
}
