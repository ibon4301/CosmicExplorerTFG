"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, useTexture, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { Group } from "three"

function BlackHoleGLB() {
  const gltf = useGLTF("/models/blackhole_rubykamen.glb")
  const modelRef = useRef<Group>(null)
  const [userInteracted, setUserInteracted] = useState(false)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const inactivityTimeout = 3000

  useEffect(() => {
    if (!userInteracted) return
    const checkInactivity = setInterval(() => {
      if (Date.now() - lastInteraction > inactivityTimeout) {
        setUserInteracted(false)
      }
    }, 1000)
    return () => clearInterval(checkInactivity)
  }, [userInteracted, lastInteraction, inactivityTimeout])

  useFrame((_, delta) => {
    if (!userInteracted && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2
      if (Math.abs(modelRef.current.rotation.x) > 0.01) {
        modelRef.current.rotation.x *= 0.9
      } else {
        modelRef.current.rotation.x = 0
      }
      if (Math.abs(modelRef.current.rotation.z) > 0.01) {
        modelRef.current.rotation.z *= 0.9
      } else {
        modelRef.current.rotation.z = 0
      }
    }
  })

  const handleInteraction = () => {
    setUserInteracted(true)
    setLastInteraction(Date.now())
  }

  return (
    <group
      ref={modelRef}
      onClick={handleInteraction}
      onPointerDown={handleInteraction}
      onPointerMove={() => userInteracted && setLastInteraction(Date.now())}
    >
      <primitive object={gltf.scene} scale={2.5} />
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
        <BlackHoleGLB />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={7} maxDistance={30} />
      </Canvas>
    </div>
  )
}
