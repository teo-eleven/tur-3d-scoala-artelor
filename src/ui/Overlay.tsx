import { instructorById } from '../data/instructors'
import { useTourStore } from '../store/tourStore'
import { InstructorCard } from './InstructorCard'
import { ProgressRail } from './ProgressRail'
import { Intro } from './Intro'
import { Outro } from './Outro'

/** Pragurile la care apar titlul de inceput si finalul. */
const INTRO_UNTIL = 0.055
const OUTRO_FROM = 0.955

/** Tot textul turului, in DOM (deci si accesibil, si indexabil). */
export const Overlay = () => {
  const progress = useTourStore((state) => state.progress)
  const activeRoom = useTourStore((state) => state.activeRoom)

  return (
    <div className="overlay">
      <Intro visible={progress < INTRO_UNTIL} />
      {activeRoom && <InstructorCard instructor={instructorById(activeRoom)} />}
      <Outro visible={progress > OUTRO_FROM} />
      <ProgressRail progress={progress} activeRoom={activeRoom} />
    </div>
  )
}
