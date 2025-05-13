"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Group } from "three";
import { ArrowLeft } from "lucide-react";
import { useSpring, animated } from "@react-spring/three";

// Componente para mostrar un mensaje de carga
function Loader() {
  const { t } = useLanguage();
  return (
    <Html center>
      <div className="rounded-lg bg-black/70 p-2 text-center text-white backdrop-blur-md">
        <p className="text-sm">{t("loader.loading3DModel")}</p>
      </div>
    </Html>
  );
}

// Componente para el modelo del planeta
function PlanetModelInner({ 
  url, 
  planetColor
}: { 
  url: string; 
  planetColor: string;
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<Group>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const inactivityTimeout = 3000; // 3 segundos de inactividad para volver a la rotación automática
  
  // Configuración de la animación con react-spring
  const { rotation } = useSpring({
    rotation: userInteracted ? 
      [modelRef.current?.rotation.x || 0, modelRef.current?.rotation.y || 0, modelRef.current?.rotation.z || 0] : 
      [0, 0, 0],
    config: { mass: 1, tension: 120, friction: 14 }
  });

  // Verificar si el usuario ha estado inactivo
  useEffect(() => {
    if (!userInteracted) return;
    
    const checkInactivity = setInterval(() => {
      if (Date.now() - lastInteraction > inactivityTimeout) {
        setUserInteracted(false);
      }
    }, 1000);
    
    return () => clearInterval(checkInactivity);
  }, [userInteracted, lastInteraction, inactivityTimeout]);
  
  // Aplicar rotación automática si el usuario no ha interactuado
  useFrame((_, delta) => {
    if (!userInteracted && modelRef.current) {
      // Continuar rotación en Y
      modelRef.current.rotation.y += delta * 0.5;
      
      // Restaurar suavemente la rotación a la posición inicial en X y Z
      if (Math.abs(modelRef.current.rotation.x) > 0.01) {
        modelRef.current.rotation.x *= 0.9;
      } else {
        modelRef.current.rotation.x = 0;
      }
      
      if (Math.abs(modelRef.current.rotation.z) > 0.01) {
        modelRef.current.rotation.z *= 0.9;
      } else {
        modelRef.current.rotation.z = 0;
      }
    }
  });
  
  const handleInteraction = () => {
    setUserInteracted(true);
    setLastInteraction(Date.now());
  };
  
  return (
    <animated.group 
      ref={modelRef}
      onClick={handleInteraction}
      onPointerDown={handleInteraction}
      onPointerMove={() => userInteracted && setLastInteraction(Date.now())}
      rotation={rotation}
    >
      <primitive object={scene} />
    </animated.group>
  );
}

// Componente principal que renderiza el canvas
interface PlanetModelProps {
  modelUrl: string;
  planetColor: string;
  onBackToImage: () => void;
}

export default function PlanetModel({ modelUrl, planetColor, onBackToImage }: PlanetModelProps) {
  const { t } = useLanguage();
  
  return (
    <div className="w-full h-full relative">
      {/* Botón para volver a la imagen */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Evitar que el clic se propague al canvas
          onBackToImage();
        }}
        className={`absolute top-2 left-2 z-10 bg-${planetColor}-500 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 transition-all duration-300 flex items-center gap-1`}
      >
        <ArrowLeft size={16} />
        <span className="text-xs">{t("planets.backToImage") || "Back"}</span>
      </button>
      
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
        
        <Suspense fallback={<Loader />}>
          <PlanetModelInner url={modelUrl} planetColor={planetColor} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
} 