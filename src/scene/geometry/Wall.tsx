import { WALL_THICKNESS } from '../../../config'
import { wallSegments, type Opening } from './openings'

type Axis = 'x' | 'z'

interface WallProps {
  /** Directia in care se intinde peretele. */
  readonly axis: Axis
  /** Centrul peretelui in lume. */
  readonly center: readonly [number, number, number]
  readonly length: number
  readonly height: number
  readonly color: string
  readonly openings?: readonly Opening[]
  readonly thickness?: number
}

/** Un perete plin sau cu goluri, construit din cutii subtiri. */
export const Wall = ({
  axis,
  center,
  length,
  height,
  color,
  openings = [],
  thickness = WALL_THICKNESS,
}: WallProps) => {
  const [cx, baseY, cz] = center
  const segments = wallSegments(length, height, openings)

  return (
    <group>
      {segments.map((segment, index) => {
        const size: [number, number, number] =
          axis === 'x'
            ? [segment.length, segment.height, thickness]
            : [thickness, segment.height, segment.length]

        const position: [number, number, number] =
          axis === 'x'
            ? [cx + segment.offset, baseY + segment.centerY, cz]
            : [cx, baseY + segment.centerY, cz + segment.offset]

        return (
          <mesh key={index} position={position} castShadow receiveShadow>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} roughness={0.92} />
          </mesh>
        )
      })}
    </group>
  )
}
