"use client"

import { useRef, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"

interface GarmentMeshProps {
  isDragging: boolean
}

function GarmentMesh({ isDragging }: GarmentMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Auto-rotate when not dragging
  useFrame((_, delta) => {
    if (groupRef.current && !isDragging) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  // Create dress/garment shape using multiple geometries
  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Mannequin torso - neutral cloth color */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#C4B8A8" roughness={0.8} />
      </mesh>
      
      {/* Shoulders */}
      <mesh position={[0, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#C4B8A8" roughness={0.8} />
      </mesh>
      
      {/* Upper torso */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.25, 0.22, 0.5, 16]} />
        <meshStandardMaterial color="#C4B8A8" roughness={0.8} />
      </mesh>
      
      {/* Waist */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.3, 16]} />
        <meshStandardMaterial color="#C4B8A8" roughness={0.8} />
      </mesh>
      
      {/* Hips */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.28, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#C4B8A8" roughness={0.8} />
      </mesh>

      {/* Dress bodice - luxurious deep red fabric */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.27, 0.24, 0.55, 32]} />
        <meshStandardMaterial 
          color="#8B1A1A" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Dress waist */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.23, 0.27, 0.35, 32]} />
        <meshStandardMaterial 
          color="#8B1A1A" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Dress skirt - A-line flowing shape */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.6, 0.24, 1.0, 32]} />
        <meshStandardMaterial 
          color="#8B1A1A" 
          roughness={0.6} 
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Skirt hem detail */}
      <mesh position={[0, -0.32, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshStandardMaterial 
          color="#6B1515" 
          roughness={0.5}
        />
      </mesh>

      {/* Neckline detail */}
      <mesh position={[0, 1.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.015, 8, 32]} />
        <meshStandardMaterial 
          color="#6B1515" 
          roughness={0.5}
        />
      </mesh>

      {/* Mannequin stand */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.05, 32]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#8B1A1A" wireframe />
    </mesh>
  )
}

interface GarmentViewer3DProps {
  garmentType: string
}

export function GarmentViewer3D({ garmentType }: GarmentViewer3DProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="relative aspect-[3/4] bg-[#F5F3EF] border border-border overflow-hidden">
      <Canvas
        camera={{ position: [0, 1, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "#F5F3EF" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.3} />
          <pointLight position={[0, 3, 0]} intensity={0.4} />
          
          <GarmentMesh isDragging={isDragging} />
          
          <ContactShadows
            position={[0, -0.75, 0]}
            opacity={0.3}
            scale={3}
            blur={2}
            far={1}
          />
          
          <Environment preset="studio" />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            onStart={() => setIsDragging(true)}
            onEnd={() => setIsDragging(false)}
          />
        </Suspense>
      </Canvas>
      
      {/* Label overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground bg-background/80 py-1 px-2 inline-block">
          AI Generated {garmentType}
        </p>
      </div>
    </div>
  )
}
