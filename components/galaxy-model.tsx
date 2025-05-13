"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, useTexture } from "@react-three/drei"
import * as THREE from "three"

function MilkyWayModel({ language = "en" }) {
  const galaxyRef = useRef<THREE.Group>(null)
  const galaxyTexture = useTexture("/placeholder.svg?height=1024&width=1024") // TU IMAGEN AQUI - Textura de la Vía Láctea de NASA

  // Crear partículas para simular estrellas en la galaxia
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 5000
  const posArray = new Float32Array(particlesCount * 3)
  const colors = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Distribución en espiral
    const angle = Math.random() * Math.PI * 2
    const radius = 5 + Math.random() * 10 * Math.pow(Math.random(), 2)

    posArray[i] = Math.cos(angle) * radius
    posArray[i + 1] = (Math.random() - 0.5) * 2
    posArray[i + 2] = Math.sin(angle) * radius

    // Colores - del centro blanco/azul a los bordes amarillos/rojos
    const distanceFromCenter = Math.sqrt(posArray[i] * posArray[i] + posArray[i + 2] * posArray[i + 2])

    if (distanceFromCenter < 8) {
      // Centro - azul/blanco
      colors[i] = 0.5 + Math.random() * 0.5
      colors[i + 1] = 0.5 + Math.random() * 0.5
      colors[i + 2] = 0.8 + Math.random() * 0.2
    } else {
      // Bordes - amarillo/rojo
      colors[i] = 0.8 + Math.random() * 0.2
      colors[i + 1] = 0.3 + Math.random() * 0.5
      colors[i + 2] = 0.1 + Math.random() * 0.2
    }
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

  useFrame((state, delta) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={galaxyRef}>
      {/* Disco galáctico */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial
          map={galaxyTexture}
          transparent={true}
          opacity={0.7}
          side={THREE.DoubleSide}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Estrellas de la galaxia */}
      <points>
        <primitive object={particlesGeometry} />
        <pointsMaterial size={0.1} vertexColors transparent alphaMap={galaxyTexture} alphaTest={0.01} />
      </points>

      {/* Bulbo central */}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial color="#ffedba" emissive="#ffedba" emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

export default function GalaxyModel({ language = "en" }) {
  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 15, 25], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#9370db" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <MilkyWayModel language={language} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
