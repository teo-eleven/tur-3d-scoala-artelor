# Scoala Artelor Suceava — tur 3D interactiv (PLAN)

Data: 2026-09-01 · Actualizat: 2026-09-02 · Stare: F0-F3 IMPLEMENTATE · Local-only

---

## 1. Obiectiv (o linie)

Un site one-page in care, **derulind cu scroll-ul**, camera se plimba fizic prin cladirea
Scolii Artelor Suceava (2 niveluri, 4 sali), oprindu-se in fiecare sala la indrumatorul ei.

## 2. Ce am inteles / ce livram

- Tur 3D **scroll-driven**: scroll = pozitia pe traseul camerei (nu drag liber de mouse).
- Cladire pe **2 niveluri**, **4 sali**, **2 sali / nivel**, fiecare cu indrumatorul ei.
- Referinta de senzatie: Matterport (spatiu real, deplasare fluida) — dar noi facem
  varianta **3D handcrafted**, nu scanare (vezi sectiunea 4).
- Deocamdata **doar local**, pe port dedicat. Hosting mai tarziu.

### Indrumatorii (de pe scoalaartelor.ro/echipa-noastra)

| # | Nume | Disciplina | Nivel propus | Sala propusa |
|---|------|-----------|--------------|--------------|
| 1 | Lidia Hutanu | Canto si pian | Parter | Sala de Canto |
| 2 | Teodora Botez | Canto si pian | Parter | Sala de Canto Clasic |
| 3 | Marian Hutanu | Pian principal | Etaj | Sala de Pian |
| 4 | Sergiu Dumbrava | Pian si canto clasic | Etaj | Sala de Pian & Studiu |

> Repartizarea pe niveluri/sali e o **propunere** — se schimba intr-un singur fisier de date.

## 3. Traseul camerei (storyboard-ul scroll-ului)

```
scroll 0%    Exterior / fatada + titlu               "Scoala Artelor Suceava"
      8%     Intrare — usa se apropie, fade la interior
     15%     Hol parter (recepite, panou cu afise)
     25%     SALA 1 — Lidia Hutanu        [oprire: card indrumator]
     40%     Coridor parter
     50%     SALA 2 — Teodora Botez       [oprire: card indrumator]
     60%     Scara — urcare la etaj (miscarea pe verticala = momentul "wow")
     72%     SALA 3 — Marian Hutanu       [oprire: card indrumator]
     85%     SALA 4 — Sergiu Dumbrava     [oprire: card indrumator]
     95%     Sala mare / final — CTA "Inscrie-te" + contact
```

Mecanica: o curba `CatmullRomCurve3` prin cladire; progresul de scroll (0..1) da pozitia si
tinta camerei. In dreptul fiecarei sali curba are un "palier" (viteza scade) ca sa lase timp
pentru textul care apare peste 3D.

## 4. Decizia tehnica importanta: cum facem "spatiul"

| Varianta | Ce inseamna | Verdict |
|---|---|---|
| A. Matterport / scanare reala | Camera 360 profesionala sau app pe telefon, upload la Matterport | Realism maxim, dar **abonament lunar**, aspect standard, control zero pe tranzitii si pe scroll. **Nu.** |
| B. **3D handcrafted (recomandat)** | Modelam cladirea simplificat, camera pe traseu, texturi + poze reale pe pereti | Control total pe tranzitii, brand propriu, gratis de gazduit (fisiere statice). **DA.** |
| C. Panorame 360 (Pannellum) | Poze 360 legate intre ele | Ieftin, dar **fara tranzitii fluide** — sare din punct in punct. Nu da senzatia ceruta. |
| D. Hibrid (mai tarziu) | Scheletul 3D de la B + poze reale ca "billboard"/texturi in sali | **Upgrade natural** dupa ce avem poze din cladire. |

Pornim cu **B**, arhitectat ca sa acceptam **D** fara rescriere.

## 5. Stack

- **Vite + React 19 + TypeScript** — build rapid, standard.
- **three.js + @react-three/fiber + @react-three/drei** — 3D declarativ in React.
- **@react-three/postprocessing** — bloom / vignette / DOF, "look"-ul cinematic.
- **Lenis** (smooth scroll) + hook propriu `useScrollProgress` — scroll fluid pe tot spatiul.
- **Zustand** — stare mica: sala activa, progres, calitate (low/high).
- **Vitest + React Testing Library** + **Playwright** (smoke E2E) — conform regulilor de testare.
- **Port dedicat: 5180** (dev), 5181 (preview). Nu se atinge nimic din hours / trupa9 / brain.

Fara backend in faza asta: totul e static. Formularul de contact se leaga mai tarziu.

## 6. Structura folderelor

```
~/dev/scoala-artelor-suceava/
├─ docs/               PLAN.md, storyboard, notite arhitectura
├─ public/
│  ├─ models/          building.glb (draco/meshopt)
│  └─ img/instructors/ pozele indrumatorilor (optimizate webp)
├─ src/
│  ├─ scene/           Building, Floor, Room, Stairs, Lights, Env
│  ├─ camera/          CameraRig, path.ts (curba + waypoints)
│  ├─ ui/              Overlay, InstructorCard, Progress, Nav, Loader
│  ├─ data/            instructors.ts, waypoints.ts   <-- continutul editabil
│  ├─ hooks/           useScrollProgress, useQualityTier
│  └─ App.tsx, main.tsx
└─ tests/
```

