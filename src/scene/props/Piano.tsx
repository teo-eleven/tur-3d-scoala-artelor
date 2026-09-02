import { PALETTE } from '../materials'

interface PianoProps {
  readonly position: readonly [number, number, number]
  readonly rotationY?: number
}

/** Pian vertical simplificat: corp, claviatura, capac, picioare. */
export const Piano = ({ position, rotationY = 0 }: PianoProps) => (
  <group position={position as [number, number, number]} rotation={[0, rotationY, 0]}>
    <mesh position={[0, 0.62, 0]} castShadow>
      <boxGeometry args={[1.5, 1.24, 0.62]} />
      <meshStandardMaterial color={PALETTE.pianoBody} roughness={0.35} metalness={0.1} />
    </mesh>
    <mesh position={[0, 0.68, 0.42]} castShadow>
      <boxGeometry args={[1.5, 0.14, 0.28]} />
      <meshStandardMaterial color={PALETTE.pianoBody} roughness={0.3} />
    </mesh>
    <mesh position={[0, 0.63, 0.5]}>
      <boxGeometry args={[1.28, 0.05, 0.16]} />
      <meshStandardMaterial color={PALETTE.pianoKeys} roughness={0.5} />
    </mesh>
    <mesh position={[0, 1.26, 0]} castShadow>
      <boxGeometry args={[1.58, 0.06, 0.7]} />
      <meshStandardMaterial color={PALETTE.pianoBody} roughness={0.25} />
    </mesh>
  </group>
)
