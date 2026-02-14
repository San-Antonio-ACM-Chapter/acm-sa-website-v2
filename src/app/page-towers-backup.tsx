/**
 * A Next.js page component that renders a 3D scene with a sphere and dynamic environment lighting
 * provides a backdrop for the acm website
 *
 * IMPORTANT: AS OF THE TIME OF THIS WRITING, THE SPHERE, THE ENV, THE PRESET TYPE, AND THE CONSTRUCTED ELEMENTS
 * UNDER THE CANVAS ARE PLACEHOLDERS, THEY ARE TAKEN FOM THIS TECH DEMO https://codesandbox.io/p/sandbox/pj7zjq?file=%2Fsrc%2FApp.js%3A49%2C31-49%2C37
 * AS A PROOF OF CONCEPT THEY ARE NOT OWNED BY ACM SA IN ANY WAY AND MUST BE REPLACED BEFORE PRODUCTION RELEASE
 */
'use client';

import { useMemo, useRef } from 'react'
import { Canvas, type ThreeElements, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, OrthographicCamera, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import * as THREE from 'three'

/**
 * A single Hexagonal Prism - glass-like material
 * @param props
 * @constructor
 */
function HexagonalPrism(props: ThreeElements['mesh'] & { hexColor?: string; baseScale?: [number, number, number]; animationOffset?: number; animationSpeed?: number; useExpensiveMaterial?: boolean }){
  const meshRef = useRef<THREE.Mesh>(null)
  const { hexColor = "#000000", baseScale = [1, 1, 1], animationOffset = 0, animationSpeed = 1, useExpensiveMaterial = false, ...meshProps } = props

  const hexShape = useMemo(() => {
    const shape = new THREE.Shape()
    const sides = 6
    const radius = 0.45 // Slightly smaller for gaps

    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      if (i === 0) {
        shape.moveTo(x, y)
      } else {
        shape.lineTo(x, y)
      }
    }
    shape.closePath()
    return shape
  }, [])

  // Animate the Z scale to oscillate up and down
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime()
      // Use animationSpeed to control the frequency
      const frequency = (Math.PI * 2) / 60 * animationSpeed
      // Oscillate between 0.5 and 1.5 times the base scale using sine wave
      const oscillation = Math.sin(elapsedTime * frequency + animationOffset) * 0.5 + 1
      meshRef.current.scale.set(
        baseScale[0],
        baseScale[1],
        baseScale[2] * oscillation
      )
    }
  })

  return (
    <mesh
      {...meshProps}
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}> {/* Rotate -90 degrees along X axis to flip right-side up */}
      <extrudeGeometry args={[hexShape, {depth: 0.6, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3}]} />
      {useExpensiveMaterial ? (
        // Expensive but beautiful transmission material for featured hexagons
        <MeshTransmissionMaterial
          color={hexColor}
          transmission={0.9}
          thickness={0.4}
          roughness={0.15}
          metalness={0}
          ior={1.5}
          chromaticAberration={0.06}
          backside={true}
          envMapIntensity={2.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={0.5}
          attenuationColor={hexColor}
        />
      ) : (
        // Lightweight glass-like material for background hexagons
        <meshPhysicalMaterial
          color={hexColor}
          transparent={true}
          opacity={0.6}
          metalness={0.1}
          roughness={0.2}
          envMapIntensity={1.5}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          transmission={0.3}
        />
      )}
    </mesh>
  )
}

/**
 * Grid of hexagonal prisms extending toward the horizon
 */
