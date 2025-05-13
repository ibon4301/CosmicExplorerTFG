"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, useTexture } from "@react-three/drei"
import * as THREE from "three"

const planets = [
  {
    name: "Mercury",
    position: [-8, 0, 0],
    size: 0.4,
    color: "#A9A9A9",
    description: "The smallest planet in our solar system and closest to the Sun.",
    textureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de Mercurio de NASA
    rotationSpeed: 0.01,
  },
  {
    name: "Venus",
    position: [-6, 0, 0],
    size: 0.6,
    color: "#E6C073",
    description: "Similar in size to Earth but with a toxic atmosphere and extreme temperatures.",
    textureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de Venus de NASA
    rotationSpeed: 0.008,
  },
  {
    name: "Earth",
    position: [-4, 0, 0],
    size: 0.6,
    color: "#6B93D6",
    description: "Our home planet, the only known world with liquid water on its surface.",
    textureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de Tierra de NASA
    rotationSpeed: 0.01,
  },
  {
    name: "Mars",
    position: [-2, 0, 0],
    size: 0.5,
    color: "#C1440E",
    description: "The 'Red Planet' with polar ice caps and the largest volcano in the solar system.",
    textureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de Marte de NASA
    rotationSpeed: 0.009,
  },
  {
    name: "Jupiter",
    position: [0, 0, 0],
    size: 1.2,
    color: "#E0A880",
    description: "The largest planet in our solar system with a distinctive Great Red Spot.",
    textureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de Júpiter de NASA
    rotationSpeed: 0.04,
  },
  {
    name: "Saturn",
    position: [3, 0, 0],
    size: 1,
    color: "#F4D4A9",
    description: "Famous for its beautiful ring system made mostly of ice particles.",
    textureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de Saturno de NASA
    rotationSpeed: 0.03,
    hasRings: true,
    ringsTextureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de anillos de Saturno de NASA
  },
  {
    name: "Uranus",
    position: [6, 0, 0],
    size: 0.8,
    color: "#D1E7E7",
    description: "An ice giant that rotates on its side, unlike any other planet.",
    textureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de Urano de NASA
    rotationSpeed: 0.02,
    tilt: Math.PI / 2,
  },
  {
    name: "Neptune",
    position: [9, 0, 0],
    size: 0.8,
    color: "#5B5DDF",
    description: "The windiest planet with the strongest winds in the solar system.",
    textureUrl: "/placeholder.svg?height=512&width=1024", // TU IMAGEN AQUI - Textura de Neptuno de NASA
    rotationSpeed: 0.025,
  },
]

function Planet({
  name,
  position,
  size,
  color,
  description,
  textureUrl,
  ringsTextureUrl,
  rotationSpeed,
  hasRings,
  tilt,
  setActivePlanet,
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(textureUrl)
  const ringsTexture = useTexture(
    hasRings && ringsTextureUrl ? ringsTextureUrl : "/placeholder.svg?height=512&width=1024",
  )

  // Aplicar rotación
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed * 10
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.1
    }
  })

  return (
    <group position={position} rotation={[tilt || 0, 0, 0]} onClick={() => setActivePlanet({ name, description })}>
      {/* Planeta */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} color={color} roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Anillos para Saturno */}
      {hasRings && (
        <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2, 64]} />
          <meshStandardMaterial map={ringsTexture} color="#F4D4A9" side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  )
}

function PlanetInfo({ activePlanet, language }) {
  if (!activePlanet) return null

  const translations = {
    en: {
      clickToLearn: "Click on a planet to learn more",
    },
    es: {
      clickToLearn: "Haz clic en un planeta para saber más",
    },
  }

  return (
    <div className="absolute bottom-4 left-0 right-0 mx-auto w-full max-w-md rounded-lg bg-black/80 p-4 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white">{activePlanet.name}</h3>
      <p className="mt-2 text-zinc-300">{activePlanet.description}</p>
    </div>
  )
}

export default function PlanetExplorer({ language = "en" }) {
  const [activePlanet, setActivePlanet] = useState(null)

  const translations = {
    en: {
      clickToLearn: "Click on a planet to learn more",
    },
    es: {
      clickToLearn: "Haz clic en un planeta para saber más",
    },
  }

  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [0, 2, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[-15, 5, 10]} intensity={2} color="#ffffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />

        {/* Sol */}
        <mesh position={[-12, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={1} />
          <pointLight intensity={1.5} distance={50} color="#FDB813" />
        </mesh>

        {planets.map((planet) => (
          <Planet
            key={planet.name}
            name={planet.name}
            position={planet.position}
            size={planet.size}
            color={planet.color}
            description={planet.description}
            textureUrl={planet.textureUrl}
            ringsTextureUrl={planet.ringsTextureUrl}
            rotationSpeed={planet.rotationSpeed}
            hasRings={planet.hasRings}
            tilt={planet.tilt}
            setActivePlanet={setActivePlanet}
          />
        ))}

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={5} maxDistance={20} />
      </Canvas>
      <PlanetInfo activePlanet={activePlanet} language={language} />
      <div className="absolute left-4 top-4 rounded-md bg-black/70 p-2 text-xs text-white backdrop-blur-sm">
        {translations[language].clickToLearn}
      </div>
    </div>
  )
}
