"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, ChevronDown, ChevronRight, User, LogOut, Settings, Star, UserCircle, UserPlus } from "lucide-react"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import AuthModal from "@/components/AuthModal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const { t } = useLanguage()
  const headerRef = useRef<HTMLElement>(null)
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>("login")
  const [currentPath, setCurrentPath] = useState("")
  const isGoogleUser = user?.providerData.some(p => p.providerId === "google.com");

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen, userMenuOpen])

  const logoVariants = {
    hover: {
      rotate: 360,
      transition: { duration: 1, ease: "easeInOut" },
    },
  }

  const textVariants = {
    hover: {
      color: "#60a5fa",
      transition: { duration: 0.3 },
    },
  }

  const navLinks = [
    { 
      href: "/solar-system", 
      label: "header.solarSystem"
    },
    {
      href: "/planets",
      label: "header.planets",
      subItems: [
        { href: "/planets/mercury", label: "planets.mercury" },
        { href: "/planets/venus", label: "planets.venus" },
        { href: "/planets/earth", label: "planets.earth" },
        { href: "/planets/mars", label: "planets.mars" },
        { href: "/planets/jupiter", label: "planets.jupiter" },
        { href: "/planets/saturn", label: "planets.saturn" },
        { href: "/planets/uranus", label: "planets.uranus" },
        { href: "/planets/neptune", label: "planets.neptune" },
      ],
    },
    { href: "/galaxies", label: "header.galaxies" },
    { href: "/black-holes", label: "header.blackHoles" },
    { href: "/nebulae", label: "header.nebulae" },
    { href: "/exoplanets", label: "header.exoplanets" },
    { href: "/technology", label: "header.technology" },
    { href: "/missions", label: "header.missions" },
    { href: "/ebooks", label: "header.ebooks" },
    { href: "/quiz", label: "header.quiz" }
  ]

  return (
    <header ref={headerRef} className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md font-helvetica">
      <div className="w-full px-4 sm:max-w-7xl sm:mx-auto flex h-12 md:h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <motion.div whileHover="hover" variants={logoVariants} className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="h-6 w-6 text-blue-400"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </motion.div>
            <motion.span
              whileHover="hover"
              variants={textVariants}
              className="ml-2 text-xl font-bold text-blue-400 font-space leading-none"
            >
              Cosmic<br className="block md:hidden" /> Explorer
            </motion.span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <div className="relative" ref={userMenuRef}>
            <button
              className="flex items-center justify-center rounded-full p-2 hover:bg-zinc-800 transition-colors"
              onClick={() => setUserMenuOpen((v) => !v)}
              aria-label={t("account.profile.title")}
            >
              <UserCircle className="h-7 w-7 text-blue-400" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-50 animate-fade-in">
                {!user ? (
                  <>
                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-800 text-white"
                      onClick={() => { setAuthModalMode("login"); setShowAuthModal(true); setUserMenuOpen(false); }}
                    >
                      <User className="w-4 h-4" /> {t("account.login")}
                    </button>
                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-800 text-white"
                      onClick={() => { setAuthModalMode("register"); setShowAuthModal(true); setUserMenuOpen(false); }}
                    >
                      <UserPlus className="w-4 h-4" /> {t("account.register")}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 text-xs text-zinc-400 border-b border-zinc-800">
                      {user.displayName || user.email}
                    </div>
                    <Link
                      href="/profile"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-800 text-white"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" /> {t("account.profile.title")}
                    </Link>
                    <Link
                      href="/my-reviews"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-800 text-white"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Star className="w-4 h-4" /> {t("account.myReviews")}
                    </Link>
                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-800 text-red-400"
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                    >
                      <LogOut className="w-4 h-4" /> {t("account.logout")}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <button className="flex items-center justify-center rounded-md p-2" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">{t("header.toggleMenu")}</span>
          </button>
        </div>
      </div>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authModalMode} />

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-full px-4 bg-zinc-900 py-4">
            <nav className="flex flex-col space-y-4 items-start sm:items-end pl-2 pr-2">
              {navLinks.map((link) => (
                <div key={link.href} className="flex flex-col items-end">
                  {link.subItems ? (
                    <>
                      <button
                        className="flex items-center justify-between text-sm font-medium hover:text-blue-400 transition-colors font-helvetica"
                        onClick={() => toggleSection(link.href)}
                      >
                        <span>{t(link.label)}</span>
                        {expandedSection === link.href ? (
                          <ChevronDown className="h-4 w-4 ml-1" />
                        ) : (
                          <ChevronRight className="h-4 w-4 ml-1" />
                        )}
                      </button>
                      {expandedSection === link.href && (
                        <div className="mr-4 mt-2 flex flex-col space-y-2 items-end">
                          {link.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="text-xs font-medium text-zinc-400 hover:text-blue-400 transition-colors font-helvetica"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {t(subItem.label)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm font-medium hover:text-blue-400 transition-colors font-helvetica"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(link.label)}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
