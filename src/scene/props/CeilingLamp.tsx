const DISC_RADIUS = 0.34
const DISC_THICKNESS = 0.08

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
  intensity = 13,
  distance = 15,
  color = '#fff3e0',
}: CeilingLampProps) => (
  <group position={position as [number, number, number]}>
    <mesh position={[0, -DISC_THICKNESS / 2, 0]}>
      <cylinderGeometry args={[DISC_RADIUS, DISC_RADIUS * 0.92, DISC_THICKNESS, 20]} />
      <meshStandardMaterial color="#fff8ec" emissive="#ffd9a0" emissiveIntensity={0.85} />
    </mesh>
    <pointLight position={[0, -0.25, 0]} intensity={intensity} distance={distance} decay={2} color={color} />
  </group>
)
