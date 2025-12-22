import { ThreeWrapper } from '@/app/components/ThreeWrapper'

export default function Home() {
    return (
        <>
            {/* 3D Background Scene */}
            <ThreeWrapper fallback={
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: '100%',
                    height: '100%'
                }} />
            }>
                {/* Your Three.js scene components go here */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                {/* Add your 3D models, meshes, etc. */}
            </ThreeWrapper>

            {/* Interactive UI Content - Sits on top of 3D backdrop */}
            <main style={{ position: 'relative', zIndex: 1 }}>
                <div className="container" style={{ minHeight: '100vh', paddingTop: '2rem' }}>
                    <h1>ACM San Antonio</h1>
                    <p>Your interactive UI content goes here</p>
                    {/* Add your buttons, cards, forms, etc. */}
                </div>
            </main>
        </>
    )
}
