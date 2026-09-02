import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils, Vector3 } from 'three'
import { progressRef } from '../scroll/scrollController'
import { useTourStore } from '../store/tourStore'
import { sampleCamera } from './path'

/** Cat de repede recupereaza camera diferenta fata de scroll. */
const DAMPING = 3.6
/** Sub pragul asta nu mai anuntam UI-ul, ca sa nu re-randam degeaba. */
const PUBLISH_STEP = 0.004

/** Leaga pozitia camerei de progresul derularii. */
export const CameraRig = () => {
  const smoothed = useRef(0)
  const published = useRef(-1)
  const position = useRef(new Vector3())
  const target = useRef(new Vector3())
  const publish = useTourStore((state) => state.publish)

  useFrame(({ camera }, delta) => {
    smoothed.current = MathUtils.damp(smoothed.current, progressRef.current, DAMPING, delta)
    sampleCamera(smoothed.current, position.current, target.current)
    camera.position.copy(position.current)
    camera.lookAt(target.current)

    if (Math.abs(smoothed.current - published.current) >= PUBLISH_STEP) {
      published.current = smoothed.current
      publish(smoothed.current)
    }
  })

  return null
}
