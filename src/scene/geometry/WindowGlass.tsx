import { PALETTE, PROPS, WALL_THICKNESS, WINDOW_SILL, WINDOW_TOP, WINDOW_WIDTH } from '../../../config'

const WINDOW_HEIGHT = WINDOW_TOP - WINDOW_SILL
const { frame, mullion, glassOpacity, glassEmissive } = PROPS.window

/** Cat iese rama in afara peretelui, ca sa nu se suprapuna cu el. */
const FRAME_DEPTH = WALL_THICKNESS + 0.04

interface FrameBar {
  readonly size: readonly [number, number, number]
  readonly at: readonly [number, number, number]
}

/** Rama: sus, jos, stanga, dreapta. */
const FRAME_BARS: readonly FrameBar[] = [
  { size: [WINDOW_WIDTH + frame, frame, FRAME_DEPTH], at: [0, WINDOW_HEIGHT / 2, 0] },
  { size: [WINDOW_WIDTH + frame, frame, FRAME_DEPTH], at: [0, -WINDOW_HEIGHT / 2, 0] },
  { size: [frame, WINDOW_HEIGHT, FRAME_DEPTH], at: [-WINDOW_WIDTH / 2, 0, 0] },
  { size: [frame, WINDOW_HEIGHT, FRAME_DEPTH], at: [WINDOW_WIDTH / 2, 0, 0] },
]

interface WindowGlassProps {
  readonly position: readonly [number, number, number]
  readonly rotationY: number
}

/** Fereastra: geamul translucid plus rama si crucea, ca sa nu para un decupaj gol. */
export const WindowGlass = ({ position, rotationY }: WindowGlassProps) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <mesh>
      <planeGeometry args={[WINDOW_WIDTH, WINDOW_HEIGHT]} />
      <meshStandardMaterial
        color={PALETTE.glass}
        emissive={PALETTE.glass}
        emissiveIntensity={glassEmissive}
        transparent
        opacity={glassOpacity}
        roughness={0.08}
        side={2}
      />
    </mesh>

    {FRAME_BARS.map((bar, index) => (
      <mesh key={index} position={bar.at} castShadow>
        <boxGeometry args={bar.size} />
        <meshStandardMaterial color={PALETTE.ceiling} roughness={0.7} />
      </mesh>
    ))}

    {/* Crucea geamului. */}
    <mesh>
      <boxGeometry args={[mullion, WINDOW_HEIGHT, WALL_THICKNESS * 0.6]} />
      <meshStandardMaterial color={PALETTE.ceiling} roughness={0.7} />
    </mesh>
  </group>
)
