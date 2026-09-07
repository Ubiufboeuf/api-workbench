import { create } from 'zustand'
import type { Theme } from '../types/uiTypes'

interface UIStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useUIStore = create<UIStore>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme })
}))
