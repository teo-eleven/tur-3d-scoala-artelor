import { useMemo } from 'react'
import { APP_CONFIG } from '../../config'

export type QualityTier = 'high' | 'low'

const { coarsePointerQuery, smallScreenPx } = APP_CONFIG.quality

/** Device-urile mici / touch primesc mai putine efecte, ca sa tinem 60fps. */
export const useQualityTier = (): QualityTier =>
  useMemo(() => {
    if (typeof window === 'undefined') return 'high'
    const isCoarse = window.matchMedia(coarsePointerQuery).matches
    const isSmall = window.innerWidth < smallScreenPx
    return isCoarse || isSmall ? 'low' : 'high'
  }, [])
