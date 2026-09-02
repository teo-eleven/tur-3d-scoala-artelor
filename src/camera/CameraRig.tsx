import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils, Vector3 } from 'three'
import { APP_CONFIG } from '../../config'
import { progressRef } from '../scroll/scrollController'
import { useTourStore } from '../store/tourStore'
import { sampleCamera } from './path'

const { damping, publishStep } = APP_CONFIG.camera

/** Leaga pozitia camerei de progresul derularii. */
export const CameraRig = () => {
  const smoothed = useRef(0)
  const published = useRef(-1)
  /** Alocate o singura data, la primul cadru — nu la fiecare randare. */
  const position = useRef<Vector3 | null>(null)
  const target = useRef<Vector3 | null>(null)
  const publish = useTourStore((state) => state.publish)

  useFrame(({ camera }, delta) => {
    const nextPosition = (position.current ??= new Vector3())
    const nextTarget = (target.current ??= new Vector3())

    smoothed.current = MathUtils.damp(smoothed.current, progressRef.current, damping, delta)
    sampleCamera(smoothed.current, nextPosition, nextTarget)
    camera.position.copy(nextPosition)
    camera.lookAt(nextTarget)

    if (Math.abs(smoothed.current - published.current) >= publishStep) {
      published.current = smoothed.current
      publish(smoothed.current)
    }
  })

  return null
}
