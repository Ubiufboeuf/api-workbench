import { create } from 'zustand'
import type { Display, ResponseType } from '../types/responseTypes'

interface ResponseStore {
  res: Response | null
  setRes: (res: Response | null) => void

  responseTime: number | undefined
  setResponseTime: (responseTime: number | undefined) => void

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

  responseTime: undefined,
  setResponseTime: (responseTime) => set({ responseTime }),

  data: null,
  setData: (data) => set({ data }),

  responseType: undefined,
  setResponseType: (responseType) => set({ responseType }),

  display: null,
  setDisplay: (display) => set({ display })
}))
