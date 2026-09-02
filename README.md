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
| `node scripts/shots.mts` | capturi din tur, la 12 poziții de scroll |

## Cum e construit

Scroll-ul (Lenis) dă un progres 0..1. Progresul e poziția pe o curbă
`CatmullRomCurve3` care trece prin clădire — o curbă pentru poziția camerei,
alta pentru direcția privirii. Segmentele scurte dintre waypoint-uri = camera
încetinește, de aceea în dreptul sălilor punctele sunt îndesite.

```
config/          TOATE setările — codul nu are valori fixe
├─ app.config.ts         porturi, scroll, cameră, calitate, efecte, texte, capturi
├─ building.config.ts    dimensiunile clădirii, fațadele, casa scării
├─ scene.config.ts       paleta, luminile, dimensiunile obiectelor
├─ instructors.config.ts cine, în ce sală, poză, culoare, bio
├─ tour.config.ts        waypoint-urile traseului
└─ index.ts              punctul unic de import

src/             doar cod
├─ camera/       path.ts (curbele + intervalele sălilor), CameraRig.tsx
├─ scene/        Shell, Corridor, Stairs, Room + geometry/ + props/
├─ scroll/       scrollController.ts (Lenis, progres, sari-la-sala)
├─ ui/           Overlay, InstructorCard, ProgressRail, Intro, Outro, Loader
└─ store/        tourStore.ts (sala activă)
```

**Regula:** nicio setare nu stă în cod. Tot ce se poate regla e în `config/`, iar
`src/` importă doar din `config`. Același fișier îl citesc și `vite.config.ts`
(porturi, meta din `index.html`) și `scripts/shots.mts` (Node 24 importă `.ts` nativ).

## Ce se schimbă și de unde

| Vrei să schimbi | Unde |
|---|---|
| cine e în ce sală, bio, poză, culoare | `config/instructors.config.ts` |
| traseul camerei / opririle | `config/tour.config.ts` |
| dimensiunile clădirii, ferestrele, scara | `config/building.config.ts` |
| culori, lumini, mobilier | `config/scene.config.ts` |
| porturi, titlu și meta, linkuri | `config/app.config.ts` → `site`, `server`, `links` |
| lungimea turului, fluiditatea scroll-ului | `config/app.config.ts` → `scroll` |
| unghiul camerei, cât de lin urmărește scroll-ul | `config/app.config.ts` → `camera` |
| ceață, bloom, vignette, culoarea cerului | `config/app.config.ts` → `effects` |
| pragul pentru mobil / calitate redusă | `config/app.config.ts` → `quality` |
| pozițiile din care se fac capturile | `config/app.config.ts` → `capture.stops` |

## Materiale de referință

Pune poze sau clipuri din clădire în `assets-input/` (nu intră în git).
Din video se extrag cadre cu `ffmpeg` (`brew install ffmpeg`):

```bash
ffmpeg -i assets-input/tur.mp4 -vf fps=1/2 assets-input/cadre/%03d.jpg
```

## Stare

Fazele F0–F3 din `docs/PLAN.md` sunt gata. Urmează F4 (materiale și atmosferă
pe baza pozelor reale), F5 (mobil și performanță), F6 (teste E2E, SEO, deploy).
