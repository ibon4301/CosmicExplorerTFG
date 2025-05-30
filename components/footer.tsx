"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthModal from "./AuthModal"
import MagazinePreview from "./magazine/magazine-preview"

export default function Footer() {
  const { language, t } = useLanguage()
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  function handleSubscribeClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
    } else {
      router.push("/checkout");
    }
  }

  const content = {
    es: {
      about: "Sobre Nosotros",
      contact: "Contacto",
      collaborate: "Colabora",
      terms: "Términos y Condiciones",
      privacy: "Política de Privacidad",
      newsletter: "Revista",
      rights: "Todos los derechos reservados",
      social: "Síguenos"
    },
    en: {
      about: "About Us",
      contact: "Contact",
      collaborate: "Collaborate",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      newsletter: "Magazine",
      rights: "All rights reserved",
      social: "Follow us"
    }
  }

  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo y descripción */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-blue-400"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span className="text-2xl font-bold text-blue-400 font-space">Cosmic Explorer</span>
          </div>
          <p className="text-zinc-400 text-sm">
            {language === "es"
              ? "Tu portal para explorar el universo, aprender sobre ciencia y descubrir recursos únicos."
              : "Your portal to explore the universe, learn about science, and discover unique resources."}
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" className="text-zinc-400 hover:text-blue-400 transition-colors text-2xl">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub" className="text-zinc-400 hover:text-blue-400 transition-colors text-2xl">
              <FaGithub />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="text-zinc-400 hover:text-blue-400 transition-colors text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>
        {/* Secciones */}
        <div>
          <h4 className="font-bold text-white mb-2">{language === "es" ? "Secciones" : "Sections"}</h4>
          <ul className="space-y-1">
            <li><Link href="/ebooks" className="hover:text-blue-400 transition-colors">E-books</Link></li>
            <li><Link href="/black-holes" className="hover:text-blue-400 transition-colors">{language === "es" ? "Agujeros Negros" : "Black Holes"}</Link></li>
            <li><Link href="/solar-system" className="hover:text-blue-400 transition-colors">{language === "es" ? "Sistema Solar" : "Solar System"}</Link></li>
            <li><Link href="/galaxies" className="hover:text-blue-400 transition-colors">{language === "es" ? "Galaxias" : "Galaxies"}</Link></li>
            <li><Link href="/technology" className="hover:text-blue-400 transition-colors">{language === "es" ? "Tecnología Espacial" : "Space Technology"}</Link></li>
            <li><Link href="/quiz" className="hover:text-blue-400 transition-colors">Quiz</Link></li>
          </ul>
        </div>
        {/* Compañía */}
        <div>
          <h4 className="font-bold text-white mb-2">{language === "es" ? "Compañía" : "Company"}</h4>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-blue-400 transition-colors">{language === "es" ? "Sobre nosotros" : "About us"}</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">{language === "es" ? "Contacto" : "Contact"}</Link></li>
            <li><Link href="/collaborate" className="hover:text-blue-400 transition-colors">{language === "es" ? "Colabora" : "Collaborate"}</Link></li>
            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">{language === "es" ? "Términos y condiciones" : "Terms & Conditions"}</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">{language === "es" ? "Política de privacidad" : "Privacy Policy"}</Link></li>
          </ul>
        </div>
        {/* Revista */}
        <div>
          <h4 className="font-bold text-white mb-2">{language === "es" ? "Revista" : "Magazine"}</h4>
          <p className="text-zinc-400 text-sm mb-2">
            {language === "es"
              ? "Suscríbete para recibir novedades, recursos y noticias del cosmos."
              : "Subscribe to receive news, resources and cosmic updates."}
          </p>
          <MagazinePreview />
          <button
            onClick={handleSubscribeClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors block text-center w-full"
          >
            {language === "es" ? "Suscribirse" : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="text-center text-xs text-zinc-500 mt-8">
        © {new Date().getFullYear()} Cosmic Explorer. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
      </div>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode="login" />
    </footer>
  )
}
