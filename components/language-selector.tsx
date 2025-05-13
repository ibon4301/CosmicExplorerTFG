"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".language-selector")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative language-selector">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md border border-zinc-700 bg-zinc-900 shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => changeLanguage("en")}
              className={`block w-full px-4 py-2 text-left text-sm ${
                language === "en" ? "bg-zinc-800 text-blue-400" : "text-white hover:bg-zinc-800"
              } transition-colors`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className={`block w-full px-4 py-2 text-left text-sm ${
                language === "es" ? "bg-zinc-800 text-blue-400" : "text-white hover:bg-zinc-800"
              } transition-colors`}
            >
              Español
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
