"use client"

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Header from '@/components/header'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

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
          <div className="space-y-4">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full bg-white text-black hover:bg-zinc-200">
                Ir al Dashboard
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic"; 