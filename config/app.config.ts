/**
 * Setarile aplicatiei — toate intr-un singur loc.
 *
 * Fisierul e date pure, fara importuri, ca sa poata fi citit deopotriva de
 * aplicatie, de `vite.config.ts` si de scripturile Node. Daca vrei sa schimbi
 * ceva (port, viteza turului, culori de atmosfera, texte), se schimba de aici,
 * nu din cod.
 */

export const APP_CONFIG = {
  /** Texte si meta — injectate in index.html la build. */
  site: {
    lang: 'ro',
    title: 'Tur virtual 3D · Școala Artelor Suceava',
    description:
      'Plimbă-te prin Școala Artelor Suceava: patru săli pe două niveluri și îndrumătorii lor, într-un tur 3D controlat de scroll.',
    ogTitle: 'Tur virtual 3D · Școala Artelor Suceava',
    ogDescription: 'Patru săli, doi îndrumători pe fiecare nivel. Derulează și intră în clădire.',
  },

  /** Porturile locale, dedicate acestui proiect. */
  server: {
    devPort: 5180,
    previewPort: 5181,
    strictPort: true,
    openBrowser: false,
  },

  /** Legaturile catre exterior. */
  links: {
    enroll: 'https://scoalaartelor.ro/contact/',
  },

  /** Derularea: cat de lung e turul si cat de fluid merge scroll-ul. */
  scroll: {
    /** Inaltimea paginii, in ecrane. Mai mult = deplasare mai lenta. */
    lengthVh: 1400,
    lerp: 0.085,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
    /** Durata saltului cand apesi o sala din bara laterala. */
    jumpDurationSeconds: 1.6,
  },

  /** Camera si felul in care urmareste scroll-ul. */
  camera: {
    fov: 58,
    near: 0.1,
    far: 220,
    /** Cat de repede recupereaza camera diferenta fata de scroll. */
    damping: 3.6,
    /** Sub pragul asta nu mai anuntam UI-ul, ca sa nu re-randam degeaba. */
    publishStep: 0.004,
    /** Rotunjimea curbei prin waypoint-uri. */
    curveTension: 0.5,
  },

  /** Device-urile mici / touch primesc mai putine efecte, ca sa tinem 60fps. */
  quality: {
    coarsePointerQuery: '(pointer: coarse)',
    smallScreenPx: 900,
    dpr: {
      high: [1, 2],
      low: [1, 1.5],
    },
  },

  /** Pragurile de progres la care apar titlul de inceput si finalul. */
  overlay: {
    introUntil: 0.055,
    outroFrom: 0.955,
  },

  /** Atmosfera: cerul, ceata si efectele de imagine. */
  effects: {
    background: '#aec4d8',
    fog: { color: '#aec4d8', near: 40, far: 120 },
    bloom: { intensity: 0.35, luminanceThreshold: 0.9 },
    vignette: { offset: 0.25, darkness: 0.6 },
  },

  /** Scriptul de capturi (`node scripts/shots.mjs`). */
  capture: {
    url: 'http://localhost:5180/',
    outDir: 'shots',
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    /** Cat asteptam dupa fiecare salt, ca sa se aseze camera si texturile. */
    settleMs: 2600,
    navigationTimeoutMs: 60_000,
    launchArgs: ['--use-gl=angle', '--use-angle=metal', '--enable-unsafe-swiftshader'],
    /** Punctele din tur pe care le fotografiem: [nume fisier, progres 0..1]. */
    stops: [
      ['00-exterior', 0],
      ['01-intrare', 0.09],
      ['02-hol', 0.15],
      ['03-sala-lidia', 0.27],
      ['04-coridor', 0.35],
      ['05-sala-teodora', 0.43],
      ['06-scara-jos', 0.55],
      ['07-scara-palier', 0.61],
      ['08-etaj', 0.68],
      ['09-sala-marian', 0.75],
      ['10-sala-sergiu', 0.9],
      ['11-final', 1],
    ],
  },
} as const
