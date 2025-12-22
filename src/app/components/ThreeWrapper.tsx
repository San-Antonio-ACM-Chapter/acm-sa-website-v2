'use client'

import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { useState, useEffect } from 'react'

/**
 * A wrapper component for integrating WebGL-based 3D rendering as a backdrop with support for handling devices without WebGL capabilities.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The 3D scene components to render within the Three.js Canvas.
 * @param {React.ReactNode} [props.fallback] - An optional static backdrop to show when WebGL is not supported.
 * @param {boolean} [props.backdrop=true] - Whether to position the canvas as a fixed background.
 * @return {JSX.Element} The rendered WebGL canvas positioned as a backdrop, or fallback content if WebGL is unsupported.
 */
export function ThreeWrapper({
    children,
    fallback,
    backdrop = true
}: {
    children: React.ReactNode
    fallback?: React.ReactNode
    backdrop?: boolean
}) {
    const [dpr, setDpr] = useState(1)
    const [hasWebGL, setHasWebGL] = useState(false)

    useEffect(() => {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        setHasWebGL(!!gl)
    }, [])

    if (!hasWebGL) {
        return backdrop ? (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
            >
                {fallback}
            </div>
        ) : (
            fallback || <div>Your device doesn't support 3D graphics</div>
        )
    }

    return (
        <Canvas
            dpr={dpr}
            style={backdrop ? {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            } : undefined}
        >
            <PerformanceMonitor onDecline={() => setDpr(0.5)}>
                {children}
            </PerformanceMonitor>
        </Canvas>
    )
}
