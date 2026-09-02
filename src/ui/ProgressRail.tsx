import { INSTRUCTORS, type RoomId } from '../data/instructors'
import { ROOM_RANGES } from '../camera/path'
import { scrollToProgress } from '../scroll/scrollController'

interface ProgressRailProps {
  readonly progress: number
  readonly activeRoom: RoomId | null
}

const focusOf = (id: RoomId) => ROOM_RANGES.find((range) => range.id === id)?.focus ?? 0

/** Bara laterala: cat ai parcurs si sarituri directe la fiecare sala. */
export const ProgressRail = ({ progress, activeRoom }: ProgressRailProps) => (
  <nav className="rail" aria-label="Sălile turului">
    <div className="rail__track">
      <div className="rail__fill" style={{ height: `${progress * 100}%` }} />
    </div>
    <ul className="rail__list">
      {INSTRUCTORS.map((instructor) => (
        <li key={instructor.id}>
          <button
            type="button"
            className={`rail__dot${activeRoom === instructor.id ? ' is-active' : ''}`}
            style={{ '--accent': instructor.accent } as React.CSSProperties}
            onClick={() => scrollToProgress(focusOf(instructor.id))}
            aria-current={activeRoom === instructor.id}
          >
            <span className="rail__label">{instructor.name}</span>
          </button>
        </li>
      ))}
    </ul>
  </nav>
)
