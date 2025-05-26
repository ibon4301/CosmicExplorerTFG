"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, MessageCircle } from "lucide-react"
import Header from "@/components/header"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import ScrollReveal from "@/components/scroll-reveal"
import EbookComments from "@/components/EbookComments"
import EbookCommentsModalOnly from "@/components/EbookCommentsModalOnly"

interface Ebook {
  title: string
  description: string
  image: string
  downloadUrl: string
  category: string
}

export default function EbooksPage() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [groupedEbooks, setGroupedEbooks] = useState<{ [key: string]: Ebook[] }>({})
  const [commentsModal, setCommentsModal] = useState<{ open: boolean, ebook: Ebook | null }>({ open: false, ebook: null })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Función para obtener los PDFs del directorio
    const fetchEbooks = async () => {
      try {
        const response = await fetch('/api/ebooks')
        const data = await response.json()
        setEbooks(data)
        
        // Agrupar ebooks por categoría
        const grouped = data.reduce((acc: { [key: string]: Ebook[] }, book: Ebook) => {
          if (!acc[book.category]) {
            acc[book.category] = []
          }
          acc[book.category].push(book)
          return acc
        }, {})
        
        setGroupedEbooks(grouped)
      } catch (error) {
        console.error('Error fetching ebooks:', error)
      }
    }

    fetchEbooks()
  }, [])

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 py-0 md:py-0 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/ebooks/hero-bg.jpg"
              alt="NASA E-books Background"
              fill
              className="object-cover opacity-40"
            />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg bg-black px-3 py-1 text-sm text-white font-space"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {language === "es" ? "Inicio" : "Home"}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-space">
                  {t("ebooks.title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl font-helvetica">
                  {t("ebooks.subtitle")}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* E-books Grid by Category */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            {Object.entries(groupedEbooks).map(([category, books]) => (
              <div key={category} className="mb-16">
                <h2 className="text-3xl font-extrabold mb-10 text-blue-400 font-space border-b-4 border-blue-700 pb-2 tracking-wide uppercase drop-shadow-lg">
                  {category}
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                  {books.map((book, index) => (
                    <ScrollReveal key={index} direction={index % 2 === 0 ? "left" : "right"}>
                      <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 transition-colors hover:bg-zinc-900 h-full flex flex-col max-w-xl mx-auto">
                        <div className="relative h-48 w-full">
                          <Image
                            src={book.image || "/images/ebooks/default-cover.jpg"}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 rounded-t-lg"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="mb-2 text-xl font-bold text-white">{book.title}</h3>
                          <p className="mb-4 text-sm text-zinc-400 flex-grow">
                            {language === "es" ? `Descarga el PDF de ${book.title}` : `Download the PDF of ${book.title}`}
                          </p>
                          <a
                            href={book.downloadUrl}
                            className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 w-fit"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                            <span>{t("ebooks.download")}</span>
                          </a>
                          {/* Comentarios y valoraciones sin icono de bocadillo arriba */}
                          <EbookComments 
                            ebookTitle={book.title} 
                            ebookImage={book.image} 
                            ebookDescription={language === "es" ? `Descarga el PDF de ${book.title}` : `Download the PDF of ${book.title}`} 
                            onShowComments={() => setCommentsModal({ open: true, ebook: book })}
                          />
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de solo comentarios para la card */}
      {commentsModal.open && commentsModal.ebook && (
        <EbookCommentsModalOnly
          ebookTitle={commentsModal.ebook.title}
          ebookImage={commentsModal.ebook.image}
          ebookDescription={commentsModal.ebook.description}
          onClose={() => setCommentsModal({ open: false, ebook: null })}
        />
      )}
    </div>
  )
} 