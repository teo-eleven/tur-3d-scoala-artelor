import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { APP_CONFIG, WAYPOINTS } from '../config'
import { Building } from './scene/Building'
import { Lighting } from './scene/Lighting'
import { CameraRig } from './camera/CameraRig'
import { SCROLL_LENGTH_VH, initScroll } from './scroll/scrollController'
import { useQualityTier } from './hooks/useQualityTier'
import { Overlay } from './ui/Overlay'
import { Loader } from './ui/Loader'

const { camera, effects, quality } = APP_CONFIG
/** Camera porneste din primul waypoint, ca sa nu existe un salt la primul cadru. */
const START_POSITION = [...WAYPOINTS[0].pos] as [number, number, number]

export const App = () => {
  const tier = useQualityTier()
  const isHighQuality = tier === 'high'
  const dpr = [...(isHighQuality ? quality.dpr.high : quality.dpr.low)] as [number, number]

  useEffect(() => initScroll(), [])

  return (
    <>
      <div className="stage">
        <Canvas
          shadows={isHighQuality}
          dpr={dpr}
          camera={{ fov: camera.fov, near: camera.near, far: camera.far, position: START_POSITION }}
          gl={{ antialias: isHighQuality }}
        >
          <color attach="background" args={[effects.background]} />
          <fog attach="fog" args={[effects.fog.color, effects.fog.near, effects.fog.far]} />
          <Lighting highQuality={isHighQuality} />
          <Suspense fallback={null}>
            <Building />
            <Preload all />
          </Suspense>
          <CameraRig />
          {isHighQuality && (
            <EffectComposer>
              <Bloom
                intensity={effects.bloom.intensity}
                luminanceThreshold={effects.bloom.luminanceThreshold}
                mipmapBlur
              />
              <Vignette offset={effects.vignette.offset} darkness={effects.vignette.darkness} />
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
