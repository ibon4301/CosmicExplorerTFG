"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { language, t } = useLanguage()

  return (
    <footer className="w-full border-t border-zinc-800 bg-black py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/home" className="flex items-center gap-2 text-lg font-bold text-blue-400 font-space">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            Cosmic Explorer
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-xs hover:underline hover:underline-offset-4">
              {t("footer.about")}
            </Link>
            <Link href="/contact" className="text-xs hover:underline hover:underline-offset-4">
              {t("footer.contact")}
            </Link>
            <Link href="/terms" className="text-xs hover:underline hover:underline-offset-4">
              {t("footer.terms")}
            </Link>
            <Link href="/privacy" className="text-xs hover:underline hover:underline-offset-4">
              {t("footer.privacy")}
            </Link>
          </nav>
        </div>
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Cosmic Explorer. {t("footer.rights")}
        </p>
      </div>
    </footer>
  )
}
