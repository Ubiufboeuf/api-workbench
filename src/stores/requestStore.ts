import { create } from 'zustand'
import type { KV, KV as NewParam, Param } from '../types/requestTypes'

interface RequestStore {
  url: string
  setURL: (url: string) => void
  
  params: Param[]
  setParams: (params: KV[]) => void
  addParam: (newParam: NewParam) => void
  modifyParam: (id: string, idx: number, data: KV) => void
  deleteParam: (id: string) => void

  toFocus: string | undefined | null
  clearAllFocus: () => void
}

let i = 0 // al menos por ahora no hace falta algo más complejo

export const useRequestStore = create<RequestStore>((set) => ({
  url: '',
  setURL: (url) => set({ url }),
  
  params: [{ id: `${i++}`, name: '', value: '' }],
  setParams (newParams) {
    set((state) => {
      const mergedParams = newParams.map((p, idx) => ({
        ...p,
        id: state.params[idx]?.id || `${i++}`
      }))
      return { params: mergedParams }
    })
  },
  addParam (kv) {
    set(({ params }) => {
      const id = `${i++}`
      const newParam: Param = { ...kv, id }
      return {
        params: [...params, newParam],
        toFocus: id
      }
    })
  },
  modifyParam (id, idx, data) {
    set(({ params }) => {
      const kv: Param = {
        id,
        name: data.name,
        value: data.value,
        focus: data?.focus
      }

      params[idx] = kv
      return {
        params: [...params]
      }
    })
  },
  deleteParam (id) {
    set(({ params }) => {
      const newParams = params.filter((p) => p.id !== id)
      return { params: newParams }
    })
  },

  toFocus: undefined,
  clearAllFocus () {
    set(({ params }) => ({
      params: params.map((p) => ({ ...p, focus: false }))
    }))
  }
}))
