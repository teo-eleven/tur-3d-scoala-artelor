import { create } from 'zustand'
import type { RoomId } from '../../config'
import { roomAtProgress } from '../camera/path'

interface TourState {
  readonly progress: number
  readonly activeRoom: RoomId | null
  readonly publish: (progress: number) => void
}

export const useTourStore = create<TourState>((set, get) => ({
  progress: 0,
  activeRoom: null,
  publish: (progress) => {
    const activeRoom = roomAtProgress(progress)
    if (activeRoom === get().activeRoom) {
      set({ progress })
      return
    }
    set({ progress, activeRoom })
  },
}))
