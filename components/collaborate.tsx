"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { FaHandshake, FaSchool, FaUsers, FaBook, FaGraduationCap, FaLightbulb } from "react-icons/fa"

export default function Collaborate() {
  const { language } = useLanguage()

  const content = {
    es: {
      title: "Colabora con Nosotros",
      subtitle: "Únete a nuestra misión de inspirar a las futuras generaciones",
      description: "En Cosmic Explorer, creemos en el poder de la colaboración para crear experiencias educativas transformadoras. Ofrecemos diversas formas de colaboración para instituciones educativas que comparten nuestra visión.",
      benefits: {
        title: "Beneficios de Colaborar",
        items: [
          {
            icon: FaSchool,
            title: "Acceso Exclusivo",
            description: "Acceso prioritario a nuestros recursos educativos y eventos especiales."
          },
          {
            icon: FaUsers,
            title: "Comunidad Activa",
            description: "Forma parte de una red de instituciones comprometidas con la innovación educativa."
          },
          {
            icon: FaBook,
            title: "Recursos Personalizados",
            description: "Desarrollo de materiales educativos adaptados a tus necesidades específicas."
          },
          {
            icon: FaGraduationCap,
            title: "Formación Especializada",
            description: "Capacitación para docentes en metodologías innovadoras de enseñanza."
          },
          {
            icon: FaLightbulb,
            title: "Proyectos Conjuntos",
            description: "Oportunidad de participar en proyectos de investigación y desarrollo educativo."
          }
        ]
      },
      howTo: {
        title: "Cómo Colaborar",
        steps: [
          {
            title: "Contacta con Nosotros",
            description: "Completa el formulario de contacto y cuéntanos sobre tu institución."
          },
          {
            title: "Evaluación",
            description: "Analizaremos las posibilidades de colaboración y te propondremos un plan."
          },
          {
            title: "Acuerdo",
            description: "Estableceremos los términos de la colaboración y firmaremos un acuerdo."
          },
          {
            title: "Implementación",
            description: "Comenzaremos a trabajar juntos en proyectos y actividades."
          }
        ]
      },
      cta: {
        title: "¿Listo para Colaborar?",
        description: "Únete a nuestra red de instituciones educativas y juntos hagamos la diferencia.",
        button: "Contactar Ahora"
      }
    },
    en: {
      title: "Collaborate with Us",
      subtitle: "Join our mission to inspire future generations",
      description: "At Cosmic Explorer, we believe in the power of collaboration to create transformative educational experiences. We offer various ways for educational institutions to collaborate with us.",
      benefits: {
        title: "Benefits of Collaboration",
        items: [
          {
            icon: FaSchool,
            title: "Exclusive Access",
            description: "Priority access to our educational resources and special events."
          },
          {
            icon: FaUsers,
            title: "Active Community",
            description: "Be part of a network of institutions committed to educational innovation."
          },
          {
            icon: FaBook,
            title: "Customized Resources",
            description: "Development of educational materials tailored to your specific needs."
          },
          {
            icon: FaGraduationCap,
            title: "Specialized Training",
            description: "Teacher training in innovative teaching methodologies."
          },
          {
            icon: FaLightbulb,
            title: "Joint Projects",
            description: "Opportunity to participate in educational research and development projects."
          }
        ]
      },
      howTo: {
        title: "How to Collaborate",
        steps: [
          {
            title: "Contact Us",
            description: "Fill out the contact form and tell us about your institution."
          },
          {
            title: "Evaluation",
            description: "We'll analyze collaboration possibilities and propose a plan."
          },
          {
            title: "Agreement",
            description: "We'll establish collaboration terms and sign an agreement."
          },
          {
            title: "Implementation",
            description: "We'll start working together on projects and activities."
          }
        ]
      },
      cta: {
        title: "Ready to Collaborate?",
        description: "Join our network of educational institutions and let's make a difference together.",
        button: "Contact Now"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
          className="max-w-6xl mx-auto"
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
            <p className="text-xl text-gray-300 mb-8">
              {content[language].subtitle}
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {content[language].description}
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            className="mb-20"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {content[language].benefits.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content[language].benefits.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <item.icon className="text-2xl text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How to Collaborate */}
          <motion.div 
            className="mb-20"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {content[language].howTo.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content[language].howTo.steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 h-full">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-purple-400">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                  {index < content[language].howTo.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content[language].cta.title}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {content[language].cta.description}
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors"
              >
                {content[language].cta.button}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 