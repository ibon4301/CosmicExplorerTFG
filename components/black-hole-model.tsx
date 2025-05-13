"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, useTexture } from "@react-three/drei"
import * as THREE from "three"

function BlackHole({ language = "en" }) {
  const blackHoleRef = useRef<THREE.Group>(null)
  const accretionDiskRef = useRef<THREE.Mesh>(null)

  // Textura para el disco de acreción
  const accretionTexture = useTexture("/placeholder.svg?height=1024&width=1024") // TU IMAGEN AQUI - Textura de disco de acreción de NASA

  // Crear partículas para el efecto de distorsión espacial
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 2000
  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Distribución esférica alrededor del agujero negro
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const radius = 3 + Math.random() * 5

    posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
    posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
    posArray[i + 2] = radius * Math.cos(phi)
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  useFrame((state, delta) => {
    if (blackHoleRef.current) {
      blackHoleRef.current.rotation.y += delta * 0.1
    }

    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z += delta * 0.2
    }
  })

  return (
    <group ref={blackHoleRef}>
      {/* Agujero negro (esfera negra) */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="black" roughness={0.1} metalness={1} />
      </mesh>

      {/* Disco de acreción */}
      <mesh ref={accretionDiskRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 8, 64]} />
        <meshStandardMaterial
          map={accretionTexture}
          side={THREE.DoubleSide}
          emissive="#ff3300"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Efecto de distorsión espacial */}
      <points>
        <primitive object={particlesGeometry} />
        <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
      </points>

      {/* Efecto de lente gravitacional (anillo brillante) */}
      <mesh>
        <torusGeometry args={[2.1, 0.2, 16, 100]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={1} transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

export default function BlackHoleModel({ language = "en" }) {
  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <BlackHole language={language} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={7} maxDistance={30} />
      </Canvas>
    </div>
  )
}
