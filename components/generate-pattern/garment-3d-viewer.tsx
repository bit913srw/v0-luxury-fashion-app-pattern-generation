"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

interface GarmentMeshProps {
  isDragging: boolean
}

function DressMannequin({ isDragging }: GarmentMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((_, delta) => {
    if (groupRef.current && !isDragging) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  const mannequinColor = "#E8E4DD"
  const dressColor = "#8B1A1A"

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Mannequin Stand */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.9, 16]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Mannequin Torso - cloth covered */}
      <mesh position={[0, 0.6, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial color={mannequinColor} roughness={0.9} />
      </mesh>

      {/* Mannequin Shoulders */}
      <mesh position={[0.42, 1.1, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.08, 0.15, 4, 8]} />
        <meshStandardMaterial color={mannequinColor} roughness={0.9} />
      </mesh>
      <mesh position={[-0.42, 1.1, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.08, 0.15, 4, 8]} />
        <meshStandardMaterial color={mannequinColor} roughness={0.9} />
      </mesh>

      {/* Mannequin Neck */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.2, 16]} />
        <meshStandardMaterial color={mannequinColor} roughness={0.9} />
      </mesh>

      {/* Mannequin Head cap */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={mannequinColor} roughness={0.9} />
      </mesh>

      {/* Dress - Bodice */}
      <mesh position={[0, 0.65, 0.02]}>
        <cylinderGeometry args={[0.38, 0.32, 0.9, 32, 1, true]} />
        <meshStandardMaterial 
          color={dressColor} 
          side={THREE.DoubleSide}
          roughness={0.6}
        />
      </mesh>

      {/* Dress - Neckline */}
      <mesh position={[0, 1.1, 0.05]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.2, 0.02, 8, 32, Math.PI]} />
        <meshStandardMaterial color={dressColor} roughness={0.6} />
      </mesh>

      {/* Dress - Skirt */}
      <mesh position={[0, -0.2, 0]}>
        <coneGeometry args={[0.65, 1.2, 32, 1, true]} />
        <meshStandardMaterial 
          color={dressColor} 
          side={THREE.DoubleSide}
          roughness={0.6}
        />
      </mesh>

      {/* Dress - Waist Belt */}
      <mesh position={[0, 0.2, 0.02]}>
        <torusGeometry args={[0.33, 0.025, 8, 32]} />
        <meshStandardMaterial color="#6B1515" roughness={0.5} />
      </mesh>

      {/* Sleeves - Left */}
      <mesh position={[-0.5, 0.85, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.1, 0.12, 0.35, 16, 1, true]} />
        <meshStandardMaterial 
          color={dressColor} 
          side={THREE.DoubleSide}
          roughness={0.6}
        />
      </mesh>

      {/* Sleeves - Right */}
      <mesh position={[0.5, 0.85, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.1, 0.12, 0.35, 16, 1, true]} />
        <meshStandardMaterial 
          color={dressColor} 
          side={THREE.DoubleSide}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

interface Garment3DViewerProps {
  garmentType: string
}

export function Garment3DViewer({ garmentType }: Garment3DViewerProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="relative aspect-[3/4] bg-[#F5F3EF] border border-border overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "#F5F3EF" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} />
        <Environment preset="studio" />
        
        <DressMannequin isDragging={isDragging} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          onStart={() => setIsDragging(true)}
          onEnd={() => setIsDragging(false)}
        />
      </Canvas>

      {/* Label overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground bg-background/80 py-1 px-2 inline-block">
          AI Generated {garmentType}
        </p>
      </div>
    </div>
  )
}
