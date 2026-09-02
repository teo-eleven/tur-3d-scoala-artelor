/**
 * Sparge un perete plin in bucatile care raman in jurul golurilor
 * (usi si ferestre). Functie pura — se testeaza fara three.js.
 */

export interface Opening {
  /** Centrul golului pe lungimea peretelui, in coordonate locale. */
  readonly center: number
  readonly width: number
  /** Inaltimea de la podea la baza golului (0 = usa). */
  readonly sill: number
  readonly top: number
}

export interface WallSegment {
  /** Centrul bucatii pe lungimea peretelui. */
  readonly offset: number
  readonly length: number
  /** Centrul bucatii pe verticala. */
  readonly centerY: number
  readonly height: number
}

const EPSILON = 1e-6

/** Bucatile pline dintre goluri, plus buiandrugii si parapetii. */
export const wallSegments = (
  wallLength: number,
  wallHeight: number,
  openings: readonly Opening[],
): readonly WallSegment[] => {
  const sorted = [...openings].sort((a, b) => a.center - b.center)
  const segments: WallSegment[] = []

  let cursor = -wallLength / 2
  for (const opening of sorted) {
    const left = opening.center - opening.width / 2
    const right = opening.center + opening.width / 2

    if (left - cursor > EPSILON) {
      const length = left - cursor
      segments.push({
        offset: cursor + length / 2,
        length,
        centerY: wallHeight / 2,
        height: wallHeight,
      })
    }

    if (opening.sill > EPSILON) {
      segments.push({
        offset: opening.center,
        length: opening.width,
        centerY: opening.sill / 2,
        height: opening.sill,
      })
    }

    if (wallHeight - opening.top > EPSILON) {
      const height = wallHeight - opening.top
      segments.push({
        offset: opening.center,
        length: opening.width,
        centerY: opening.top + height / 2,
        height,
      })
    }

    cursor = Math.max(cursor, right)
  }

  if (wallLength / 2 - cursor > EPSILON) {
    const length = wallLength / 2 - cursor
    segments.push({
      offset: cursor + length / 2,
      length,
      centerY: wallHeight / 2,
      height: wallHeight,
    })
  }

  return segments
}
