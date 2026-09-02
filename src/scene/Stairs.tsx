import {
  LEVEL_HEIGHT,
  LIGHTING,
  PALETTE,
  PROPS,
  ROOM_HEIGHT,
  STAIRS_PER_FLIGHT,
  STAIR_FLIGHT_GAP,
  STAIR_FLIGHT_WIDTH,
  STAIR_LANDING_DEPTH,
  STAIR_LANDING_Y,
  STAIR_Z_BOTTOM,
  STAIR_Z_LANDING,
} from '../../config'
import { Slab } from './geometry/Slab'
import { CeilingLamp } from './props/CeilingLamp'

const FLIGHT_RUN = STAIR_Z_BOTTOM - STAIR_Z_LANDING
const TREAD = FLIGHT_RUN / STAIRS_PER_FLIGHT
const RISE = STAIR_LANDING_Y / STAIRS_PER_FLIGHT
const STEP_THICKNESS = PROPS.stairs.stepThickness
const FLIGHT_CENTER_X = STAIR_FLIGHT_GAP + STAIR_FLIGHT_WIDTH / 2
const RAIL_HEIGHT = PROPS.railing.stairHeight
const RAIL_THICKNESS = PROPS.railing.barThickness

const stepIndices = Array.from({ length: STAIRS_PER_FLIGHT }, (_, i) => i)

interface FlightProps {
  /** -1 = rampa care urca spre nord, +1 = rampa care se intoarce spre sud. */
  readonly direction: -1 | 1
  readonly startY: number
}

const Flight = ({ direction, startY }: FlightProps) => {
  const centerX = direction * FLIGHT_CENTER_X
  const startZ = direction < 0 ? STAIR_Z_BOTTOM : STAIR_Z_LANDING

  return (
    <group>
      {stepIndices.map((i) => {
        const topY = startY + (i + 1) * RISE
        const z = startZ + direction * (i * TREAD + TREAD / 2)
        return (
          <Slab
            key={i}
            center={[centerX, topY - STEP_THICKNESS / 2, z]}
            width={STAIR_FLIGHT_WIDTH}
            depth={TREAD}
            color={PALETTE.stair}
            thickness={STEP_THICKNESS}
            roughness={0.75}
          />
        )
      })}

      {/* Mana curenta, pe latura dinspre golul scarii. */}
      <mesh
        position={[
          centerX + direction * (STAIR_FLIGHT_WIDTH / 2),
          startY + STAIR_LANDING_Y / 2 + RAIL_HEIGHT,
          startZ + direction * (FLIGHT_RUN / 2),
        ]}
        rotation={[Math.atan2(STAIR_LANDING_Y, FLIGHT_RUN) * -direction, 0, 0]}
        castShadow
      >
        <boxGeometry args={[RAIL_THICKNESS, RAIL_THICKNESS, Math.hypot(FLIGHT_RUN, STAIR_LANDING_Y)]} />
        <meshStandardMaterial color={PALETTE.trim} roughness={0.6} />
      </mesh>
    </group>
  )
}

/** Casa scarii: doua rampe si palierul intermediar. */
export const Stairs = () => (
  <group>
    <Flight direction={-1} startY={0} />
    <Slab
      center={[0, STAIR_LANDING_Y - STEP_THICKNESS / 2, STAIR_Z_LANDING - STAIR_LANDING_DEPTH / 2]}
      width={STAIR_FLIGHT_WIDTH * 2 + STAIR_FLIGHT_GAP}
      depth={STAIR_LANDING_DEPTH}
      color={PALETTE.stair}
      thickness={STEP_THICKNESS}
      roughness={0.75}
    />
    <Flight direction={1} startY={STAIR_LANDING_Y} />

    {/* Casa scarii e dubla ca inaltime: o lumina jos, la palier, si una sus. */}
    <pointLight
      position={[0, LEVEL_HEIGHT - 0.4, STAIR_Z_LANDING - STAIR_LANDING_DEPTH / 2]}
      intensity={LIGHTING.stairwell.landing.intensity}
      distance={LIGHTING.stairwell.landing.distance}
      decay={2}
      color={LIGHTING.stairwell.landing.color}
    />
    <CeilingLamp
      position={[0, LEVEL_HEIGHT + ROOM_HEIGHT, STAIR_Z_LANDING + 0.6]}
      intensity={LIGHTING.stairwell.top.intensity}
      distance={LIGHTING.stairwell.top.distance}
    />
  </group>
)
