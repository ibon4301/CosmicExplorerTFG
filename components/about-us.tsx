"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

export default function AboutUs() {
  const { language } = useLanguage()

  const content = {
    es: {
      title: "Sobre Nosotros",
      description: "Somos una empresa especializada en colaboraciones con instituciones educativas, enfocándonos en complementar la asignatura de Tecnología de 4º de la ESO. Nuestro objetivo es proporcionar recursos y experiencias educativas innovadoras que enriquezcan el aprendizaje de los estudiantes en esta materia fundamental.",
      mission: "Nuestra misión es apoyar a los centros educativos ofreciendo soluciones tecnológicas y educativas que complementen el currículo oficial, facilitando así una formación más completa y práctica para los estudiantes.",
      vision: "Buscamos ser un referente en la innovación educativa, transformando la manera en que los estudiantes aprenden tecnología y preparándolos para los desafíos del futuro.",
      values: {
        title: "Nuestros Valores",
        innovation: "Innovación en la educación",
        quality: "Calidad en nuestros servicios",
        collaboration: "Colaboración con instituciones",
        excellence: "Excelencia en la enseñanza"
      }
    },
    en: {
      title: "About Us",
      description: "We are a company specialized in collaborations with educational institutions, focusing on complementing the Technology subject for 4th year of ESO (Compulsory Secondary Education). Our goal is to provide innovative educational resources and experiences that enrich students' learning in this fundamental subject.",
      mission: "Our mission is to support educational centers by offering technological and educational solutions that complement the official curriculum, thus facilitating a more complete and practical training for students.",
      vision: "We aim to be a reference in educational innovation, transforming the way students learn technology and preparing them for future challenges.",
      values: {
        title: "Our Values",
        innovation: "Educational Innovation",
        quality: "Service Quality",
        collaboration: "Institutional Collaboration",
        excellence: "Teaching Excellence"
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
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            variants={itemVariants}
          >
            {content[language].title}
          </motion.h1>
          
          <div className="space-y-12">
            <motion.div 
              className="bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
              variants={itemVariants}
            >
              <p className="text-lg leading-relaxed text-gray-300">
                {content[language].description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <span className="text-blue-400">✦</span>
                  </span>
                  {language === "es" ? "Misión" : "Mission"}
                </h3>
                <p className="text-gray-300">
                  {content[language].mission}
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <span className="text-purple-400">✦</span>
                  </span>
                  {language === "es" ? "Visión" : "Vision"}
                </h3>
                <p className="text-gray-300">
                  {content[language].vision}
                </p>
              </motion.div>
            </div>

            <motion.div 
              className="bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                {content[language].values.title}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(content[language].values).filter(([key]) => key !== 'title').map(([key, value], index) => (
                  <motion.div 
                    key={key}
                    className="text-center p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900/80 transition-colors duration-300"
                    variants={itemVariants}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-xl text-blue-400">✦</span>
                    </div>
                    <h4 className="text-lg font-medium text-white">
                      {value}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 