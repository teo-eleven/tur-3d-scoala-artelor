/** Paleta materialelor, luminile si dimensiunile obiectelor din scena. */

export const PALETTE = {
  wallInterior: '#e8e2d6',
  wallExterior: '#cfc4b2',
  floorWood: '#8a5a35',
  floorStone: '#b9b0a2',
  ceiling: '#f2eee6',
  trim: '#5c4632',
  stair: '#a07a52',
  glass: '#cfe4f2',
  pianoBody: '#1b1714',
  pianoKeys: '#f5f1e8',
  frame: '#3c2f22',
  ground: '#6f7a58',
  lampDisc: '#fff8ec',
  lampGlow: '#ffd9a0',
  metal: '#8c8c92',
  micHead: '#2a2a2e',
} as const

/** Lumina generala si corpurile de iluminat. */
export const LIGHTING = {
  hemisphere: { sky: '#cfe3f5', ground: '#5d5648', intensity: 0.9 },
  ambient: { color: '#fff2e2', intensity: 0.35 },
  sun: {
    position: [18, 26, 20],
    color: '#ffe9c9',
    intensity: 2.1,
    shadowMapSize: [1024, 1024],
    shadowCamera: { left: -30, right: 30, top: 30, bottom: -30, far: 90 },
  },
  /** Plafoniera standard. */
  ceilingLamp: {
    discRadius: 0.34,
    discThickness: 0.08,
    emissiveIntensity: 0.85,
    intensity: 13,
    distance: 15,
    color: '#fff3e0',
    /** Cat de jos sub disc sta sursa de lumina. */
    lightDrop: 0.25,
  },
  /** Cate plafoniere are o sala si unde, pe axa Z. */
  roomLampsZ: [-4.6, 0.4],
  corridorLampsZ: [5.4, 1.4, -2],
  corridorLamp: { intensity: 11, distance: 16 },
  /** Casa scarii e dubla ca inaltime: o lumina jos, la palier, si una sus. */
  stairwell: {
    landing: { intensity: 14, distance: 12, color: '#ffeedd' },
    top: { intensity: 18, distance: 20 },
  },
  /** Lumina care cade pe tabloul indrumatorului (culoarea vine din config-ul lui). */
  portrait: { intensity: 6, distance: 5, offsetAbove: 0.5, offsetFront: 0.9 },
} as const

/** Dimensiunile obiectelor de mobilier si decor. */
export const PROPS = {
  portrait: { width: 1.6, height: 2.1, depth: 0.08, border: 0.09, wallGap: 0.16, mountY: 1.8 },
  window: { frame: 0.09, mullion: 0.05, glassOpacity: 0.34, glassEmissive: 0.5 },
  railing: {
    height: 1.0,
    barThickness: 0.08,
    postThickness: 0.06,
    postsX: [-2.6, -0.9, 0.9, 2.6],
    stairHeight: 0.95,
  },
  stairs: { stepThickness: 0.26 },
  /** Unde stau pianul, bancheta si stativul in sala (relativ la centrul salii). */
  furniture: {
    pianoOffsetX: 1.4,
    benchOffsetX: 0.4,
    micOffsetX: -0.6,
    pianoZ: -0.4,
    micZ: -2.6,
  },
} as const
