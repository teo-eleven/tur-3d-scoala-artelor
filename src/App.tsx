import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Building } from './scene/Building'
import { Lighting } from './scene/Lighting'
import { CameraRig } from './camera/CameraRig'
import { SCROLL_LENGTH_VH, initScroll } from './scroll/scrollController'
import { useQualityTier } from './hooks/useQualityTier'
import { Overlay } from './ui/Overlay'
import { Loader } from './ui/Loader'

const CAMERA = { fov: 58, near: 0.1, far: 220, position: [0, 3.2, 30] as const }

export const App = () => {
  const tier = useQualityTier()
  const isHighQuality = tier === 'high'

  useEffect(() => initScroll(), [])

  return (
    <>
      <div className="stage">
        <Canvas
          shadows={isHighQuality}
          dpr={isHighQuality ? [1, 2] : [1, 1.5]}
          camera={{ ...CAMERA, position: [...CAMERA.position] }}
          gl={{ antialias: isHighQuality }}
        >
          <color attach="background" args={['#aec4d8']} />
          <fog attach="fog" args={['#aec4d8', 40, 120]} />
          <Lighting highQuality={isHighQuality} />
          <Suspense fallback={null}>
            <Building />
            <Preload all />
          </Suspense>
          <CameraRig />
          {isHighQuality && (
            <EffectComposer>
              <Bloom intensity={0.35} luminanceThreshold={0.9} mipmapBlur />
              <Vignette offset={0.25} darkness={0.6} />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      <Overlay />
      <Loader />

      {/* Inaltimea paginii = lungimea turului. */}
      <div className="scroll-space" style={{ height: `${SCROLL_LENGTH_VH}vh` }} aria-hidden="true" />
    </>
  )
}
