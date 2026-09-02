/** Dimensiunile cladirii, in metri. Un singur loc unde se schimba geometria. */

export const WALL_THICKNESS = 0.22
export const FLOOR_THICKNESS = 0.24
export const LEVEL_HEIGHT = 4
export const ROOM_HEIGHT = 3.6

/** Amprenta cladirii (interiorul util). */
export const BUILDING_HALF_WIDTH = 11.5
export const BUILDING_Z_MIN = -7.5
export const BUILDING_Z_MAX = 7.5

/** Coridorul central strabate cladirea pe axa Z. */
export const CORRIDOR_HALF_WIDTH = 3.2

/** Aripile laterale (salile) tin de la peretele nordic pana la hol. */
export const WING_Z_MIN = BUILDING_Z_MIN
export const WING_Z_MAX = 3.5

/** Holul de la intrare ocupa toata latimea, in fata. */
export const LOBBY_Z_MIN = WING_Z_MAX

/** Golul de usa dintre coridor si sala. */
export const DOOR_WIDTH = 1.7
export const DOOR_HEIGHT = 2.4
export const DOOR_Z = 1.0

/** Ferestrele de pe peretii exteriori. */
export const WINDOW_WIDTH = 2.2
export const WINDOW_SILL = 1.0
export const WINDOW_TOP = 2.8

/**
 * Casa scarii, la capatul nordic al coridorului: doua rampe cu palier
 * intermediar. Rampa 1 urca spre nord pe jumatatea vestica, rampa 2 se
 * intoarce spre sud pe jumatatea estica.
 */
export const STAIR_Z_BOTTOM = -3.0
export const STAIR_Z_LANDING = -6.2
export const STAIR_LANDING_DEPTH = 1.1
export const STAIR_LANDING_Y = LEVEL_HEIGHT / 2
export const STAIRS_PER_FLIGHT = 10
export const STAIR_FLIGHT_GAP = 0.15
/** Latimea unei rampe: jumatate de coridor, minus vangul din mijloc. */
export const STAIR_FLIGHT_WIDTH = CORRIDOR_HALF_WIDTH - STAIR_FLIGHT_GAP
/** Golul din planseul etajului, prin care urca scara. */
export const STAIRWELL_Z_END = STAIR_Z_BOTTOM

export const levelBaseY = (level: number) => level * LEVEL_HEIGHT
