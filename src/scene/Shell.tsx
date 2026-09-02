import {
  BUILDING_HALF_WIDTH,
  BUILDING_Z_MAX,
  BUILDING_Z_MIN,
  LEVEL_HEIGHT,
  WINDOW_SILL,
  WINDOW_TOP,
  WINDOW_WIDTH,
  levelBaseY,
} from '../data/layout'
import { Wall } from './geometry/Wall'
import { Slab } from './geometry/Slab'
import { WindowGlass } from './geometry/WindowGlass'
import { PALETTE } from './materials'

const LEVELS = [0, 1] as const
const BUILDING_WIDTH = BUILDING_HALF_WIDTH * 2
const BUILDING_DEPTH = BUILDING_Z_MAX - BUILDING_Z_MIN
const ROOF_Y = LEVEL_HEIGHT * LEVELS.length

const ENTRANCE = { center: 0, width: 2.6, sill: 0, top: 2.7 }

const window_ = (center: number) => ({
  center,
  width: WINDOW_WIDTH,
  sill: WINDOW_SILL,
  top: WINDOW_TOP,
})

/** Ferestrele fiecarui perete, in coordonate locale (offset pe lungimea peretelui). */
const SOUTH_WINDOWS = [-6.5, 6.5]
const SOUTH_WINDOWS_UPPER = [-6.5, 0, 6.5]
const NORTH_WINDOWS = [-7.35, 7.35]
const NORTH_WINDOWS_UPPER = [-7.35, 0, 7.35]
const SIDE_WINDOWS = [-5, -0.4, 5.5]

const glassY = (level: number) => levelBaseY(level) + (WINDOW_SILL + WINDOW_TOP) / 2

/** Anvelopa cladirii: peretii exteriori, ferestrele, acoperisul si terenul. */
export const Shell = () => (
  <group>
    {LEVELS.map((level) => {
      const baseY = levelBaseY(level)
      const southWindows = level === 0 ? SOUTH_WINDOWS : SOUTH_WINDOWS_UPPER
      const northWindows = level === 0 ? NORTH_WINDOWS : NORTH_WINDOWS_UPPER

      return (
        <group key={level}>
          <Wall
            axis="x"
            center={[0, baseY, BUILDING_Z_MAX]}
            length={BUILDING_WIDTH}
            height={LEVEL_HEIGHT}
            color={PALETTE.wallExterior}
            openings={[
              ...southWindows.map(window_),
              ...(level === 0 ? [ENTRANCE] : []),
            ]}
          />
          <Wall
            axis="x"
            center={[0, baseY, BUILDING_Z_MIN]}
            length={BUILDING_WIDTH}
            height={LEVEL_HEIGHT}
            color={PALETTE.wallExterior}
            openings={northWindows.map(window_)}
          />
          {[-1, 1].map((side) => (
            <Wall
              key={side}
              axis="z"
              center={[side * BUILDING_HALF_WIDTH, baseY, 0]}
              length={BUILDING_DEPTH}
              height={LEVEL_HEIGHT}
              color={PALETTE.wallExterior}
              openings={SIDE_WINDOWS.map(window_)}
            />
          ))}

          {southWindows.map((offset) => (
            <WindowGlass key={`s${offset}`} position={[offset, glassY(level), BUILDING_Z_MAX]} rotationY={0} />
          ))}
          {northWindows.map((offset) => (
            <WindowGlass key={`n${offset}`} position={[offset, glassY(level), BUILDING_Z_MIN]} rotationY={0} />
          ))}
          {[-1, 1].map((side) =>
            SIDE_WINDOWS.map((offset) => (
              <WindowGlass
                key={`e${side}${offset}`}
                position={[side * BUILDING_HALF_WIDTH, glassY(level), offset]}
                rotationY={Math.PI / 2}
              />
            )),
          )}
        </group>
      )
    })}

    {/* Acoperis si cornisa. */}
    <Slab
      center={[0, ROOF_Y + 0.15, 0]}
      width={BUILDING_WIDTH + 0.8}
      depth={BUILDING_DEPTH + 0.8}
      color={PALETTE.trim}
      thickness={0.3}
    />

    {/* Teren si alee. */}
    <mesh position={[0, -0.14, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[160, 160]} />
      <meshStandardMaterial color="#6f7a58" roughness={1} />
    </mesh>
    <mesh position={[0, -0.11, 14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[7, 16]} />
      <meshStandardMaterial color={PALETTE.floorStone} roughness={0.95} />
    </mesh>
  </group>
)
