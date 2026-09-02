import { FLOOR_THICKNESS } from '../../../config'

interface SlabProps {
  readonly center: readonly [number, number, number]
  readonly width: number
  readonly depth: number
  readonly color: string
  readonly thickness?: number
  readonly roughness?: number
}

/** O placa orizontala: podea, tavan sau treapta. */
export const Slab = ({
  center,
  width,
  depth,
  color,
  thickness = FLOOR_THICKNESS,
  roughness = 0.85,
}: SlabProps) => (
  <mesh position={center} receiveShadow castShadow>
    <boxGeometry args={[width, thickness, depth]} />
    <meshStandardMaterial color={color} roughness={roughness} />
  </mesh>
)
