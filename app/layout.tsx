import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import localFont from "next/font/local"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

// Importar fuente espacial local
const spaceFont = localFont({
  src: [
    {
      path: "../public/fonts/Orbitron-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Orbitron-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space",
})

export const metadata = {
  title: "Cosmic Explorer - Interactive Space Education",
  description: "Explore the universe with interactive 3D models, educational content, and space quizzes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${spaceFont.variable} bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LanguageProvider>
            <ScrollToTop />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
