import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-300" />
        <p className="text-xl font-medium text-yellow-300">Preparing fun space adventure...</p>
      </div>
    </div>
  )
}
