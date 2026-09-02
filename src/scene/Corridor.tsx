import {
  BUILDING_HALF_WIDTH,
  BUILDING_Z_MAX,
  BUILDING_Z_MIN,
  CORRIDOR_HALF_WIDTH,
  FLOOR_THICKNESS,
  LOBBY_Z_MIN,
  ROOM_HEIGHT,
  STAIRWELL_Z_END,
  WING_Z_MAX,
  levelBaseY,
} from '../data/layout'
import { Slab } from './geometry/Slab'
import { CeilingLamp } from './props/CeilingLamp'
import { PALETTE } from './materials'

const CORRIDOR_WIDTH = CORRIDOR_HALF_WIDTH * 2
const LOBBY_DEPTH = BUILDING_Z_MAX - LOBBY_Z_MIN
const LOBBY_CENTER_Z = (BUILDING_Z_MAX + LOBBY_Z_MIN) / 2

/** Coridorul de la parter merge pana la peretele nordic (sub casa scarii). */
const GROUND_CORRIDOR_DEPTH = WING_Z_MAX - BUILDING_Z_MIN
const GROUND_CORRIDOR_CENTER_Z = (WING_Z_MAX + BUILDING_Z_MIN) / 2

/** La etaj planseul se opreste la golul scarii. */
const UPPER_CORRIDOR_DEPTH = WING_Z_MAX - STAIRWELL_Z_END
const UPPER_CORRIDOR_CENTER_Z = (WING_Z_MAX + STAIRWELL_Z_END) / 2

const RAIL_HEIGHT = 1.0

/** Coridorul central, holul de la intrare si balustrada golului de scara. */
export const Corridor = () => (
  <group>
    <Slab
      center={[0, -FLOOR_THICKNESS / 2, GROUND_CORRIDOR_CENTER_Z]}
      width={CORRIDOR_WIDTH}
      depth={GROUND_CORRIDOR_DEPTH}
      color={PALETTE.floorStone}
    />
    <Slab
      center={[0, ROOM_HEIGHT, (WING_Z_MAX + STAIRWELL_Z_END) / 2]}
      width={CORRIDOR_WIDTH}
      depth={UPPER_CORRIDOR_DEPTH}
      color={PALETTE.ceiling}
    />

    <Slab
      center={[0, levelBaseY(1) - FLOOR_THICKNESS / 2, UPPER_CORRIDOR_CENTER_Z]}
      width={CORRIDOR_WIDTH}
      depth={UPPER_CORRIDOR_DEPTH}
      color={PALETTE.floorStone}
    />
    <Slab
      center={[0, levelBaseY(1) + ROOM_HEIGHT, GROUND_CORRIDOR_CENTER_Z]}
      width={CORRIDOR_WIDTH}
      depth={GROUND_CORRIDOR_DEPTH}
      color={PALETTE.ceiling}
    />

    {/* Holul de la intrare, pe toata latimea, la ambele niveluri. */}
    {[0, 1].map((level) => (
      <group key={level}>
        <Slab
          center={[0, levelBaseY(level) - FLOOR_THICKNESS / 2, LOBBY_CENTER_Z]}
          width={BUILDING_HALF_WIDTH * 2}
          depth={LOBBY_DEPTH}
          color={PALETTE.floorStone}
        />
        <Slab
          center={[0, levelBaseY(level) + ROOM_HEIGHT, LOBBY_CENTER_Z]}
          width={BUILDING_HALF_WIDTH * 2}
          depth={LOBBY_DEPTH}
          color={PALETTE.ceiling}
        />
      </group>
    ))}

    {/* Balustrada de la marginea golului de scara. */}
    <mesh position={[0, levelBaseY(1) + RAIL_HEIGHT, STAIRWELL_Z_END]} castShadow>
      <boxGeometry args={[CORRIDOR_WIDTH, 0.08, 0.08]} />
      <meshStandardMaterial color={PALETTE.trim} roughness={0.6} />
    </mesh>
    {[-2.6, -0.9, 0.9, 2.6].map((x) => (
      <mesh key={x} position={[x, levelBaseY(1) + RAIL_HEIGHT / 2, STAIRWELL_Z_END]} castShadow>
        <boxGeometry args={[0.06, RAIL_HEIGHT, 0.06]} />
        <meshStandardMaterial color={PALETTE.trim} roughness={0.6} />
      </mesh>
    ))}

    {[0, 1].map((level) =>
      [5.4, 1.4, -2].map((z) => (
        <CeilingLamp
          key={`${level}:${z}`}
          position={[0, levelBaseY(level) + ROOM_HEIGHT, z]}
          intensity={11}
          distance={16}
        />
      )),
    )}
  </group>
)
