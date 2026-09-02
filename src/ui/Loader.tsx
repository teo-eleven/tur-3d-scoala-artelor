import { useProgress } from '@react-three/drei'

/** Ecranul de incarcare, cat timp se pregatesc texturile si geometria. */
export const Loader = () => {
  const { progress, active } = useProgress()

  return (
    <div className={`loader${active ? '' : ' is-done'}`} role="status" aria-live="polite">
      <p className="loader__title">Școala Artelor Suceava</p>
      <div className="loader__bar">
        <div className="loader__fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="loader__pct">{Math.round(progress)}%</p>
    </div>
  )
}
