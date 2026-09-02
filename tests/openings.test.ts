import { describe, expect, test } from 'vitest'
import { wallSegments } from '../src/scene/geometry/openings'

const WALL_LENGTH = 10
const WALL_HEIGHT = 3

const totalArea = (segments: readonly { length: number; height: number }[]) =>
  segments.reduce((sum, s) => sum + s.length * s.height, 0)

describe('wallSegments', () => {
  test('peretele fara goluri ramane o singura bucata', () => {
    const segments = wallSegments(WALL_LENGTH, WALL_HEIGHT, [])

    expect(segments).toHaveLength(1)
    expect(segments[0]).toMatchObject({ offset: 0, length: WALL_LENGTH, height: WALL_HEIGHT })
  })

  test('o usa taie peretele in doua, plus buiandrugul', () => {
    const door = { center: 0, width: 2, sill: 0, top: 2.2 }

    const segments = wallSegments(WALL_LENGTH, WALL_HEIGHT, [door])

    expect(segments).toHaveLength(3)
    expect(totalArea(segments)).toBeCloseTo(WALL_LENGTH * WALL_HEIGHT - door.width * door.top)
  })

  test('o fereastra lasa si parapet, si buiandrug', () => {
    const window = { center: 0, width: 2, sill: 1, top: 2.4 }

    const segments = wallSegments(WALL_LENGTH, WALL_HEIGHT, [window])

    expect(segments).toHaveLength(4)
    expect(totalArea(segments)).toBeCloseTo(
      WALL_LENGTH * WALL_HEIGHT - window.width * (window.top - window.sill),
    )
  })

  test('golurile date in dezordine sunt asezate corect', () => {
    const right = { center: 3, width: 1, sill: 1, top: 2 }
    const left = { center: -3, width: 1, sill: 1, top: 2 }

    const segments = wallSegments(WALL_LENGTH, WALL_HEIGHT, [right, left])

    const offsets = segments.map((s) => s.offset)
    expect(Math.min(...offsets)).toBeLessThan(0)
    expect(Math.max(...offsets)).toBeGreaterThan(0)
    expect(totalArea(segments)).toBeCloseTo(WALL_LENGTH * WALL_HEIGHT - 2 * 1 * 1)
  })

  test('un gol lipit de capat nu produce bucati de lungime zero', () => {
    const opening = { center: WALL_LENGTH / 2 - 1, width: 2, sill: 0, top: WALL_HEIGHT }

    const segments = wallSegments(WALL_LENGTH, WALL_HEIGHT, [opening])

    expect(segments.every((s) => s.length > 0 && s.height > 0)).toBe(true)
    expect(segments).toHaveLength(1)
  })
})
