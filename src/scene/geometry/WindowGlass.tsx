import { WALL_THICKNESS, WINDOW_SILL, WINDOW_TOP, WINDOW_WIDTH } from '../../data/layout'
import { PALETTE } from '../materials'

const WINDOW_HEIGHT = WINDOW_TOP - WINDOW_SILL
const FRAME = 0.09
const MULLION = 0.05

interface WindowGlassProps {
  readonly position: readonly [number, number, number]
  readonly rotationY: number
}

/** Fereastra: geamul translucid plus rama si crucea, ca sa nu para un decupaj gol. */
export const WindowGlass = ({ position, rotationY }: WindowGlassProps) => (
  <group position={position as [number, number, number]} rotation={[0, rotationY, 0]}>
    <mesh>
      <planeGeometry args={[WINDOW_WIDTH, WINDOW_HEIGHT]} />
      <meshStandardMaterial
        color={PALETTE.glass}
        emissive={PALETTE.glass}
        emissiveIntensity={0.5}
        transparent
        opacity={0.34}
        roughness={0.08}
        side={2}
      />
    </mesh>

    {/* Rama: sus, jos, stanga, dreapta. */}
    {[
      { size: [WINDOW_WIDTH + FRAME, FRAME, WALL_THICKNESS + 0.04], at: [0, WINDOW_HEIGHT / 2, 0] },
      { size: [WINDOW_WIDTH + FRAME, FRAME, WALL_THICKNESS + 0.04], at: [0, -WINDOW_HEIGHT / 2, 0] },
      { size: [FRAME, WINDOW_HEIGHT, WALL_THICKNESS + 0.04], at: [-WINDOW_WIDTH / 2, 0, 0] },
      { size: [FRAME, WINDOW_HEIGHT, WALL_THICKNESS + 0.04], at: [WINDOW_WIDTH / 2, 0, 0] },
    ].map((bar, index) => (
      <mesh key={index} position={bar.at as [number, number, number]} castShadow>
        <boxGeometry args={bar.size as [number, number, number]} />
        <meshStandardMaterial color={PALETTE.ceiling} roughness={0.7} />
      </mesh>
    ))}

    {/* Crucea geamului. */}
    <mesh>
      <boxGeometry args={[MULLION, WINDOW_HEIGHT, WALL_THICKNESS * 0.6]} />
      <meshStandardMaterial color={PALETTE.ceiling} roughness={0.7} />
    </mesh>
  </group>
)
