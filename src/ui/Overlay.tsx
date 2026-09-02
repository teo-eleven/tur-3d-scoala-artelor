import { APP_CONFIG, instructorById } from '../../config'
import { useTourStore } from '../store/tourStore'
import { InstructorCard } from './InstructorCard'
import { ProgressRail } from './ProgressRail'
import { Intro } from './Intro'
import { Outro } from './Outro'

const { introUntil, outroFrom } = APP_CONFIG.overlay

/** Tot textul turului, in DOM (deci si accesibil, si indexabil). */
export const Overlay = () => {
  const progress = useTourStore((state) => state.progress)
  const activeRoom = useTourStore((state) => state.activeRoom)

  return (
    <div className="overlay">
      <Intro visible={progress < introUntil} />
      {activeRoom && <InstructorCard instructor={instructorById(activeRoom)} />}
      <Outro visible={progress > outroFrom} />
      <ProgressRail progress={progress} activeRoom={activeRoom} />
    </div>
  )
}
