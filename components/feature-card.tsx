import Link from "next/link"
import { Rocket, Globe, Cloud, Sparkles, Cpu, CircleOff } from "lucide-react"

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

  return (
    <Link href={href} className="flex h-full">
      <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 min-h-80">
        <div>
          <div className="mb-4">{getIcon(icon)}</div>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="text-zinc-400">{description}</p>
        </div>
        <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
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
            className="ml-1 h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