Regula: fisiere mici (200–400 linii), o responsabilitate fiecare.

## 7. Fazele de lucru

**F0 — Schelet — GATA**
Init Vite+TS+R3F, port 5180, canvas cu o cutie care se roteste, lint/format, git init.
_Livrabil: `npm run dev` merge pe http://localhost:5180._

**F1 — Blockout-ul cladirii — GATA**
Cladire "grey-box": 2 placi de nivel, pereti, 4 sali, hol, scara. Fara texturi.
_Livrabil: se vede cladirea, se poate orbita cu mouse-ul pentru verificare._

**F2 — Camera pe scroll — GATA** ← inima proiectului
Curba prin cladire + waypoints, Lenis, damping, scroll invers, reduced-motion fallback.
_Livrabil: derulezi si zbori prin cladire cap-coada._

**F3 — Continut + overlay — GATA**
`instructors.ts` cu cei 4, card care apare/dispare la fiecare oprire, bara de progres,
meniu "sari la sala X".
_Livrabil: turul spune povestea, cu nume, disciplina, poza, scurt bio._

**F4 — Materiale, lumina, atmosfera (1–2 zile)**
Texturi PBR simple, lumina prin ferestre, bloom subtil, pian/instrumente ca props low-poly,
poze reale pe pereti.
_Livrabil: arata a cladire, nu a machete._

**F5 — UX, mobil, performanta (1 zi)**
Loader cu progres, tier de calitate (mobil = mai putine efecte), lazy assets, 60fps target,
fallback 2D pentru device-uri slabe, a11y (text real in DOM, nu doar in 3D).
_Livrabil: merge decent si pe telefon._

**F6 — Teste + SEO + pregatire deploy (0.5 zi)**
Unit pe path/scroll math, smoke E2E, meta/OG, build static verificat cu `vite preview`.
_Livrabil: `npm run build` produce un folder gata de urcat pe host._

**F7 (optional, dupa poze) — Hibrid foto**
Panorame 360 in sali, sau poze reale ca planuri texturate. Doar dupa ce avem materialul.

## 8. Riscuri si cum le tratam

| Risc | Impact | Mitigare |
|---|---|---|
| Nu avem plan/dimensiuni reale ale cladirii | Geometrie aproximativa | Facem blockout plauzibil acum; corectam cand primim poze/masuratori. Geometria sta intr-un singur modul. |
| Performanta pe telefon (3D + scroll) | Site-ul "gafaie" | Buget de poligoane de la inceput, tier de calitate, texturi comprimate, fara postprocessing pe mobil. |
| Scroll-jacking = enervant | Bounce rate | Scroll ramane natural (Lenis), nu blocam; se poate sari direct la o sala; respectam `prefers-reduced-motion`. |
| Drepturi pe pozele indrumatorilor | Legal | Cerem acordul scolii; pana atunci placeholdere. |
| Scope creep (vrem tot Matterport-ul) | Nu terminam | Ne oprim la F6 pentru prima versiune demonstrabila. |

## 9. Ce am nevoie de la tine (nu blocheaza F0–F2)

1. **Poze din interior** — macar 3–5 per sala + hol + scara. Fara ele, F4 ramane aproximativ.
2. **Confirmare repartizare** indrumator → nivel/sala (tabelul de la 2).
3. **Text scurt** per indrumator (2–3 randuri) sau ok sa-l sintetizez din site.
4. Logo / culori de brand, daca exista.

## 10. Definitia de "gata" pentru v1

- Derulezi de sus in jos si parcurgi fizic cladirea, fara sacadari, in ~60–90 s.
- Cei 4 indrumatori apar fiecare in sala lui, cu nume, disciplina, poza si bio.
- Merge pe desktop si pe telefon; are fallback pentru reduced-motion.
- Ruleaza local pe portul 5180; build static gata de urcat pe host.


---

## Jurnal

### 2026-09-02 — F0..F3 implementate

Ce e in picioare:
- Vite + React 19 + TS + react-three-fiber pe portul 5180 (strictPort).
- Cladire completa: anvelopa cu ferestre, hol, coridor pe doua niveluri,
  casa scarii cu doua rampe si palier intermediar, 4 sali mobilate.
- Camera legata de scroll (Lenis + doua curbe CatmullRom), 33 de waypoint-uri.
- Cei 4 indrumatori: tablou in sala, card in overlay, bara laterala cu sarituri.
- 11 teste unitare (geometria golurilor + traseul camerei), toate verzi.
- `scripts/shots.mjs`: capturi automate din 12 puncte ale turului (Puppeteer).

Bug-uri gasite din capturi si reparate:
- `line-height: 0.98` taia virgula de sub "S" din "Scoala" si o suprapunea
  peste "Suceava".
- Camera privea ~21 grade in sus pe scara: se vedea mai mult tavan decat spatiu.
- Waypoint-urile salii 3 aveau semnul lui Z inversat fata de sala 2 — camera se
  uita la un perete gol, nu la tabloul indrumatorului.
- Ferestrele erau planuri fara rama; acum au rama si cruce.

Ramas de facut, in ordine: F4 (materiale reale, dupa poze/video din cladire),
F5 (mobil + performanta), F6 (E2E, SEO, deploy).
