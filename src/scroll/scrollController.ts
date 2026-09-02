import Lenis from 'lenis'

/** Cate ecrane de scroll are turul. Mai mult = deplasare mai lenta. */
export const SCROLL_LENGTH_VH = 1400

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)

/** Progresul 0..1 al derularii. Citit in fiecare cadru, deci tinut in afara React. */
export const progressRef = { current: 0 }

let lenis: Lenis | null = null

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

const readProgress = () => {
  const max = maxScroll()
  progressRef.current = max > 0 ? clamp01(window.scrollY / max) : 0
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Porneste scroll-ul fluid. Returneaza functia de curatare. */
export const initScroll = (): (() => void) => {
  if (!prefersReducedMotion()) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1.4 })
  }

  let frame = 0
  const loop = (time: number) => {
    lenis?.raf(time)
    readProgress()
    frame = requestAnimationFrame(loop)
  }
  frame = requestAnimationFrame(loop)
  window.addEventListener('resize', readProgress)
  readProgress()

  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', readProgress)
    lenis?.destroy()
    lenis = null
  }
}

/** Sare la un punct de pe traseu (folosit de meniul cu sali). */
export const scrollToProgress = (progress: number) => {
  const top = clamp01(progress) * maxScroll()
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.6 })
    return
  }
  window.scrollTo({ top, behavior: 'smooth' })
}
