import type { Instructor } from '../../config'

interface InstructorCardProps {
  readonly instructor: Instructor
}

/** Cardul care apare cand camera intra intr-o sala. */
export const InstructorCard = ({ instructor }: InstructorCardProps) => (
  <article
    className="card"
    style={{ '--accent': instructor.accent } as React.CSSProperties}
    aria-live="polite"
  >
    <img className="card__photo" src={instructor.photo} alt={instructor.name} />
    <div className="card__body">
      <p className="card__room">
        {instructor.room} · {instructor.level === 0 ? 'Parter' : 'Etaj'}
      </p>
      <h2 className="card__name">{instructor.name}</h2>
      <p className="card__discipline">{instructor.discipline}</p>
      <p className="card__bio">{instructor.bio}</p>
    </div>
  </article>
)
