"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"

function SpaceScene() {
  const { camera } = useThree()
  const starsRef = useRef()

  useEffect(() => {
    camera.position.z = 10
  }, [camera])

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <>
      <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#4169e1" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#9370db" />
    </>
  )
}

export default function SpaceHero() {
  return (
    <div className="absolute inset-0">
      <Canvas>
        <SpaceScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
