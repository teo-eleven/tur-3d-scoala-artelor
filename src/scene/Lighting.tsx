interface LightingProps {
  /** Pe mobil coboram calitatea umbrelor. */
  readonly highQuality: boolean
}

/** Lumina generala: cer, soare si un fill cald pentru interior. */
export const Lighting = ({ highQuality }: LightingProps) => (
  <>
    <hemisphereLight args={['#cfe3f5', '#5d5648', 0.9]} />
    <ambientLight intensity={0.35} color="#fff2e2" />
    <directionalLight
      position={[18, 26, 20]}
      intensity={2.1}
      color="#ffe9c9"
      castShadow={highQuality}
      shadow-mapSize={[1024, 1024]}
      shadow-camera-left={-30}
      shadow-camera-right={30}
      shadow-camera-top={30}
      shadow-camera-bottom={-30}
      shadow-camera-far={90}
    />
  </>
)
