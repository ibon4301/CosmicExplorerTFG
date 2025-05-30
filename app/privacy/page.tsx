import Privacy from "@/components/privacy"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-20 pointer-events-none"></div>
        <Header />
        <div className="flex-grow">
          <Privacy />
        </div>
        <Footer />
      </div>
    </main>
  )
} 