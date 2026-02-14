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
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, OrthographicCamera, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import * as THREE from 'three'

/**
 * Hexagonal Blanket - A single mesh with hexagonal pattern where vertices animate
 * Much more performant than individual meshes
 */
function HexagonalBlanket({
  animationSpeed,
  waveAmplitude,
  envMapIntensity,
  clearcoat,
  transmission
}: {
  animationSpeed: number;
  waveAmplitude: number;
  envMapIntensity: number;
  clearcoat: number;
  transmission: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null)


  // Create the hexagonal grid geometry
  const geometry = useMemo(() => {
    // Create a square plane: 400x400 units with 50 segments
    const geo = new THREE.PlaneGeometry(
      500,
      500,
      400,
      400
    )

    // Rotate to face upward
    geo.rotateX(-Math.PI / 2)

    // Store original positions for animation reference
    const originalPositions = new Float32Array(geo.attributes.position.array)
    geo.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3))

    // Store random animation properties for each vertex
    const vertexCount = geo.attributes.position.count
    const animationOffsets = new Float32Array(vertexCount)
    const animationSpeeds = new Float32Array(vertexCount)
    const animationRanges = new Float32Array(vertexCount)

    for (let i = 0; i < vertexCount; i++) {
      animationOffsets[i] = Math.random() * Math.PI * 2 // Random phase offset
      animationSpeeds[i] = 0.5 + Math.random() * 1.5 // Random speed multiplier (0.5 to 2.0)
      animationRanges[i] = 0.3 + Math.random() * 0.7 // Random amplitude multiplier (0.3 to 1.0)
    }

    geo.setAttribute('animationOffset', new THREE.BufferAttribute(animationOffsets, 1))
    geo.setAttribute('animationSpeed', new THREE.BufferAttribute(animationSpeeds, 1))
    geo.setAttribute('animationRange', new THREE.BufferAttribute(animationRanges, 1))


    return geo
  }, [])

  // Animate the vertices with individual random motion
  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.geometry) {
      const time = clock.getElapsedTime() * animationSpeed
      const positions = meshRef.current.geometry.attributes.position
      const originalPositions = meshRef.current.geometry.attributes.originalPosition
      const animationOffsets = meshRef.current.geometry.attributes.animationOffset
      const animationSpeeds = meshRef.current.geometry.attributes.animationSpeed
      const animationRanges = meshRef.current.geometry.attributes.animationRange

      for (let i = 0; i < positions.count; i++) {
        const originalY = originalPositions.getY(i)
        const offset = animationOffsets.getX(i)
        const speed = animationSpeeds.getX(i)
        const range = animationRanges.getX(i)

        // Each vertex oscillates independently with its own phase, speed, and amplitude
        const y = originalY + Math.sin(time * speed + offset) * waveAmplitude * range

        positions.setY(i, y)
      }

      positions.needsUpdate = true
      meshRef.current.geometry.computeVertexNormals()
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <MeshTransmissionMaterial
        color="#30BCED"
        transmission={transmission}
        thickness={0.5}
        roughness={0.1}
        metalness={0}
        ior={1.5}
        chromaticAberration={0.08}
        backside={true}
        envMapIntensity={envMapIntensity}
        clearcoat={clearcoat}
        clearcoatRoughness={0.1}
        attenuationDistance={0.8}
        attenuationColor="#30BCED"
      />
    </mesh>
  )
}



/**
 * Custom camera component that handles lookAt properly
 */
