import { useTexture } from '@react-three/drei'
import { LIGHTING, PALETTE, PROPS } from '../../config'

const { width, height, depth, border } = PROPS.portrait
const { portrait: portraitLight } = LIGHTING

interface PortraitProps {
  readonly photo: string
  readonly position: readonly [number, number, number]
  /** Rotatia pe Y ca tabloul sa priveasca spre interiorul salii. */
  readonly rotationY: number
  readonly accent: string
}

/** Tabloul cu indrumatorul, agatat pe peretele exterior al salii. */
export const Portrait = ({ photo, position, rotationY, accent }: PortraitProps) => {
  const texture = useTexture(photo)

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={PALETTE.frame} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, depth / 2 + 0.002]}>
        <planeGeometry args={[width - border * 2, height - border * 2]} />
        <meshStandardMaterial map={texture} roughness={0.75} />
      </mesh>
      <pointLight
        position={[0, height / 2 + portraitLight.offsetAbove, portraitLight.offsetFront]}
        color={accent}
        intensity={portraitLight.intensity}
        distance={portraitLight.distance}
        decay={2}
      />
    </group>
  )
}
