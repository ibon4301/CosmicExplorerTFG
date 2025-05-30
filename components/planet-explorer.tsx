"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { Vector3, MeshStandardMaterial, Texture } from "three"
import { useLanguage } from "@/contexts/language-context"

interface Planet {
  name: string
  position: [number, number, number]
  size: number
  color: string
  description: string
  textureUrl: string
  ringsTextureUrl?: string
  rotationSpeed: number
  hasRings?: boolean
  tilt?: number
}

interface PlanetProps {
  name: string
  position: [number, number, number]
  size: number
  color: string
  description: string
  textureUrl: string
  ringsTextureUrl?: string
  rotationSpeed: number
  hasRings?: boolean
  tilt?: number
  setActivePlanet: (planet: Planet | null) => void
}

interface PlanetInfoProps {
  activePlanet: Planet | null
  language: string
}

const translations = {
  en: {
    clickToLearn: "Click on a planet to learn more about it",
  },
  es: {
    clickToLearn: "Haz clic en un planeta para aprender más sobre él",
  },
} as const

type Language = keyof typeof translations

const planets: Planet[] = [
  {
    name: "Mercury",
    position: [-8, 0, 0] as [number, number, number],
    size: 0.4,
    color: "#A9A9A9",
    description: "The smallest and innermost planet in the Solar System",
    textureUrl: "/textures/mercury.jpg",
    rotationSpeed: 0.01,
  },
  {
    name: "Venus",
    position: [-6, 0, 0] as [number, number, number],
    size: 0.6,
    color: "#E6E6FA",
    description: "The second planet from the Sun and Earth's closest planetary neighbor",
    textureUrl: "/textures/venus.jpg",
    rotationSpeed: 0.005,
  },
  {
    name: "Earth",
    position: [-4, 0, 0] as [number, number, number],
    size: 0.6,
    color: "#4169E1",
    description: "The third planet from the Sun and the only astronomical object known to harbor life",
    textureUrl: "/textures/earth.jpg",
    rotationSpeed: 0.01,
  },
  {
    name: "Mars",
    position: [-2, 0, 0] as [number, number, number],
    size: 0.5,
    color: "#CD5C5C",
    description: "The fourth planet from the Sun and the second-smallest planet in the Solar System",
    textureUrl: "/textures/mars.jpg",
    rotationSpeed: 0.008,
  },
  {
    name: "Jupiter",
    position: [0, 0, 0] as [number, number, number],
    size: 1.2,
    color: "#DEB887",
    description: "The fifth planet from the Sun and the largest in the Solar System",
    textureUrl: "/textures/jupiter.jpg",
    rotationSpeed: 0.02,
  },
  {
    name: "Saturn",
    position: [2, 0, 0] as [number, number, number],
    size: 1,
    color: "#F4A460",
    description: "The sixth planet from the Sun and the second-largest in the Solar System",
    textureUrl: "/textures/saturn.jpg",
    ringsTextureUrl: "/textures/saturn-rings.png",
    rotationSpeed: 0.015,
    hasRings: true,
  },
  {
    name: "Uranus",
    position: [4, 0, 0] as [number, number, number],
    size: 0.8,
    color: "#87CEEB",
    description: "The seventh planet from the Sun and the third-largest in the Solar System",
    textureUrl: "/textures/uranus.jpg",
    rotationSpeed: 0.012,
    tilt: 0.5,
  },
  {
    name: "Neptune",
    position: [6, 0, 0] as [number, number, number],
    size: 0.8,
    color: "#1E90FF",
    description: "The eighth and farthest known planet from the Sun in the Solar System",
    textureUrl: "/textures/neptune.jpg",
    rotationSpeed: 0.01,
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
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(textureUrl)
  const ringsTexture = ringsTextureUrl ? useTexture(ringsTextureUrl) : null

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += rotationSpeed * 0.5
    }
  })

  return (
    <group position={new Vector3(...position)}>
      <mesh
        ref={meshRef}
        onClick={() => setActivePlanet({ name, position, size, color, description, textureUrl, ringsTextureUrl, rotationSpeed, hasRings, tilt })}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} color={color} />
      </mesh>
      {hasRings && ringsTexture && (
        <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 2.5, 64]} />
          <meshStandardMaterial map={ringsTexture} side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}

function PlanetInfo({ activePlanet, language }: PlanetInfoProps) {
  if (!activePlanet) return null

  return (
    <div className="absolute left-4 top-4 rounded-md bg-black/70 p-4 text-white backdrop-blur-sm">
      <h3 className="text-lg font-bold mb-2">{activePlanet.name}</h3>
      <p className="text-sm opacity-90">{activePlanet.description}</p>
    </div>
  )
}

export default function PlanetExplorer() {
  const [activePlanet, setActivePlanet] = useState<Planet | null>(null)
  const { language } = useLanguage()

  return (
    <div className="relative w-full h-[600px] bg-black">
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        {planets.map((planet) => (
          <Planet
            key={planet.name}
            {...planet}
            setActivePlanet={setActivePlanet}
          />
        ))}
      </Canvas>
      <PlanetInfo activePlanet={activePlanet} language={language as Language} />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-sm opacity-75">
          {translations[language as Language].clickToLearn}
        </p>
      </div>
    </div>
  )
}
