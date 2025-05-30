"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export default function Privacy() {
  const { language } = useLanguage()

  const content = {
    es: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: Marzo 2024",
      sections: [
        {
          title: "1. Información que Recopilamos",
          content: "Recopilamos información proporcionada directamente por las instituciones educativas, incluyendo nombre de la institución, información de contacto y datos de los representantes autorizados."
        },
        {
          title: "2. Uso de la Información",
          content: "Utilizamos la información recopilada para: proporcionar y mejorar nuestros servicios educativos, comunicarnos con las instituciones, enviar actualizaciones y noticias relevantes, y cumplir con nuestras obligaciones legales."
        },
        {
          title: "3. Protección de Datos",
          content: "Implementamos medidas de seguridad técnicas y organizativas para proteger la información personal contra acceso no autorizado, pérdida o alteración."
        },
        {
          title: "4. Compartir Información",
          content: "No compartimos información personal con terceros excepto cuando es necesario para proporcionar nuestros servicios o cuando la ley lo requiere."
        },
        {
          title: "5. Derechos de los Usuarios",
          content: "Las instituciones tienen derecho a acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contacte con nosotros."
        },
        {
          title: "6. Cookies y Tecnologías Similares",
          content: "Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario y analizar el uso de nuestro sitio web."
        },
        {
          title: "7. Retención de Datos",
          content: "Conservamos la información personal durante el tiempo necesario para cumplir con los fines para los que fue recopilada y para cumplir con nuestras obligaciones legales."
        },
        {
          title: "8. Cambios en la Política",
          content: "Nos reservamos el derecho de modificar esta política de privacidad. Los cambios entrarán en vigor al publicarlos en nuestro sitio web."
        },
        {
          title: "9. Contacto",
          content: "Para cualquier consulta sobre nuestra política de privacidad, puede contactarnos a través de nuestro formulario de contacto o enviando un correo electrónico a privacy@cosmicexplorer.edu"
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: March 2024",
      sections: [
        {
          title: "1. Information We Collect",
          content: "We collect information provided directly by educational institutions, including institution name, contact information, and authorized representative details."
        },
        {
          title: "2. Use of Information",
          content: "We use the collected information to: provide and improve our educational services, communicate with institutions, send relevant updates and news, and comply with our legal obligations."
        },
        {
          title: "3. Data Protection",
          content: "We implement technical and organizational security measures to protect personal information against unauthorized access, loss, or alteration."
        },
        {
          title: "4. Sharing Information",
          content: "We do not share personal information with third parties except when necessary to provide our services or when required by law."
        },
        {
          title: "5. User Rights",
          content: "Institutions have the right to access, rectify, cancel, and object to the processing of their personal data. To exercise these rights, please contact us."
        },
        {
          title: "6. Cookies and Similar Technologies",
          content: "We use cookies and similar technologies to improve user experience and analyze website usage."
        },
        {
          title: "7. Data Retention",
          content: "We retain personal information for as long as necessary to fulfill the purposes for which it was collected and to comply with our legal obligations."
        },
        {
          title: "8. Policy Changes",
          content: "We reserve the right to modify this privacy policy. Changes will take effect upon posting on our website."
        },
        {
          title: "9. Contact",
          content: "For any questions about our privacy policy, you can contact us through our contact form or by sending an email to privacy@cosmicexplorer.edu"
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

          {/* Privacy Sections */}
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