"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import enTranslations from "@/translations/en.json"
import esTranslations from "@/translations/es.json"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const translations = {
  en: enTranslations,
  es: esTranslations,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>(typeof window !== 'undefined' ? localStorage.getItem('language') || 'es' : 'es')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Obtener el idioma del localStorage o usar el predeterminado
    const savedLanguage = localStorage.getItem("language") || "en"
    setLanguage(savedLanguage)
  }, [])

  const changeLanguage = (lang: string) => {
    if (isClient) {
      localStorage.setItem("language", lang)
    }
    setLanguage(lang)
  }

  // Función para obtener traducciones
  const t = (key: string): string => {
    // Dividir la clave por puntos para acceder a objetos anidados
    const keys = key.split(".")
    let translation: any = translations[language]

    // Navegar por el objeto de traducciones
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k]
      } else {
        // Si no se encuentra la traducción, devolver la clave
        return key
      }
    }

    return translation
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
