import { create } from 'zustand'
import type { Display, ResponseType } from '../types/responseTypes'

interface ResponseStore {
  res: Response | null
  setRes: (res: Response | null) => void

  data: any
  setData: (data: any) => void

  responseType: ResponseType | undefined
  setResponseType: (responseType: ResponseType) => void

  display: Display | null
  setDisplay: (display: Display | null) => void
}

export const useResponseStore = create<ResponseStore>((set) => ({
  res: null,
  setRes: (res) => set({ res }),

  data: null,
  setData: (data) => set({ data }),

  responseType: undefined,
  setResponseType: (responseType) => set({ responseType }),

  display: null,
  setDisplay: (display) => set({ display })
}))
