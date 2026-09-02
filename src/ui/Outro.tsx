import { INSTRUCTORS } from '../data/instructors'

interface OutroProps {
  readonly visible: boolean
}

/** Finalul turului: recapitulare si indemn la inscriere. */
export const Outro = ({ visible }: OutroProps) => (
  <footer className={`outro${visible ? '' : ' is-hidden'}`}>
    <h2 className="outro__title">Ai văzut toată clădirea</h2>
    <ul className="outro__team">
      {INSTRUCTORS.map((instructor) => (
        <li key={instructor.id}>
          <span style={{ background: instructor.accent }} className="outro__chip" />
          {instructor.name} · {instructor.discipline}
        </li>
      ))}
    </ul>
    <a className="outro__cta" href="https://scoalaartelor.ro/contact/">
      Vreau să mă înscriu
    </a>
  </footer>
)
