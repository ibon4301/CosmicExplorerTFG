"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Rocket, Satellite, Cpu, Atom, Globe, Shield, Telescope, Microscope, Droplets, Flame, ArrowUpRight, Navigation } from "lucide-react"
import Header from "@/components/header"
import { motion, useScroll, useTransform } from "framer-motion"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import GlassmorphismCard from "@/components/glassmorphism-card"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"

export default function TechnologyPage() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("propulsion")
  const containerRef = useRef(null)

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Fade in effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Translations for the technology page
  const translations = {
    en: {
      title: "Space Technology",
      subtitle: "Explore the cutting-edge innovations that are revolutionizing our understanding of the cosmos.",
      overview: "Overview",
      overviewTitle: "Revolutionary Space Technologies",
      overviewDesc:
        "From advanced propulsion systems to sophisticated telescopes, space technology continues to push the boundaries of what's possible. These innovations not only enhance our exploration capabilities but also bring benefits to life on Earth.",
      categories: "Categories",
      categoriesTitle: "Key Space Technologies",
      categoriesDesc: "Explore the various technologies that enable humanity to venture into the cosmos.",
      propulsion: "Propulsion Systems",
      propulsionDesc:
        "Modern space propulsion encompasses a wide range of innovative technologies. Chemical rockets like SpaceX's Raptor engines represent the current pinnacle of traditional propulsion, achieving unprecedented efficiency and reusability. Ion thrusters, using electrical fields to accelerate ions, provide efficient long-term thrust for deep space missions. Emerging technologies include nuclear thermal propulsion, promising twice the efficiency of chemical rockets, and experimental concepts like solar sails that harness the pressure of sunlight. The next generation of plasma engines and fusion-based propulsion systems could revolutionize interplanetary travel.",
      communication: "Communication Systems",
      communicationDesc:
        "Space communication systems have evolved dramatically from simple radio signals to sophisticated quantum networks. Modern spacecraft use high-frequency bands and laser-based systems for high-speed data transmission across millions of kilometers. The Deep Space Network, with its massive 70-meter antennas, can communicate with spacecraft beyond our solar system. Advanced error correction, data compression, and encryption ensure reliable and secure communication. Future systems will incorporate quantum entanglement for instantaneous data transfer and artificial intelligence for autonomous communication management.",
      computing: "Space Computing",
      computingDesc:
        "Space computers face unique challenges in the harsh environment of space. Radiation-hardened processors, triple-redundant systems, and error-correcting memory protect against cosmic rays and solar radiation. Modern spacecraft computers balance power efficiency with processing capability, using specialized hardware and software architectures. The International Space Station's computers manage life support, navigation, and scientific experiments simultaneously. Future space computing will leverage quantum computing and AI for enhanced autonomous operation and data processing.",
      lifesupport: "Life Support Systems",
      lifesupportDesc:
        "Life support systems are critical for human survival in space. These complex systems recycle air and water, manage waste, and maintain optimal temperature and pressure. The International Space Station's Environmental Control and Life Support System (ECLSS) recycles 90% of water and generates oxygen through water electrolysis. Advanced carbon dioxide scrubbers and waste management systems enable long-duration spaceflight. Future systems will incorporate bioregenerative technologies, using plants and algae for air purification and food production.",
      navigation: "Navigation & Guidance",
      navigationDesc:
        "Space navigation combines precise measurements with advanced computational models. Modern spacecraft use star trackers, gyroscopes, and accelerometers for attitude determination. GPS satellites provide positioning accurate to centimeters, while deep space missions rely on Delta-DOR (Delta-Differential One-way Ranging) for interplanetary navigation. Autonomous navigation systems are being developed for future missions, using AI to plot optimal trajectories and avoid space debris. These systems will be crucial for missions to distant planets and automated docking procedures.",
      protection: "Protective Technologies",
      protectionDesc:
        "Protection in space requires multiple layers of specialized technology. Advanced thermal protection systems, like those used on the Space Shuttle and modern spacecraft, shield against extreme temperatures during atmospheric entry. Multi-layer insulation protects against the vacuum of space and temperature fluctuations. Radiation shielding uses advanced materials and electromagnetic fields to protect astronauts and electronics from cosmic rays and solar radiation. Future developments include self-healing materials and active radiation deflection systems.",
      future: "Future",
      futureTitle: "The Future of Space Technology",
      futureDesc: "Emerging technologies that will shape the next generation of space exploration and colonization.",
      innovations: {
        title: "Recent Innovations",
        subtitle: "Breakthrough technologies changing the future of space exploration",
        reusable: {
          title: "Reusable Rockets",
          desc: "Spacecraft designed to return to Earth intact and be used for multiple missions, dramatically reducing the cost of space access.",
        },
        solar: {
          title: "Solar Sails",
          desc: "Propulsion systems that use the pressure of sunlight to push large ultra-thin mirrors through space without fuel.",
        },
        nuclear: {
          title: "Nuclear Propulsion",
          desc: "Advanced systems using nuclear reactions to achieve higher efficiency and faster travel times for deep space missions.",
        },
        quantum: {
          title: "Quantum Communication",
          desc: "Utilizing quantum entanglement for instantaneous and secure communication across vast distances in space.",
        },
      },
      rocketScience: "Rocket Science",
      rocketTitle: "How Rockets Work",
      rocketDesc: "Understanding the fundamental principles of rocket propulsion and space flight.",
      stages: {
        title: "Rocket Stages",
        fuel: "Propellants",
        fuelDesc: "Rockets use a combination of fuel and oxidizer. Common propellants include liquid oxygen (LOX) and kerosene, or liquid hydrogen for greater efficiency. The fuel combustion creates extremely hot, high-pressure gases.",
        combustion: "Combustion Chamber",
        combustionDesc: "In the combustion chamber, propellants mix and ignite under controlled conditions. Temperatures can reach over 3,000°C, turning the propellants into rapidly expanding hot gases.",
        nozzle: "Rocket Nozzle",
        nozzleDesc: "The specially shaped nozzle accelerates the hot gases to supersonic speeds. As the gases exit, they create thrust through Newton's Third Law of Motion - every action has an equal and opposite reaction.",
        guidance: "Guidance Systems",
        guidanceDesc: "Advanced computers and sensors constantly adjust the rocket's trajectory. Gimbaled engines can pivot to steer the rocket, while fins provide stability during atmospheric flight.",
      },
    },
    es: {
      title: "Tecnología Espacial",
      subtitle: "Explora las innovaciones de vanguardia que están revolucionando nuestra comprensión del cosmos.",
      overview: "Visión General",
      overviewTitle: "Tecnologías Espaciales Revolucionarias",
      overviewDesc:
        "Desde sistemas de propulsión avanzados hasta telescopios sofisticados, la tecnología espacial sigue ampliando los límites de lo posible. Estas innovaciones no solo mejoran nuestras capacidades de exploración, sino que también traen beneficios a la vida en la Tierra.",
      categories: "Categorías",
      categoriesTitle: "Tecnologías Espaciales Clave",
      categoriesDesc: "Explora las diversas tecnologías que permiten a la humanidad aventurarse en el cosmos.",
      propulsion: "Sistemas de Propulsión",
      propulsionDesc:
        "La propulsión espacial moderna abarca una amplia gama de tecnologías innovadoras. Los cohetes químicos como los motores Raptor de SpaceX representan el pináculo actual de la propulsión tradicional, logrando una eficiencia y reutilización sin precedentes. Los propulsores iónicos, que utilizan campos eléctricos para acelerar iones, proporcionan un empuje eficiente a largo plazo para misiones en el espacio profundo. Las tecnologías emergentes incluyen la propulsión térmica nuclear, que promete el doble de eficiencia que los cohetes químicos, y conceptos experimentales como las velas solares que aprovechan la presión de la luz solar. La próxima generación de motores de plasma y sistemas de propulsión basados en fusión podría revolucionar los viajes interplanetarios.",
      communication: "Sistemas de Comunicación",
      communicationDesc:
        "Los sistemas de comunicación espacial han evolucionado dramáticamente desde simples señales de radio hasta sofisticadas redes cuánticas. Las naves espaciales modernas utilizan bandas de alta frecuencia y sistemas basados en láser para la transmisión de datos a alta velocidad a través de millones de kilómetros. La Red del Espacio Profundo, con sus enormes antenas de 70 metros, puede comunicarse con naves espaciales más allá de nuestro sistema solar. La corrección avanzada de errores, la compresión de datos y el cifrado garantizan una comunicación confiable y segura. Los sistemas futuros incorporarán el entrelazamiento cuántico para la transferencia instantánea de datos y la inteligencia artificial para la gestión autónoma de comunicaciones.",
      computing: "Computación Espacial",
      computingDesc:
        "Las computadoras espaciales enfrentan desafíos únicos en el duro entorno del espacio. Los procesadores endurecidos contra la radiación, los sistemas triplemente redundantes y la memoria con corrección de errores protegen contra los rayos cósmicos y la radiación solar. Las computadoras modernas de las naves espaciales equilibran la eficiencia energética con la capacidad de procesamiento, utilizando arquitecturas especializadas de hardware y software. Las computadoras de la Estación Espacial Internacional gestionan simultáneamente el soporte vital, la navegación y los experimentos científicos. La computación espacial futura aprovechará la computación cuántica y la IA para mejorar la operación autónoma y el procesamiento de datos.",
      lifesupport: "Sistemas de Soporte Vital",
      lifesupportDesc:
        "Los sistemas de soporte vital son críticos para la supervivencia humana en el espacio. Estos sistemas complejos reciclan aire y agua, gestionan residuos y mantienen una temperatura y presión óptimas. El Sistema de Control Ambiental y Soporte Vital (ECLSS) de la Estación Espacial Internacional recicla el 90% del agua y genera oxígeno mediante electrólisis del agua. Los depuradores avanzados de dióxido de carbono y los sistemas de gestión de residuos permiten vuelos espaciales de larga duración. Los sistemas futuros incorporarán tecnologías bioregenerativas, utilizando plantas y algas para la purificación del aire y la producción de alimentos.",
      navigation: "Navegación y Orientación",
      navigationDesc:
        "La navegación espacial combina mediciones precisas con modelos computacionales avanzados. Las naves espaciales modernas utilizan rastreadores de estrellas, giroscopios y acelerómetros para determinar su actitud. Los satélites GPS proporcionan un posicionamiento preciso hasta centímetros, mientras que las misiones en el espacio profundo dependen del Delta-DOR (Rango Diferencial Delta de Una Vía) para la navegación interplanetaria. Se están desarrollando sistemas de navegación autónomos para futuras misiones, utilizando IA para trazar trayectorias óptimas y evitar desechos espaciales. Estos sistemas serán cruciales para misiones a planetas distantes y procedimientos de acoplamiento automatizados.",
      protection: "Tecnologías de Protección",
      protectionDesc:
        "La protección en el espacio requiere múltiples capas de tecnología especializada. Los sistemas avanzados de protección térmica, como los utilizados en el Transbordador Espacial y las naves espaciales modernas, protegen contra temperaturas extremas durante la entrada atmosférica. El aislamiento multicapa protege contra el vacío del espacio y las fluctuaciones de temperatura. El blindaje contra la radiación utiliza materiales avanzados y campos electromagnéticos para proteger a los astronautas y la electrónica de los rayos cósmicos y la radiación solar. Los desarrollos futuros incluyen materiales autorreparables y sistemas activos de deflección de radiación.",
      future: "Futuro",
      futureTitle: "El Futuro de la Tecnología Espacial",
      futureDesc:
        "Tecnologías emergentes que darán forma a la próxima generación de exploración y colonización espacial.",
      innovations: {
        title: "Innovaciones Recientes",
        subtitle: "Tecnologías revolucionarias que cambian el futuro de la exploración espacial",
        reusable: {
          title: "Cohetes Reutilizables",
          desc: "Naves espaciales diseñadas para regresar a la Tierra intactas y ser utilizadas para múltiples misiones, reduciendo drásticamente el costo del acceso al espacio.",
        },
        solar: {
          title: "Velas Solares",
          desc: "Sistemas de propulsión que utilizan la presión de la luz solar para empujar grandes espejos ultradelgados a través del espacio sin combustible.",
        },
        nuclear: {
          title: "Propulsión Nuclear",
          desc: "Sistemas avanzados que utilizan reacciones nucleares para lograr mayor eficiencia y tiempos de viaje más rápidos para misiones de espacio profundo.",
        },
        quantum: {
          title: "Comunicación Cuántica",
          desc: "Utilización del entrelazamiento cuántico para la comunicación instantánea y segura a través de vastas distancias en el espacio.",
        },
      },
      rocketScience: "Ciencia de Cohetes",
      rocketTitle: "Cómo Funcionan los Cohetes",
      rocketDesc: "Entendiendo los principios fundamentales de la propulsión de cohetes y el vuelo espacial.",
      stages: {
        title: "Etapas del Cohete",
        fuel: "Propulsantes",
        fuelDesc: "Los cohetes utilizan una combinación de combustible y oxidante. Los propulsantes comunes incluyen oxígeno líquido (LOX) y queroseno, o hidrógeno líquido para mayor eficiencia. La combustión del combustible crea gases extremadamente calientes y de alta presión.",
        combustion: "Cámara de Combustión",
        combustionDesc: "En la cámara de combustión, los propulsantes se mezclan y se encienden bajo condiciones controladas. Las temperaturas pueden alcanzar más de 3.000°C, convirtiendo los propulsantes en gases calientes que se expanden rápidamente.",
        nozzle: "Tobera del Cohete",
        nozzleDesc: "La tobera de forma especial acelera los gases calientes a velocidades supersónicas. Cuando los gases salen, crean empuje a través de la Tercera Ley de Newton - toda acción tiene una reacción igual y opuesta.",
        guidance: "Sistemas de Guiado",
        guidanceDesc: "Computadoras y sensores avanzados ajustan constantemente la trayectoria del cohete. Los motores cardánicos pueden pivotar para dirigir el cohete, mientras que las aletas proporcionan estabilidad durante el vuelo atmosférico.",
      },
    },
  }

  const techData = translations[language] || translations.en

  return (
    <div
      className={`flex min-h-screen flex-col bg-black text-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header */}
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 py-0 md:py-0 overflow-hidden">
          {/* Video de fondo */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          >
            <source src="/videos/technology-hero.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg bg-black px-3 py-1 text-sm text-white font-space"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  {language === "es" ? "Inicio" : "Home"}
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-space px-4 py-2 rounded-lg">
                  {techData.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-helvetica px-4 py-2 rounded-lg">
                  {techData.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <ScrollReveal direction="left">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                      {techData.overview}
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                      {techData.overviewTitle}
                    </h2>
                    <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {techData.overviewDesc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="flex items-center justify-center">
                  <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/Ew_rU5Xmalg"
                      title="Space Technology Overview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Technology Categories with Interactive Tabs */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    {techData.categories}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {techData.categoriesTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {techData.categoriesDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Tabs Navigation */}
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {[
                { id: "propulsion", icon: <Rocket className="h-4 w-4" />, label: techData.propulsion },
                { id: "communication", icon: <Satellite className="h-4 w-4" />, label: techData.communication },
                { id: "computing", icon: <Cpu className="h-4 w-4" />, label: techData.computing },
                { id: "lifesupport", icon: <Atom className="h-4 w-4" />, label: techData.lifesupport },
                { id: "navigation", icon: <Globe className="h-4 w-4" />, label: techData.navigation },
                { id: "protection", icon: <Shield className="h-4 w-4" />, label: techData.protection },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative h-[300px] overflow-hidden rounded-lg">
                    <Image 
                      src={
                        {
                          propulsion: "/images/technology/propulsion.jpg",
                          communication: "/images/technology/communication.jpg",
                          computing: "/images/technology/computing.jpg",
                          lifesupport: "/images/technology/lifesupport.jpg",
                          navigation: "/images/technology/navigation.jpg",
                          protection: "/images/technology/protection.jpg",
                        }[activeTab]
                      } 
                      alt={
                        {
                          propulsion: techData.propulsion,
                          communication: techData.communication,
                          computing: techData.computing,
                          lifesupport: techData.lifesupport,
                          navigation: techData.navigation,
                          protection: techData.protection,
                        }[activeTab]
                      }
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold text-blue-400">
                      {
                        {
                          propulsion: techData.propulsion,
                          communication: techData.communication,
                          computing: techData.computing,
                          lifesupport: techData.lifesupport,
                          navigation: techData.navigation,
                          protection: techData.protection,
                        }[activeTab]
                      }
                    </h3>
                    <p className="text-zinc-400">
                      {
                        {
                          propulsion: techData.propulsionDesc,
                          communication: techData.communicationDesc,
                          computing: techData.computingDesc,
                          lifesupport: techData.lifesupportDesc,
                          navigation: techData.navigationDesc,
                          protection: techData.protectionDesc,
                        }[activeTab]
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Recent Innovations with Glassmorphism Cards */}
        <ParallaxSection speed={0.1} className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                    {techData.future}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {techData.innovations.title}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {techData.innovations.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: techData.innovations.reusable.title,
                  description: techData.innovations.reusable.desc,
                  icon: <Rocket className="h-10 w-10 text-blue-400" />,
                  delay: 0.1,
                },
                {
                  title: techData.innovations.solar.title,
                  description: techData.innovations.solar.desc,
                  icon: <Atom className="h-10 w-10 text-yellow-400" />,
                  delay: 0.2,
                },
                {
                  title: techData.innovations.nuclear.title,
                  description: techData.innovations.nuclear.desc,
                  icon: <Atom className="h-10 w-10 text-red-400" />,
                  delay: 0.3,
                },
                {
                  title: techData.innovations.quantum.title,
                  description: techData.innovations.quantum.desc,
                  icon: <Cpu className="h-10 w-10 text-purple-400" />,
                  delay: 0.4,
                },
              ].map((innovation, index) => (
                <ScrollReveal key={index} delay={innovation.delay}>
                  <GlassmorphismCard className="h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-4">{innovation.icon}</div>
                      <h3 className="mb-4 text-xl font-bold">{innovation.title}</h3>
                      <p className="text-zinc-400">{innovation.description}</p>
                    </div>
                  </GlassmorphismCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* Rocket Science Section */}
        <section className="w-full bg-zinc-950 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-red-500/10 px-3 py-1 text-sm text-red-400">
                    {techData.rocketScience}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-space">
                    {techData.rocketTitle}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {techData.rocketDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: techData.stages.fuel,
                  description: techData.stages.fuelDesc,
                  icon: <Droplets className="h-10 w-10 text-blue-400" />,
                  delay: 0.1,
                },
                {
                  title: techData.stages.combustion,
                  description: techData.stages.combustionDesc,
                  icon: <Flame className="h-10 w-10 text-orange-400" />,
                  delay: 0.2,
                },
                {
                  title: techData.stages.nozzle,
                  description: techData.stages.nozzleDesc,
                  icon: <ArrowUpRight className="h-10 w-10 text-yellow-400" />,
                  delay: 0.3,
                },
                {
                  title: techData.stages.guidance,
                  description: techData.stages.guidanceDesc,
                  icon: <Navigation className="h-10 w-10 text-green-400" />,
                  delay: 0.4,
                },
              ].map((stage, index) => (
                <ScrollReveal key={index} delay={stage.delay}>
                  <GlassmorphismCard className="h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-4">{stage.icon}</div>
                      <h3 className="mb-4 text-xl font-bold">{stage.title}</h3>
                      <p className="text-zinc-400">{stage.description}</p>
                    </div>
                  </GlassmorphismCard>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-16">
              <ScrollReveal>
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/1yBwWLunlOM"
                    title="How Rockets Work"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
