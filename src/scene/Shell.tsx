import {
  BUILDING_HALF_WIDTH,
  BUILDING_Z_MAX,
  BUILDING_Z_MIN,
  FACADE,
  LEVELS,
  LEVEL_HEIGHT,
  PALETTE,
  SITE,
  WINDOW_SILL,
  WINDOW_TOP,
  WINDOW_WIDTH,
  levelBaseY,
} from '../../config'
import { Wall } from './geometry/Wall'
import { Slab } from './geometry/Slab'
import { WindowGlass } from './geometry/WindowGlass'

const BUILDING_WIDTH = BUILDING_HALF_WIDTH * 2
const BUILDING_DEPTH = BUILDING_Z_MAX - BUILDING_Z_MIN
const ROOF_Y = LEVEL_HEIGHT * LEVELS.length

const window_ = (center: number) => ({
  center,
  width: WINDOW_WIDTH,
  sill: WINDOW_SILL,
  top: WINDOW_TOP,
})

const glassY = (level: number) => levelBaseY(level) + (WINDOW_SILL + WINDOW_TOP) / 2

/** Anvelopa cladirii: peretii exteriori, ferestrele, acoperisul si terenul. */
export const Shell = () => (
  <group>
    {LEVELS.map((level) => {
      const baseY = levelBaseY(level)
      const southWindows = level === 0 ? FACADE.southWindows : FACADE.southWindowsUpper
      const northWindows = level === 0 ? FACADE.northWindows : FACADE.northWindowsUpper

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
              ...(level === 0 ? [FACADE.entrance] : []),
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
              openings={FACADE.sideWindows.map(window_)}
            />
          ))}

          {southWindows.map((offset) => (
            <WindowGlass key={`s${offset}`} position={[offset, glassY(level), BUILDING_Z_MAX]} rotationY={0} />
          ))}
          {northWindows.map((offset) => (
            <WindowGlass key={`n${offset}`} position={[offset, glassY(level), BUILDING_Z_MIN]} rotationY={0} />
          ))}
          {[-1, 1].map((side) =>
            FACADE.sideWindows.map((offset) => (
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
      center={[0, ROOF_Y + SITE.roof.lift, 0]}
      width={BUILDING_WIDTH + SITE.roof.overhang}
      depth={BUILDING_DEPTH + SITE.roof.overhang}
      color={PALETTE.trim}
      thickness={SITE.roof.thickness}
    />

    {/* Teren si alee. */}
    <mesh position={[0, SITE.ground.y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[SITE.ground.size, SITE.ground.size]} />
      <meshStandardMaterial color={PALETTE.ground} roughness={1} />
    </mesh>
    <mesh position={[0, SITE.path.y, SITE.path.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[SITE.path.width, SITE.path.depth]} />
      <meshStandardMaterial color={PALETTE.floorStone} roughness={0.95} />
    </mesh>
  </group>
)
