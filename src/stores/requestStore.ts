import { create } from 'zustand'
import type { KV, KV as NewParam, Param } from '../types/requestTypes'

interface RequestStore {
  params: Param[]
  setParams: (params: KV[]) => void
  addParam: (newParam: NewParam) => void
  deleteParam: (id: string) => void

  toFocus: string | undefined | null
  clearAllFocus: () => void
}

let i = 0 // al menos por ahora no hace falta algo más complejo

export const useRequestStore = create<RequestStore>((set) => ({
  params: [{ id: `${i++}`, name: '', value: '' }],
  setParams (params) {
    set({ params: params.map((p) => ({ ...p, id: `${i++}` })) })
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
