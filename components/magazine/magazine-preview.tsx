"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function MagazinePreview() {
  const { language } = useLanguage()

  return (
    <Link 
      href="https://revista2ibon.netlify.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="block text-blue-400 hover:text-blue-300 text-sm mb-3 transition-colors"
    >
      {language === "es" ? "Ver revista de ejemplo" : "View sample magazine"}
    </Link>
  )
} 