import type { RoomId } from './instructors.config'

export type Vec3 = readonly [number, number, number]

export interface Waypoint {
  /** Unde sta camera. */
  readonly pos: Vec3
  /** Spre ce se uita camera. */
  readonly look: Vec3
  /** Daca punctul apartine unei sali, cardul indrumatorului e vizibil aici. */
  readonly room?: RoomId
  /** Eticheta pentru storyboard / debug. */
  readonly label: string
}

/**
 * Traseul camerei, in ordinea derularii.
 *
 * Distanta dintre doua puncte vecine da VITEZA: fiecare segment consuma
 * aceeasi felie de scroll, deci puncte apropiate = camera incetineste.
 * De aceea in dreptul salilor punctele sunt indesite (palier de citit).
 */
/** Tipat ca tuplu ne-vid: primul waypoint e pozitia de pornire a camerei. */
export const WAYPOINTS: readonly [Waypoint, ...Waypoint[]] = [
  { label: 'exterior departe', pos: [0, 3.2, 30], look: [0, 2.4, 8] },
  { label: 'exterior aproape', pos: [0, 2.6, 17], look: [0, 2.2, 8] },
  { label: 'in fata intrarii', pos: [0, 1.75, 10.5], look: [0, 1.75, 4] },
  { label: 'prag', pos: [0, 1.7, 8.2], look: [0, 1.7, 3] },
  { label: 'hol', pos: [0, 1.7, 5.6], look: [0, 1.7, 1.5] },
  { label: 'hol, intoarcere', pos: [0, 1.7, 3.4], look: [-4, 1.65, 1.8] },
  { label: 'coridor spre vest', pos: [-1.5, 1.7, 1.8], look: [-6, 1.6, 1.0] },

  { label: 'usa salii 1', pos: [-3.4, 1.7, 1.0], room: 'lidia', look: [-7, 1.55, -0.2] },
  { label: 'in sala 1', pos: [-5.2, 1.7, 0.2], room: 'lidia', look: [-8.5, 1.5, -1.8] },
  { label: 'sala 1, adanc', pos: [-6.4, 1.7, -0.7], room: 'lidia', look: [-11.2, 1.8, -3.2] },

  { label: 'iesire din sala 1', pos: [-3.0, 1.7, 0.9], look: [2, 1.65, 0.9] },
  { label: 'coridor spre est', pos: [0, 1.7, 1.2], look: [5, 1.6, 0.8] },

  { label: 'usa salii 2', pos: [3.4, 1.7, 1.0], room: 'teodora', look: [7, 1.55, -0.2] },
  { label: 'in sala 2', pos: [5.2, 1.7, 0.2], room: 'teodora', look: [8.5, 1.5, -1.8] },
  { label: 'sala 2, adanc', pos: [6.4, 1.7, -0.7], room: 'teodora', look: [11.2, 1.8, -3.2] },

  { label: 'iesire din sala 2', pos: [2.6, 1.7, -0.4], look: [0, 1.7, -3] },
  { label: 'coridor spre scara', pos: [-1.4, 1.7, -1.6], look: [-1.6, 2.2, -4.4] },
  { label: 'prima rampa', pos: [-1.6, 1.85, -3.4], look: [-1.6, 2.35, -5.6] },
  { label: 'mijlocul primei rampe', pos: [-1.6, 2.75, -4.9], look: [-1.6, 3.05, -6.6] },
  { label: 'palier intermediar', pos: [-1.4, 3.6, -6.3], look: [1.5, 3.5, -6.7] },
  { label: 'intoarcere pe palier', pos: [1.6, 3.6, -6.6], look: [1.6, 3.95, -4.8] },
  { label: 'a doua rampa', pos: [1.6, 4.35, -5.1], look: [1.6, 4.85, -3.4] },
  { label: 'ajuns la etaj', pos: [1.6, 5.7, -3.2], look: [3.5, 5.6, -1.6] },
  { label: 'coridor etaj spre est', pos: [2.0, 5.7, -0.4], look: [6, 5.6, 0.2] },

  { label: 'usa salii 3', pos: [3.4, 5.7, 1.0], room: 'marian', look: [7, 5.55, -0.2] },
  { label: 'in sala 3', pos: [5.2, 5.7, 0.2], room: 'marian', look: [8.5, 5.5, -1.8] },
  { label: 'sala 3, adanc', pos: [6.4, 5.7, -0.7], room: 'marian', look: [11.2, 5.8, -3.2] },

  { label: 'iesire din sala 3', pos: [3.0, 5.7, 0.9], look: [-2, 5.65, 0.9] },
  { label: 'coridor etaj spre vest', pos: [0, 5.7, 1.0], look: [-5, 5.6, 0.6] },

  { label: 'usa salii 4', pos: [-3.4, 5.7, 0.9], room: 'sergiu', look: [-7, 5.55, -0.2] },
  { label: 'in sala 4', pos: [-5.2, 5.7, 0.2], room: 'sergiu', look: [-8.5, 5.5, -1.8] },
  { label: 'sala 4, adanc', pos: [-6.4, 5.7, -0.7], room: 'sergiu', look: [-11.2, 5.8, -3.2] },

  { label: 'ridicare', pos: [-9, 10.5, 5], look: [0, 4, 0] },
  { label: 'final, vedere de ansamblu', pos: [0, 13, 30], look: [0, 3.5, 0] },
] as const
