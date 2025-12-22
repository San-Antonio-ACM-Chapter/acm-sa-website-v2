/**
 * A Next.js page component that renders a 3D scene with a sphere and dynamic environment lighting
 * provides a backdrop for the acm website
 *
 * IMPORTANT: AS OF THE TIME OF THIS WRITING, THE SPHERE, THE ENV, THE PRESET TYPE, AND THE CONSTRUCTED ELEMENTS
 * UNDER THE CANVAS ARE PLACEHOLDERS, THEY ARE TAKEN FOM THIS TECH DEMO https://codesandbox.io/p/sandbox/pj7zjq?file=%2Fsrc%2FApp.js%3A49%2C31-49%2C37
 * AS A PROOF OF CONCEPT THEY ARE NOT OWNED BY ACM SA IN ANY WAY AND MUST BE REPLACED BEFORE PRODUCTION RELEASE
 */
'use client';

import { useState, useTransition } from 'react'
import { useControls } from 'leva'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'

type PresetType = "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby" | undefined

function Sphere() {
  const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } })
  return (
    <Center top>
      <mesh castShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial metalness={1} roughness={roughness} />
      </mesh>
    </Center>
  )
}

function Env() {
  const [preset, setPreset] = useState<PresetType>('sunset')
  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition()
  const { blur } = useControls({
    blur: { value: 0.65, min: 0, max: 1 },
    preset: {
      value: preset,
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
      // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
      // That way we can hang onto the current environment until the new one has finished loading ...
      onChange: (value) => startTransition(() => setPreset(value))
    }
  })
  return <Environment preset={preset} background blur={blur} />
}

export default function Home() {
  return (
    <>
      {/* 3D Background Scene */}
      <Canvas style={{position: 'fixed'}} shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <group position={[0, -0.65, 0]}>
          <Sphere />
          <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
            <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
          </AccumulativeShadows>
        </group>
        <Env />
        <OrbitControls autoRotate autoRotateSpeed={0.3} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>

      {/* Interactive UI Content - Sits on top of 3D backdrop */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <div
          className="container"
          style={{ minHeight: "100vh", paddingTop: "2rem" }}
        >
          <h1>ACM San Antonio</h1>
          <p>Your interactive UI content goes here</p>
          {/* Add your buttons, cards, forms, etc. */}
        </div>
      </main>
    </>
  );
}