function HexagonGrid() {
  // Leva controls for fine-tuning
  const { animationSpeed, scaleVariance } = useControls('Animation', {
    animationSpeed: { value: 1, min: 0, max: 5, step: 0.1, label: 'Animation Speed' },
    scaleVariance: { value: 3, min: 0, max: 6, step: 0.1, label: 'Height Variance' }
  })

  const hexagons = useMemo(() => {
    const items: { key: string; position: [number, number, number]; color: string; scale: [number, number, number]; animationOffset: number; useExpensive: boolean }[] = []

    // 100 hexagons in a 10x10 grid - only first row uses expensive material
    const colors = ["#ffffff", "#30BCED", "#E84855"]
    const cols = 10
    const rows = 10
    const hexRadius = 0.45
    const spacing = 0.9
    const hexWidth = spacing * Math.sqrt(3)
    const hexHeight = -hexRadius * 1.5 // Row spacing

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Offset every other row for hexagonal tiling
        const xOffset = row % 2 === 0 ? 0 : hexWidth / 2
        const x = col * hexWidth + xOffset - (cols * hexWidth) / 2
        const z = row * hexHeight

        // Random color selection
        const color = colors[Math.floor(Math.random() * colors.length)]

        // Random height variation
        const heightScale = 1 + Math.random() * scaleVariance

        // Random animation phase
        const animationOffset = Math.random() * Math.PI * 2

        // Only use expensive material for first row (closest to camera)
        const useExpensive = row === 0

        items.push({
          key: `hex-${row}-${col}`,
          position: [x, -0.5, z] as [number, number, number],
          color: color,
          scale: [1, 1, heightScale] as [number, number, number],
          animationOffset: animationOffset,
          useExpensive: useExpensive
        })
      }
    }

    return items
  }, [scaleVariance])

  return (
    <group>
      {hexagons.map(({ key, position, color, scale, animationOffset, useExpensive }) => (
        <HexagonalPrism
          key={key}
          position={position}
          hexColor={color}
          baseScale={scale}
          animationOffset={animationOffset}
          animationSpeed={animationSpeed}
          useExpensiveMaterial={useExpensive}
        />
      ))}
    </group>
  )
}

/**
 * Lights component with controls
 */
function Lights() {
  const lightControls = useControls('Lighting', {
    ambientIntensity: { value: 0.4, min: 0, max: 2, step: 0.1, label: 'Ambient Intensity' },
    hemisphereIntensity: { value: 2.5, min: 0, max: 5, step: 0.1, label: 'Hemisphere Intensity' },
    spotlightIntensity: { value: 300, min: 0, max: 500, step: 10, label: 'Spotlight Intensity' },
    pointLightIntensity: { value: 150, min: 0, max: 300, step: 10, label: 'Point Light Intensity' },
    lightColor: { value: '#ffffff', label: 'Light Color' },
    accentColor: { value: '#ffffff', label: 'Accent Color' },
  })

  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={lightControls.ambientIntensity} />

      {/* Main hemisphere light for global illumination */}
      <hemisphereLight
        color={lightControls.lightColor}
        groundColor="#303030"
        intensity={lightControls.hemisphereIntensity}
        position={[0, -5, 0]}
      />

      {/* Primary spotlight from below */}
      <spotLight
        position={[0, -3, 0]}
        target-position={[0, 0, 0]}
        intensity={lightControls.spotlightIntensity}
        color={lightControls.lightColor}
        angle={Math.PI / 3}
        penumbra={0.5}
        distance={50}
      />

      {/* Main directional light for highlights and shine */}
      <directionalLight position={[10, 10, 10]} intensity={1.2} color={lightControls.lightColor} />

      {/* Key point light from below for glass refraction */}
      <pointLight position={[0, -1.5, 0]} intensity={lightControls.pointLightIntensity} color={lightControls.lightColor} distance={30} />
    </>
  )
}

export default function Home() {
  const { orthographic } = useControls('Camera', {
    orthographic: { value: false, label: 'Orthographic View' }
  })

  return (
    <>
      {/* 3D Background Scene */}
      <Canvas
        style={{position: 'fixed', inset: 0, width: '100vw', height: '100vh'}}
        shadows
      >
        {/* Conditional camera rendering based on orthographic toggle */}
        {orthographic ? (
          <OrthographicCamera
            makeDefault
            position={[0, 10, 12]}
            zoom={50}
          />
        ) : (
          <PerspectiveCamera
            makeDefault
            position={[0, 10, 12]}
            fov={60}
          />
        )}

        {/* Camera controls - drag to rotate, scroll to zoom, right-click to pan */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
        />

        {/* All lights with controls */}
        <Lights />

        {/* HDR Environment for realistic glass reflections */}
        <Environment preset="studio" />

        {/* Grid of hexagons */}
        <HexagonGrid />

        {/* Dark background */}
        <color attach="background" args={['#0a0a0a']} />


        {/* Post-processing effects for glass-like appearance */}
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration
            offset={[0.0015, 0.0015]}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>

      {/* Interactive UI Content - Sits on top of 3D backdrop */}
      {/*<main style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>*/}
      {/*  <div*/}
      {/*    className="container"*/}
      {/*    style={{ minHeight: "100vh", paddingTop: "2rem", pointerEvents: "auto" }}*/}
      {/*  >*/}
      {/*    <h1>ACM San Antonio</h1>*/}
      {/*    <p>Your interactive UI content goes here</p>*/}
      {/*    /!* Add your buttons, cards, forms, etc. *!/*/}
      {/*  </div>*/}
      {/*</main>*/}
    </>
  );
}
