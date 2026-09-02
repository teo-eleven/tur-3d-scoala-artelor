import { useMemo } from 'react'

export type QualityTier = 'high' | 'low'

const COARSE_POINTER_QUERY = '(pointer: coarse)'
const SMALL_SCREEN_PX = 900

/** Device-urile mici / touch primesc mai putine efecte, ca sa tinem 60fps. */
export const useQualityTier = (): QualityTier =>
  useMemo(() => {
    if (typeof window === 'undefined') return 'high'
    const isCoarse = window.matchMedia(COARSE_POINTER_QUERY).matches
    const isSmall = window.innerWidth < SMALL_SCREEN_PX
    return isCoarse || isSmall ? 'low' : 'high'
  }, [])
