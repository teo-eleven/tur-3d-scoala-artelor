# Școala Artelor Suceava — tur virtual 3D

Site one-page în care scroll-ul plimbă camera prin clădirea școlii: două niveluri,
patru săli, câte doi îndrumători pe nivel.

**Port dedicat: 5180** (dev) / 5181 (preview). Nu se suprapune peste celelalte
proiecte locale.

## Rulare

```bash
npm install
npm run dev        # http://localhost:5180
```

| Comandă | Ce face |
|---|---|
| `npm run dev` | server local, port 5180 |
| `npm run build` | build static în `dist/` |
| `npm run preview` | servește build-ul, port 5181 |
| `npm test` | teste unitare (vitest) |
| `npm run typecheck` | verificare de tipuri |
| `npm run lint` | oxlint |
| `node scripts/shots.mjs` | capturi din tur, la 12 poziții de scroll |

## Cum e construit

Scroll-ul (Lenis) dă un progres 0..1. Progresul e poziția pe o curbă
`CatmullRomCurve3` care trece prin clădire — o curbă pentru poziția camerei,
alta pentru direcția privirii. Segmentele scurte dintre waypoint-uri = camera
încetinește, de aceea în dreptul sălilor punctele sunt îndesite.

```
src/
├─ data/         layout.ts (dimensiuni), instructors.ts (cine, unde), waypoints.ts (traseul)
├─ camera/       path.ts (curbele + intervalele sălilor), CameraRig.tsx
├─ scene/        Shell, Corridor, Stairs, Room + geometry/ + props/
├─ scroll/       scrollController.ts (Lenis, progres, sari-la-sala)
├─ ui/           Overlay, InstructorCard, ProgressRail, Intro, Outro, Loader
└─ store/        tourStore.ts (sala activă)
```

## Ce se schimbă și de unde

| Vrei să schimbi | Fișier |
|---|---|
| cine e în ce sală, bio, poză, culoare | `src/data/instructors.ts` |
| traseul camerei / opririle | `src/data/waypoints.ts` |
| dimensiunile clădirii | `src/data/layout.ts` |
| culorile materialelor | `src/scene/materials.ts` |
| lungimea turului (cât scroll) | `SCROLL_LENGTH_VH` din `src/scroll/scrollController.ts` |

## Materiale de referință

Pune poze sau clipuri din clădire în `assets-input/` (nu intră în git).
Din video se extrag cadre cu `ffmpeg` (`brew install ffmpeg`):

```bash
ffmpeg -i assets-input/tur.mp4 -vf fps=1/2 assets-input/cadre/%03d.jpg
```

## Stare

Fazele F0–F3 din `docs/PLAN.md` sunt gata. Urmează F4 (materiale și atmosferă
pe baza pozelor reale), F5 (mobil și performanță), F6 (teste E2E, SEO, deploy).
