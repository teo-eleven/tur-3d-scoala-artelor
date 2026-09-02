import { LIGHTING, PALETTE } from '../../../config'

const LAMP = LIGHTING.ceilingLamp

interface CeilingLampProps {
  /** Pozitia corpului de iluminat (in planul tavanului). */
  readonly position: readonly [number, number, number]
  readonly intensity?: number
  readonly distance?: number
  readonly color?: string
}

/** Plafoniera: discul care se vede plus lumina propriu-zisa, putin sub el. */
export const CeilingLamp = ({
  position,
  intensity = LAMP.intensity,
  distance = LAMP.distance,
  color = LAMP.color,
}: CeilingLampProps) => (
  <group position={position}>
    <mesh position={[0, -LAMP.discThickness / 2, 0]}>
      <cylinderGeometry args={[LAMP.discRadius, LAMP.discRadius * 0.92, LAMP.discThickness, 20]} />
      <meshStandardMaterial
        color={PALETTE.lampDisc}
        emissive={PALETTE.lampGlow}
        emissiveIntensity={LAMP.emissiveIntensity}
      />
    </mesh>
    <pointLight
      position={[0, -LAMP.lightDrop, 0]}
      intensity={intensity}
      distance={distance}
      decay={2}
      color={color}
    />
  </group>
)
