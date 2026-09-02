import { CatmullRomCurve3, Vector3 } from 'three'
import { APP_CONFIG, WAYPOINTS, type RoomId } from '../../config'

const toVectors = (points: readonly (readonly [number, number, number])[]) =>
  points.map(([x, y, z]) => new Vector3(x, y, z))

const { curveTension } = APP_CONFIG.camera

export const positionCurve = new CatmullRomCurve3(
  toVectors(WAYPOINTS.map((w) => w.pos)),
  false,
  'catmullrom',
  curveTension,
)

export const targetCurve = new CatmullRomCurve3(
  toVectors(WAYPOINTS.map((w) => w.look)),
  false,
  'catmullrom',
  curveTension,
)

/** t-ul de pe curba pentru un waypoint dat (curba e uniforma pe indici). */
export const waypointT = (index: number) => index / (WAYPOINTS.length - 1)

export interface RoomRange {
  readonly id: RoomId
  readonly start: number
  readonly end: number
  /** Mijlocul intervalului — tinta pentru "sari la sala". */
  readonly focus: number
}

const buildRoomRanges = (): readonly RoomRange[] => {
  const byRoom = new Map<RoomId, number[]>()
  WAYPOINTS.forEach((w, i) => {
    if (!w.room) return
    const existing = byRoom.get(w.room) ?? []
    byRoom.set(w.room, [...existing, i])
  })

  return [...byRoom.entries()].map(([id, indices]) => {
    const start = waypointT(Math.min(...indices))
    const end = waypointT(Math.max(...indices))
    return { id, start, end, focus: (start + end) / 2 }
  })
}

export const ROOM_RANGES = buildRoomRanges()

/** Ce sala e "activa" la progresul dat, sau null in tranzitii. */
export const roomAtProgress = (t: number): RoomId | null =>
  ROOM_RANGES.find((r) => t >= r.start && t <= r.end)?.id ?? null

export const sampleCamera = (t: number, outPos: Vector3, outTarget: Vector3) => {
  const clamped = Math.min(Math.max(t, 0), 1)
  positionCurve.getPoint(clamped, outPos)
  targetCurve.getPoint(clamped, outTarget)
}
