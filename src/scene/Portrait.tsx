import { useTexture } from '@react-three/drei'
import { PALETTE } from './materials'

const FRAME_WIDTH = 1.6
const FRAME_HEIGHT = 2.1
const FRAME_DEPTH = 0.08
const BORDER = 0.09

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
    <group position={position as [number, number, number]} rotation={[0, rotationY, 0]}>
      <mesh castShadow>
        <boxGeometry args={[FRAME_WIDTH, FRAME_HEIGHT, FRAME_DEPTH]} />
        <meshStandardMaterial color={PALETTE.frame} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, FRAME_DEPTH / 2 + 0.002]}>
        <planeGeometry args={[FRAME_WIDTH - BORDER * 2, FRAME_HEIGHT - BORDER * 2]} />
        <meshStandardMaterial map={texture} roughness={0.75} />
      </mesh>
      <pointLight
        position={[0, FRAME_HEIGHT / 2 + 0.5, 0.9]}
        color={accent}
        intensity={6}
        distance={5}
        decay={2}
      />
    </group>
  )
}
