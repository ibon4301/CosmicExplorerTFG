"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense, ForwardedRef, forwardRef, useRef, useState, useEffect, MutableRefObject } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Group } from "three";
import { useSpring, animated } from "@react-spring/three";

interface StarStyle {
  width: string;
  height: string;
  top: string;
  left: string;
  opacity: number;
  boxShadow: string;
}

// MODIFICADO: Loader ahora usa el hook de idioma
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

// Componente Model modificado para incluir rotación automática
function Model({ 
  url, 
  scale = [1.5, 1.5, 1.5], 
  autoRotate = true,
  userInteracted = false,
  lastInteraction = 0
}: { 
  url: string; 
  scale?: [number, number, number];
  autoRotate?: boolean;
  userInteracted?: boolean;
  lastInteraction?: number;
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<Group>(null);
  const [isActive, setIsActive] = useState(!userInteracted);
  const inactivityTimeout = 3000; // 3 segundos de inactividad
  
  scene.scale.set(...scale);
  
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
  
  // Aplicar rotación automática si está habilitada y el usuario no ha interactuado o está inactivo
  useFrame((_, delta) => {
    if (autoRotate && (!userInteracted || isActive) && modelRef.current) {
      // Continuar rotación en Y
      modelRef.current.rotation.y += delta * 0.3;
      
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

// Definimos las props que recibirá el componente
interface SpaceshipModelProps {
  modelExternalUrl: string;
  onResetCamera?: () => void;
}

// Usamos forwardRef para pasar el ref a OrbitControls
const SpaceshipModel = forwardRef<any, SpaceshipModelProps>(({ modelExternalUrl, onResetCamera }, ref) => {
  const shuttleUrl = "/models/shuttle.glb"; 
  const [userInteracted, setUserInteracted] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const controlsRef = useRef<any>(null);

  // Valores por defecto para la mayoría de los modelos
  let cameraPosition: [number, number, number] = [0, 1.5, 7]; 
  let modelScale: [number, number, number] = [1.5, 1.5, 1.5]; 
  let cameraNearPlane = 0.1;
  let cameraFarPlane = 1000;

  // Ajustes específicos si es el Shuttle (antes de re-escalarlo en Blender)
  if (modelExternalUrl === shuttleUrl) {
    cameraPosition = [0, 2, 18]; 
    modelScale = [0.8, 0.8, 0.8];   
  }

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
        gl.setClearColor('#00001a'); 
      }}
      onPointerDown={handleUserInteraction}
      onPointerMove={() => userInteracted && setLastInteraction(Date.now())}
    >
      <PerspectiveCamera 
        makeDefault 
        position={cameraPosition} 
        fov={50} 
        near={cameraNearPlane}
        far={cameraFarPlane}
      />
      <ambientLight intensity={0.5} /> 
      {/* Ajustar la posición de las luces para que sean absolutas o basadas en la escena, no en la cámara si esta cambia mucho */}
      <directionalLight position={[20, 20, 20]} intensity={1.0} />
      <directionalLight position={[-20, -10, -20]} intensity={0.3} />
      
      <Stars radius={120} depth={60} count={5000} factor={5} saturation={0} fade speed={0.5} />

      <Suspense fallback={<Loader />}>
        <Model 
          url={modelExternalUrl} 
          scale={modelScale} 
          autoRotate={true} 
          userInteracted={userInteracted} 
          lastInteraction={lastInteraction}
        />
      </Suspense>
      <OrbitControls
        ref={controlsRef} 
        enableZoom={true}
        enablePan={true}
        minDistance={1} 
        maxDistance={100} // Rango de zoom razonable para modelos de tamaño normal
        onChange={handleUserInteraction} // Detectar cuando el usuario interactúa con los controles
      />
    </Canvas>
  );
});

SpaceshipModel.displayName = "SpaceshipModel";

export default SpaceshipModel;
