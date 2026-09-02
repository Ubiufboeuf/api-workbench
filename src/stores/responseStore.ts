import { create } from 'zustand'

interface ResponseStore {
  res: Response | null
  setRes: (res: Response | null) => void
}

export const useResponseStore = create<ResponseStore>((set) => ({
  res: null,
  setRes: (res) => set({ res })
}))
