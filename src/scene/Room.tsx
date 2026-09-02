import {
  BUILDING_HALF_WIDTH,
  CORRIDOR_HALF_WIDTH,
  DOOR_HEIGHT,
  DOOR_WIDTH,
  DOOR_Z,
  FLOOR_THICKNESS,
  ROOM_HEIGHT,
  WING_Z_MAX,
  WING_Z_MIN,
  levelBaseY,
} from '../data/layout'
import type { Instructor } from '../data/instructors'
import { Wall } from './geometry/Wall'
import { Slab } from './geometry/Slab'
import { Portrait } from './Portrait'
import { Piano } from './props/Piano'
import { Bench } from './props/Bench'
import { MicStand } from './props/MicStand'
import { CeilingLamp } from './props/CeilingLamp'
import { PALETTE } from './materials'

const ROOM_DEPTH = WING_Z_MAX - WING_Z_MIN
const ROOM_WIDTH = BUILDING_HALF_WIDTH - CORRIDOR_HALF_WIDTH
const ROOM_CENTER_Z = (WING_Z_MIN + WING_Z_MAX) / 2

interface RoomProps {
  readonly instructor: Instructor
}

/** O sala completa: cutia, ferestrele, tabloul indrumatorului si mobilierul. */
export const Room = ({ instructor }: RoomProps) => {
  const side = instructor.wing === 'west' ? -1 : 1
  const baseY = levelBaseY(instructor.level)
  const innerX = side * CORRIDOR_HALF_WIDTH
  const outerX = side * BUILDING_HALF_WIDTH
  const centerX = (innerX + outerX) / 2
  const isVoice = instructor.discipline.startsWith('Canto')

  return (
    <group>
      <Slab
        center={[centerX, baseY - FLOOR_THICKNESS / 2, ROOM_CENTER_Z]}
        width={ROOM_WIDTH}
        depth={ROOM_DEPTH}
        color={PALETTE.floorWood}
        roughness={0.65}
      />
      <Slab
        center={[centerX, baseY + ROOM_HEIGHT, ROOM_CENTER_Z]}
        width={ROOM_WIDTH}
        depth={ROOM_DEPTH}
        color={PALETTE.ceiling}
      />

      {/* Peretele dinspre coridor, cu usa. */}
      <Wall
        axis="z"
        center={[innerX, baseY, ROOM_CENTER_Z]}
        length={ROOM_DEPTH}
        height={ROOM_HEIGHT}
        color={PALETTE.wallInterior}
        openings={[
          { center: DOOR_Z - ROOM_CENTER_Z, width: DOOR_WIDTH, sill: 0, top: DOOR_HEIGHT },
        ]}
      />

      {/* Peretele dinspre hol. */}
      <Wall
        axis="x"
        center={[centerX, baseY, WING_Z_MAX]}
        length={ROOM_WIDTH}
        height={ROOM_HEIGHT}
        color={PALETTE.wallInterior}
      />

      <Portrait
        photo={instructor.photo}
        position={[outerX - side * 0.16, baseY + 1.8, -3.2]}
        rotationY={-side * (Math.PI / 2)}
        accent={instructor.accent}
      />

      <Piano position={[centerX + side * 1.4, baseY, -0.4]} rotationY={-side * (Math.PI / 2)} />
      <Bench position={[centerX + side * 0.4, baseY, -0.4]} rotationY={-side * (Math.PI / 2)} />
      {isVoice && <MicStand position={[centerX - side * 0.6, baseY, -2.6]} />}

      {/* Doua plafoniere, ca sala sa fie luminata uniform. */}
      {[-4.6, 0.4].map((z) => (
        <CeilingLamp key={z} position={[centerX, baseY + ROOM_HEIGHT, z]} />
      ))}
    </group>
  )
}
