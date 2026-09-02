interface IntroProps {
  readonly visible: boolean
}

/** Titlul de deschidere, peste fatada cladirii. */
export const Intro = ({ visible }: IntroProps) => (
  <header className={`intro${visible ? '' : ' is-hidden'}`}>
    <p className="intro__eyebrow">Tur virtual</p>
    <h1 className="intro__title">
      Școala Artelor
      <span>Suceava</span>
    </h1>
    <p className="intro__lead">
      Patru săli, doi îndrumători pe fiecare nivel. Derulează și intră în clădire.
    </p>
    <p className="intro__hint" aria-hidden="true">
      derulează ↓
    </p>
  </header>
)
