"use client"

import AboutUs from "@/components/about-us"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-grow">
        <div className="relative">
          {/* Fondo con efecto de estrellas */}
          <div className="absolute inset-0 bg-[url('/stars.png')] opacity-20"></div>
          
          {/* Contenido principal */}
          <div className="relative z-10">
            <AboutUs />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 