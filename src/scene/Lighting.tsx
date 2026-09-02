import { LIGHTING } from '../../config'

interface LightingProps {
  /** Pe mobil coboram calitatea umbrelor. */
  readonly highQuality: boolean
}

const { hemisphere, ambient, sun } = LIGHTING

/** Lumina generala: cer, soare si un fill cald pentru interior. */
export const Lighting = ({ highQuality }: LightingProps) => (
  <>
    <hemisphereLight args={[hemisphere.sky, hemisphere.ground, hemisphere.intensity]} />
    <ambientLight intensity={ambient.intensity} color={ambient.color} />
    <directionalLight
      position={sun.position}
      intensity={sun.intensity}
      color={sun.color}
      castShadow={highQuality}
      shadow-mapSize={sun.shadowMapSize}
      shadow-camera-left={sun.shadowCamera.left}
      shadow-camera-right={sun.shadowCamera.right}
      shadow-camera-top={sun.shadowCamera.top}
      shadow-camera-bottom={sun.shadowCamera.bottom}
      shadow-camera-far={sun.shadowCamera.far}
    />
  </>
)
