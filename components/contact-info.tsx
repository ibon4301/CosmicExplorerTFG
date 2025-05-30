"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa"
import { useState, ChangeEvent, FormEvent } from "react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactInfo() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const content = {
    es: {
      title: "Contacta con Nosotros",
      subtitle: "Estamos aquí para ayudarte",
      description: "¿Tienes alguna pregunta sobre nuestros servicios educativos? No dudes en contactarnos. Nuestro equipo está listo para ayudarte.",
      email: "info@cosmicexplorer.edu",
      phone: "+34 900 123 456",
      address: "Planetario de Madrid\nParque Tierno Galván\n28045 Madrid, España",
      hours: "Lunes a Viernes: 9:00 - 18:00\nSábados: 10:00 - 14:00",
      form: {
        name: "Nombre de la institución",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        send: "Enviar mensaje",
        success: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
        errors: {
          required: "Este campo es obligatorio",
          email: "Por favor, introduce un email válido",
          minLength: "Este campo debe tener al menos 3 caracteres",
          minWords: "El mensaje debe tener al menos 3 palabras"
        }
      }
    },
    en: {
      title: "Contact Us",
      subtitle: "We're here to help",
      description: "Do you have any questions about our educational services? Don't hesitate to contact us. Our team is ready to assist you.",
      email: "info@cosmicexplorer.edu",
      phone: "+34 900 123 456",
      address: "Madrid Planetarium\nTierno Galván Park\n28045 Madrid, Spain",
      hours: "Monday to Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM",
      form: {
        name: "Institution Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        success: "Message sent successfully! We'll get back to you soon.",
        errors: {
          required: "This field is required",
          email: "Please enter a valid email",
          minLength: "This field must be at least 3 characters long",
          minWords: "The message must have at least 3 words"
        }
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

  const validateForm = () => {
    const newErrors: FormErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) {
      newErrors.name = content[language].form.errors.required
    } else if (formData.name.length < 3) {
      newErrors.name = content[language].form.errors.minLength
    }

    if (!formData.email.trim()) {
      newErrors.email = content[language].form.errors.required
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = content[language].form.errors.email
    }

    if (!formData.subject.trim()) {
      newErrors.subject = content[language].form.errors.required
    } else if (formData.subject.length < 3) {
      newErrors.subject = content[language].form.errors.minLength
    }

    if (!formData.message.trim()) {
      newErrors.message = content[language].form.errors.required
    } else if (formData.message.trim().split(/\s+/).length < 3) {
      newErrors.message = content[language].form.errors.minWords
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      // Simular envío exitoso
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setErrors({})
      
      // Resetear el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
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
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {content[language].title}
            </h1>
            <p className="text-xl text-gray-300">
              {content[language].subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <motion.div 
              className="space-y-8"
              variants={itemVariants}
            >
              <div className="bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50">
                <p className="text-gray-300 mb-8">
                  {content[language].description}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Email</h3>
                      <a href={`mailto:${content[language].email}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                        {content[language].email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{language === "es" ? "Teléfono" : "Phone"}</h3>
                      <a href={`tel:${content[language].phone}`} className="text-gray-300 hover:text-purple-400 transition-colors">
                        {content[language].phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{language === "es" ? "Dirección" : "Address"}</h3>
                      <p className="text-gray-300 whitespace-pre-line">
                        {content[language].address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{language === "es" ? "Horario" : "Hours"}</h3>
                      <p className="text-gray-300 whitespace-pre-line">
                        {content[language].hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formulario de contacto */}
            <motion.div 
              className="bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50"
              variants={itemVariants}
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-2xl text-green-400">✓</span>
                  </div>
                  <p className="text-xl text-white">
                    {content[language].form.success}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">
                      {content[language].form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-gray-900/50 border rounded-lg text-white focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      {content[language].form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-gray-900/50 border rounded-lg text-white focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white mb-2">
                      {content[language].form.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-gray-900/50 border rounded-lg text-white focus:outline-none transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white mb-2">
                      {content[language].form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-2 bg-gray-900/50 border rounded-lg text-white focus:outline-none transition-colors ${
                        errors.message ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors"
                  >
                    {content[language].form.send}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 