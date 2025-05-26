"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Header from '@/components/header'

export default function SuccessPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // Aquí podrías verificar el estado de la sesión con Stripe si lo necesitas
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          <p className="mt-4 text-zinc-400">Verificando tu pago...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-950 rounded-2xl shadow-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-green-400 mb-4">¡Pago completado con éxito!</h1>
          <p className="text-zinc-300 mb-8">
            Gracias por suscribirte a Cosmic Explorer. Hemos enviado un correo electrónico con los detalles de tu suscripción.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic"; 