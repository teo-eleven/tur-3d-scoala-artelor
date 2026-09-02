import { INSTRUCTORS } from '../../config'
import { Shell } from './Shell'
import { Corridor } from './Corridor'
import { Stairs } from './Stairs'
import { Room } from './Room'

/** Cladirea intreaga: anvelopa, coridorul, scara si cele patru sali. */
export const Building = () => (
  <group>
    <Shell />
    <Corridor />
    <Stairs />
    {INSTRUCTORS.map((instructor) => (
      <Room key={instructor.id} instructor={instructor} />
    ))}
  </group>
)
