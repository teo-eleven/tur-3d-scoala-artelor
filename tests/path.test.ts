import { describe, expect, test } from 'vitest'
import { Vector3 } from 'three'
import { ROOM_RANGES, roomAtProgress, sampleCamera } from '../src/camera/path'
import { INSTRUCTORS } from '../config'

describe('traseul camerei', () => {
  test('fiecare indrumator are un interval pe traseu', () => {
    expect(ROOM_RANGES).toHaveLength(INSTRUCTORS.length)
    for (const instructor of INSTRUCTORS) {
      expect(ROOM_RANGES.some((range) => range.id === instructor.id)).toBe(true)
    }
  })

  test('intervalele salilor nu se suprapun si sunt in ordinea vizitarii', () => {
    const ordered = [...ROOM_RANGES].sort((a, b) => a.start - b.start)

    ordered.forEach((range, index) => {
      const previous = ordered[index - 1]
      if (!previous) return
      expect(range.start).toBeGreaterThan(previous.end)
    })
    expect(ordered.map((range) => range.id)).toEqual(['lidia', 'teodora', 'marian', 'sergiu'])
  })

  test('mijlocul fiecarui interval activeaza sala respectiva', () => {
    for (const range of ROOM_RANGES) {
      expect(roomAtProgress(range.focus)).toBe(range.id)
    }
  })

  test('inceputul si finalul turului nu sunt intr-o sala', () => {
    expect(roomAtProgress(0)).toBeNull()
    expect(roomAtProgress(1)).toBeNull()
  })

  test('camera pleaca din exterior si se intoarce afara la final', () => {
    const position = new Vector3()
    const target = new Vector3()

    sampleCamera(0, position, target)
    expect(position.z).toBeGreaterThan(20)

    sampleCamera(1, position, target)
    expect(position.z).toBeGreaterThan(20)
    expect(position.y).toBeGreaterThan(10)
  })

  test('progresul in afara intervalului 0..1 e limitat', () => {
    const atZero = new Vector3()
    const belowZero = new Vector3()
    const target = new Vector3()

    sampleCamera(0, atZero, target)
    sampleCamera(-0.5, belowZero, target)

    expect(belowZero.distanceTo(atZero)).toBeLessThan(1e-6)
  })
})
