import { PALETTE } from '../materials'

interface MicStandProps {
  readonly position: readonly [number, number, number]
}

/** Stativ de microfon: pentru salile de canto. */
export const MicStand = ({ position }: MicStandProps) => (
  <group position={position as [number, number, number]}>
    <mesh position={[0, 0.02, 0]}>
      <cylinderGeometry args={[0.24, 0.26, 0.04, 16]} />
      <meshStandardMaterial color={PALETTE.frame} roughness={0.5} metalness={0.4} />
    </mesh>
    <mesh position={[0, 0.72, 0]} castShadow>
      <cylinderGeometry args={[0.022, 0.03, 1.4, 12]} />
      <meshStandardMaterial color="#8c8c92" roughness={0.35} metalness={0.7} />
    </mesh>
    <mesh position={[0, 1.46, 0]} rotation={[Math.PI / 12, 0, 0]} castShadow>
      <capsuleGeometry args={[0.045, 0.12, 4, 12]} />
      <meshStandardMaterial color="#2a2a2e" roughness={0.4} metalness={0.5} />
    </mesh>
  </group>
)