function ControlledCamera({
  orthographic,
  position,
  lookAt,
  fov,
  zoom
}: {
  orthographic: boolean;
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  zoom: number
}) {
  const orthoCameraRef = useRef<THREE.OrthographicCamera>(null)
  const perspCameraRef = useRef<THREE.PerspectiveCamera>(null)

  useFrame(() => {
    const camera = orthographic ? orthoCameraRef.current : perspCameraRef.current
    if (camera) {
      camera.lookAt(lookAt[0], lookAt[1], lookAt[2])
    }
  })

  if (orthographic) {
    return (
      <OrthographicCamera
        ref={orthoCameraRef}
        makeDefault
        position={position}
        zoom={zoom}
      />
    )
  }

  return (
    <PerspectiveCamera
      ref={perspCameraRef}
      makeDefault
      position={position}
      fov={fov}
    />
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
  // Animation controls
  const { animationSpeed, waveAmplitude } = useControls('Animation', {
    animationSpeed: { value: 1, min: 0, max: 5, step: 0.1, label: 'Animation Speed' },
    waveAmplitude: { value: 1.5, min: 0, max: 5, step: 0.1, label: 'Wave Height' }
  })

  // Material controls - these affect bloom brightness
  const { envMapIntensity, clearcoat, transmission } = useControls('Material (Bloom Source)', {
    envMapIntensity: { value: 3, min: 0, max: 10, step: 0.1, label: 'Env Reflection Intensity' },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01, label: 'Clearcoat (Shine)' },
    transmission: { value: 0.95, min: 0, max: 1, step: 0.01, label: 'Transmission' }
  })

  const { orthographic, camX, camY, camZ, targetX, targetY, targetZ, fov, zoom, enableOrbitControls } = useControls('Camera', {
    orthographic: { value: false, label: 'Orthographic View' },
    enableOrbitControls: { value: true, label: 'Enable Orbit Controls' },
    camX: { value: 0, min: -100, max: 100, step: 0.1, label: 'Position X' },
    camY: { value: 10, min: -100, max: 100, step: 0.1, label: 'Position Y' },
    camZ: { value: 12, min: -100, max: 100, step: 0.1, label: 'Position Z' },
    targetX: { value: 0, min: -100, max: 100, step: 0.1, label: 'Look At X' },
    targetY: { value: 0, min: -100, max: 100, step: 0.1, label: 'Look At Y' },
    targetZ: { value: 0, min: -100, max: 100, step: 0.1, label: 'Look At Z' },
    fov: { value: 60, min: 10, max: 120, step: 1, label: 'FOV (Perspective)' },
    zoom: { value: 50, min: 1, max: 200, step: 1, label: 'Zoom (Orthographic)' }
  })

  const { bloomIntensity, filmGrainIntensity } = useControls('Effects', {
    bloomIntensity: { value: 0.05, min: 0, max: 0.1, step: 0.001, label: 'Bloom Intensity' },
    filmGrainIntensity: { value: 0.3, min: 0, max: 1, step: 0.01, label: 'Film Grain Intensity' }
  })

  const { environment } = useControls('Environment', {
    environment: {
      value: 'sunset' as const,
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'] as const,
      label: 'Environment Preset'
    }
  })

  // Settings export button
  useControls('Settings', {
    'Copy All Settings': {
      value: 'Copy',
      onChange: () => {
        const settings = {
          animation: {
            animationSpeed,
            waveAmplitude
          },
          material: {
            envMapIntensity,
            clearcoat,
            transmission
          },
          camera: {
            orthographic,
            enableOrbitControls,
            position: { x: camX, y: camY, z: camZ },
            lookAt: { x: targetX, y: targetY, z: targetZ },
            fov,
            zoom
          },
          effects: {
            bloomIntensity,
            filmGrainIntensity
          },
          environment
        }

        const settingsJSON = JSON.stringify(settings, null, 2)
        navigator.clipboard.writeText(settingsJSON).then(() => {
          console.log('✅ Settings copied to clipboard!')
          console.log(settingsJSON)
          alert('Settings copied to clipboard!')
        }).catch(err => {
          console.error('Failed to copy settings:', err)
          alert('Failed to copy settings. Check console for details.')
        })
      }
    }
  })

  return (
    <>
      {/* 3D Background Scene */}
      <Canvas
        style={{position: 'fixed', inset: 0, width: '100vw', height: '100vh'}}
        shadows
      >
        {/* Camera with position and lookAt controls */}
        <ControlledCamera
          orthographic={orthographic}
          position={[camX, camY, camZ]}
          lookAt={[targetX, targetY, targetZ]}
          fov={fov}
          zoom={zoom}
        />

        {/* Camera controls - only active when enabled */}
        {enableOrbitControls && (
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2}
            target={[targetX, targetY, targetZ]}
          />
        )}

        {/* All lights with controls */}
        <Lights />

        {/* HDR Environment for realistic glass reflections */}
        <Environment preset={environment} />

        {/* Hexagonal Blanket */}
        <HexagonalBlanket
          animationSpeed={animationSpeed}
          waveAmplitude={waveAmplitude}
          envMapIntensity={envMapIntensity}
          clearcoat={clearcoat}
          transmission={transmission}
        />


        {/* Dark background */}
        <color attach="background" args={['#0a0a0a']} />


        {/* Post-processing effects for glass-like appearance */}
        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration
            offset={[0.0015, 0.0015]}
            blendFunction={BlendFunction.NORMAL}
          />
          <Noise
            opacity={filmGrainIntensity}
            blendFunction={BlendFunction.OVERLAY}
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
