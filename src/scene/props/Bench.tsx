import { PALETTE } from '../materials'

interface BenchProps {
  readonly position: readonly [number, number, number]
  readonly rotationY?: number
}

/** Taburet / bancheta de pian. */
export const Bench = ({ position, rotationY = 0 }: BenchProps) => (
  <group position={position as [number, number, number]} rotation={[0, rotationY, 0]}>
    <mesh position={[0, 0.48, 0]} castShadow>
      <boxGeometry args={[0.9, 0.08, 0.36]} />
      <meshStandardMaterial color={PALETTE.trim} roughness={0.7} />
    </mesh>
    {[-0.36, 0.36].map((x) => (
      <mesh key={x} position={[x, 0.23, 0]} castShadow>
        <boxGeometry args={[0.07, 0.46, 0.32]} />
        <meshStandardMaterial color={PALETTE.trim} roughness={0.7} />
      </mesh>
    ))}
  </group>
)
