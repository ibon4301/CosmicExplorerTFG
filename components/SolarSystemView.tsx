"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense, ForwardedRef, forwardRef, useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Group } from "three";
import { useSpring, animated } from "@react-spring/three";

// Loader Component
function Loader() {
  const { t } = useLanguage();
  return (
    <Html center>
      <div className="rounded-lg bg-black/70 p-4 text-center text-white backdrop-blur-md">
        <p className="text-lg">{t("loader.loading3DModel")}</p>
        <p className="text-sm text-zinc-400">{t("loader.loadingWait")}</p>
      </div>
    </Html>
  );
}

// Model Component con rotación automática opcional
function Model({ 
  url, 
  autoRotate = false,
  userInteracted = false,
  lastInteraction = 0
}: { 
  url: string; 
  autoRotate?: boolean;
  userInteracted?: boolean;
  lastInteraction?: number;
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<Group>(null);
  const [isActive, setIsActive] = useState(!userInteracted);
  const inactivityTimeout = 3000; // 3 segundos de inactividad
  
  // Configuración de la animación con react-spring
  const { rotation } = useSpring({
    rotation: userInteracted ? 
      [modelRef.current?.rotation.x || 0, modelRef.current?.rotation.y || 0, modelRef.current?.rotation.z || 0] : 
      [0, 0, 0],
    config: { mass: 1, tension: 120, friction: 14 }
  });
  
  // Verificar inactividad
  useEffect(() => {
    if (!userInteracted) {
      setIsActive(true);
      return;
    }
    
    const checkInactivity = setInterval(() => {
      if (Date.now() - lastInteraction > inactivityTimeout) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }, 1000);
    
    return () => clearInterval(checkInactivity);
  }, [userInteracted, lastInteraction, inactivityTimeout]);
  
  // Aplicar rotación automática si está habilitada y el usuario no ha interactuado
  useFrame((_, delta) => {
    if (autoRotate && (!userInteracted || isActive) && modelRef.current) {
      // Continuar rotación en Y
      modelRef.current.rotation.y += delta * 0.1;
      
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
  
  return (
    <animated.primitive 
      ref={modelRef} 
      object={scene} 
      rotation={rotation}
    />
  );
}

interface SolarSystemViewProps {
  modelUrl: string;
  onResetCamera?: () => void;
}

const SolarSystemView = forwardRef<any, SolarSystemViewProps>(({ modelUrl, onResetCamera }, ref) => {
  // Ajusta la posición de la cámara para una buena vista inicial del sistema solar
  const cameraPosition: [number, number, number] = [0, 20, 60];
  const [userInteracted, setUserInteracted] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const controlsRef = useRef<any>(null);

  // Función para manejar la interacción del usuario
  const handleUserInteraction = () => {
    setUserInteracted(true);
    setLastInteraction(Date.now());
  };

  // Función para resetear la cámara y reactivar la rotación automática
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      setUserInteracted(false); // Reactivar la rotación automática
    }
    
    // Llamar al callback externo si existe
    if (onResetCamera) {
      onResetCamera();
    }
  };

  // Exponer la función de reseteo a través del ref
  useEffect(() => {
    if (!ref) return;
    
    const methods = {
      reset: resetCamera
    };
    
    if (typeof ref === 'function') {
      ref(methods);
    } else {
      ref.current = methods;
    }
  }, [ref, onResetCamera]);

  return (
    <Canvas
      className="h-full w-full"
      onCreated={({ gl }) => {
        gl.setClearColor('#000010');
      }}
      onPointerDown={handleUserInteraction}
      onPointerMove={() => userInteracted && setLastInteraction(Date.now())}
    >
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={50}
        near={0.1}
        far={2000}
      />
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 5, 5]} intensity={1.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} distance={300} decay={2} />

      <Stars radius={300} depth={100} count={8000} factor={6} saturation={0} fade speed={0.3} />

      <Suspense fallback={<Loader />}>
        <Model 
          url={modelUrl} 
          autoRotate={false} 
          userInteracted={userInteracted} 
          lastInteraction={lastInteraction}
        />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        minDistance={5}
        maxDistance={300}
        onChange={handleUserInteraction}
      />
    </Canvas>
  );
});

SolarSystemView.displayName = "SolarSystemView";
export default SolarSystemView; 