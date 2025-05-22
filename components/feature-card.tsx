import Link from "next/link"
import { Rocket, Globe, Cloud, Sparkles, Cpu, CircleOff } from "lucide-react"
import Image from "next/image"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  href: string
}

export default function FeatureCard({ title, description, icon, href }: FeatureCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "rocket":
        return <Rocket className="h-10 w-10 text-purple-400" />
      case "globe":
        return <Globe className="h-10 w-10 text-blue-400" />
      case "cloud":
        return <Cloud className="h-10 w-10 text-cyan-400" />
      case "sparkles":
        return <Sparkles className="h-10 w-10 text-yellow-400" />
      case "cpu":
        return <Cpu className="h-10 w-10 text-green-400" />
      case "hole":
        return <CircleOff className="h-10 w-10 text-pink-400" />
      default:
        return <Rocket className="h-10 w-10 text-purple-400" />
    }
  }

  const getBackgroundImage = (iconName: string) => {
    switch (iconName) {
      case "rocket":
        return "/images/features/spacemission.jpg"
      case "globe":
        return "/images/features/exoplanets.jpg"
      case "cloud":
        return "/images/features/crabnebula.jpg"
      case "sparkles":
        return "/images/features/ngc-1300.jpg"
      case "cpu":
        return "/images/features/jameswebb.jfif"
      case "hole":
        return "/images/features/bllackholem87.jpg"
      default:
        return "/images/features/default.jpg"
    }
  }

  return (
    <Link href={href} className="flex h-full">
      <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 min-h-80">
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getBackgroundImage(icon)}
            alt={title}
            fill
            className="object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        </div>

        {/* Contenido */}
        <div className="relative z-10">
          <div className="mb-4">{getIcon(icon)}</div>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="text-zinc-400">{description}</p>
        </div>

        {/* Botón "Learn more" */}
        <div className="relative z-10 mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
          Learn more
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
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
