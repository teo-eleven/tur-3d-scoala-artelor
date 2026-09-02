export type RoomId = 'lidia' | 'teodora' | 'marian' | 'sergiu'

export interface Instructor {
  readonly id: RoomId
  readonly name: string
  readonly discipline: string
  readonly bio: string
  readonly room: string
  readonly level: 0 | 1
  /** Aripa cladirii in care se afla sala. */
  readonly wing: 'west' | 'east'
  readonly photo: string
  readonly accent: string
}

/**
 * Sursa: https://scoalaartelor.ro/echipa-noastra/
 * Repartizarea pe niveluri e o propunere (canto la parter, pian la etaj)
 * si se schimba doar de aici.
 */
export const INSTRUCTORS: readonly Instructor[] = [
  {
    id: 'lidia',
    name: 'Lidia Huțanu',
    discipline: 'Canto și pian',
    bio: 'Licență și master în pedagogie muzicală, specializarea canto clasic. Membră a coralei „Cantores Amicitiae" din Iași, cu apetit pentru muzica franceză și jazz.',
    room: 'Sala de Canto',
    level: 0,
    wing: 'west',
    photo: '/img/instructors/lidia.jpg',
    accent: '#e8b04b',
  },
  {
    id: 'teodora',
    name: 'Teodora Botez',
    discipline: 'Canto și pian',
    bio: 'Absolventă a Facultății de Interpretare Muzicală, secția canto clasic (2010). Activă pe scenă și parte din proiectul Trupa 9.',
    room: 'Sala de Canto Clasic',
    level: 0,
    wing: 'east',
    photo: '/img/instructors/teodora.jpg',
    accent: '#d9737a',
  },
  {
    id: 'marian',
    name: 'Marian Huțanu',
    discipline: 'Pian principal',
    bio: 'Absolvent al Colegiului de Arte „Ciprian Porumbescu" și al Universității Naționale de Arte din Iași. Peste 15 ani de pedagogie și pianist în Trupa 9.',
    room: 'Sala de Pian',
    level: 1,
    wing: 'east',
    photo: '/img/instructors/marian.jpg',
    accent: '#6ea8c7',
  },
  {
    id: 'sergiu',
    name: 'Sergiu Dumbravă',
    discipline: 'Pian și canto clasic',
    bio: 'Absolvent al Academiei Naționale de Muzică din Cluj-Napoca, cu studii și în muzica tradițională. Pregătește elevi pentru arta pianistică și cântul vocal.',
    room: 'Sala de Pian & Studiu',
    level: 1,
    wing: 'west',
    photo: '/img/instructors/sergiu.jpg',
    accent: '#84a97c',
  },
] as const

export const instructorById = (id: RoomId): Instructor => {
  const found = INSTRUCTORS.find((i) => i.id === id)
  if (!found) throw new Error(`Instructor necunoscut: ${id}`)
  return found
}
