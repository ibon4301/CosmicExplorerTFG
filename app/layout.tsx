import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import localFont from "next/font/local"
import ScrollToTop from "@/components/scroll-to-top"
import { AuthProvider } from "@/contexts/AuthContext"

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
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/images/icon/favicon.ico' },
      { url: '/images/icon/favicon.png', type: 'image/png' },
    ],
    apple: { url: '/images/icon/favicon.png' },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" type="image/png" href="/images/icon/favicon.png" />
        <link rel="icon" type="image/png" href="/images/icon/favicon.png" />
      </head>
      <body className={`${inter.className} ${spaceFont.variable} bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>
            <LanguageProvider>
              <ScrollToTop />
              {children}
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
