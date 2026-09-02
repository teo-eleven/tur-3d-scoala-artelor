/**
 * Punctul unic de intrare in configurare.
 *
 * Codul din `src/` importa doar de aici — asa, orice reglaj se face intr-un
 * singur loc, fara sa umbli prin module.
 */
export { APP_CONFIG } from './app.config'
export { PALETTE, LIGHTING, PROPS } from './scene.config'
export * from './building.config'
export { INSTRUCTORS, instructorById } from './instructors.config'
export type { Instructor, RoomId } from './instructors.config'
export { WAYPOINTS } from './tour.config'
export type { Waypoint } from './tour.config'
