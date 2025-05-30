"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export default function Terms() {
  const { language } = useLanguage()

  const content = {
    es: {
      title: "Términos y Condiciones",
      lastUpdated: "Última actualización: Marzo 2024",
      sections: [
        {
          title: "1. Introducción",
          content: "Bienvenido a Cosmic Explorer. Al acceder y utilizar nuestros servicios, usted acepta estos términos y condiciones. Por favor, léalos cuidadosamente."
        },
        {
          title: "2. Definiciones",
          content: "En estos términos y condiciones, 'nosotros', 'nuestro' y 'Cosmic Explorer' se refieren a nuestra organización. 'Servicios' se refiere a todos los recursos educativos, plataformas y actividades ofrecidas por Cosmic Explorer."
        },
        {
          title: "3. Uso de los Servicios",
          content: "Nuestros servicios están diseñados para instituciones educativas y sus representantes. El uso de nuestros recursos debe ser con fines educativos y de acuerdo con nuestras políticas de uso."
        },
        {
          title: "4. Propiedad Intelectual",
          content: "Todo el contenido, incluyendo textos, imágenes, videos y software, es propiedad de Cosmic Explorer y está protegido por derechos de autor. No se permite la reproducción o distribución sin autorización."
        },
        {
          title: "5. Privacidad y Datos",
          content: "Nos comprometemos a proteger la privacidad de nuestros usuarios. La información recopilada se utiliza únicamente para mejorar nuestros servicios y cumplir con nuestros compromisos educativos."
        },
        {
          title: "6. Responsabilidades",
          content: "Las instituciones colaboradoras son responsables de mantener la confidencialidad de sus credenciales de acceso y de cualquier actividad realizada bajo su cuenta."
        },
        {
          title: "7. Modificaciones",
          content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web."
        },
        {
          title: "8. Limitación de Responsabilidad",
          content: "Cosmic Explorer no será responsable por daños indirectos o consecuentes que puedan surgir del uso de nuestros servicios."
        },
        {
          title: "9. Ley Aplicable",
          content: "Estos términos se rigen por las leyes de España y cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de Madrid."
        },
        {
          title: "10. Contacto",
          content: "Para cualquier consulta sobre estos términos y condiciones, por favor contacte con nosotros a través de nuestro formulario de contacto."
        }
      ]
    },
    en: {
      title: "Terms and Conditions",
      lastUpdated: "Last updated: March 2024",
      sections: [
        {
          title: "1. Introduction",
          content: "Welcome to Cosmic Explorer. By accessing and using our services, you agree to these terms and conditions. Please read them carefully."
        },
        {
          title: "2. Definitions",
          content: "In these terms and conditions, 'we', 'our', and 'Cosmic Explorer' refer to our organization. 'Services' refers to all educational resources, platforms, and activities offered by Cosmic Explorer."
        },
        {
          title: "3. Use of Services",
          content: "Our services are designed for educational institutions and their representatives. The use of our resources must be for educational purposes and in accordance with our usage policies."
        },
        {
          title: "4. Intellectual Property",
          content: "All content, including text, images, videos, and software, is the property of Cosmic Explorer and is protected by copyright. Reproduction or distribution without authorization is not permitted."
        },
        {
          title: "5. Privacy and Data",
          content: "We are committed to protecting our users' privacy. Information collected is used solely to improve our services and fulfill our educational commitments."
        },
        {
          title: "6. Responsibilities",
          content: "Collaborating institutions are responsible for maintaining the confidentiality of their access credentials and any activity performed under their account."
        },
        {
          title: "7. Modifications",
          content: "We reserve the right to modify these terms at any time. Modifications will take effect immediately after their publication on our website."
        },
        {
          title: "8. Limitation of Liability",
          content: "Cosmic Explorer will not be liable for indirect or consequential damages that may arise from the use of our services."
        },
        {
          title: "9. Governing Law",
          content: "These terms are governed by the laws of Spain, and any dispute will be subject to the exclusive jurisdiction of the courts of Madrid."
        },
        {
          title: "10. Contact",
          content: "For any questions about these terms and conditions, please contact us through our contact form."
        }
      ]
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {content[language].title}
            </h1>
            <p className="text-gray-400">
              {content[language].lastUpdated}
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {content[language].sections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 